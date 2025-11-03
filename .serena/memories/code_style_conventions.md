# Code Style & Conventions

## Project-Specific Guidelines (from CLAUDE.md)

### Design Principles
1. **Use only PrimeVue Icons** - No other icon libraries
2. **No Left borders on panels** - Specific UI constraint
3. **No monolith code** - Split HTML, JS, and Python across different files
4. **Modular architecture** - Keep concerns separated
5. **Modern artwork website look and feel** - Visual design priority
6. **Readability is top priority!** - Documentation must be highly readable

### Technical Requirements
- **GitHub Pages deployment** - All HTML pages must be static
- **Markdown rendering** - All .md files rendered dynamically inside HTML
- **Interactive simulations** - Sections for simulating math formulas in a fun/cool way
- **Formula explanations** - Sections explaining formulas, claims, numbers, etc.

### File Organization
- **HTML files**: Root and `/web` directory
- **Styles**: `/styles` directory (modular CSS files)
- **Scripts**: `/scripts` directory (modular JS files)
- **Content**: Markdown files in organized directories (`core/`, `modes/`, `mcp/`, etc.)
- **Data**: JSON files in `/data` directory

## Naming Conventions
- **CSS files**: lowercase with hyphens (e.g., `fix-desktop-nav.css`)
- **JS files**: lowercase with hyphens (e.g., `section-loader.js`)
- **Markdown files**: TitleCase with underscores (e.g., `Strategic_Context_01.md`)

## Code Organization
- Separate concerns: HTML (structure), CSS (presentation), JS (behavior)
- No inline styles or scripts
- Link external stylesheets in order: base → components → layout → responsive