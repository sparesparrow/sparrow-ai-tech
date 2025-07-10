# MCP Mermaid Generator Backend

This is an agentic backend service for generating and validating Mermaid diagrams from natural language, as described in [@MermaidJS.md](../../public/articles/MermaidJS.md) and [@Towards actively reasoning LLM systems.md](../../public/articles/Towards%20actively%20reasoning%20LLM%20systems.md).

## Endpoints

- `POST /generate_diagram` — Generate Mermaid code and SVG from a natural language description and diagram type.
- `POST /validate_syntax` — Validate Mermaid code syntax.

## Setup

```bash
cd backend/mcp-mermaid-generator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
playwright install --with-deps
uvicorn main:app --reload
```

## Docker

```bash
docker build -t mcp-mermaid-generator .
docker run -p 8000:8000 mcp-mermaid-generator
```

## TODO
- Integrate LLM (OpenAI, Ollama, or MermaidLlama)
- Integrate prompt server or local prompt templates
- Validate and sanitize Mermaid code
- Render SVG via Playwright
- Sanitize SVG output
- Add CI/CD workflow

## References
- [public/articles/MermaidJS.md](../../public/articles/MermaidJS.md)
- [public/articles/Towards actively reasoning LLM systems.md](../../public/articles/Towards%20actively%20reasoning%20LLM%20systems.md) 