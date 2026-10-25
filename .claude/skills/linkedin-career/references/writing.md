# Voice and templates

## Voice
Vojtěch writes like an engineer talking to engineers:
- first person, plain and concrete;
- a little dry;
- confident about what he built, honest about what he didn't.

Things to avoid:
- hype ("thrilled to announce", "game-changer", "revolutionary");
- emoji bullets;
- engagement bait ("Agree? 👇");
- walls of hashtags;
- invented metrics.

Prefer the specific mechanism over the adjective: "each instrument owned by one thread on a shared monotonic clock" beats "robust architecture". When a number isn't verifiable, use the qualitative word he chose on the CV: comprehensive, dramatically faster, numerous, critical.

## LinkedIn posts
- **Length:** 600–1,300 characters for a normal post; up to ~2,000 for a deep dive. LinkedIn cuts at ~210 characters behind "…see more", so the first two lines carry the hook. Make it a concrete problem or a surprising finding, not "I'm happy to share".
- **Shape:** hook (1–2 lines) → what the problem was → what he did, and the one non-obvious decision → what it taught → a link.
- **Links:** one per post, to his own material: a case study on sparesparrow.github.io/sparrow-ai-tech, a repo, or an npm/crates page.
- **Hashtags:** at most 3, specific ones (#MCP, #HIL, #embedded, #Rust), at the end.
- **Mentions:** tag people or companies only with his OK, and never a former client as if endorsing.

### Post types for the calendar mix
1. **Build log**: one decision from an open-source project (mcp-prompts adapters, rust-network-mgr atomic nftables updates, the MIA safety profile, Citadela's Booking.com sync without an API).
2. **Lesson learned**: a generalisable engineering lesson from client work, described without confidential detail. Example: "a 'hardware fault' that was really a leaked USB handle".
3. **AI-in-practice**: how he uses agents, skills and MCP in real delivery, with guardrails, review and traceability. This is his differentiator, so use it regularly.
4. **Release / milestone**: a new version, a listing, a new case study on the site. Verify the facts live first.
5. **Availability / open to work**: short and direct, once a month at most while he's looking. It states roles, engagement form (B2B/IČO, remote/hybrid/relocation) and how to reach him.
6. **Off-beat**: the *Human Action* audiobook, rtp-midi and LEDs, Brno. Every 4–6 weeks, to stay human.

A sensible month: 1 AI-in-practice, 1 build log, 1 lesson learned or release, and an availability post only if he's looking.

## Recruiter replies
Keep them short: 3–6 sentences. Reply in the recruiter's language. Always cover:
- thanks;
- one line on fit;
- what's needed to decide: client or domain, form (B2B/IČO or employment), location and remote split, start and length, budget;
- a next step (calendly.com/dallheimal, or a time).

Templates (adapt them; never send them verbatim):

**Interested, needs details (EN)**
> Hi {name}, thanks for reaching out. {Role} sounds close to what I do — {one specific overlap from profile.md}. I work as an independent contractor (B2B, Czech IČO), based in Brno, open to remote/hybrid. Could you share the client's domain, expected start and length, the remote split, and the budget range? Happy to talk — you can pick a slot at calendly.com/dallheimal.

**Zájem, potřebuji detaily (CZ)**
> Dobrý den {jméno}, děkuji za oslovení. Pozice {pozice} mi dává smysl — {konkrétní průnik z profile.md}. Pracuji jako OSVČ na IČO (B2B), z Brna, remote/hybrid. Můžete prosím upřesnit obor klienta, předpokládaný začátek a délku spolupráce, poměr práce z domova a rozpočet? Rád se spojím, termín si můžete vybrat na calendly.com/dallheimal.

**Polite decline (EN)**
> Hi {name}, thank you — I'll pass on this one, as {honest reason: employment-only / on-site outside Brno / stack far from my focus}. I'm most interested in AI/LLM integration (MCP, agentic workflows), HIL/verification and C++/Linux systems work, B2B. Feel free to keep me in mind for those.

**Zdvořilé odmítnutí (CZ)**
> Dobrý den {jméno}, děkuji za nabídku, tentokrát ale nevyužiji — {upřímný důvod}. Nejvíc mě zajímá integrace AI/LLM (MCP, agentní workflow), HIL/verifikace a C++/Linux systémy, ideálně B2B. Budu rád, když se ozvete s něčím takovým.

**Rate asked and unknown:** answer with a question, e.g. "What budget range does the client have in mind? I'll confirm whether it works." Or leave `[RATE?]` and flag it to Vojtěch.

## Cover note / application message
Keep it to 150–250 words. Skip "Dear Sir or Madam". Structure:
1. **Why this role**, in one line, specific to the posting.
2. **Two or three matches**: requirement → evidence (employer + what he did), taken from profile.md.
3. **One honest gap and how he'd close it** (optional, but it builds trust).
4. **Logistics**: B2B/IČO or open to their form, location and permit (EU; Swiss B eligible), availability (confirm with him first).
5. **Links**: CV PDF, plus the one most relevant case study or repo.

Form fields ("years of experience with X", "salary expectation", "degree"):
- Years: compute them from the CV dates.
- Degree: the honest wording. If the form forces yes/no, the answer is no, and the free text says "CS coursework at Masaryk University, no degree".
- Salary: ask him.

## Messages to contacts
- Mirror the thread's tone and language, keep it to 2–4 sentences, and end with one clear ask or next step.
- Reconnecting: name something specific (a shared project, their recent post or job change). Never send the generic "let's stay in touch".
- Connection-request notes are 300 characters max. Say why this person, specifically.
- Follow-ups: one nudge after 5–7 working days, and a last one after another two weeks. Then stop and mark the thread `cold`.
