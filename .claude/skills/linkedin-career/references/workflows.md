# Workflows in detail

## Contents
1. CV & site sync
2. LinkedIn profile alignment
3. Content calendar & posting
4. Job-offer triage (fit grid)
5. Applications
6. Contacts
7. Career tracker schema

---

## 1. CV & site sync
**When:** a new contract, project or skill; "is my CV up to date or downloadable"; before any batch of applications; and monthly.

1. **Check the live state:** `python3 scripts/check_cv_live.py --repo /path/to/sparrow-ai-tech`. Fix every FAIL before anything else, because a broken CV link undermines every application. The script reports WARN for LinkedIn links that answer 999 (LinkedIn blocks bots); that is expected.
2. **Content change:**
   1. Agree the new facts with Vojtěch: dates, title, 3–6 bullets, skills gained. Run the confidentiality check: is there anything a client wouldn't want public?
   2. Update `references/profile.md`.
   3. CV source → PDF. (Is the source missing? See "Known gap" in SKILL.md: rebuild it once, commit it, then edit.) Keep it to four pages, with the same section order and clickable links. Bump the footer month ("Vojtěch Špaček · CV · <Month YYYY>").
   4. Replace `public/cv/Vojtech_Spacek_CV.pdf`. Keep the filename stable, because every page links it.
   5. Update the site sections that repeat the facts: `src/pages/index.astro` (experience and projects data), and the case studies if the story changed.
   6. Build locally if possible (`npm run build`). Commit on a branch, open a PR, and after the merge re-run the check against the live site. GitHub Pages deploys from main.
   7. Hand over the LinkedIn delta (workflow 2).
3. **Consistency sweep** (monthly): compare profile.md ⇄ CV PDF text (`pdftotext`) ⇄ the homepage ⇄ the LinkedIn profile on titles, dates, employers, contact details and education wording. Report the mismatches as a table, not prose.

## 2. LinkedIn profile alignment
Section → source:
| LinkedIn section | Source in profile.md | Notes |
|---|---|---|
| Headline (220 chars) | Headline | Can append "· Open to B2B contracts" while looking |
| About (2,600 chars) | Summary + Preferred roles + Availability | Keep the first 2–3 lines strong, since they show before "see more". End with contact and calendly. |
| Experience | Experience entries | Same titles and dates. Use 3–5 bullets each, as LinkedIn rewards brevity, picking the most relevant to the target roles. Mark contracts via the "employment type" field: Contract or Freelance. |
| Projects / Featured | Selected open source + Citadela | Featured: the CV PDF, the HIL case study, mcp-prompts, citadela-resort.cz |
| Skills | Core skills | Pin the top three to the preferred roles: MCP/LLM integration, HIL/test automation, C++ |
| Education / Licenses | Education & training | No degree field for Masaryk University; list it as coursework. Coursera certificates only if he has the credential URLs. |
| Open to work | Preferred roles + Availability | Recruiters-only visibility unless he wants the public badge |

Output: a table of section → current → proposed → why. After his approval, apply the rows one at a time in the browser, or hand him paste-ready blocks.

## 3. Content calendar & posting
1. Read the tracker's **Posts** tab: what went out recently, what is drafted, what is pending.
2. Propose the next 4–8 slots, Tue–Thu between 08:00 and 10:00 Europe/Prague. Avoid days with interviews (check the calendar).
3. For each slot give: type (from writing.md), working title, source material (case study or repo URL), the hook line, and the full draft text.
4. Check facts live: versions, listings, links (open each one).
5. After approval:
   - set the tracker rows to `approved` with the exact text;
   - create the calendar events;
   - either publish at the slot through Zapier, or set up the scheduled task (channels.md).
6. After posting: store the post URL and mark the row `posted`. A week later, if he wants, note reactions and comments from the browser and draft replies to substantive comments (each reply needs approval).

## 4. Job-offer triage (fit grid)
Score each offer from −2 to +2 on each line, and give the reasoning in one short phrase.

| Criterion | +2 | 0 | −2 |
|---|---|---|---|
| Role family | AI/LLM integration, MCP, agentic; HIL/verification; C++/Linux/embedded/security | General backend, adjacent | Pure frontend, support, sales, unrelated |
| Engagement | B2B/IČO contract | Open or negotiable | Employment-only with no flexibility *(he may still want to hear about it; ask)* |
| Location | Remote, hybrid Brno, or a relocation he'd consider (CH, DE, AT, NL…) | Hybrid elsewhere in CZ | Full on-site far from Brno with no relocation support |
| Stack overlap | ≥3 core skills | 1–2 | None |
| Domain | Safety-critical, embedded, devtools, AI tooling, security | Neutral | Gambling, adtech surveillance, weapons *(ask him; don't assume)* |
| Signal quality | Named client or domain, budget, a real JD | Vague but personal | Mass mail, no role, asks for ID or payment, or the job is "crypto trading" |

- **Pursue:** total ≥ +5 and no −2 lines.
- **Ask more:** anything unclear but plausible.
- **Decline:** mostly negatives.
- Scam signs override everything. Examples: asks for money, ID or bank details up front; the recruiter's domain doesn't match the company; the role sounds too good. Flag these and don't reply.

Present the results grouped. For each offer: one-line summary, score, key reasons, and the drafted reply in the sender's language. In Gmail, apply the label and create the drafts after he approves the batch. On LinkedIn, send each reply after its own approval.

## 5. Applications
1. **Read the posting fully.** Use the browser for LinkedIn, or WebFetch for public pages. Extract the must-haves, the nice-to-haves, the form questions and the deadline.
2. **Requirement map**, one table: requirement → evidence (employer/project + bullet) → strength (strong/partial/gap).
3. **If the map is mostly gaps**, tell him honestly and ask whether to still apply.
4. **Draft** the cover note (writing.md), the form answers, and the "why us" line. Facts only from profile.md.
5. **CV:** the standard PDF. Don't make up a tailored variant; if he wants one, it comes from the CV source with only re-ordering or emphasis, never new claims.
6. **Pre-flight:** run `check_cv_live.py` (the CV attached is current) and spell-check the company's name.
7. **Submit after approval:** Easy Apply in the browser, an email draft, or a portal form. Take a snapshot as proof.
8. **Log it:** add a tracker row with today's date, status `applied` and a follow-up date 7 working days later.

## 6. Contacts
- **Answering messages:** pull the unread threads (browser), summarise each in one line, and draft replies. Send each after its approval.
- **Reconnect suggestions:** from the tracker's Contacts tab, pick people with no touch in 90+ days who are relevant to the current search (recruiters who placed him, ex-colleagues now at target companies). Give a reason for each, plus a draft.
- **Invitations:** list pending invitations with a one-line read of each (relevant, recruiter, unknown, spam-looking). Accept only the ones he approves.
- Never export contact lists, and never message people he hasn't approved.

## 7. Career tracker schema (Google Sheet "Career tracker")
**Applications** tab: `date | company | role | source (LinkedIn/email/portal/referral) | link | contact | status (lead/applied/interview/offer/rejected/withdrawn/cold) | fit score | next step | next date | notes (private: rate discussed, etc.)`

**Recruiters** tab: `date | name | agency | channel | role/client | status (new/replied/call booked/declined/cold) | last touch | next touch | thread link`

**Contacts** tab: `name | relation (ex-colleague, recruiter, client…) | company | last touch | topic | next touch`

**Posts** tab: `slot (date time CET) | type | title | text | link | status (idea/draft/approved/posted/skipped) | post URL | notes`

**Settings** tab: rate expectations, notice period and current availability. This private data never goes into the public repo or this skill.
