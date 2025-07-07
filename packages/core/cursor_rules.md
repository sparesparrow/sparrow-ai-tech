# Core Domain Rules

```yaml
rules:
  - "Use pure functions and immutable data structures"
  - "No external dependencies except for type definitions"
  - "All exports must be properly typed with zod schemas"
  - "Prefer composition over inheritance"

imports:
  - "Group by: external, internal, types"
  - "Use relative imports for local modules"

testing:
  - "Use vitest for unit tests"
  - "Achieve 100% test coverage for domain logic"
  - "Mock all external dependencies"

formatting:
  - "Use prettier with 2-space indentation"
  - "Trailing commas always"
  - "Single quotes for strings"
```
