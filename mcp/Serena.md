# Serena MCP Server

**Purpose**: Semantic code understanding with project memory and session persistence

## Triggers
- Symbol operations: rename, extract, move functions/classes
- Project-wide code navigation and exploration
- Multi-language projects requiring LSP integration
- Session lifecycle: `/sc:load`, `/sc:save`, project activation
- Memory-driven development workflows
- Large codebase analysis (>50 files, complex architecture)

## Choose When
- **Over Morphllm**: For symbol operations, not pattern-based edits
- **For semantic understanding**: Symbol references, dependency tracking, LSP integration
- **For session persistence**: Project context, memory management, cross-session learning
- **For large projects**: Multi-language codebases requiring architectural understanding
- **Not for simple edits**: Basic text replacements, style enforcement, bulk operations

## Works Best With
- **Morphllm**: Serena analyzes semantic context → Morphllm executes precise edits
- **Sequential**: Serena provides project context → Sequential performs architectural analysis

## Examples
```
"rename getUserData function everywhere" → Serena (symbol operation with dependency tracking)
"find all references to this class" → Serena (semantic search and navigation)
"load my project context" → Serena (/sc:load with project activation)
"save my current work session" → Serena (/sc:save with memory persistence)
"update all console.log to logger" → Morphllm (pattern-based replacement)
"create a login form" → Magic (UI component generation)
```

## Claude Code Without Serena

When Serena MCP is unavailable, Claude Code falls back to native tools with these capabilities:

**Native Search & Navigation**
- **Glob**: File pattern matching for finding files by name or extension
- **Grep**: Content search with regex support for finding code patterns
- **Read**: Direct file reading with line offset/limit controls for targeted inspection

**Native Code Operations**
- **Edit**: String-based replacements for precise code modifications
- **Write**: File creation and full-file overwrites
- **Bash**: Shell commands for git operations, builds, and system tasks

**Workflow Differences**
- **Symbol operations**: Manual search with Grep → Edit each location individually
- **Refactoring**: Pattern-based Grep searches → systematic Edit operations
- **Memory**: No session persistence → use git commits for state preservation
- **Large codebases**: Slower exploration → rely on project familiarity and documentation

**When to use Native vs Serena**
- Native is sufficient for: Small projects (<50 files), pattern-based edits, single-file changes
- Serena adds value for: Large codebases, symbol renames, dependency tracking, session persistence

## Word Dictionary

**LSP**: Language Server Protocol - enables semantic code understanding (definitions, references, symbols)

**Symbol operation**: Code refactoring that requires semantic understanding (rename, extract, move)

**Session persistence**: Saving project context and memory across work sessions

**Semantic context**: Understanding code meaning beyond text patterns (types, dependencies, relationships)

**Dependency tracking**: Following how code elements reference and depend on each other

**Pattern-based edit**: Text replacement using regex or string matching without semantic understanding

**Project memory**: Serena's ability to remember project structure, patterns, and decisions across sessions