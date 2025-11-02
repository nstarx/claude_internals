# SuperClaude Decision Trees

**When to use what: Modes, MCPs, Commands, and Strategies**

[Quick Reference](Quick_Reference.md) | [Command Reference](Command_Reference.md) | [Symbol Reference](Symbol_Reference.md)

---

## Overview

This guide helps you choose the right tools, modes, and approaches for different scenarios. Follow the decision trees to optimize your workflow and tool selection.

---

## Primary Decision: Task Complexity

```
START: What kind of task do I have?

├─ Simple single-step task (read file, quick check)
│  └─ NO tools needed → Direct description
│
├─ Moderate task (2-3 steps, single domain)
│  ├─ Clear requirements → Direct implementation
│  └─ Unclear requirements → Use --brainstorm
│
├─ Complex task (>3 steps, multiple files/domains)
│  ├─ Known approach → Use /sc:task + --task-manage
│  └─ Unknown approach → Use /sc:brainstorm → /sc:workflow → /sc:implement
│
└─ Very complex task (system-wide, multi-domain)
   └─ Use /sc:spawn OR /sc:design → /sc:workflow → /sc:implement
```

---

## Mode Selection Decision Trees

### Should I Use a Behavioral Mode?

```
START: Analyzing task characteristics

Do I have unclear requirements?
├─ YES → --brainstorm
└─ NO ↓

Does task have >3 steps?
├─ YES → --task-manage
└─ NO ↓

Am I using multiple tools/MCPs?
├─ YES → --orchestrate
└─ NO ↓

Is context usage >75%?
├─ YES → --token-efficient OR --uc
└─ NO ↓

Do I need to see thinking process?
├─ YES → --introspect
└─ NO → No mode flag needed
```

### Brainstorming Mode Decision

```
Use --brainstorm when:

User input contains:
├─ Vague phrases ("maybe", "thinking about", "not sure")
├─ Questions without clear direction ("what should I...", "how might we...")
├─ Multiple possible approaches mentioned
├─ Uncertainty about requirements
└─ Exploratory language ("explore", "investigate")

DON'T use when:
├─ User provides specific requirements
├─ Clear acceptance criteria exist
├─ Implementation path is obvious
└─ User wants immediate execution
```

### Task Management Mode Decision

```
Use --task-manage when:

Task Characteristics:
├─ >3 sequential steps
├─ >2 directories affected
├─ >3 files to modify
├─ Complex dependencies between steps
├─ Need progress tracking
└─ User explicitly wants todo list

DON'T use when:
├─ Single simple operation
├─ <3 trivial steps
├─ Quick read/check operation
└─ Purely conversational request
```

### Token Efficiency Mode Decision

```
Use --token-efficient OR --uc when:

Context Metrics:
├─ Context usage >75% → --token-efficient
├─ Context usage >85% → --uc (ultra-compressed)
├─ Large operation planned → --token-efficient
├─ Repeated concepts in session → --token-efficient
└─ Explicitly requested → --uc

DON'T use when:
├─ Context <50%
├─ First mention of concepts
├─ User prefers verbose output
└─ Clarity critical (legal, security)
```

### Introspection Mode Decision

```
Use --introspect when:

Analysis Needs:
├─ Complex debugging required
├─ User wants to understand reasoning
├─ Multiple solution approaches possible
├─ Meta-cognitive problem solving needed
├─ Learning/educational context
└─ Error recovery from previous attempts

DON'T use when:
├─ Simple straightforward tasks
├─ User wants concise output
├─ Time-sensitive operations
└─ Context pressure (use --uc instead)
```

---

## MCP Server Selection Decision Trees

### Which MCP Should I Use?

```
START: What is the primary task?

Documentation needed?
├─ Official library/framework docs → --c7 (Context7)
└─ NOT documentation ↓

UI/Frontend work?
├─ Need modern components → --magic (Magic)
└─ NOT UI work ↓

Code understanding/refactoring?
├─ Symbol operations (rename, refactor) → --serena (Serena)
└─ NOT symbol work ↓

Bulk code transformations?
├─ Same change across many files → --morph (Morphllm)
└─ NOT bulk edits ↓

Complex analysis/debugging?
├─ Need structured reasoning → --seq (Sequential)
└─ NOT deep analysis ↓

Browser automation/testing?
├─ E2E tests, real browser → --play (Playwright)
└─ Use native tools
```

