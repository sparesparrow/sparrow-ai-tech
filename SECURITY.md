# MCP Prompts Security Policy

## Key Risks

1. Prompt Injection – Always sanitize/validate all prompt input, use strict
   variable whitelists and types.
2. Tool Poisoning – Manually audit all tool descriptions, params, and
   operational metadata. Validate at registration and use.
3. Privilege Abuse – Enforce least privilege in all adapters/tools; do not
   overgrant.
4. Token Storage – Use OS-level secure storage for all secrets and tokens (never
   plaintext, never environment if avoidable).
5. Resource Isolation – Enforce clear user/app/model/tool separation.
6. Cross-Server & Adapter Attacks – Validate all inbound MCP connections and do
   not expose control tools without proper auth.
