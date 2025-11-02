# Index.html Refactoring Plan

## Current State
- **1,615 lines** of HTML in a single file
- 14 major sections embedded directly in HTML
- Violates "no monolith" principle

## Proposed Structure

```
web/
├── index.html (shell - ~150 lines)
├── data/
│   └── sections/
│       ├── overview.html
│       ├── working-memory.html
│       ├── architecture.html
│       ├── principles.html
│       ├── patterns.html
│       ├── tools.html
│       ├── metrics.html
│       ├── without-tools.html
│       ├── antipatterns.html
│       ├── advanced.html
│       ├── integration.html
│       ├── workflows.html
│       ├── complex-scenarios.html
│       └── conclusion.html
├── scripts/
│   └── section-loader.js (new - dynamic content loader)
```

## Implementation Steps

1. **Create directory structure**
   - Create `web/data/sections/` directory

2. **Extract each section** to individual HTML files
   - Each file contains only the section content (no header/footer/nav)
   - Pure HTML fragments

3. **Create section loader**
   - JavaScript to dynamically load sections
   - Handle hash navigation
   - Lazy loading for performance

4. **Update index.html**
   - Keep: header, nav, footer, scripts
   - Remove: all section content
   - Add: section containers with data attributes

5. **Benefits**
   - Each section is ~50-200 lines (manageable)
   - Easy to edit individual sections
   - Better for Git diffs
   - Can lazy-load sections for performance
   - Follows modular architecture principle
