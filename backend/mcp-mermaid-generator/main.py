"""Main FastAPI application."""
from fastapi import FastAPI

app = FastAPI(
    title="MCP Mermaid Generator",
    description="Backend service for generating Mermaid diagrams",
    version="1.0.0"
)

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "MCP Mermaid Generator is running"}

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "service": "mcp-mermaid-generator"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
