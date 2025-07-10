from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import openai
import os
import asyncio
import re
from playwright.async_api import async_playwright

app = FastAPI(
    title="MCP Mermaid Generator",
    description="Agentic backend for generating and validating Mermaid diagrams from natural language, per @MermaidJS.md and @Towards actively reasoning LLM systems.md.",
    version="0.1.0"
)

class GenerateDiagramRequest(BaseModel):
    description: str
    diagram_type: str  # e.g., 'flowchart', 'sequence', 'class'

class GenerateDiagramResponse(BaseModel):
    mermaid_code: str
    svg_image: str

class ValidateSyntaxRequest(BaseModel):
    mermaid_code: str

class ValidateSyntaxResponse(BaseModel):
    is_valid: bool
    errors: Optional[List[str]] = None

MERMAID_CDN = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"

async def render_mermaid_svg(mermaid_code: str) -> str:
    html_template = f"""
    <html>
    <head>
        <script src=\"{MERMAID_CDN}\"></script>
    </head>
    <body>
        <div id=\"container\"></div>
        <script>
            mermaid.initialize({{ startOnLoad: false }});
            mermaid.render('theGraph', `{mermaid_code.replace('`', '\\`')}`,
                (svgCode) => {{
                    document.getElementById('container').innerHTML = svgCode;
                }});
        </script>
    </body>
    </html>
    """
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_content(html_template, wait_until="networkidle")
            # Wait for SVG to be rendered
            await page.wait_for_selector("svg")
            svg = await page.eval_on_selector("svg", "el => el.outerHTML")
            await browser.close()
            return svg
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SVG rendering error: {str(e)}")

def sanitize_svg(svg: str) -> str:
    # Basic sanitization: remove script/style tags and null bytes
    svg = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', svg, flags=re.DOTALL | re.IGNORECASE)
    svg = svg.replace('\x00', '')
    # TODO: Use DOMPurify or similar for robust SVG sanitization
    return svg.strip()

def get_prompt_template(diagram_type: str) -> str:
    # Placeholder for prompt server integration
    # In production, fetch from a prompt server or version-controlled repo
    return f"""
You are an expert in creating {diagram_type} diagrams using Mermaid.js syntax.
Given a natural language description, generate the corresponding Mermaid code block (no explanation, just the code).
"""

async def generate_mermaid_code(description: str, diagram_type: str) -> str:
    prompt = get_prompt_template(diagram_type) + f"\nDescription: {description}\nMermaid code:"
    try:
        response = await openai.ChatCompletion.acreate(
            model=os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
            messages=[{"role": "system", "content": prompt}],
            max_tokens=512,
            temperature=0.2,
        )
        # Extract code from response
        content = response.choices[0].message["content"]
        # Try to extract code block if present
        if '```mermaid' in content:
            code = content.split('```mermaid')[1].split('```')[0].strip()
            return code
        return content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")

def sanitize_mermaid_code(code: str) -> str:
    # Basic sanitization: remove script/style tags and dangerous characters
    code = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', code, flags=re.DOTALL | re.IGNORECASE)
    code = code.replace('\x00', '')
    # TODO: Use a robust sanitizer for production
    return code.strip()

def is_valid_mermaid_code(code: str) -> (bool, list):
    # Placeholder: check for basic Mermaid diagram keywords
    valid_keywords = ["graph", "sequenceDiagram", "classDiagram"]
    if any(kw in code for kw in valid_keywords):
        return True, []
    return False, ["Missing required Mermaid diagram keyword (graph, sequenceDiagram, classDiagram)"]

@app.post("/generate_diagram", response_model=GenerateDiagramResponse)
async def generate_diagram(req: GenerateDiagramRequest, background_tasks: BackgroundTasks):
    # Integrate LLM and prompt template
    mermaid_code = await generate_mermaid_code(req.description, req.diagram_type)
    mermaid_code = sanitize_mermaid_code(mermaid_code)
    is_valid, errors = is_valid_mermaid_code(mermaid_code)
    if not is_valid:
        raise HTTPException(status_code=400, detail={"validation_errors": errors})
    # Render SVG (Playwright) and sanitize SVG output
    svg_image = await render_mermaid_svg(mermaid_code)
    svg_image = sanitize_svg(svg_image)
    return GenerateDiagramResponse(
        mermaid_code=mermaid_code,
        svg_image=svg_image
    )

@app.post("/validate_syntax", response_model=ValidateSyntaxResponse)
def validate_syntax(req: ValidateSyntaxRequest):
    code = sanitize_mermaid_code(req.mermaid_code)
    is_valid, errors = is_valid_mermaid_code(code)
    return ValidateSyntaxResponse(is_valid=is_valid, errors=errors if not is_valid else None) 