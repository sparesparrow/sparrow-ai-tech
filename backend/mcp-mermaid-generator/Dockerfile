FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Make scripts executable
RUN chmod +x /app/*.py 2>/dev/null || true
RUN chmod +x /app/tests/*.py 2>/dev/null || true

# Set Python path
ENV PYTHONPATH=/app

# Create test user (non-root for security)
RUN useradd -m -u 1000 testuser && chown -R testuser:testuser /app
USER testuser

# Default command
CMD ["python", "-m", "pytest", "tests/", "-v"]
