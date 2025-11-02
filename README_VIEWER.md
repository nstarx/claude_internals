# SuperClaude Documentation Viewer

HTML viewer for rendering SuperClaude markdown documentation.

## Local Usage

**Start a local web server:**
```bash
cd /Users/adrian/work/claude_internal
python -m http.server 8000
```

**Open in browser:**
```
http://localhost:8000/
```

## Structure

- **index.html**: HTML documentation viewer (in this directory)
- **Markdown files**: All .md files in same directory

The viewer dynamically loads and renders markdown files from the current directory.

## GitHub Pages Deployment

To deploy to GitHub Pages:

1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add documentation viewer"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch `main` / `(root)`
   - Save

3. **Access at:** `https://yourusername.github.io/repo-name/`

## Files Included

**Core Framework:**
- FLAGS.md, PRINCIPLES.md, RULES.md
- BUSINESS_SYMBOLS.md, BUSINESS_PANEL_EXAMPLES.md

**Behavioral Modes:**
- MODE_Brainstorming.md, MODE_Business_Panel.md
- MODE_Introspection.md, MODE_Orchestration.md
- MODE_Task_Management.md, MODE_Token_Efficiency.md

**MCP Servers:**
- MCP_Context7.md, MCP_Magic.md
- MCP_Morphllm.md, MCP_Playwright.md, MCP_Serena.md

## Adding New Files

1. Add markdown file to this directory
2. Update `files` object in index.html:
   ```javascript
   const files = {
       core: [...],
       modes: [...],
       mcp: [
           // Add new file
           { name: 'MCP_NewServer.md', path: 'MCP_NewServer.md', title: 'New Server MCP' }
       ]
   };
   ```
