# Canonical profile — Vojtěch Špaček (sparesparrow)

Mirrors the live CV (October 2026, 4 pages): https://sparesparrow.github.io/sparrow-ai-tech/cv/Vojtech_Spacek_CV.pdf
When this file and the PDF disagree, the PDF wins until Vojtěch confirms otherwise. Then fix both, and the site and LinkedIn with them.

## Identity & contact
- Name: Vojtěch Špaček (handle: sparesparrow). Based in Brno, Czech Republic.
- Email (public): sparesparrow@protonmail.ch · Phone: +420 605 963 739 · Book a call: calendly.com/dallheimal
- GitHub: github.com/sparesparrow · LinkedIn: linkedin.com/in/sparesparrow · Site: sparesparrow.github.io/sparrow-ai-tech
- Also: citadela-resort.cz (client site he built) · x.com/spare23sparrow · YouTube: Czech AI-narrated audiobook of Mises' *Human Action*

## Headline
Senior C++ & Python Engineer · AI/LLM Integration (MCP) · Safety-Critical Embedded & HIL Verification
Tagline: Pragmatic Programmer, Creative Problem Solver · Cybersecurity & Linux specialist

## Summary (source for the LinkedIn About section)
Senior C++ and Python engineer working on embedded, real-time and safety-critical systems:
- aircraft onboard diagnostics at Honeywell;
- electron-microscopy detector software at Thermo Fisher Scientific;
- a TLS-inspecting proxy and firewall at Trusted Network Solutions;
- most recently, sole ownership of the hardware-in-the-loop verification suite and automated bench for a safety-certified gas furnace ignition controller (UL/CSA, ANSI Z21.20, NFPA 54).

He brings agentic-AI tooling built on the Model Context Protocol into regulated engineering workflows, and holds it to the same evidence and traceability standard as the rest of the work.

## Preferred roles (fit grid uses these)
1. **AI/LLM Developer & Integration Engineer**: agentic systems, MCP, prompt engineering, LLM integration.
2. **Test Automation / Verification Engineer**: HIL, safety-critical verification, instrument control, traceability.
3. **Software Developer**: Linux, embedded, RTOS, TCP/IP, cybersecurity, high availability, HAL & IPC, backend.

## Availability & terms
- Engagement: independent contractor (Czech IČO, B2B). Brno on-site, hybrid or remote; open to relocation.
- Work permit: EU citizen (CZ), so none is needed in the EU/EEA; eligible for a Swiss B permit.
- Languages: Czech (native), Slovak (native), English (C1), German (A1).
- Free since 10/2026 (the Resideo contract ended 09/2026). Confirm current availability with him before promising a start date.
- Rate: **not stored here** (this file is public). Look in the private Career tracker, or ask.

## Core skills
- Programming: C++17/20 and Python (senior); C# and JavaScript/TypeScript (medior); Rust and Qt/QML (working knowledge).
- Embedded: ARM, RTOS, state machines, HAL & IPC (COM/MIDL, Unix sockets), FPGA, gRPC, FlatBuffers.
- Verification & HIL: HIL benches, pyvisa/USBTMC/SCPI, CAN, Modbus, traceability, UL/CSA test evidence.
- Linux & security: Netlink, nftables, TCP/IP, TLS 1.3 inspection, Kerberos/LDAP/OCSP, Suricata, PostgreSQL.
- AI/LLM: MCP servers, agentic workflows, tool calling, RAG, prompt engineering, LLM provider APIs. Techniques: zero/few-shot, prompt caching, structured outputs, encapsulated agents, multimodal routing, multi-agent workflows with a human in the loop.
- Build & delivery: Conan, Clang cross-compilation, Docker, TeamCity, GitLab CI, Jenkins, GitHub Actions.

## Experience (newest first; titles and dates exactly as on the CV)

