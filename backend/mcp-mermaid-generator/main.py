from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

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

@app.post("/generate_diagram", response_model=GenerateDiagramResponse)
def generate_diagram(req: GenerateDiagramRequest):
    # TODO: Integrate LLM, prompt server, validation, Playwright rendering
    return GenerateDiagramResponse(
        mermaid_code="graph TD; A-->B; B-->C;",
        svg_image="<svg><!-- placeholder --></svg>"
    )

@app.post("/validate_syntax", response_model=ValidateSyntaxResponse)
def validate_syntax(req: ValidateSyntaxRequest):
    # TODO: Implement real Mermaid syntax validation
    if "graph" in req.mermaid_code:
        return ValidateSyntaxResponse(is_valid=True)
    return ValidateSyntaxResponse(is_valid=False, errors=["Invalid Mermaid code"]) 