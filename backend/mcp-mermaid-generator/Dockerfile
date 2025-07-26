FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Always install pytest in the global environment
RUN pip install --no-cache-dir pytest

# Non-root execution (optional)
RUN useradd -ms /bin/bash appuser
USER appuser

CMD ["pytest", "tests/"]