### Context7 Decision

```
Use --c7 (Context7) when:

Documentation Needs:
├─ Library/framework official docs
├─ Version-specific API reference
├─ Official patterns and best practices
├─ Authentication/integration flows
└─ Curated examples from official sources

Examples:
├─ "How to use React hooks?"
├─ "Vue 3 composition API patterns"
├─ "Next.js authentication setup"
└─ "Official Express.js middleware patterns"

DON'T use when:
├─ General knowledge questions
├─ Code-specific debugging
├─ Custom implementation details
└─ Non-library questions
```

### Sequential MCP Decision

```
Use --seq (Sequential) when:

Analysis Requirements:
├─ Complex multi-component debugging
├─ System design decisions
├─ Root cause analysis (non-obvious bugs)
├─ Hypothesis testing needed
├─ Multiple solution paths to evaluate
└─ Verification cycles required

Combined with:
├─ --think (standard analysis ~4K tokens)
├─ --think-hard (deep analysis ~10K tokens)
└─ --ultrathink (maximum depth ~32K tokens)

DON'T use when:
├─ Simple debugging (single component)
├─ Straightforward implementation
├─ Context already very high (>75%)
└─ Time-critical operations
```

### Serena MCP Decision

```
Use --serena (Serena) when:

Operations Required:
├─ Symbol rename across project
├─ Find all references to function/class
├─ Refactor with semantic understanding
├─ Large codebase navigation
├─ Cross-session context needed (save/load)
└─ Dependency tracking

Commands:
├─ /sc:load (session start)
├─ /sc:save (session end, checkpoints)
└─ /sc:reflect (work validation)

DON'T use when:
├─ Simple grep would suffice
├─ Single file operations
├─ No semantic understanding needed
└─ Small codebase (<50 files)
```

### Morphllm MCP Decision

```
Use --morph (Morphllm) when:

Transformation Needs:
├─ Same change across 10+ files
├─ Pattern-based bulk edits
├─ Code style enforcement
├─ Framework version updates
├─ API migration (old API → new API)
└─ Consistent refactoring pattern

Token Savings: 30-50% vs sequential edits

DON'T use when:
├─ <5 files affected
├─ Each file needs different logic
├─ Semantic understanding required
└─ Complex context-dependent changes
```

### Magic MCP Decision

```
Use --magic (Magic) when:

UI Component Needs:
├─ Forms with validation
├─ Buttons and interactive elements
├─ Layouts and responsive design
├─ Modern design system components
├─ Accessibility requirements
└─ Standard UI patterns from 21st.dev

DON'T use when:
├─ Custom complex interactions
├─ Non-UI work
├─ Backend/API development
└─ Highly specialized components
```

### Playwright MCP Decision

```
Use --play (Playwright) when:

Testing Requirements:
├─ E2E user workflows
├─ Real browser interaction needed
├─ Visual/screenshot validation
├─ Cross-browser testing
├─ Accessibility testing
└─ Performance testing in browser

DON'T use when:
├─ Unit tests sufficient
├─ API testing only
├─ Component testing (use Jest/Vitest)
└─ Backend logic testing
```

---

## Slash Command Selection Decision Trees

### Core Commands Decision

```
START: What is the main goal?

Load/Save context?
├─ Start of session → /sc:load
└─ End of session / checkpoint → /sc:save

New feature/significant work?
├─ Implementation → /sc:implement
└─ Complex multi-step → /sc:task

Analysis needed?
├─ Code quality → /sc:analyze
├─ Root cause → /sc:troubleshoot
└─ Explanation → /sc:explain

Design/Architecture?
├─ System design → /sc:design
├─ Generate workflow → /sc:workflow
└─ Plan from vague idea → /sc:brainstorm

Build/Test operations?
├─ Build project → /sc:build
└─ Run tests → /sc:test

Strategic/Business?
└─ Business analysis → /sc:business-panel
```

### When to Use /sc:task vs /sc:implement

