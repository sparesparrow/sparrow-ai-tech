#!/bin/bash
echo "🚀 Building Sparrow AI Tech with Cyberpunk Theme..."

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "🌐 Your enhanced cyberpunk homepage is ready!"
    echo "📁 Built files are in the 'dist' directory"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
