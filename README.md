# SuperClaude Framework

A comprehensive framework for enhancing Claude Code with advanced behavioral modes, MCP server integrations, and business analysis capabilities.

**Live Documentation**: https://nstarx.github.io/claude_internals/

---

## 📁 Directory Structure

```
claude_internal/
├── README.md                    # This file
├── CLAUDE.md                    # Project-specific instructions
├── GLOSSARY.md                  # Comprehensive term reference
├── REFACTOR_PLAN.md             # Refactoring strategy document
├── REFACTOR_PROGRESS.md         # Progress tracking
│
├── core/                        # Core Framework
│   ├── README.md
│   ├── PRINCIPLES.md            # Engineering principles
│   ├── RULES.md                 # Behavioral rules
│   └── FLAGS.md                 # Command flags
│
├── modes/                       # Behavioral Modes
│   ├── README.md
│   ├── Brainstorming.md         # Creative ideation mode
│   ├── Business_Panel.md        # Business analysis mode
│   ├── Introspection.md         # Self-reflection mode
│   ├── Orchestration.md         # Multi-agent coordination
│   ├── Task_Management.md       # Task planning & execution
│   └── Token_Efficiency.md      # Context optimization
│
├── mcp/                         # MCP Server Documentation
│   ├── README.md
│   ├── Context7.md              # Library documentation lookup
│   ├── Magic.md                 # Advanced AI capabilities
│   ├── Morphllm.md              # LLM transformation
│   ├── Playwright.md            # Browser automation
│   ├── Serena.md                # Project memory & context
│   └── Sequential.md            # Step-by-step reasoning
│
├── business/                    # Business Analysis Features
│   ├── README.md
│   ├── Panel_Overview.md        # Business panel architecture
│   ├── Panel_Examples.md        # Usage examples
│   ├── Panel_Symbols.md         # Symbol system
│   └── Expert_Frameworks.md     # Expert profiles & frameworks
│
├── guides/                      # User Guides
│   ├── README.md
│   ├── Claude_Code_Guide.md     # Complete Claude Code guide
│   ├── Strategic_Context_01.md  # Fundamentals & Architecture
│   ├── Strategic_Context_02.md  # Advanced Patterns
│   └── chunks/                  # Complex scenario guides (5 parts)
│       ├── Complex_Scenarios_01.md
│       ├── Complex_Scenarios_02.md
│       ├── Complex_Scenarios_03.md
│       ├── Complex_Scenarios_04.md
│       └── Complex_Scenarios_05.md
│
├── reference/                   # Quick Reference Materials
│   ├── README.md
│   ├── Quick_Reference.md       # One-page cheat sheet
│   ├── Command_Reference.md     # All slash commands
│   ├── Symbol_Reference.md      # Consolidated symbols
│   ├── Decision_Trees.md        # When to use what
│   ├── Mode_Selection_Guide.md  # Mode selection framework
│   └── MCP_Selection_Guide.md   # MCP selection framework
│
├── examples/                    # Real-World Examples
│   ├── README.md
│   ├── Workflow_Examples.md     # 12 comprehensive workflows
│   ├── Integration_Patterns.md  # Mode & MCP combinations
│   └── Use_Cases.md             # 16 scenario-based examples
│
├── web/                         # Web Viewers & Assets
│   ├── README.md
│   ├── index.html               # Main documentation viewer
│   ├── complex_scenarios.html   # Scenarios viewer
│   ├── styles/                  # CSS files
│   │   ├── main.css
│   │   ├── components.css
│   │   ├── navigation.css
│   │   └── responsive.css
│   └── scripts/                 # JavaScript files
│       ├── navigation.js
│       ├── markdown-loader.js
│       ├── ui-components.js
│       └── icons-config.js
│
└── archive/                     # Deprecated Content
    └── old_structure/           # Original pre-refactor files
```

---

## 🚀 Quick Start

### Essential Reading

1. **[GLOSSARY.md](GLOSSARY.md)** - Start here to understand key terminology
2. **[Quick Reference](reference/Quick_Reference.md)** - One-page framework cheat sheet
3. **[Core Principles](core/PRINCIPLES.md)** - Engineering principles & philosophy

### For Specific Use Cases

- **New to Claude Code?** → [Claude Code Guide](guides/Claude_Code_Guide.md)
- **Want to analyze business problems?** → [Business Panel Overview](business/Panel_Overview.md)
- **Need to choose a mode?** → [Mode Selection Guide](reference/Mode_Selection_Guide.md)
- **Need to choose an MCP?** → [MCP Selection Guide](reference/MCP_Selection_Guide.md)
- **Looking for examples?** → [Examples Directory](examples/)

---

## 📚 Documentation Index

### Core Framework
- [Engineering Principles](core/PRINCIPLES.md)
- [Behavioral Rules](core/RULES.md)
- [Command Flags](core/FLAGS.md)

### Behavioral Modes
- [Brainstorming Mode](modes/Brainstorming.md) - Creative problem solving
- [Business Panel Mode](modes/Business_Panel.md) - Expert business analysis
- [Introspection Mode](modes/Introspection.md) - Self-reflection & improvement
- [Orchestration Mode](modes/Orchestration.md) - Multi-agent coordination
- [Task Management Mode](modes/Task_Management.md) - Structured task execution
- [Token Efficiency Mode](modes/Token_Efficiency.md) - Context optimization

