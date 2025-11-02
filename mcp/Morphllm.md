# Morphllm MCP Server

**Purpose**: Pattern-based code editing engine with token optimization for bulk transformations

## Triggers
- Multi-file edit operations requiring consistent patterns
- Framework updates, style guide enforcement, code cleanup
- Bulk text replacements across multiple files
- Natural language edit instructions with specific scope
- Token optimization needed (efficiency gains 30-50%)

## Choose When
- **Over Serena**: For pattern-based edits, not symbol operations
- **For bulk operations**: Style enforcement, framework updates, text replacements
- **When token efficiency matters**: Fast Apply scenarios with compression needs
- **For simple to moderate complexity**: <10 files, straightforward transformations
- **Not for semantic operations**: Symbol renames, dependency tracking, LSP integration

## Works Best With
- **Serena**: Serena analyzes semantic context → Morphllm executes precise edits
- **Sequential**: Sequential plans edit strategy → Morphllm applies systematic changes

## Examples
```
"update all React class components to hooks" → Morphllm (pattern transformation)
"enforce ESLint rules across project" → Morphllm (style guide application)
"replace all console.log with logger calls" → Morphllm (bulk text replacement)
"rename getUserData function everywhere" → Serena (symbol operation)
"analyze code architecture" → Sequential (complex analysis)
"explain this algorithm" → Native Claude (simple explanation)
```

## Claude Code Without Morphllm

When Morphllm MCP is unavailable, Claude Code uses these alternatives:

**Native Bulk Operations**
- **Bash sed/awk**: Command-line text processing for pattern replacements
- **Grep + Edit**: Find patterns → systematic Edit calls for each match
- **Bash find/xargs**: Batch file operations with command chaining
- **MultiEdit**: Native batch editing when changes are uniform

**Workflow Differences**
- **Token usage**: Higher token consumption with individual Edit calls vs Morphllm's efficiency
- **Speed**: Slower sequential operations vs Morphllm's optimized bulk processing
- **Complexity**: Manual coordination of multi-file changes vs Morphllm's unified approach
- **Validation**: Need explicit verification steps vs Morphllm's integrated validation

**When to use Native vs Morphllm**
- Native is sufficient for: Small-scale changes (<5 files), simple text replacements, shell-friendly patterns
- Morphllm adds value for: Large-scale transformations (>10 files), complex pattern matching, token efficiency needs

## Word Dictionary

**Pattern-based editing**: Code modifications using text patterns rather than semantic understanding

**Bulk transformation**: Applying the same change across many files simultaneously

**Token optimization**: Reducing token usage while maintaining operation effectiveness

**Style guide enforcement**: Applying consistent code formatting and conventions across codebase

**Natural language edits**: Describing desired changes in plain English rather than code patterns

**Framework update**: Systematic migration from one version/pattern to another across entire codebase