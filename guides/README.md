# User Guides

Comprehensive guides and tutorials for using the SuperClaude framework.

## Available Guides

- **Claude_Code_Guide.md** - Complete Claude Code usage guide
- **Strategic_Context_Management.md** - Context window optimization strategies (chunked into 2 parts)
- **chunks/** - Chunked versions of large guides for efficient loading

## Chunked Content

Large guides are split into manageable chunks (≤600 lines each) for efficient context window usage:

### Complex Scenarios Series (5 parts)
1. **Complex_Scenarios_01.md** - Session Context Patterns
2. **Complex_Scenarios_02.md** - Memory Management Strategies
3. **Complex_Scenarios_03.md** - Multi-Agent Coordination
4. **Complex_Scenarios_04.md** - Advanced Workflows
5. **Complex_Scenarios_05.md** - Edge Cases & Troubleshooting

### Strategic Context Series (2 parts)
1. **Strategic_Context_01.md** - Fundamentals & Architecture
2. **Strategic_Context_02.md** - Advanced Patterns & Examples

## Loading Strategy

**Targeted Loading** - Load only relevant chunks for specific tasks
```
Need memory strategies? → Load Complex_Scenarios_02.md
Need multi-agent patterns? → Load Complex_Scenarios_03.md
```

**Sequential Loading** - For comprehensive understanding
```
Load chunks 1→2→3 progressively as needed
```

**Parallel Loading** - Multiple independent chunks in different sessions
```
Session A: Complex_Scenarios_01.md
Session B: Strategic_Context_01.md
```

## Token Budget

- Single chunk: 10-20K tokens
- Two chunks: 20-35K tokens
- Three chunks + context: 35-50K tokens
- Maximum safe load: 50K tokens (leaves 25% buffer)

## Related Documentation

- [Getting Started](Getting_Started.md) - Quick start guide
- [Quick Reference](../reference/Quick_Reference.md) - One-page cheat sheet
- [Examples](../examples/) - Real-world workflows
