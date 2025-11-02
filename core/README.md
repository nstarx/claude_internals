# Core Framework Files

This directory contains the foundational files of the SuperClaude framework.

## Contents

- **PRINCIPLES.md** - Software engineering principles and philosophy
- **RULES.md** - Behavioral rules and decision frameworks
- **FLAGS.md** - Command flags and mode activation triggers

## Purpose

These files define the core behavior, decision-making, and operational guidelines for Claude Code when using the SuperClaude framework.

## Usage

These files are typically loaded via `@` references in the main `CLAUDE.md` file:

```markdown
@core/PRINCIPLES.md
@core/RULES.md
@core/FLAGS.md
```

## Related Documentation

- [Modes](../modes/) - Behavioral modes that build on these principles
- [MCP Servers](../mcp/) - Tool integrations that follow these rules
- [Quick Reference](../reference/Quick_Reference.md) - Condensed guide
