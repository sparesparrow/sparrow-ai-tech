"""Main application module."""

from fastapi import FastAPI

app = FastAPI(title="Mermaid Generator API", version="1.0.0")


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Mermaid Generator API is running"}


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