### MCP Servers
- [Context7](mcp/Context7.md) - Library documentation lookup
- [Magic](mcp/Magic.md) - Advanced AI capabilities
- [Morphllm](mcp/Morphllm.md) - LLM transformation
- [Playwright](mcp/Playwright.md) - Browser automation
- [Serena](mcp/Serena.md) - Project memory & symbolic operations
- [Sequential Thinking](mcp/Sequential.md) - Chain-of-thought reasoning

### Comprehensive Guides
- [Claude Code Guide](guides/Claude_Code_Guide.md) - Complete reference
- [Strategic Context Management (Part 1)](guides/Strategic_Context_01.md) - Fundamentals
- [Strategic Context Management (Part 2)](guides/Strategic_Context_02.md) - Advanced patterns
- [Complex Scenarios (5 parts)](guides/chunks/) - Session context, memory management, workflows

### Quick Reference
- [Quick Reference](reference/Quick_Reference.md) - One-page cheat sheet
- [Command Reference](reference/Command_Reference.md) - All slash commands
- [Symbol Reference](reference/Symbol_Reference.md) - Complete symbol system
- [Decision Trees](reference/Decision_Trees.md) - Selection frameworks

### Examples & Patterns
- [Workflow Examples](examples/Workflow_Examples.md) - 12 detailed workflows
- [Integration Patterns](examples/Integration_Patterns.md) - Mode & MCP combinations
- [Use Cases](examples/Use_Cases.md) - 16 real-world scenarios

---

## 🎯 Key Features

### Behavioral Modes
Specialized operating modes that adapt Claude's behavior for specific tasks:
- **Brainstorming** - Creative ideation and problem exploration
- **Business Panel** - Multi-expert business analysis framework
- **Orchestration** - Coordinate multiple agents and complex workflows
- **Token Efficiency** - Optimize context window usage

### MCP Integration
Leverage Model Context Protocol servers for enhanced capabilities:
- **Serena** - Symbolic code operations & project memory
- **Sequential Thinking** - Chain-of-thought reasoning
- **Context7** - Up-to-date library documentation
- **Playwright** - Browser automation & web testing

### Business Analysis
Expert panel system with 10 specialized business experts:
- Strategic planning and market analysis
- Financial modeling and operations
- Technology and innovation strategy
- Comprehensive multi-perspective analysis

---

## 📖 How to Navigate

### By Experience Level

**Beginner**:
1. [GLOSSARY.md](GLOSSARY.md) → [Quick Reference](reference/Quick_Reference.md) → [Claude Code Guide](guides/Claude_Code_Guide.md)

**Intermediate**:
1. [Mode Selection Guide](reference/Mode_Selection_Guide.md) → [Examples](examples/) → Specific mode docs

**Advanced**:
1. [Strategic Context Management](guides/Strategic_Context_01.md) → [Complex Scenarios](guides/chunks/) → [Integration Patterns](examples/Integration_Patterns.md)

### By Task Type

**Coding Tasks**: [Task Management Mode](modes/Task_Management.md) + [Serena MCP](mcp/Serena.md)

**Business Analysis**: [Business Panel Mode](modes/Business_Panel.md) + [Business Examples](business/Panel_Examples.md)

**Research & Planning**: [Brainstorming Mode](modes/Brainstorming.md) + [Sequential MCP](mcp/Sequential.md)

**Debugging**: [Introspection Mode](modes/Introspection.md) + [Decision Trees](reference/Decision_Trees.md)

---

## 🔧 Token Optimization

All documentation is optimized for efficient context loading:
- **Single file max**: 600 lines
- **Chunk target**: 10-20K tokens each
- **Session budget**: <50K tokens (leaves 25% buffer)
- **Large files**: Automatically chunked with navigation

See [Token Efficiency Mode](modes/Token_Efficiency.md) for strategies.

---

## 📊 Project Status

- **Phase 1-6**: ✅ Complete (Directory structure, organization, chunking, reference materials)
- **Phase 7**: ✅ Complete (Web assets modularization)
- **Phase 8**: ✅ Complete (Cleanup, validation, documentation)
- **Total Progress**: 100% (14/14 sessions complete)

See [REFACTOR_PROGRESS.md](REFACTOR_PROGRESS.md) for detailed progress tracking.

---

## 🤝 Contributing

This framework is designed to be extensible:
1. New modes → Add to `modes/` directory
2. New MCP docs → Add to `mcp/` directory
3. New examples → Add to `examples/` directory
4. Update `GLOSSARY.md` with new terms
5. Keep files ≤600 lines (chunk if needed)

---

## 📄 Migration Guide

If you're coming from the old flat structure, see [MIGRATION.md](MIGRATION.md) for:
- File location mapping
- Updated @reference paths
- Breaking changes (if any)
- Rollback procedures

---

## 📝 License

Part of the SuperClaude Framework for Claude Code enhancement.

---

## 🔗 Links

- **Live Documentation**: https://nstarx.github.io/claude_internals/
- **Refactoring Plan**: [REFACTOR_PLAN.md](REFACTOR_PLAN.md)
- **Progress Tracking**: [REFACTOR_PROGRESS.md](REFACTOR_PROGRESS.md)
- **Glossary**: [GLOSSARY.md](GLOSSARY.md)

---

**Last Updated**: 2025-11-02
**Version**: 2.0 (Post-Refactor)
**Status**: Production Ready
