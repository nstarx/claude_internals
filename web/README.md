# Web Documentation Viewers

HTML-based viewers for browsing SuperClaude framework documentation.

## Contents

### HTML Files
- **index.html** - Main documentation viewer
- **complex_scenarios.html** - Specialized viewer for complex scenarios guide

### Assets
- **styles/main.css** - Shared stylesheet for all viewers
- **scripts/navigation.js** - Navigation and interactive features

## Features

- **Markdown Rendering** - Dynamic loading and rendering of .md files
- **Navigation** - Table of contents and cross-document linking
- **Search** - Find content across documentation (planned)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** - Theme switching (planned)

## Local Development

```bash
# Serve locally with Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Open browser to http://localhost:8000/web/
```

## GitHub Pages Deployment

These viewers are designed for GitHub Pages deployment:
- Set repo pages to serve from `/web` directory
- Access at: `https://[username].github.io/[repo]/`

## Architecture

**Modular Design:**
- HTML files load external CSS and JS
- Markdown content fetched dynamically
- Progressive enhancement for better performance
- Fallback for static viewing if JS disabled

## Maintenance

When adding new documentation:
1. Update navigation in `scripts/navigation.js`
2. Ensure markdown files are properly formatted
3. Test rendering locally before committing
4. Validate all internal links

## Related Documentation

- [Main README](../README.md) - Project overview
- [Guides](../guides/) - Full documentation set
- Project CLAUDE.md - Viewer requirements and design guidelines
