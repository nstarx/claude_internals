# SuperClaude Framework - Quick Reference

**One-page cheat sheet for essential concepts, commands, and patterns**

---

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Evidence > Assumptions** | Base decisions on testing/metrics, not guesses |
| **Code > Documentation** | Working code is the source of truth |
| **Efficiency > Verbosity** | Maximize information density, minimize tokens |
| **Parallel First** | Execute independent operations concurrently |
| **Task-First Approach** | Understand → Plan → Execute → Validate |

---

## Behavioral Modes

### Mode Selection Quick Guide

| Trigger | Mode | Purpose |
|---------|------|---------|
| Vague requirements | **Brainstorming** | Collaborative discovery |
| Business analysis | **Business Panel** | Multi-expert strategic analysis |
| Complex debugging | **Introspection** | Meta-cognitive problem solving |
| Multi-tool tasks | **Orchestration** | Intelligent tool selection |
| >3 steps | **Task Management** | Hierarchical organization |
| Token pressure | **Token Efficiency** | Symbol-based compression |

### Activation Flags

```bash
--brainstorm    # Discovery mode
--introspect    # Self-analysis mode
--task-manage   # Delegation mode
--orchestrate   # Tool optimization
--uc            # Ultra-compressed output
```

---

## MCP Server Selection

| Task Type | Best MCP | Alternative |
|-----------|----------|-------------|
| UI Components | **Magic** | Manual coding |
| Deep Analysis | **Sequential** | Native reasoning |
| Symbol Ops | **Serena** | Grep + Edit |
| Bulk Edits | **Morphllm** | Sequential Edits |
| Documentation | **Context7** | WebSearch |
| Browser Testing | **Playwright** | Unit tests |

### Common MCP Combinations

- **Serena + Morphllm** → Semantic analysis + bulk edits
- **Context7 + Magic** → Official patterns + UI generation
- **Sequential + Context7** → Deep thinking + documentation

---

## Essential Symbols

### Logic & Flow
```
→  leads to, causes        ⇒  transforms to
←  rollback, reverse       ⇄  bidirectional
∴  therefore              ∵  because
»  sequence (then)         &  and, combine
|  or, separator           :  define, specify
```

### Status
```
✅ completed, passed      ❌ failed, error
⚠️  warning               🔄 in progress
⏳ pending                🚨 critical, urgent
```

### Technical Domains
```
⚡ performance            🔍 analysis
🔧 configuration          🛡️  security
📦 deployment             🎨 design/UI
🏗️  architecture           🧪 testing
```

### Business Analysis
```
🎯 strategic target       💰 financial impact
📈 growth opportunity     📉 decline/risk
🏆 competitive advantage  🌊 blue ocean
🔄 business cycle         ⚖️  trade-offs
```

---

## Common Workflows

### Feature Development
```bash
1. git checkout -b feature/[name]
2. TodoWrite: Plan tasks (if >3 steps)
3. Implement (parallel operations when possible)
4. Test & validate
5. Commit with descriptive message
6. Create PR
```

### Bug Investigation
```bash
1. Reproduce & document
2. Use Introspection mode for complex issues
3. Root cause analysis (never skip)
4. Fix & verify
5. Add regression test
```

### Multi-File Refactor
```bash
1. Serena: Analyze symbols & dependencies
2. Plan changes with TodoWrite
3. Morphllm: Execute bulk edits
4. Validate: Tests, lint, build
5. Commit incrementally
```

---

## Critical Rules

### 🔴 NEVER
- Skip tests to make builds pass
- Work directly on main/master
- Leave TODO comments for core functionality
- Create files without checking existing patterns
- Commit without git diff review

### 🟡 ALWAYS
- Use TodoWrite for >3 step tasks
- Complete started implementations fully
- Build only what's explicitly requested
- Clean up temporary files after operations
- Use professional, objective language

### 🟢 PREFER
- Parallel over sequential operations
- MCP tools over basic alternatives
- Edit existing files over creating new ones
- Grep tool over bash grep
- MultiEdit for bulk changes

---

## Quality Gates

### Before Committing
```bash
# Run these checks
git diff                  # Review changes
npm run lint             # Code quality
npm run test             # All tests
npm run build            # Production build
```

### Before PR
```bash
# Validate
✓ All tests passing
✓ No lint errors
✓ Build succeeds
✓ README updated (if needed)
✓ No temp files committed
```

---