### Resideo (Ademco), CoolPeople contractor · 01/2026 – 09/2026
**Test Automation Engineer (Python, C#)**: HIL verification of a safety-certified two-stage gas furnace ignition controller. Sole owner of the verification test suite and of the automated bench that drives it.
- Python Arrange/Act/Assert validation pipeline of independent gates: preconditions, stimulus timing, state sequence, alarms, signal history, cross-layer consistency, timer accuracy, requirement traceability.
- Data-driven generator that expands a YAML catalogue of the full state/event/transition model into an executable test suite.
- Bench device layer with one thread per instrument on a shared monotonic clock: pyvisa/USBTMC/SCPI AC source, CAN monitoring, Modbus relay and probe I/O.
- Correlated JSONL timeline of every instrument command, signal edge and bus message, for root-cause analysis.
- Closed a critical coverage gap (stimulus windows were never measured). Fixed a long-hidden leaked USB handle that had been misreported as a hardware fault.
- Found numerous firmware and harness defects from the C/C++ sources, each with a standalone reproduction script.
- Unattended nightly bench pipeline: locking, crash recovery, result journalling, Excel evidence workbooks, bilingual HTML dashboards, Mermaid failure graphs. Report generation became dramatically faster.
- Migrated a C#/.NET WinForms serial-bus monitor into version control and made its build a single command.
- Agentic AI harness (agents, skills, prompt workflows, policy hooks, MCP servers), adopted as part of daily delivery.
- End-to-end delivery: traceability, issues, PR workflow, Conan packaging, CI, monthly client reporting.
- **Confidential boundary:** say nothing beyond these bullets. No product or firmware names, defect specifics, internal tool names or screenshots. The public case study at `/case-studies/hil-verification` is the furthest the story goes.

### Citadela Resort, freelance client project · 08/2026 – 09/2026
**Full-stack Developer (Next.js, TypeScript)**: website and booking back end for a private villa rental business near Brno, live at citadela-resort.cz.
- Bilingual CZ/EN Next.js 15 site, with translation dictionaries type-checked against each other. Single-unit booking model; inquiries go to PostgreSQL via Prisma.
- Booking.com integration without a public API: inbound iCal sync, an outbound iCal feed and affiliate deep links. Transactional booking confirmation prevents double-selling.
- NFC door access and e-scooter rental: Ed25519-signed reader requests, replay protection, fail-closed decisions, an audit log with GDPR retention.
- Brand identity (logo suite, brand book, poster). Deployed on Vercel with Neon Postgres; CI runs typecheck, tests, build and signed-reader checks.
- Repo: github.com/sparesparrow/citadela

### Thermo Fisher Scientific, Ixperta contractor · 2023 – 2024
**Software Developer (C++)**: electron-microscopy software for operating detector hardware and acquiring images.
- Server-side C++ with HALs and COM/MIDL IPC on Windows. Embedded software for FPGA-based hardware over gRPC (C++/Python on Linux).
- Backend of a C#/WPF image-processing app (COM/MIDL IPC to the HAL, graceful degradation).
- Built vscode-automation, a VS Code extension integrating TICS code-quality analysis with the OpenAI API for automated violation detection and remediation (TypeScript).
- Led GitHub Copilot best-practice sessions; presented bi-weekly sprint demos, including the final demo of the innovation sprint.

### Honeywell · 2022 – 2023
**Software Engineer II**: Onboard Maintenance System that monitors aircraft condition and diagnoses issues during flight.
- Architected DiagTest, a state-machine diagnostic test engine in C++. Job-based asynchronous orchestration with message-queue processing.
- Test-interference management, several test modes, timeouts, preconditions, aviation-standard command/response protocols.
- MonitorManager: real-time monitoring of system parameters correlated with maintenance messages. Python integration tests.
- Stack: ARM, RTOS, Clang cross-compilation, FlatBuffers, Conan, Enterprise Architect, TeamCity, GitLab CI.

### Trusted Network Solutions (Kernun Adaptive Firewall) · 2020 – 2022
**Application Developer**
- C++ HTTP/HTTPS forward proxy on Linux: TLS inspection, OCSP, Kerberos auth, LDAP lookup, CA and client-certificate management, modular daemon design.
- DNS resolution and caching, domain categorisation. Suricata and nftables integration with PostgreSQL log aggregation.
- ipmon, a C++20 Netlink daemon that keeps nftables in step with address changes. Rewrote the Perl reporter_log in C++. TypeScript config generator. Perl test framework.

### Self-employed, IT services
B2C IT support, hardware retail and security consulting. B2B CI/CD pipelines and Linux server administration.

### IBM · 2014 – 2016
**Automation Developer & IT Systems Specialist**: automation app replacing manual ticketing and server administration (Bash, PowerShell, JavaScript) with state-driven workflows; Unix/Windows production monitoring; Active Directory, VMware.

## Selected open source (all public, safe to post about)
| Project | One-liner | Link |
|---|---|---|
| MCP-Prompts | MCP server for prompt templates. Hexagonal design with memory, file and AWS storage adapters; Docker; AWS CDK/Lambda. Published on npm and Docker Hub; listed on Glama, MCP Market and AIBASE. Rust reimplementation: mcp-prompts-rs. | github.com/sparesparrow/mcp-prompts |
| MIA | Vehicle telemetry and IoT across Android (Kotlin), Raspberry Pi (FastAPI, ZeroMQ), C++ and ESP32. OBD-II digital twin, read-only vehicle safety profile, MCP modules. | github.com/sparesparrow/mia · case study on the site |
| mcp-project-orchestrator | Recognises design patterns in a request and scaffolds files from templates, with Mermaid diagrams. Listed on PulseMCP. | github.com/sparesparrow/mcp-project-orchestrator |
| hard-coder | Early agentic reasoning and planning assistant (GPT Store → Anthropic → CrewAI → Cursor). | github.com/sparesparrow/hard-coder |
| github-events | GitHub event monitoring: repo health, productivity analysis, anomaly detection. FastAPI, MCP. | github.com/sparesparrow/github-events |
| human-action | PDF-to-audiobook pipeline (Piper TTS / ElevenLabs); produced the Czech *Human Action* audiobook. | github.com/sparesparrow/human-action |
| rtp-midi | Rust low-latency MIDI, audio and LED control; Android hub (Kotlin + Rust NDK); ESP32 visualiser. | github.com/sparesparrow/rtp-midi |
| ipmon | C++20 Netlink → nftables daemon, Debian packaging with systemd hardening. | github.com/sparesparrow/ipmon |
| rust-network-mgr | Rust redesign of ipmon: atomic nftables updates, epoll, HTTP API, MCP server. On crates.io. | github.com/sparesparrow/rust-network-mgr |
| sparetools | Python tools and Conan recipes with a bundled CPython (cpy). | github.com/sparesparrow/sparetools |
| podman-desktop-extension-mcp | Podman Desktop extension that combines agent containers and routes collaboration between them. | github.com/sparesparrow/podman-desktop-extension-mcp |

Before quoting a release, version, star count or download count in a post, check it live. These numbers move.

## Education & training (exact wording; never upgrade it)
- Masaryk University, Faculty of Informatics: Computer Science coursework, **no degree awarded**.
- DeepLearning.AI / Coursera: Deep Learning Specialization (Andrew Ng), data analysis, prompt engineering, building LLM agents.
- Self-directed: Hack The Box; design patterns; Certified Ethical Hacker syllabus (**exam not taken**); *Software Engineering at Google*, *The Pragmatic Programmer*, *Clean Architecture*.
- References available on request. Never name referees without his OK.
