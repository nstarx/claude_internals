# SuperClaude Command Reference

**Complete listing of all slash commands and their usage**

[Quick Reference](Quick_Reference.md) | [Symbol Reference](Symbol_Reference.md) | [Decision Trees](Decision_Trees.md)

---

## Core Commands

### /sc:load
**Load session context from Serena memory**

```bash
/sc:load
```

**Purpose**: Restore project context from previous sessions
**When to use**: At the start of a work session to restore continuity
**Token cost**: Variable (depends on saved context size)
**Requirements**: Serena MCP server

**Example**:
```bash
# Start of work session
/sc:load
# Context restored, ready to continue work
```

---

### /sc:save
**Save session context to Serena memory**

```bash
/sc:save
```

**Purpose**: Persist current project context for future sessions
**When to use**: End of session, after major milestones, every 30-60 minutes
**Token cost**: ~1-2K tokens
**Requirements**: Serena MCP server

**Example**:
```bash
# End of work session
/sc:save
# Context persisted for next session
```

---

### /sc:task
**Execute complex tasks with intelligent workflow management**

```bash
/sc:task [description]
/sc:task --scope [file|module|project|system] [description]
```

**Purpose**: Handle multi-step tasks with automatic delegation and tracking
**When to use**: Complex tasks requiring >3 steps, multiple files/directories
**Token cost**: ~5-10K tokens (depends on complexity)
**Auto-activates**: Task Management mode, appropriate MCPs

**Example**:
```bash
/sc:task Refactor authentication system to use JWT tokens
/sc:task --scope module Update all API endpoints to handle errors consistently
```

---

### /sc:implement
**Feature implementation with intelligent persona activation**

```bash
/sc:implement [feature description]
/sc:implement --focus [domain] [feature description]
```

**Purpose**: End-to-end feature implementation with appropriate architecture
**When to use**: Building new features or significant enhancements
**Token cost**: ~10-20K tokens
**Auto-activates**: Task Management mode, relevant MCPs

**Example**:
```bash
/sc:implement User profile management with avatar upload
/sc:implement --focus security Two-factor authentication system
```

---

### /sc:analyze
**Comprehensive code analysis across multiple quality domains**

```bash
/sc:analyze [path]
/sc:analyze --focus [domain] [path]
```

**Purpose**: Multi-dimensional code quality analysis
**When to use**: Code reviews, refactoring planning, quality audits
**Token cost**: ~8-15K tokens
**Focus domains**: `quality`, `security`, `performance`, `architecture`, `accessibility`, `testing`

**Example**:
```bash
/sc:analyze src/auth/
/sc:analyze --focus security src/api/
/sc:analyze --focus performance .
```

---

### /sc:design
**Design system architecture, APIs, and component interfaces**

```bash
/sc:design [description]
/sc:design --scope [system|project|module] [description]
```

**Purpose**: Architectural design with comprehensive specifications
**When to use**: Before implementation, system redesign, API planning
**Token cost**: ~10-20K tokens
**Auto-activates**: Sequential MCP for structured thinking

**Example**:
```bash
/sc:design Microservices architecture for e-commerce platform
/sc:design --scope module REST API for product catalog
```

---

## Workflow Commands

### /sc:workflow
**Generate structured implementation workflows from requirements**

```bash
/sc:workflow [requirements]
/sc:workflow @document.pdf
```

**Purpose**: Break down requirements into actionable implementation steps
**When to use**: PRD translation, feature planning, complex implementations
**Token cost**: ~5-10K tokens
**Output**: Structured workflow with phases, tasks, dependencies

**Example**:
```bash
/sc:workflow Implement shopping cart with checkout flow
/sc:workflow @product_requirements.md
```

---

### /sc:brainstorm
**Interactive requirements discovery through Socratic dialogue**

```bash
/sc:brainstorm [vague idea]
```

**Purpose**: Transform vague concepts into clear, actionable requirements
**When to use**: Early exploration, unclear requirements, ideation
**Token cost**: ~3-8K tokens (interactive)
**Auto-activates**: Brainstorming mode

**Example**:
```bash
/sc:brainstorm I want to improve our user onboarding
/sc:brainstorm Thinking about adding social features
```

---

### /sc:git
**Git operations with intelligent commit messages**

```bash
/sc:git commit
/sc:git pr [base-branch]
/sc:git branch [branch-name]
```

**Purpose**: Git workflow automation with smart messages
**When to use**: Committing changes, creating PRs, branch management
**Token cost**: ~2-5K tokens

**Example**:
```bash
/sc:git commit
# Analyzes changes, generates descriptive commit message

/sc:git pr main
# Creates PR with summary of all changes
```

---

### /sc:cleanup
**Systematically clean up code and optimize project structure**

```bash
/sc:cleanup [path]
/sc:cleanup --remove-dead-code [path]
```

**Purpose**: Remove unused code, organize structure, apply best practices
**When to use**: Code maintenance, refactoring, technical debt reduction
**Token cost**: ~8-15K tokens

