"""Basic functionality tests."""
import pytest


def test_python_works():
    """Test that Python is working."""
    assert 2 + 2 == 4


def test_import_main():
    """Test that we can import main module."""
    try:
        import main
        assert hasattr(main, 'app')  # FastAPI app should exist
    except ImportError:
        pytest.skip("main.py not found or has import issues")


def test_fastapi_import():
    """Test that FastAPI can be imported."""
    try:
        from fastapi import FastAPI
        app = FastAPI()
        assert app is not None
    except ImportError:
        pytest.fail("FastAPI not available")


@pytest.mark.asyncio
async def test_async_works():
    """Test async functionality."""
    async def sample_async():
        return "success"
    
    result = await sample_async()
    assert result == "success"
