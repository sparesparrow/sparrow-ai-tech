import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict
import requests
import subprocess
import tempfile
from py_svg_hush import filter_svg
import re

app = FastAPI(title="MCP Mermaid Generator", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateDiagramRequest(BaseModel):
    description: str
    diagram_type: str

class GenerateDiagramResponse(BaseModel):
    mermaid_code: str
    svg_image: str

class ValidateSyntaxRequest(BaseModel):
    mermaid_code: str

class ValidateSyntaxResponse(BaseModel):
    is_valid: bool
    errors: list[str]

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

def call_llm_generate_mermaid(description: str, diagram_type: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable not set.")
    prompt_template_path = os.path.join(os.path.dirname(__file__), "prompt.txt")
    if os.path.exists(prompt_template_path):
        with open(prompt_template_path, "r", encoding="utf-8") as f:
            prompt_template = f.read()
        prompt = prompt_template.format(description=description, diagram_type=diagram_type)
    else:
        prompt = f"""
You are an expert in diagrams as code. Given the following description and diagram type, generate valid Mermaid code only (no explanation, no markdown code fences).\n\nDescription: {description}\nDiagram type: {diagram_type}\n"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that generates valid Mermaid code."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 512,
        "temperature": 0.2
    }
    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=30
        )
        response.raise_for_status()
        result = response.json()
        mermaid_code = result["choices"][0]["message"]["content"].strip()
        return mermaid_code
    except Exception as e:
        raise RuntimeError(f"LLM call failed: {e}")

def render_mermaid_svg(mermaid_code: str) -> str:
    """
    Renders Mermaid code to SVG using mermaid-cli (mmdc). Requires mmdc to be installed.
    Sanitizes the SVG output before returning, and removes <style> tags for extra security.
    """
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".mmd", delete=False) as mmd_file:
        mmd_file.write(mermaid_code)
        mmd_file.flush()
        svg_path = mmd_file.name.replace(".mmd", ".svg")
        try:
            result = subprocess.run([
                "mmdc",
                "-i", mmd_file.name,
                "-o", svg_path,
                "-b", "transparent"
            ], capture_output=True, text=True, timeout=20)
            if result.returncode != 0:
                raise RuntimeError(f"mmdc error: {result.stderr}")
            with open(svg_path, "r", encoding="utf-8") as svg_file:
                svg_content = svg_file.read()
            # Sanitize SVG output using py-svg-hush
            keep_data_url_mime_types = {"image": ["jpeg", "png", "gif"]}
            sanitized_svg = filter_svg(svg_content.encode(), keep_data_url_mime_types).decode()
            # Remove <style>...</style> tags (defense-in-depth)
            sanitized_svg = re.sub(r'<style[\s\S]*?</style>', '', sanitized_svg, flags=re.IGNORECASE)
            return sanitized_svg
        finally:
            try:
                os.remove(mmd_file.name)
            except Exception:
                pass
            try:
                os.remove(svg_path)
            except Exception:
                pass

def validate_mermaid_syntax(mermaid_code: str) -> (bool, list):
    """
    Validates Mermaid code by attempting to render it with mmdc. Returns (is_valid, errors).
    """
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".mmd", delete=False) as mmd_file:
        mmd_file.write(mermaid_code)
        mmd_file.flush()
        svg_path = mmd_file.name.replace(".mmd", ".svg")
        try:
            result = subprocess.run([
                "mmdc",
                "-i", mmd_file.name,
                "-o", svg_path,
                "-b", "transparent"
            ], capture_output=True, text=True, timeout=20)
            if result.returncode == 0:
                return True, []
            else:
                return False, [result.stderr.strip() or "Unknown error"]
        finally:
            try:
                os.remove(mmd_file.name)
            except Exception:
                pass
            try:
                os.remove(svg_path)
            except Exception:
                pass

@app.post("/generate_diagram", response_model=GenerateDiagramResponse)
def generate_diagram(req: GenerateDiagramRequest):
    try:
        mermaid_code = call_llm_generate_mermaid(req.description, req.diagram_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate Mermaid code: {e}")
    try:
        svg_image = render_mermaid_svg(mermaid_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to render SVG: {e}")
    return GenerateDiagramResponse(mermaid_code=mermaid_code, svg_image=svg_image)

@app.post("/validate_syntax", response_model=ValidateSyntaxResponse)
def validate_syntax(req: ValidateSyntaxRequest):
    is_valid, errors = validate_mermaid_syntax(req.mermaid_code)
    return ValidateSyntaxResponse(is_valid=is_valid, errors=errors) 