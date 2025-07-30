import sys
import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app, render_mermaid_svg

client = TestClient(app)

def test_healthz():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@patch("main.call_llm_generate_mermaid", return_value="graph TD;A-->B;")
@patch("main.render_mermaid_svg", return_value="<svg>mock</svg>")
def test_generate_diagram(mock_svg, mock_llm):
    payload = {"description": "A to B", "diagram_type": "flowchart"}
    response = client.post("/generate_diagram", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "mermaid_code" in data
    assert "svg_image" in data

@patch("main.validate_mermaid_syntax", return_value=(True, []))
def test_validate_syntax_valid(mock_validate):
    payload = {"mermaid_code": "graph TD;A-->B;"}
    response = client.post("/validate_syntax", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_valid"] is True
    assert data["errors"] == []

@patch("main.validate_mermaid_syntax", return_value=(False, ["Syntax error"]))
def test_validate_syntax_invalid(mock_validate):
    payload = {"mermaid_code": "invalid code"}
    response = client.post("/validate_syntax", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_valid"] is False
    assert data["errors"] == ["Syntax error"]

def test_svg_sanitization_removes_script():
    malicious_svg = '''graph TD;A-->B;%%<script>alert(1)</script>'''
    # This is not valid mermaid, but we want to test the sanitizer directly
    # So we simulate the output of mmdc (SVG with a script tag)
    svg_with_script = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert("XSS")</script><rect width="100" height="100"/></svg>'
    from py_svg_hush import filter_svg
    keep_data_url_mime_types = {"image": ["jpeg", "png", "gif"]}
    sanitized = filter_svg(svg_with_script.encode(), keep_data_url_mime_types).decode()
    assert '<script>' not in sanitized
    assert 'alert("XSS")' not in sanitized
    assert '<rect' in sanitized 

def test_svg_sanitization_removes_event_attributes():
    svg_with_onclick = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" onclick="alert(1)"/></svg>'
    from py_svg_hush import filter_svg
    keep_data_url_mime_types = {"image": ["jpeg", "png", "gif"]}
    sanitized = filter_svg(svg_with_onclick.encode(), keep_data_url_mime_types).decode()
    assert 'onclick' not in sanitized
    assert '<rect' in sanitized 

def test_svg_sanitization_removes_style_tags():
    # Use the full render_mermaid_svg pipeline to test <style> tag removal
    from main import render_mermaid_svg
    svg_with_style = '<svg xmlns="http://www.w3.org/2000/svg"><style>rect{fill:url(javascript:alert(1))}</style><rect width="100" height="100"/></svg>'
    from unittest.mock import patch, MagicMock, mock_open
    # Patch subprocess.run to do nothing, filter_svg to return our SVG, and open to return the SVG string
    with patch('subprocess.run') as mock_run, \
         patch('py_svg_hush.filter_svg', return_value=svg_with_style.encode()), \
         patch('builtins.open', mock_open(read_data=svg_with_style)):
        mock_run.return_value = MagicMock(returncode=0)
        sanitized = render_mermaid_svg('irrelevant mermaid code')
        assert '<style>' not in sanitized
        assert 'javascript:' not in sanitized
        assert '<rect' in sanitized 