```
Use /sc:task when:
├─ Clear, defined multi-step operation
├─ Primarily technical/mechanical work
├─ Known implementation approach
├─ Focus on execution and tracking
└─ Examples: "Refactor module", "Update configs", "Fix bug series"

Use /sc:implement when:
├─ New feature development
├─ Requires design decisions
├─ End-to-end functionality
├─ May need architecture planning
└─ Examples: "Add user auth", "Build notification system"

Use /sc:spawn when:
├─ Very complex, multi-domain
├─ Requires multiple specialized agents
├─ System-wide implications
└─ Examples: "Migrate to microservices", "Full-stack app from scratch"
```

### Analysis Command Selection

```
What kind of analysis?

Understanding code:
├─ General explanation → /sc:explain
├─ Quality assessment → /sc:analyze
└─ Strategic/business → /sc:business-panel

Debugging:
├─ Known error → /sc:troubleshoot
└─ System-wide issue → /sc:troubleshoot --think-hard

Planning:
├─ From vague idea → /sc:brainstorm
├─ From requirements → /sc:workflow
└─ Architecture → /sc:design

Validation:
├─ Completed work → /sc:reflect
├─ Time/effort → /sc:estimate
└─ Specification → /sc:spec-panel
```

---

## Flag Combination Decision Trees

### Analysis Depth Flags

```
How deep should the analysis be?

Quick check / moderate complexity:
└─ (no flag) → Standard analysis

Multi-component analysis:
└─ --think (~4K tokens)
   ├─ Enable Sequential MCP
   └─ Structured reasoning

System-wide / architectural:
└─ --think-hard (~10K tokens)
   ├─ Enable Sequential + Context7
   └─ Deep dependency analysis

Critical redesign / complex debugging:
└─ --ultrathink (~32K tokens)
   ├─ Enable all MCP servers
   └─ Maximum depth analysis
```

### Execution Control Flags

```
START: Considering execution strategy

Need validation before execution?
└─ --validate → Risk assessment before running

High-risk operation?
└─ --safe-mode → Maximum validation + auto --uc

Iterative improvement?
└─ --loop → Enable improvement cycles

Large-scale operation?
├─ --delegate auto → Automatic sub-agent routing
└─ --concurrency [n] → Control parallel operations

Scope limitation?
└─ --scope [file|module|project|system] → Limit analysis boundary

Specific domain focus?
└─ --focus [domain] → Target specific quality dimension
```

### Optimal Flag Combinations

```
Efficient analysis:
└─ --think --uc --serena

Safe refactoring:
└─ --task-manage --validate --serena

Deep investigation:
└─ --think-hard --seq --c7 --introspect

Maximum capability:
└─ --ultrathink --all-mcp --validate

Token-pressured operation:
└─ --uc --orchestrate --serena

Business strategic analysis:
└─ /sc:business-panel --think-hard

Large-scale refactoring:
└─ --task-manage --morph --serena --validate
```

---

## Workflow Pattern Decision Trees

### Feature Development Workflow

```
START: New feature request

Requirements unclear?
├─ YES → /sc:brainstorm → Continue
└─ NO ↓

Need architectural design?
├─ YES → /sc:design → Continue
└─ NO ↓

Complex multi-step implementation?
├─ YES → /sc:workflow → /sc:implement --task-manage
└─ NO → /sc:implement

After implementation:
├─ /sc:test → Validate
├─ /sc:analyze → Quality check
├─ /sc:reflect → Work validation
└─ /sc:git commit → Commit changes
```

### Bug Investigation Workflow

```
START: Bug reported

Reproduce issue:
├─ Document steps
└─ Verify in environment

Simple bug (single component)?
├─ YES → Direct fix + test
└─ NO ↓

Complex / system-wide?
├─ YES → /sc:troubleshoot --think-hard --seq
└─ Moderate → /sc:troubleshoot

Root cause found?
├─ YES → Fix + regression test
└─ NO → /sc:troubleshoot --ultrathink --introspect

After fix:
├─ /sc:test → Validate fix
├─ /sc:reflect → Assess solution
└─ /sc:git commit → Commit with bug reference
```

### Refactoring Workflow

```
START: Refactoring needed

Scope assessment:
├─ Single file → Direct edit
├─ Single module → /sc:improve --serena
├─ Multiple modules → /sc:task --task-manage --serena
└─ System-wide → /sc:design → /sc:workflow → /sc:implement

Analysis phase:
└─ /sc:analyze --serena → Understand dependencies

Transformation:
├─ Pattern-based (same change many places) → --morph
└─ Semantic (rename, extract, move) → --serena

Validation:
├─ /sc:test → Run full test suite
├─ /sc:build → Verify builds
└─ /sc:reflect → Quality check
```