**Example**:
```bash
/sc:cleanup src/
/sc:cleanup --remove-dead-code lib/utils/
```

---

### /sc:improve
**Apply systematic improvements to code quality**

```bash
/sc:improve [path]
/sc:improve --focus [domain] [path]
```

**Purpose**: Enhance code quality, performance, maintainability
**When to use**: Refactoring, optimization, quality improvements
**Token cost**: ~8-15K tokens
**Focus domains**: Same as `/sc:analyze`

**Example**:
```bash
/sc:improve src/components/
/sc:improve --focus performance src/api/handlers.js
```

---

### /sc:troubleshoot
**Diagnose and resolve issues in code, builds, deployments**

```bash
/sc:troubleshoot [description]
/sc:troubleshoot @error.log
```

**Purpose**: Systematic problem diagnosis and resolution
**When to use**: Bugs, build failures, deployment issues, errors
**Token cost**: ~8-15K tokens
**Auto-activates**: Introspection mode, Sequential MCP

**Example**:
```bash
/sc:troubleshoot Application crashes on startup
/sc:troubleshoot @build-error.log
```

---

## Build & Test Commands

### /sc:build
**Build, compile, and package projects with error handling**

```bash
/sc:build
/sc:build --production
/sc:build --watch
```

**Purpose**: Execute build process with intelligent error resolution
**When to use**: Building projects, preparing for deployment
**Token cost**: ~5-10K tokens (more if errors occur)

**Example**:
```bash
/sc:build
# Runs build, handles errors, reports status

/sc:build --production
# Production build with optimizations
```

---

### /sc:test
**Execute tests with coverage analysis and quality reporting**

```bash
/sc:test [path]
/sc:test --coverage
/sc:test --watch
```

**Purpose**: Run tests with comprehensive analysis and reporting
**When to use**: Testing code, validating changes, coverage analysis
**Token cost**: ~5-10K tokens

**Example**:
```bash
/sc:test
# Runs all tests

/sc:test src/auth/
# Tests specific module

/sc:test --coverage
# With coverage report
```

---

## Analysis Commands

### /sc:explain
**Provide clear explanations of code, concepts, system behavior**

```bash
/sc:explain [topic]
/sc:explain @file.js
```

**Purpose**: Educational explanations with clarity and depth
**When to use**: Understanding unfamiliar code, learning patterns, documentation
**Token cost**: ~3-8K tokens

**Example**:
```bash
/sc:explain How does the authentication flow work?
/sc:explain @src/auth/middleware.js
```

---

### /sc:reflect
**Task reflection and validation using Serena analysis**

```bash
/sc:reflect [completed task]
```

**Purpose**: Analyze completed work for quality and completeness
**When to use**: After major tasks, quality validation, learning
**Token cost**: ~5-10K tokens
**Requirements**: Serena MCP server

**Example**:
```bash
/sc:reflect Just completed API refactoring
# Analyzes changes, provides quality assessment
```

---

### /sc:estimate
**Provide development estimates with intelligent analysis**

```bash
/sc:estimate [task description]
/sc:estimate @requirements.md
```

**Purpose**: Generate realistic time/effort estimates
**When to use**: Sprint planning, project estimation, resource allocation
**Token cost**: ~5-10K tokens

**Example**:
```bash
/sc:estimate Build user notification system with email and SMS
/sc:estimate @feature-spec.md
```

---

### /sc:spec-panel
**Multi-expert specification review and improvement**

```bash
/sc:spec-panel @specification.md
/sc:spec-panel --experts [expert1,expert2] @spec.md
```

**Purpose**: Expert panel review of specifications and technical documents
**When to use**: Spec review, design validation, requirement refinement
**Token cost**: ~15-25K tokens
**Experts**: Software engineering and specification experts

**Example**:
```bash
/sc:spec-panel @api-design.md
/sc:spec-panel --experts "fowler,evans,martin" @architecture.md
```

---

## Business Analysis Commands

### /sc:business-panel
**Multi-expert business analysis from strategic frameworks**

```bash
/sc:business-panel [topic]
/sc:business-panel @document.pdf
/sc:business-panel --experts [expert1,expert2] [topic]
/sc:business-panel --mode [discussion|debate|socratic] [topic]
```

**Purpose**: Strategic business analysis using multiple expert frameworks
**When to use**: Strategic decisions, market analysis, business planning
**Token cost**: ~20-40K tokens
**Available experts**: `porter`, `christensen`, `drucker`, `godin`, `kim`, `collins`, `taleb`, `meadows`, `doumont`
**Modes**: `discussion` (default), `debate`, `socratic`

**Example**:
```bash
/sc:business-panel Market entry strategy for SaaS product
/sc:business-panel @business-plan.pdf
/sc:business-panel --experts "porter,christensen,taleb" Competitive positioning
/sc:business-panel --mode debate Should we pivot to B2B?
```

---

## Documentation Commands

