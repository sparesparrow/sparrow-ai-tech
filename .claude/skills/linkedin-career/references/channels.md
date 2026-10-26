# Channels: what each one can do, and its limits

Tools are deferred in most sessions. Load them with ToolSearch (`select:<name>`) before the first call. If a channel isn't connected, produce the draft anyway and tell Vojtěch in one line what connecting it would add.

## Gmail (connector `mcp__Gmail__*`)
Purpose: recruiter email, LinkedIn notification email (InMail, job alerts, "X sent you a message"), and reply drafts.

- Search: `mcp__Gmail__search_threads`, then `get_thread`. Useful queries:
  - LinkedIn mail: `from:(linkedin.com) newer_than:14d`, and more narrowly `from:(jobs-noreply@linkedin.com OR inmail-hit-reply@linkedin.com OR messages-noreply@linkedin.com)`
  - Recruiter mail, English: `newer_than:30d (job OR position OR opportunity OR contract OR "your profile" OR B2B)`
  - Recruiter mail, Czech: `newer_than:30d (pozice OR nabídka OR příležitost OR spolupráce OR projekt OR IČO)`
- Reply: `mcp__Gmail__create_draft`, with the thread id, so the draft lands in the thread. **This connector has no send tool. That's intended: he sends from Gmail himself.**
- Labels: create or apply `Career/Offers`, `Career/Applied` and `Career/Declined` so the inbox mirrors the tracker. Labelling is reversible, so it's fine without asking. Trashing or marking as spam is not: ask first.
- LinkedIn notification emails contain a preview only. To read the full message or reply in LinkedIn chat, use the browser.

## Zapier → LinkedIn (`mcp__Zapier__*`, app `LinkedInCLIAPI`)
Purpose: publish approved posts to the **personal** profile. It can't read the feed, comments or messages, and it can't schedule on its own.

First-time setup:
1. `inspect_zapier_actions` with no arguments. If LinkedIn isn't listed, run `discover_zapier_actions({app: "LinkedIn"})` and then `enable_zapier_action({selected_api: "LinkedInCLIAPI"})`.
2. `inspect_zapier_actions({selected_api: "LinkedInCLIAPI"})` lists the actions. Use the share-update action for the personal profile, not company pages.
3. If there's no connection yet, `manage_zapier_connections` gives Vojtěch a link to connect LinkedIn himself. He does that step; you never handle his password.
4. Check `connections.default`. It has to be his personal account.

Publishing:
- Inspect the action's schema with `tool_name`. Pass the approved text verbatim, plus the link (the site case study, repo, etc.) and visibility `anyone` unless he says otherwise.
- `execute_zapier_write_action`. Record the returned post URL/id in the tracker row and mark the row `posted`.
- Once a post is published, an edit means LinkedIn's UI (browser) or a deletion. Get the text right before posting.

Scheduling:
- Each approved post is a tracker row with `status=approved` and a slot, plus a Google Calendar event "LinkedIn post: <title>".
- The post can then be published in one of two ways:
  - **(a)** Vojtěch says "publish today's post" and you run Zapier for that row;
  - **(b)** a scheduled task (Claude Code `create_trigger` / Cowork scheduled task, with the Zapier connector granted) runs at each slot. It publishes only the row with that slot and `status=approved`, posts the exact stored text, and never rewrites it.

## Google Calendar / Google Drive
- Calendar: one event per approved post slot (30 min, description = post text + tracker row link), so he sees the plan next to his meetings. Use `mcp__Google_Calendar__create_event`, and `list_events` to avoid clashing with interviews.
- Drive: the **Career tracker** Google Sheet. Find it with `mcp__Google_Drive__search_files` (name "Career tracker"). If it doesn't exist, create it with the tabs and columns from `workflows.md`, and edit it through the `google-workspace` skill. It's private; never share it or copy it into the public repo.

## Browser on Vojtěch's machine: Claude in Chrome or a Playwright MCP
Purpose: whatever only the LinkedIn UI offers:
- reading the inbox and the full job posts;
- editing profile sections;
- Easy Apply;
- replying in chat;
- accepting invitations;
- reading his profile to compare it with the CV.

