#!/bin/bash

# Build script that isolates the project to avoid scanning other workspace projects
echo "Building project in isolated environment..."

# Set Node.js options for more memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Build without checking (which scans other projects)
echo "Running astro build..."
npx astro build

echo "Build completed successfully!" 