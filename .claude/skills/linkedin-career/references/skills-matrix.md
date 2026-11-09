# Skills matrix: knowledge levels

Used on the portfolio site (Core Expertise), in the CV, and on the LinkedIn Skills section. Each level includes the ones before it.

## The scale

1. **Not familiar for now**: the concept is new to you.
2. **Informed, basic**: you've read several articles about it, watched several videos, or attended several conference talks.
3. **Informed, in detail**: you've read intensively about it: books, videos, articles and online courses of different complexity.
4. **Practice, examples and labs**: in addition to being informed, you've tried the concept or tool through examples and labs.
5. **Production, extension and maintenance**: you've extended existing technical assets and seen the pros and cons of the setup in production.
6. **Production, from scratch**: you've built a good portion of the technical assets yourself and maintained them in production.
7. **Specialist, consultant and educator**: in addition to production experience, you know the internals, pros and cons, and you've taught other engineers how to set up and use the tool properly.

## Proposed levels (pending Vojtěch's confirmation)

Evidence comes from `profile.md` and the public repositories. Levels 5 and above need production evidence, and 7 needs teaching evidence.

| Skill | Proposed level | Evidence | Open question |
|---|---|---|---|
| C++ (C++17/20) | 6 | ipmon (C++20 Netlink daemon, Debian packaging, hardened systemd unit); TNS HTTP/HTTPS proxy; Honeywell DiagTest architected | Level 7 if he has taught C++ practice to other engineers |
| Python | 6 | HIL validation pipeline and generator (sole owner); github-events; human-action; MIA FastAPI services | — |
| TypeScript / JavaScript | 5 | Citadela site and booking back end (Next.js, from scratch) and vscode-automation extension | 6 once Citadela has a longer maintenance record |
| C# | 5 | Migrated a WinForms serial monitor into version control; WPF back end extended at Thermo Fisher | — |
| Rust | 4 | rust-network-mgr (crates.io) and rtp-midi; CV says working knowledge | 5 or 6 if rust-network-mgr counts as from-scratch production |
| Qt / QML | 2 | Named on the CV, no project evidence in the repos | Confirm the level |
| Linux networking, Netlink, nftables | 6 | ipmon from scratch, in production with a hardened systemd unit | — |
| TLS inspection, Kerberos, LDAP, OCSP | 5 | Extended the TNS proxy in production | — |
| Embedded, ARM, RTOS | 5 | Honeywell onboard maintenance system, in production | — |
| gRPC, FlatBuffers | 5 | gRPC to FPGA hardware at Thermo Fisher; FlatBuffers at Honeywell | — |
| FPGA | 4 | Embedded software over gRPC for FPGA hardware | 5 if he worked on the FPGA side in production |
| HIL verification and test automation | 6 | Sole owner of the verification suite and the automated bench, in production | — |
| Instrument control (pyvisa, SCPI, CAN, Modbus) | 6 | Built the bench device layer for the HIL suite | — |
| Model Context Protocol (MCP) servers | 6 | MCP-Prompts (npm, Docker Hub); MIA MCP modules; mcp-project-orchestrator; rust-network-mgr MCP server | — |
| Agentic AI workflows | 6 | Built the agentic harness and used it in daily delivery | — |
| LLM provider APIs (OpenAI, Anthropic) | 5 | vscode-automation uses the OpenAI API in production | — |
| Prompt engineering | 4 | DeepLearning.AI and prompt-engineering courses; daily practice | — |
| RAG | 3 | Named on the CV, no build evidence | Practice level if he has built a retrieval pipeline |
| Conan packaging | 5 | Honeywell delivery; sparetools Conan recipes | — |
| CI/CD (GitHub Actions, GitLab CI, TeamCity) | 5 | Pipelines at Honeywell and Resideo; repo CI for the open-source projects | — |
| Specialist (level 7) | none proposed | Copilot best-practice sessions taught to engineers at Thermo Fisher | Does he consider himself an educator on any tool? |

## Explanation text (for the site and the CV)

> Skill levels follow a seven-step scale, and each level includes the ones before it: 1 not familiar; 2 informed, basic; 3 informed, in detail; 4 practice, with examples and labs; 5 production, extending and maintaining existing systems; 6 production, building from scratch and maintaining; 7 specialist, consulting and teaching others.
