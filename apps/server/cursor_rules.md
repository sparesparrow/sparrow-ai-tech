# MCP Server Rules

```yaml
rules:
  - "Follow MCP protocol specifications strictly"
  - "Use latest @modelcontextprotocol/sdk patterns"
  - "Implement proper error handling and validation"
  - "Support both stdio and SSE transports"

imports:
  - "MCP SDK imports first"
  - "Core domain imports second"
  - "Adapter imports last"

debugging:
  - "Use MCP Inspector for testing"
  - "Log all protocol interactions in debug mode"
  - "Validate schemas on every request"

module:
  - "Export ESM modules with proper type definitions"
  - "Support both named and default exports"
```
