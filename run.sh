#!/bin/bash

# SuperClaude Framework - Local Development Server
# Starts a simple HTTP server to preview the site locally

PORT=${1:-8080}

echo "Starting local development server..."
echo "Open http://localhost:$PORT in your browser"
echo "Press Ctrl+C to stop"
echo ""

# Try Python 3 first, then Python 2
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
else
    echo "Error: Python is required to run the local server"
    exit 1
fi
