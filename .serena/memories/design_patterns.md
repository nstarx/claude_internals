# Design Patterns & Guidelines

## Architecture Patterns

### 1. Dynamic Content Loading
- **Pattern**: Load markdown content dynamically into HTML containers
- **Implementation**: 
  - HTML: `<div id="section-name"></div>` containers
  - JS: Fetch and render markdown into containers
  - Markdown: Keep content in separate .md files

### 2. Modular CSS
- **Pattern**: Split styles by concern
- **Files**:
  - `main.css` - Base styles, typography, colors
  - `components.css` - Reusable UI components
  - `navigation.css` - Navigation-specific styles
  - `artwork.css` - Visual effects and animations
  - `simulators.css` - Interactive simulation styles
  - `markdown.css` - Markdown rendering styles
  - `responsive.css` - Media queries (load last)

### 3. Modular JavaScript
- **Pattern**: Separate concerns into focused modules
- **Modules**:
  - `navigation.js` - Navigation behavior
  - `section-loader.js` - Content loading
  - `markdown-renderer.js` - Markdown processing
  - `ui-components.js` - Interactive components
  - `icons-config.js` - Icon configuration
  - Component folders for complex features

### 4. Interactive Simulations
- **Purpose**: Make math formulas engaging and understandable
- **Requirements**:
  - Fun and cool user experience
  - Visual feedback
  - Educational value
- **Implementation**: `/scripts/simulators/` directory

### 5. Formula Explanations
- **Pattern**: Double-check claims and explain formulas
- **Components**:
  - Formula display
  - Step-by-step explanation
  - Example calculations
  - Visual representations

## UI/UX Patterns

### Navigation
- Table of contents with smooth scrolling
- Active section highlighting
- Mobile-friendly hamburger menu
- Breadcrumb navigation for deep content

### Content Presentation
- Markdown-rendered content
- Syntax highlighting for code
- Collapsible sections
- Tab interfaces for related content

### Visual Design
- Modern artwork aesthetic
- Clean, readable typography
- Subtle animations
- Gradient backgrounds
- No left borders on panels (project rule)

## Data Patterns

### JSON Data Structure
- Store structured data (formulas, examples) in `/data/*.json`
- Load dynamically with JavaScript
- Render with templates

### Markdown Content
- One concept per file
- Max 600 lines per file
- Clear headings hierarchy
- Cross-reference with relative links

## File Naming Patterns
- **HTML**: `kebab-case.html`
- **CSS**: `kebab-case.css`
- **JS**: `kebab-case.js`
- **Markdown**: `Title_Case_With_Underscores.md`
- **Data**: `lowercase.json`

## Best Practices
1. **Separation of Concerns**: Never mix HTML/CSS/JS
2. **Progressive Enhancement**: Core content works without JS
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Performance**: Lazy load content, minimize HTTP requests
5. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation