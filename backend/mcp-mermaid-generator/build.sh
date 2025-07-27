#!/bin/bash
# Local build and test script for backend

echo "🐳 Building backend Docker image..."
docker build -t mcp-mermaid-generator:latest .

echo "🧪 Running tests..."
docker run --rm mcp-mermaid-generator:latest pytest tests/ -v

echo "🚀 Starting development server..."
docker run -p 8000:8000 --rm mcp-mermaid-generator:latest python main.py
