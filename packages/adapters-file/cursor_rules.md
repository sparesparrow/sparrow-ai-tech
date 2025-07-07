# Adapter Layer Rules

```yaml
rules:
  - "Implement port interfaces from core package"
  - "Handle all errors gracefully with proper logging"
  - "Use dependency injection for configuration"
  - "Validate inputs using zod schemas"

imports:
  - "Core types first, then external libraries"
  - "Separate config imports from business logic"

build:
  - "Use tsup with node target"
  - "Bundle adapters separately for tree-shaking"

testing:
  - "Use integration tests with real dependencies"
  - "Test error scenarios and edge cases"
  - "Use testcontainers for database tests"
```
