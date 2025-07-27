FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTEST_CACHE_DIR=/tmp/pytest_cache

# Create cache directory
RUN mkdir -p /tmp/pytest_cache && chmod 777 /tmp/pytest_cache

# Default command for running tests
CMD ["pytest", "tests/", "-v", "--tb=short"]
