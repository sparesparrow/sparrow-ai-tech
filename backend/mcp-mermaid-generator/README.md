# MCP Mermaid Generator Backend

This is an agentic backend service for generating and validating Mermaid diagrams from natural language, as described in [@MermaidJS.md](../../public/articles/MermaidJS.md) and [@Towards actively reasoning LLM systems.md](../../public/articles/Towards%20actively%20reasoning%20LLM%20systems.md).

---

## 🚦 CI/CD Integration (NEW)

- Automated tests run on every push and pull request to `main` via GitHub Actions.
- Uses Python 3.11, Playwright (for SVG rendering), and pytest.
- See `.github/workflows/ci.yml` for details.
- Playwright browsers are installed in CI for full SVG rendering coverage.
- Test results are uploaded as artifacts for review.
- Reference: [Playwright Python CI Guide](https://playwright.dev/python/docs/ci-intro)

---

## 🛠️ API Contract (NEW)

### POST `/generate_diagram`
- **Request:**
  ```json
  {
    "description": "Draw a flowchart of a login process",
    "diagram_type": "flowchart"
  }
  ```
- **Response:**
  ```json
  {
    "mermaid_code": "graph TD; User-->Login; Login-->Dashboard;",
    "svg_image": "<svg>...</svg>"
  }
  ```
- **Errors:**
  - `400` if Mermaid code is invalid (missing required keywords)
  - `500` for LLM or SVG rendering errors

### POST `/validate_syntax`
- **Request:**
  ```json
  { "mermaid_code": "graph TD; A-->B;" }
  ```
- **Response:**
  ```json
  { "is_valid": true, "errors": null }
  ```
- **Invalid Example:**
  ```json
  { "is_valid": false, "errors": ["Missing required Mermaid diagram keyword (graph, sequenceDiagram, classDiagram)"] }
  ```

---

## 🔒 Security Measures (NEW)
- **Input Validation:** All user input is validated and sanitized (removes `<script>`, `<style>`, null bytes).
- **LLM Guardrails:** Prompt templates restrict LLM output to Mermaid code only. (TODO: Add intent guard LLM for advanced protection.)
- **SVG Sanitization:** SVG output is sanitized to remove scripts/styles. (TODO: Integrate DOMPurify or similar for robust sanitization.)
- **Sandboxed Rendering:** Playwright runs in a headless, ephemeral browser. (TODO: Docker sandbox for production.)
- **Environment Variables:** API keys and secrets must be set via environment variables, never hardcoded.

---

## 🧪 Running Tests (NEW)

### Locally
```bash
cd backend/mcp-mermaid-generator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install pytest pytest-asyncio
playwright install --with-deps
pytest test_main.py
```

### In CI
- Tests run automatically on push/PR to `main`.
- See GitHub Actions tab for results and logs.

---

## 🐳 Docker & Deployment (NEW)

- Build and run locally:
  ```bash
  docker build -t mcp-mermaid-generator .
  docker run -p 8000:8000 mcp-mermaid-generator
  ```
- (TODO) Add IaC/Terraform for cloud deployment.
- (TODO) Add production Docker Compose and sandboxing.

---

## 🤝 Contributors & Roadmap (NEW)
- Contributions welcome! Please open issues or pull requests.
- Roadmap:
  - [x] LLM integration for Mermaid code generation
  - [x] Playwright SVG rendering
  - [x] Input/output sanitization
  - [x] CI/CD with GitHub Actions
  - [ ] Advanced SVG sanitization (DOMPurify)
  - [ ] Intent guard LLM for prompt injection defense
  - [ ] Docker sandboxing for Playwright
  - [ ] IaC for production deployment
  - [ ] API rate limiting and monitoring

---

## References
- [public/articles/MermaidJS.md](../../public/articles/MermaidJS.md)
- [public/articles/Towards actively reasoning LLM systems.md](../../public/articles/Towards%20actively%20reasoning%20LLM%20systems.md)
- [Playwright Python CI Guide](https://playwright.dev/python/docs/ci-intro)
- [FastAPI Testing Docs](https://fastapi.tiangolo.com/em/tutorial/testing/) 