Before the first step, load the matching skill: `chrome-browser` for `mcp__claude-in-chrome__*`, or `built-in-browser` for the app's pane. For a Playwright MCP (`mcp__playwright__browser_*`: navigate, snapshot, click, type, file_upload), run it with his **persistent** browser profile (`--user-data-dir`), so he is already logged in.

LinkedIn restricts automation and can restrict accounts that behave like bots. These limits keep his account safe:
- **He logs in.** Never type or store his password, 2FA codes or recovery details. If you hit a login wall, CAPTCHA or "verify it's you" page, stop and hand over.
- **Human pace, small volume.** Open what the task needs, one page at a time, with no background crawling. Per session, no more than a few dozen profile or job page views, and no bulk invites, bulk messages, auto-likes or auto-comments.
- **Read with snapshots, not scraping.** Take the visible text you need; don't harvest other people's profiles into files.
- **Every submit is a checkpoint.** Before you click Send, Post, Submit application, Connect or Save on a profile section, show him what will be sent and to whom, then wait for a yes. Afterwards, confirm with a snapshot that it went through.
- **File uploads:** upload the CV from the repo copy (`public/cv/Vojtech_Spacek_CV.pdf`), or from a download of the live URL. Check the file is the current one (see `scripts/check_cv_live.py`).

Useful LinkedIn URLs (logged in):
- Messaging: `https://www.linkedin.com/messaging/`
- Job alerts and recommendations: `https://www.linkedin.com/jobs/`
- Applied jobs: `https://www.linkedin.com/my-items/saved-jobs/?cardType=APPLIED`
- His profile, edit mode: `https://www.linkedin.com/in/sparesparrow/edit/forms/...` (open the section's pencil icon from `https://www.linkedin.com/in/sparesparrow/`)
- Invitations: `https://www.linkedin.com/mynetwork/invitation-manager/`
- Post composer: the "Start a post" button on `https://www.linkedin.com/feed/`

## Operating LinkedIn from Claude on the phone
A cloud session (claude.ai/code, or the mobile app's cloud sessions) can't reach LinkedIn as him: it has no access to his login, and logging in from a datacenter IP triggers LinkedIn's checks. So the browser runs on his PC and the phone only steers it.

One-time setup on the PC:
1. Install Node.js 20+ and Google Chrome, then Claude Code (`npm i -g @anthropic-ai/claude-code`), and sign in with `claude`.
2. Clone `sparesparrow/sparrow-ai-tech` and work in that folder. Its `.mcp.json` registers the Playwright MCP (`@playwright/mcp`, pinned). It runs with a persistent profile in `.linkedin-browser-profile/`, which is git-ignored; set `LINKEDIN_BROWSER_PROFILE` to keep it elsewhere. The `linkedin-career` skill loads from `.claude/skills/` in the same folder.
3. Run `claude` once and approve the project's `playwright` server. Then ask it to open `https://www.linkedin.com/login` and **log in yourself** in the Chrome window that appears, including 2FA. The session cookie stays in the profile, so later runs start logged in.
4. Start `claude remote-control` in that folder (or use the Claude Desktop app), and leave the PC on and awake.

From the phone: open the Claude app → Code, pick the session running on the PC, and ask, e.g. "/linkedin-career check my LinkedIn inbox" or "apply the approved headline and About". Every Send, Post, Save and Submit still waits for his yes in the chat.

Alternatives that need no PC:
- **Claude in Chrome**: the browser extension in his own Chrome, driven from Claude Desktop or Claude Code on that machine. Same reach as the Playwright route.
- **Zapier → LinkedIn** (already connected): publishes approved posts from any session, including the phone. It can't read the inbox or edit the profile.
- **Taplio** or **Typefully** connectors (claude.ai → Connectors): drafts, scheduling and analytics for posts from the phone. Also posts only; no inbox and no profile edits.

Don't log in to LinkedIn from a cloud browser (hosted Playwright, Browser Use Cloud, scraping services): his credentials would leave his machine, and a login from an unknown datacenter is the usual way accounts get restricted.

## No-tool fallback
Everything still works as drafts. Put each item in its own fenced block with its target, and add a checklist of where to paste it.