## Decision Trees

### Should I use TodoWrite?
```
Task has >3 steps? → YES
Task is complex? → YES
Multiple files involved? → YES
User wants tracking? → YES
Single simple task? → NO
```

### Should I use an MCP server?
```
Need UI components? → Magic
Need deep analysis? → Sequential
Need symbol operations? → Serena
Need bulk pattern edits? → Morphllm
Need official docs? → Context7
Need browser testing? → Playwright
Otherwise? → Native tools
```

### Should I delegate to Task agent?
```
>7 directories? → YES
>50 files? → YES
Complexity >0.8? → YES
Performance critical? → YES
Simple task? → NO
```

---

## Token Efficiency Patterns

### When Context >75%
- Activate `--uc` flag
- Use symbol communication
- Load only necessary chunks
- Defer non-critical operations

### Abbreviations
```
cfg     → configuration
impl    → implementation
arch    → architecture
perf    → performance
deps    → dependencies
val     → validation
sec     → security
```

---

## Emergency Commands

### Rollback
```bash
git log --oneline          # Find commit
git revert <commit-hash>   # Undo changes
```

### Clean Workspace
```bash
git clean -fd              # Remove untracked files
git checkout .             # Discard changes
```

### Recovery
```bash
git reflog                 # Find lost commits
git checkout <hash>        # Restore state
```

---

## Session Patterns

### Starting Session
```bash
/sc:load                   # Load project context
git status && git branch   # Check repository state
TodoWrite                  # Plan tasks
```

### During Session
```bash
# Checkpoint every 30 min
git add . && git commit -m "Checkpoint: [progress]"

# Update todos as you progress
TodoWrite: Mark completed tasks
```

### Ending Session
```bash
/sc:save                   # Save project context
git status                 # Verify clean state
# Final commit if needed
```

---

## Business Panel Usage

### Quick Analysis
```bash
/sc:business-panel @document.pdf
# Auto-selects 3-5 relevant experts
```

### Specific Experts
```bash
/sc:business-panel @strategy.md --experts "porter,christensen,meadows"
# Custom expert selection
```

### Analysis Modes
```bash
--mode discussion    # Collaborative (default)
--mode debate        # Challenge assumptions
--mode socratic      # Learning through questions
```

---

## File Organization Rules

### Where to Put Files

| File Type | Location |
|-----------|----------|
| Tests | `tests/`, `__tests__/`, `test/` |
| Scripts | `scripts/`, `tools/`, `bin/` |
| Docs for Claude | `claudedocs/` |
| Source code | `src/`, `lib/`, project-specific |
| Config | Project root or `config/` |

### Never
- Test files next to source code
- Random scripts in project root
- Documentation scattered everywhere
- Temporary files committed

---

## Common Patterns

### Parallel File Reading
```javascript
// ✅ Right: Parallel reads
Read: file1.js
Read: file2.js
Read: file3.js

// ❌ Wrong: Sequential
Read file1.js → analyze → Read file2.js → analyze
```

### Batch Operations
```javascript
// ✅ Right: MultiEdit for bulk changes
MultiEdit: [file1, file2, file3]

// ❌ Wrong: Individual edits
Edit file1 → Edit file2 → Edit file3
```

### Git Workflow
```bash
# ✅ Right: Feature branch
git checkout -b feature/auth
# Work, commit, PR

# ❌ Wrong: Direct to main
git checkout main
# Work directly on main
```

---

## Getting Help

### Documentation
- [Full Guides](../guides/) - Comprehensive tutorials
- [Core Framework](../core/) - Principles, rules, flags
- [Modes](../modes/) - Behavioral mode details
- [MCP Servers](../mcp/) - Tool documentation
- [Examples](../examples/) - Real-world workflows

### Commands
```bash
/help                    # Claude Code help
/sc:help                 # SuperClaude commands
```

---

## Key Takeaways

1. **Plan before executing** - TodoWrite for >3 steps
2. **Parallel everything** - Independent ops run concurrently
3. **Use the right tool** - MCP > Native > Basic
4. **Complete what you start** - No partial implementations
5. **Build what's asked** - No scope creep
6. **Clean as you go** - Remove temporary files
7. **Professional language** - No marketing superlatives
8. **Evidence-based** - Test and measure, don't assume

---

**Version**: 1.0
**Last Updated**: 2025-11-02
**Full Documentation**: See [guides/](../guides/) directory
