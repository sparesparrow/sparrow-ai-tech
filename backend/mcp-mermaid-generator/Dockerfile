FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Install pytest-asyncio for async test support
RUN pip install --no-cache-dir pytest-asyncio

# Set a writable cache directory for pytest
ENV PYTEST_CACHE_DIR=/tmp/pytest_cache

# For testing, run as root to avoid permission issues (switch to non-root for prod)
USER root
RUN mkdir -p /tmp/pytest_cache && chmod 777 /tmp/pytest_cache

CMD ["pytest", "tests/", "-v", "--cache-clear"]
