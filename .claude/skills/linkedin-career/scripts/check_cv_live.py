#!/usr/bin/env python3
"""Check that the CV is downloadable from the portfolio site and still current.

Checks, each printed as PASS / WARN / FAIL:
  1. every page in --pages links the CV, and each CV link resolves to a PDF (HTTP 200, application/pdf);
  2. the live PDF is byte-identical to the repo copy (when --repo is given);
  3. the PDF text contains the required contact facts (--require, defaults below);
  4. every link inside the PDF answers. Bot walls (LinkedIn's 999, Cloudflare challenges) and a
     sandbox proxy that blocks some GitHub repos are WARNs: they say nothing about the link.

Uses curl for HTTP, so it goes through whatever proxy and CA bundle the environment has,
and pdftotext (poppler-utils) for the text. Exit code 1 if anything FAILs.

Usage:
  python3 check_cv_live.py [--repo PATH_TO_sparrow-ai-tech] [--site URL] [--skip-pdf-links]
"""
import argparse
import hashlib
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import urljoin

SITE = "https://sparesparrow.github.io/sparrow-ai-tech/"
CV_PATH = "cv/Vojtech_Spacek_CV.pdf"
PAGES = ["", "case-studies/", "case-studies/hil-verification/", "case-studies/mia/"]
REQUIRED = [
    "Vojtěch Špaček",
    "+420 605 963 739",
    "sparesparrow@protonmail.ch",
    "linkedin.com/in/sparesparrow",
    "sparesparrow.github.io/sparrow-ai-tech",
    "no degree awarded",
]
# Sites that reject non-browser clients; a refusal from them says nothing about the link.
BOT_WALLED = ("linkedin.com", "x.com", "twitter.com", "audible.com")

results = []


def report(status, msg):
    results.append(status)
    print(f"{status:4}  {msg}")


UA = "Mozilla/5.0 (compatible; cv-link-check; +https://github.com/sparesparrow)"


def curl(url, out=None):
    """Return (http_code, content_type, why) following redirects.

    `why` names an environment block rather than a dead link: a Cloudflare bot challenge,
    or a sandbox proxy that only lets some GitHub repositories through.
    """
    body = out or str(Path(tempfile.gettempdir()) / f"cvcheck-body-{abs(hash(url))}")
    cmd = ["curl", "-sS", "-L", "--max-time", "30", "-A", UA, "-H", "Accept: text/html,*/*",
           "-D", "-", "-o", body, "-w", "\\n%{http_code} %{content_type}", url]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=40)
    except subprocess.TimeoutExpired:
        return 0, "", "timeout"
    headers, _, last = res.stdout.rstrip().rpartition("\n")
    code, _, ctype = last.partition(" ")
    code = int(code) if code.isdigit() else 0
    why = ""
    if code in (403, 503):
        try:
            head = Path(body).read_bytes()[:2000].decode("utf-8", "replace")
        except OSError:
            head = ""
        if "cf-mitigated" in headers.lower() or "Just a moment" in head or "cloudflare" in headers.lower():
            why = "Cloudflare bot challenge"
        elif "configured repositories" in head or "not enabled for this session" in head:
            why = "sandbox GitHub proxy"
    return code, ctype, why


def pdf_uris(data):
    """Link targets from a PDF's /URI entries, decoding PDF string escapes like \\057."""
    uris = set()
    for raw in re.findall(rb"/URI\s*\(((?:\\.|[^\\)])*)\)", data):
        s = re.sub(rb"\\([0-7]{1,3})", lambda m: bytes([int(m.group(1), 8)]), raw)
        s = re.sub(rb"\\(.)", rb"\1", s)
        uris.add(s.decode("latin-1"))
    return sorted(uris)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--site", default=SITE)
    ap.add_argument("--repo", help="path to a sparrow-ai-tech checkout, to compare the PDF")
    ap.add_argument("--pages", nargs="*", default=PAGES, help="site-relative pages that must link the CV")
    ap.add_argument("--require", nargs="*", default=REQUIRED, help="strings the PDF text must contain")
    ap.add_argument("--skip-pdf-links", action="store_true")
    args = ap.parse_args()
    site = args.site if args.site.endswith("/") else args.site + "/"
    tmp = Path(tempfile.mkdtemp(prefix="cvcheck-"))

    # 1. Site pages link the CV, and the links work.
    cv_links = set()
    for page in args.pages:
        url = urljoin(site, page)
        html_file = tmp / "page.html"
        code, _, _ = curl(url, out=str(html_file))
        if code != 200:
            report("FAIL", f"page {url} -> HTTP {code}")
            continue
        html = html_file.read_text(errors="replace")
        hrefs = {urljoin(url, h) for h in re.findall(r'href="([^"]+\.pdf)"', html)}
        if not hrefs:
            report("FAIL", f"page {url} has no CV (PDF) link")
        cv_links |= hrefs
    canonical = urljoin(site, CV_PATH)
    cv_links.add(canonical)
    for link in sorted(cv_links):
        code, ctype, _ = curl(link)
        ok = code == 200 and "pdf" in ctype
        report("PASS" if ok else "FAIL", f"CV link {link} -> {code} {ctype}")

    # 2. Live PDF matches the repo copy.
    live_pdf = tmp / "live.pdf"
    code, _, _ = curl(canonical, out=str(live_pdf))
    if code != 200:
        report("FAIL", f"cannot download {canonical} (HTTP {code})")
        return finish()
    data = live_pdf.read_bytes()
    if args.repo:
        repo_pdf = Path(args.repo) / "public" / CV_PATH
        if not repo_pdf.exists():
            report("FAIL", f"repo copy missing: {repo_pdf}")
        else:
            same = hashlib.sha256(repo_pdf.read_bytes()).hexdigest() == hashlib.sha256(data).hexdigest()
            report("PASS" if same else "WARN",
                   "live PDF identical to repo copy" if same
                   else "live PDF differs from repo copy (unmerged change, or Pages not redeployed yet)")

    # 3. Required facts in the text.
    try:
        text = subprocess.run(["pdftotext", "-layout", str(live_pdf), "-"],
                              capture_output=True, text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError) as e:
        report("WARN", f"pdftotext unavailable, text not checked ({e})")
        text = None
    if text is not None:
        flat = re.sub(r"\s+", " ", text)
        for needle in args.require:
            report("PASS" if needle in flat else "FAIL", f"PDF text contains {needle!r}")
        footer = re.search(r"CV · ([A-Z][a-z]+ \d{4})", flat)
        report("PASS" if footer else "WARN", f"PDF footer date: {footer.group(1) if footer else 'not found'}")

    # 4. Links inside the PDF.
    if not args.skip_pdf_links:
        for uri in pdf_uris(data):
            if uri.startswith("mailto:") or uri.startswith("tel:"):
                continue
            code, _, why = curl(uri)
            if 200 <= code < 400:
                report("PASS", f"PDF link {uri} -> {code}")
            elif why:
                report("WARN", f"PDF link {uri} -> {code} ({why}; check in a browser)")
            elif any(d in uri for d in BOT_WALLED):
                report("WARN", f"PDF link {uri} -> {code} (site blocks bots; check in a browser)")
            else:
                report("FAIL", f"PDF link {uri} -> {code}")
    return finish()


def finish():
    fails, warns = results.count("FAIL"), results.count("WARN")
    print(f"\n{len(results)} checks: {fails} FAIL, {warns} WARN")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
