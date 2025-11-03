# Directory Structure

```
claude_internal/
├── index.html                    # Main entry point
├── CLAUDE.md                     # Project-specific instructions
├── README.md                     # Project documentation
├── GLOSSARY.md                   # Term reference
│
├── core/                         # Core Framework
│   ├── PRINCIPLES.md
│   ├── RULES.md
│   └── FLAGS.md
│
├── modes/                        # Behavioral Modes
│   ├── Brainstorming.md
│   ├── Business_Panel.md
│   ├── Introspection.md
│   ├── Orchestration.md
│   ├── Task_Management.md
│   └── Token_Efficiency.md
│
├── mcp/                          # MCP Server Documentation
│   ├── Context7.md
│   ├── Magic.md
│   ├── Morphllm.md
│   ├── Playwright.md
│   ├── Serena.md
│   └── Sequential.md
│
├── business/                     # Business Analysis
│   ├── Panel_Overview.md
│   ├── Panel_Examples.md
│   ├── Panel_Symbols.md
│   └── Expert_Frameworks.md
│
├── guides/                       # User Guides
│   ├── Claude_Code_Guide.md
│   ├── Strategic_Context_01.md
│   ├── Strategic_Context_02.md
│   └── chunks/                   # Complex scenario guides
│
├── reference/                    # Quick Reference
│   ├── Quick_Reference.md
│   ├── Command_Reference.md
│   ├── Symbol_Reference.md
│   ├── Decision_Trees.md
│   ├── Mode_Selection_Guide.md
│   └── MCP_Selection_Guide.md
│
├── examples/                     # Real-World Examples
│   ├── Workflow_Examples.md
│   ├── Integration_Patterns.md
│   └── Use_Cases.md
│
├── styles/                       # CSS Modules
│   ├── main.css                  # Base styles
│   ├── components.css            # Component styles
│   ├── navigation.css            # Navigation styles
│   ├── artwork.css               # Visual effects
│   ├── simulators.css            # Simulation styles
│   ├── markdown.css              # Markdown rendering
│   └── responsive.css            # Media queries
│
├── scripts/                      # JavaScript Modules
│   ├── navigation.js             # Navigation logic
│   ├── section-loader.js         # Dynamic content loading
│   ├── markdown-renderer.js      # Markdown processing
│   ├── ui-components.js          # UI interactions
│   ├── icons-config.js           # Icon configuration
│   ├── art-effects.js            # Visual effects
│   ├── reading-enhancements.js   # Reading features
│   ├── simulators/               # Simulation components
│   └── components/               # Reusable components
│
├── data/                         # JSON Data
│   └── formulas.json             # Formula data
│
├── web/                          # Additional web assets
│   ├── index.html
│   ├── complex_scenarios.html
│   ├── formulas.html
│   └── data/
│
└── archive/                      # Deprecated content
    └── old_structure/
```

## Key Patterns
- **Content**: Markdown files in topic directories
- **Presentation**: HTML files at root or `/web`
- **Styles**: Modular CSS in `/styles`
- **Behavior**: Modular JS in `/scripts`
- **Data**: JSON in `/data`