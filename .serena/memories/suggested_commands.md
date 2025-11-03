# Suggested Commands

## Development Commands

### Local Development
No build process required - open HTML files directly in browser:
```bash
# Open main documentation viewer
open index.html

# Or use Python's HTTP server for local development
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Git Operations
```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub (triggers GitHub Pages deployment)
git push origin main
```

### File Operations
```bash
# List directory contents
ls -la

# Find markdown files
find . -name "*.md" -type f

# Search in files
grep -r "pattern" .

# View file
cat filename.md
```

## GitHub Pages Deployment
- **Auto-deploy**: Pushing to `main` branch automatically deploys to GitHub Pages
- **URL**: https://nstarx.github.io/claude_internals/
- **No build step**: Direct deployment of static files
- **Important**: Ensure `.nojekyll` file exists in root to disable Jekyll processing

## Testing
```bash
# Test all links in documentation
# (Manual review or use link checker tool)

# Validate HTML
# (Use W3C validator or similar)

# Check markdown rendering
# (Open in browser and verify)
```

## Utility Commands (macOS)
```bash
# List files
ls -la

# Change directory
cd directory_name

# Print working directory
pwd

# View file contents
cat filename

# Search in files
grep -r "search term" .

# Find files
find . -name "pattern"
```