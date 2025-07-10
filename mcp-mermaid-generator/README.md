# MCP Mermaid Generator

A FastAPI backend for agentic diagram generation, as described in the sparrow-ai-tech architecture. Converts natural language to Mermaid diagrams and SVGs using LLMs and Playwright.

![CI](https://github.com/sparesparrow/sparrow-ai-tech/actions/workflows/mcp-mermaid-generator-ci.yml/badge.svg)

## Endpoints

- `POST /generate_diagram` — Generate Mermaid code and SVG from a description and diagram type
- `POST /validate_syntax` — Validate Mermaid code syntax
- `GET /healthz` — Health check

## Running Locally

```bash
pip install -r requirements.txt
# Install mermaid-cli globally if not using Docker:
npm install -g @mermaid-js/mermaid-cli
uvicorn main:app --reload
```

## Running with Docker

```bash
docker build -t mcp-mermaid-generator .
docker run -p 8000:8000 mcp-mermaid-generator
```

## Running Tests

```bash
pip install -r requirements.txt
pytest tests/
```

- Tests use FastAPI's TestClient and mock LLM/mmdc calls for reliability.
- Tests are run automatically in CI (see below).

## CI/CD Pipeline

- Automated with [GitHub Actions](.github/workflows/mcp-mermaid-generator-ci.yml)
- On every push or PR to `main`:
  - Installs Python, Node.js, and mermaid-cli
  - Installs dependencies and runs backend tests
  - Builds the Docker image and verifies mmdc inside the container
- Status: ![CI](https://github.com/sparesparrow/sparrow-ai-tech/actions/workflows/mcp-mermaid-generator-ci.yml/badge.svg)

## TODO
- Integrate LLM (OpenAI, Ollama, etc.)
- Integrate prompt server or local prompt templates
- Validate and sanitize Mermaid code
- Render SVG via Playwright or mermaid-cli
- Sanitize SVG output
- Add CI/CD workflow for build, test, deploy
- Document API contract and security measures 

## Security and SVG Sanitization

This backend uses [py-svg-hush](https://github.com/jams2/py-svg-hush) to sanitize all SVG output before returning it to clients. The sanitization pipeline removes:
- `<script>` tags
- Event handler attributes (e.g., `onclick`)
- `javascript:` URLs in attributes or styles
- `<style>` tags (via post-processing)

This defense-in-depth approach ensures robust protection against SVG-based XSS and injection attacks. All user-supplied or LLM-generated SVG is sanitized before being returned.

## Testing Strategy and Mocking

All tests are fully isolated from the file system and external binaries using Python's `unittest.mock` library:
- `mock_open` is used to patch `builtins.open` for file reads/writes in tests, as recommended in [modern Python testing guides](https://smhk.net/note/2024/04/python-mock-reading-and-writing-files/) and the [Python docs](https://docs.python.org/3/library/unittest.mock.html).
- `subprocess.run` and `py_svg_hush.filter_svg` are patched in tests to avoid running real binaries or sanitizers, ensuring tests are fast and reliable.
- All critical XSS and SVG-based attack vectors are covered by automated tests in `tests/test_api.py`.

## API Security Model

- All input is validated and sanitized before processing.
- SVG output is sanitized as described above.
- Endpoints are tested for common attack vectors and edge cases.

## Contributor Guidance: Adding New Tests

- Use `unittest.mock.patch` and `mock_open` to isolate file and process dependencies in tests.
- See `test_svg_sanitization_removes_style_tags` in `tests/test_api.py` for an example of patching multiple dependencies.
- Ensure new tests do not depend on the file system or external binaries for maximum reliability.

--- 