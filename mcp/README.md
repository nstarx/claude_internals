# MCP Server Documentation

Model Context Protocol (MCP) servers provide specialized capabilities beyond native Claude Code tools.

## Available MCP Servers

- **Context7.md** - Official library documentation and framework patterns
- **Magic.md** - Modern UI component generation from 21st.dev patterns
- **Morphllm.md** - Pattern-based code editing with token optimization
- **Playwright.md** - Browser automation and E2E testing
- **Serena.md** - Semantic code understanding with project memory
- **Sequential.md** - Structured multi-step reasoning (to be created)

## Selection Guide

**Choose MCP servers based on task requirements:**

| Task Type | Recommended MCP | Alternative |
|-----------|----------------|-------------|
| UI Components | Magic | Manual coding |
| Deep Analysis | Sequential | Native reasoning |
| Symbol Operations | Serena | Grep + Edit |
| Pattern Edits | Morphllm | Individual Edits |
| Documentation | Context7 | WebSearch |
| Browser Testing | Playwright | Unit tests |

## Integration

MCP servers work best when combined:
- **Serena + Morphllm** - Semantic analysis → precise edits
- **Context7 + Magic** - Official patterns → framework-compliant components
- **Sequential + Context7** - Structured reasoning → implementation strategy

## Fallback Strategy

When MCP servers are unavailable, Claude Code uses native tools. See individual MCP documentation for fallback workflows.

## Related Documentation

- [Orchestration Mode](../modes/Orchestration.md) - Tool selection strategy
- [Decision Trees](../reference/Decision_Trees.md) - When to use which MCP
