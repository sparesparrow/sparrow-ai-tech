from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess, tempfile, os, json

# optional: plug your favourite LLM here
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
app = FastAPI(title="MCP Mermaid Generator")

class DiagramRequest(BaseModel):
    mermaid_code: str

@app.post("/generate_diagram")
def generate_diagram(req: DiagramRequest):
    """Return SVG string (placeholder) – in real mode call LLM for code."""
    if not req.mermaid_code.strip():
        raise HTTPException(status_code=400, detail="Empty code")
    return {"svg": "<svg><!-- stub --></svg>"}

@app.post("/validate_syntax")
def validate_syntax(req: DiagramRequest):
    """Use mermaid-cli in a temp file to validate."""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mmd") as tmp:
        tmp.write(req.mermaid_code.encode())
        tmp.flush()
        try:
            subprocess.check_output(["mmdc","-i",tmp.name,"-o","/dev/null"],
                                    stderr=subprocess.STDOUT)
            ok=True; out=""
        except subprocess.CalledProcessError as e:
            ok=False; out=e.output.decode()
    finally:
        os.unlink(tmp.name)
    return {"valid": ok, "message": out}

# placeholder for prompt templates
@app.get("/prompt/{name}")
def prompt(name:str):
    try:
        txt = open(f"prompts/{name}.txt").read()
    except FileNotFoundError:
        raise HTTPException(404,"Prompt not found")
    return {"name":name,"template":txt}