---

## Context Pressure Decision Tree

```
START: Check current context usage

Context < 50%:
└─ ✅ Full verbosity, all tools available

Context 50-75%:
├─ 🟢 Normal operation
└─ Consider --orchestrate for efficiency

Context 75-85%:
├─ 🟡 Warning zone
├─ Activate --token-efficient
├─ Use symbols for repeated concepts
└─ Defer non-critical operations

Context 85-95%:
├─ 🔴 Critical zone
├─ Activate --uc (ultra-compressed)
├─ Essential operations only
├─ Consider --safe-mode
└─ Plan to checkpoint and restart

Context > 95%:
├─ 🚨 Emergency
├─ Checkpoint immediately (/sc:save)
├─ Complete current operation only
└─ Restart session with /sc:load
```

---

## Tool Selection Matrix

### By Task Type

| Task Type | Primary Tool | Secondary | Tertiary |
|-----------|-------------|-----------|----------|
| New Feature | /sc:implement | /sc:workflow | /sc:task |
| Bug Fix | /sc:troubleshoot | /sc:analyze | Direct |
| Refactor | /sc:improve + --serena | --morph | /sc:task |
| UI Component | --magic | /sc:implement | Direct |
| Architecture | /sc:design | /sc:spec-panel | --seq |
| Analysis | /sc:analyze | /sc:explain | --seq |
| Documentation | /sc:document | /sc:index | Direct |
| Testing | /sc:test | --play | Direct |
| Strategic | /sc:business-panel | /sc:estimate | /sc:brainstorm |

### By Complexity Level

| Complexity | Approach | Tools |
|------------|----------|-------|
| Trivial | Direct | None |
| Simple | Direct + mode flag | --orchestrate |
| Moderate | Slash command | /sc:task |
| Complex | Workflow + mode | /sc:workflow + --task-manage |
| Very Complex | Full stack | /sc:spawn + --ultrathink |

---

## Emergency Decision Trees

### Build Failure Response

```
Build failed - what now?

Read error message carefully

Syntax/type error?
├─ Quick fix → Test again
└─ Complex → /sc:troubleshoot --focus quality

Dependency issue?
└─ /sc:analyze --focus dependencies

Test failure?
├─ Test issue → Fix test
└─ Code issue → /sc:troubleshoot

Unknown cause?
└─ /sc:troubleshoot --think-hard --seq --introspect
```

### Context Overflow Response

```
Context too high - what now?

Current operation critical?
├─ YES → Complete operation with --uc
└─ NO → Checkpoint now

Checkpoint:
1. /sc:save → Persist context
2. Note current task state
3. Restart conversation
4. /sc:load → Restore context
5. Continue with --uc enabled
```

---

## Quick Reference Flowchart

```
┌─────────────────────────────────────┐
│     START: I have a task            │
└────────────┬────────────────────────┘
             │
             ▼
    ┌─────────────────┐
    │ Requirements    │
    │ clear?          │
    └────┬───────┬────┘
         │       │
       NO│       │YES
         │       │
         ▼       ▼
   ┌──────────┐ ┌──────────┐
   │--brainstorm│→│Complexity│
   └──────────┘ └────┬─────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
    ┌────────┐  ┌─────────┐  ┌─────────┐
    │Simple  │  │Complex  │  │Very     │
    │Direct  │  │/sc:task │  │Complex  │
    └────────┘  └─────────┘  │/sc:spawn│
                              └─────────┘
```

---

## Related Documentation

- **[Quick Reference](Quick_Reference.md)**: Essential patterns
- **[Command Reference](Command_Reference.md)**: All slash commands
- **[Symbol Reference](Symbol_Reference.md)**: Symbol system
- **[GLOSSARY](../GLOSSARY.md)**: Full terminology
- **[Modes](../modes/README.md)**: Mode documentation
- **[MCP Servers](../mcp/README.md)**: MCP documentation

---

**Version**: 1.0
**Last Updated**: 2025-11-02
**Maintained By**: SuperClaude Framework Team
