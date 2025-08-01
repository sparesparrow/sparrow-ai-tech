# Use the official Node.js 22 LTS slim image for a secure and minimal base
FROM node:22-slim

# Install essential CLI tools, Cypress dependencies, and other utilities in a single layer
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Essential CLI tools
    git \
    jq \
    curl \
    nano \
    locales \
    sudo \
    make \
    python3 \
    python3-pip \
    # Cypress dependencies
    libgtk-3-0 \
    libnss3 \
    libasound2 \
    libxss1 \
    libxtst6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    fonts-liberation \
    libappindicator3-1 \
    xvfb \
    # Other utilities
    gettext \
    && locale-gen en_US.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set language and locale environment variables
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Set up the working directory
WORKDIR /app

# Install pnpm globally within the container
RUN npm install -g pnpm

# Copy package manifests and lockfile to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm with --frozen-lockfile for CI/CD reproducibility
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port for the development server
EXPOSE 4321

# The default command to run when the container starts
CMD ["pnpm", "run", "dev"]
