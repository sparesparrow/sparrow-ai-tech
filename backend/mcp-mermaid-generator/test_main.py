"""
pytest tests for MCP Mermaid Generator FastAPI backend
Run with: pytest test_main.py
"""
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from main import app
import pytest

client = TestClient(app)

@pytest.fixture
def valid_mermaid():
    return "graph TD; A-->B;"

@pytest.fixture
def invalid_mermaid():
    return "This is not a diagram."

@patch("main.generate_mermaid_code", new_callable=AsyncMock)
@patch("main.render_mermaid_svg", new_callable=AsyncMock)
def test_generate_diagram_valid(mock_svg, mock_llm, valid_mermaid):
    mock_llm.return_value = valid_mermaid
    mock_svg.return_value = "<svg>diagram</svg>"
    resp = client.post("/generate_diagram", json={
        "description": "Simple flowchart",
        "diagram_type": "flowchart"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "mermaid_code" in data and "svg_image" in data
    assert data["mermaid_code"] == valid_mermaid
    assert data["svg_image"].startswith("<svg")

@patch("main.generate_mermaid_code", new_callable=AsyncMock)
@patch("main.render_mermaid_svg", new_callable=AsyncMock)
def test_generate_diagram_invalid_mermaid(mock_svg, mock_llm, invalid_mermaid):
    mock_llm.return_value = invalid_mermaid
    mock_svg.return_value = "<svg>diagram</svg>"
    resp = client.post("/generate_diagram", json={
        "description": "nonsense",
        "diagram_type": "flowchart"
    })
    assert resp.status_code == 400
    assert "validation_errors" in resp.json()["detail"]

@patch("main.generate_mermaid_code", new_callable=AsyncMock)
@patch("main.render_mermaid_svg", new_callable=AsyncMock)
def test_generate_diagram_svg_sanitization(mock_svg, mock_llm, valid_mermaid):
    mock_llm.return_value = valid_mermaid
    mock_svg.return_value = "<svg><script>alert(1)</script>diagram</svg>"
    resp = client.post("/generate_diagram", json={
        "description": "Simple flowchart",
        "diagram_type": "flowchart"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "<script>" not in data["svg_image"]


def test_validate_syntax_valid(valid_mermaid):
    resp = client.post("/validate_syntax", json={"mermaid_code": valid_mermaid})
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_valid"] is True
    assert data["errors"] is None

def test_validate_syntax_invalid(invalid_mermaid):
    resp = client.post("/validate_syntax", json={"mermaid_code": invalid_mermaid})
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_valid"] is False
    assert data["errors"]

def test_openapi_schema():
    resp = client.get("/openapi.json")
    assert resp.status_code == 200
    assert "paths" in resp.json() 