### /sc:index
**Generate comprehensive project documentation and knowledge base**

```bash
/sc:index
/sc:index [path]
/sc:index --update
```

**Purpose**: Create/update comprehensive project documentation index
**When to use**: Project onboarding, documentation generation, knowledge management
**Token cost**: ~10-20K tokens

**Example**:
```bash
/sc:index
# Generates complete project index

/sc:index src/
# Indexes specific directory

/sc:index --update
# Updates existing index
```

---

### /sc:document
**Generate focused documentation for specific components**

```bash
/sc:document [path]
/sc:document --type [api|guide|reference] [path]
```

**Purpose**: Generate targeted documentation for code or features
**When to use**: API docs, user guides, reference documentation
**Token cost**: ~8-15K tokens
**Types**: `api`, `guide`, `reference`, `tutorial`

**Example**:
```bash
/sc:document src/api/auth.js
/sc:document --type api src/controllers/
/sc:document --type guide features/checkout.js
```

---

## Meta Commands

### /sc:help
**List all available /sc commands and their functionality**

```bash
/sc:help
/sc:help [command]
```

**Purpose**: Get help on available commands
**When to use**: Discovering commands, checking syntax
**Token cost**: ~2-5K tokens

**Example**:
```bash
/sc:help
# Lists all commands

/sc:help task
# Details for /sc:task command
```

---

### /sc:select-tool
**Intelligent MCP tool selection based on complexity analysis**

```bash
/sc:select-tool [task description]
```

**Purpose**: Get recommendations for which MCPs and modes to use
**When to use**: Uncertain about tool selection, learning optimal patterns
**Token cost**: ~3-5K tokens

**Example**:
```bash
/sc:select-tool Refactor 50 files to use new API pattern
# Recommends: Morphllm + Serena + Task Management mode
```

---

### /sc:spawn
**Meta-system task orchestration with intelligent delegation**

```bash
/sc:spawn [complex multi-domain task]
```

**Purpose**: Break down and delegate complex multi-domain tasks
**When to use**: Very complex tasks spanning multiple domains/technologies
**Token cost**: ~10-30K tokens
**Auto-activates**: Orchestration mode, multiple specialized agents

**Example**:
```bash
/sc:spawn Migrate monolith to microservices with zero downtime
/sc:spawn Build full-stack app with React, Node.js, PostgreSQL
```

---

## Command Patterns

### Flag Combinations

**Common patterns**:
```bash
# Efficient analysis
/sc:analyze --focus security --uc src/

# Safe refactoring
/sc:implement --validate new-feature

# Deep investigation
/sc:troubleshoot --think-hard application-crash

# Maximum capability
/sc:design --ultrathink --all-mcp system-architecture
```

### File References

**Use `@` to reference files**:
```bash
/sc:business-panel @strategy.pdf
/sc:workflow @requirements.md
/sc:troubleshoot @error.log
/sc:explain @complex-code.js
```

### Scope Control

**Limit analysis scope**:
```bash
/sc:analyze --scope file auth.js
/sc:improve --scope module src/api/
/sc:design --scope project
/sc:task --scope system
```

---

## Command Selection Guide

### By Task Type

| Task Type | Primary Command | Alternative |
|-----------|----------------|-------------|
| New feature | `/sc:implement` | `/sc:task` |
| Bug fix | `/sc:troubleshoot` | `/sc:analyze` |
| Refactoring | `/sc:improve` | `/sc:cleanup` |
| Architecture | `/sc:design` | `/sc:analyze` |
| Documentation | `/sc:document` | `/sc:index` |
| Planning | `/sc:workflow` | `/sc:brainstorm` |
| Strategic | `/sc:business-panel` | `/sc:estimate` |

### By Complexity

- **Simple**: Direct description (no slash command)
- **Moderate**: `/sc:task` or `/sc:implement`
- **Complex**: `/sc:workflow` → `/sc:implement`
- **Very Complex**: `/sc:spawn` or `/sc:design` first

### By Phase

**Discovery**: `/sc:brainstorm` → `/sc:workflow`
**Design**: `/sc:design` → `/sc:spec-panel`
**Implementation**: `/sc:implement` → `/sc:test`
**Validation**: `/sc:analyze` → `/sc:reflect`
**Deployment**: `/sc:build` → `/sc:test`

---

## Best Practices

### DO
✅ Use `/sc:load` at session start
✅ Use `/sc:save` regularly (every 30-60 min)
✅ Choose specific commands for specific tasks
✅ Combine commands in sequence for complex workflows
✅ Use file references with `@` for context

### DON'T
❌ Use slash commands for simple tasks (overhead)
❌ Chain too many commands at once
❌ Skip `/sc:save` in long sessions
❌ Use `/sc:spawn` when simpler commands work
❌ Ignore command recommendations from `/sc:select-tool`

---

**Version**: 1.0
**Last Updated**: 2025-11-02
**Related**: [Quick Reference](Quick_Reference.md) | [Decision Trees](Decision_Trees.md)
