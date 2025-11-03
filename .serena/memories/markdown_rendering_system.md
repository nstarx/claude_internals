# Markdown Rendering System

## Overview
The project includes a dynamic markdown rendering system that allows users to view .md files in a modal viewer without navigating away from the main page.

## Components

### 1. Markdown Renderer (`scripts/markdown-renderer.js`)
- **Purpose**: Core markdown parsing and rendering engine
- **Libraries Used**:
  - `marked.js` - Markdown parsing
  - `highlight.js` - Syntax highlighting for code blocks
  - `DOMPurify` - HTML sanitization
- **Features**:
  - Caching system using localStorage
  - Auto-rendering for elements with `data-md-source` attribute
  - Syntax highlighting
  - Copy-to-clipboard buttons on code blocks
  - Auto-linking headings

### 2. Markdown Link Handler (`scripts/markdown-link-handler.js`)
- **Purpose**: Intercepts clicks on markdown links and displays them in a modal
- **Usage**: Add `class="md-link"` and `data-md-path="path/to/file.md"` to any link
- **Features**:
  - Modal overlay viewer
  - ESC key to close
  - Click outside to close
  - Smooth animations
  - Responsive design

### 3. Markdown Viewer Styles (`styles/markdown-viewer.css`)
- **Purpose**: Beautiful modal styling for markdown viewing
- **Features**:
  - Modern gradient header
  - Smooth transitions
  - Responsive design
  - Custom scrollbar
  - Readable typography

## How to Use

### For Developers
To make a link open a markdown file in the modal viewer:

```html
<a href="#" class="md-link" data-md-path="modes/Token_Efficiency.md">
    View Token Efficiency Guide
</a>
```

### For Content
The system automatically:
1. Intercepts clicks on `.md-link` elements
2. Fetches the markdown file from the specified path
3. Renders it with syntax highlighting
4. Displays it in a beautiful modal

## Integration Points

### In HTML Files
1. Include CSS: `<link rel="stylesheet" href="./styles/markdown-viewer.css">`
2. Include JS: `<script src="./scripts/markdown-link-handler.js"></script>`
3. Ensure markdown-renderer.js is loaded first

### Current Usage
- `data/sections/conclusion.html` - "Further Reading" section links

## File Paths
- Markdown files: Relative to project root (e.g., `modes/Token_Efficiency.md`)
- Base URL configured in markdown-renderer.js: `baseUrl: '..'`

## Cache System
- Uses localStorage with version prefix: `md-cache-`
- Cache version: `1.0`
- Automatically clears on version mismatch
- Can be manually cleared: `MarkdownRenderer.clearCache()`

## Keyboard Shortcuts
- `ESC` - Close modal viewer