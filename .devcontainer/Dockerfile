# [Optional] Extend the default Node.js 20 devcontainer image
FROM mcr.microsoft.com/devcontainers/node:20

# Install extra CLI tools for automation/testing
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        jq \
        curl \
        nano \
        locales \
        lsof \
        unzip \
        sudo \
        make \
        python3 \
        python3-pip \
    && locale-gen en_US.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# Install dependencies for Cypress (browsers, XVFB, fonts, etc.)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# Install poppler-utils for PDF generation and gettext for i18n support
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        poppler-utils \
        gettext \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8 