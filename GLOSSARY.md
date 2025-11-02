# SuperClaude Framework Glossary

**Last Updated**: 2025-11-02

## Core Concepts

### Framework Architecture
- **SuperClaude Framework**: Enhanced Claude Code framework with modes, personas, and MCP integrations
- **Mode**: Behavioral mindset that changes how Claude approaches tasks (Brainstorming, Introspection, Orchestration, Task Management, Token Efficiency, Business Panel)
- **Persona**: Role-based execution pattern (Analyzer, Architect, Mentor, etc.)
- **MCP Server**: Model Context Protocol server providing specialized capabilities (Context7, Magic, Morphllm, Playwright, Serena, Sequential)
- **Wave Mode**: Multi-phase execution strategy for complex operations

### MCP Servers

#### Context7
- **Purpose**: Official library documentation lookup and framework pattern guidance
- **Best For**: Curated, version-specific documentation for frameworks and libraries
- **Use Case**: React hooks, Vue composition API, authentication flows, official patterns

#### Magic
- **Purpose**: Modern UI component generation from 21st.dev patterns
- **Best For**: Standard UI components with modern design systems
- **Use Case**: Forms, buttons, layouts, responsive components, accessibility

#### Morphllm
- **Purpose**: Pattern-based code editing with token optimization
- **Best For**: Bulk transformations, style enforcement, framework updates
- **Use Case**: Multi-file edits, code cleanup, pattern replacements (30-50% token reduction)

#### Playwright
- **Purpose**: Browser automation and E2E testing
- **Best For**: Real browser interaction testing, visual validation
- **Use Case**: User workflows, accessibility testing, cross-browser validation

#### Serena
- **Purpose**: Semantic code understanding with project memory
- **Best For**: Symbol operations, large codebases, session persistence
- **Use Case**: Symbol renames, dependency tracking, project context across sessions

#### Sequential
- **Purpose**: Structured multi-step reasoning with hypothesis testing
- **Best For**: Complex analysis, debugging, system design
- **Use Case**: Multi-component analysis, problem solving, verification cycles

### Behavioral Modes

#### Brainstorming Mode
- **Trigger**: Vague requests, exploration keywords, uncertainty indicators
- **Behavior**: Socratic dialogue, collaborative discovery, non-presumptive
- **Outcome**: Clear requirements from vague concepts

#### Introspection Mode
- **Trigger**: Self-analysis requests, error recovery, meta-cognition needs
- **Behavior**: Self-examination, transparency, pattern detection
- **Outcome**: Improved decision-making through reflection

#### Orchestration Mode
- **Trigger**: Multi-tool operations, performance constraints, parallel opportunities
- **Behavior**: Smart tool selection, resource awareness, efficiency focus
- **Outcome**: Optimal task routing and resource efficiency

#### Task Management Mode
- **Trigger**: >3 steps, >2 directories OR >3 files, complex dependencies
- **Behavior**: Hierarchical organization, memory persistence, systematic tracking
- **Outcome**: Organized execution with progress tracking

#### Token Efficiency Mode
- **Trigger**: Context >75%, large operations, `--uc` flag
- **Behavior**: Symbol communication, abbreviations, structured output
- **Outcome**: 30-50% token reduction with ≥95% information quality

#### Business Panel Mode
- **Trigger**: `/sc:business-panel`, strategic analysis requests
- **Behavior**: Multi-expert analysis (Porter, Christensen, Drucker, etc.)
- **Outcome**: Strategic insights from multiple business frameworks

### Business Analysis Concepts

#### Expert Frameworks
- **Porter**: Competitive strategy, five forces, value chain analysis
- **Christensen**: Disruption theory, jobs-to-be-done innovation
- **Drucker**: Management fundamentals, systematic innovation
- **Godin**: Marketing, remarkability, tribe building (purple cow)
- **Kim/Mauborgne**: Blue ocean strategy, value innovation
- **Collins**: Organizational excellence, good to great, flywheel
- **Taleb**: Antifragility, risk management, robustness
- **Meadows**: Systems thinking, leverage points, feedback loops
- **Doumont**: Communication clarity, cognitive load optimization

#### Analysis Modes
- **Discussion Mode**: Collaborative multi-perspective analysis with complementary frameworks
- **Debate Mode**: Adversarial analysis through structured disagreement
- **Socratic Mode**: Question-driven exploration for capability development

#### Synthesis Patterns
- **Convergent Insights**: Areas where multiple experts agree
- **Productive Tensions**: Strategic trade-offs revealed through disagreement
- **System Patterns**: Structural themes from systems thinking
- **Blind Spots**: Gaps not captured by any single framework

### Technical Terms

#### Tool Selection
- **Tool Selection Matrix**: Optimal tool choice for each task type
- **Parallel Execution**: Independent operations running concurrently
- **Batch Operations**: Multiple operations grouped for efficiency
- **Delegation**: Sub-agent processing for complex tasks

#### Code Operations
- **Symbol Operation**: Semantic code refactoring (rename, extract, move)
- **Pattern-Based Edit**: Text replacement using regex without semantic understanding
- **Bulk Transformation**: Same change across many files
- **LSP**: Language Server Protocol for semantic code understanding

#### Session Management
- **Session Lifecycle**: Initialize → Work → Checkpoint → Save pattern
- **Project Memory**: Serena's cross-session context retention
- **Checkpoint**: Periodic state preservation (30-min intervals)
- **Session Persistence**: Saving project context across work sessions

### Symbols & Abbreviations

#### Logic Symbols
- `→` leads to, implies
- `⇒` transforms to
- `←` rollback, reverse
- `⇄` bidirectional
- `∴` therefore
- `∵` because

#### Status Symbols
- `✅` completed, passed
- `❌` failed, error
- `⚠️` warning
- `🔄` in progress
- `⏳` pending
- `🚨` critical

#### Domain Symbols
- `⚡` performance
- `🔍` analysis
- `🔧` configuration
- `🛡️` security
- `📦` deployment
- `🎨` design
- `🏗️` architecture

#### Business Symbols
- `🎯` strategic target
- `📈` growth opportunity
- `💰` financial impact
- `🏆` competitive advantage
- `🌊` blue ocean
- `🔨` jobs-to-be-done (Christensen)
- `⚔️` five forces (Porter)
- `🧩` synthesis

#### Common Abbreviations
- `cfg` config
- `impl` implementation
- `arch` architecture
- `perf` performance
- `deps` dependencies
- `val` validation
- `sec` security
- `opt` optimization

### Quality Standards

#### Engineering Principles
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It

#### Quality Quadrants
- **Functional**: Correctness, reliability, completeness
- **Structural**: Organization, maintainability, technical debt
- **Performance**: Speed, scalability, resource efficiency
- **Security**: Vulnerability management, access control, data protection

#### Rule Priorities
- **🔴 CRITICAL**: Security, data safety, production breaks - Never compromise
- **🟡 IMPORTANT**: Quality, maintainability, professionalism - Strong preference
- **🟢 RECOMMENDED**: Optimization, style, best practices - Apply when practical

### Flags & Commands

#### Mode Flags
- `--brainstorm` Activate collaborative discovery mindset
- `--introspect` Expose thinking process with transparency
- `--task-manage` Orchestrate through delegation and tracking
- `--orchestrate` Optimize tool selection and parallel execution
- `--token-efficient` Symbol-enhanced communication for efficiency

#### MCP Flags
- `--c7 / --context7` Enable Context7 for documentation
- `--seq / --sequential` Enable Sequential for structured reasoning
- `--magic` Enable Magic for UI generation
- `--morph / --morphllm` Enable Morphllm for bulk edits
- `--serena` Enable Serena for semantic operations
- `--play / --playwright` Enable Playwright for browser testing
- `--all-mcp` Enable all MCP servers
- `--no-mcp` Disable all MCP servers

#### Analysis Flags
- `--think` Standard analysis (~4K tokens)
- `--think-hard` Deep analysis (~10K tokens)
- `--ultrathink` Maximum analysis (~32K tokens)

#### Execution Flags
- `--delegate [auto|files|folders]` Enable sub-agent processing
- `--concurrency [n]` Control max concurrent operations
- `--loop` Enable iterative improvement cycles
- `--validate` Pre-execution risk assessment
- `--safe-mode` Maximum validation, conservative execution
- `--uc / --ultracompressed` Symbol communication, 30-50% token reduction
- `--scope [file|module|project|system]` Define operational scope
- `--focus [domain]` Target specific analysis domain

### Slash Commands

#### Core Commands
- `/sc:load` Load session context from Serena memory
- `/sc:save` Save session context to Serena memory
- `/sc:task` Execute complex tasks with workflow management
- `/sc:implement` Feature implementation with persona activation
- `/sc:analyze` Comprehensive code analysis
- `/sc:design` Design system architecture and APIs
- `/sc:build` Build, compile, and package projects
- `/sc:test` Execute tests with coverage analysis
- `/sc:business-panel` Multi-expert business analysis

#### Workflow Commands
- `/sc:workflow` Generate structured implementation workflows
- `/sc:brainstorm` Interactive requirements discovery
- `/sc:git` Git operations with intelligent commits
- `/sc:cleanup` Systematically clean up code
- `/sc:improve` Apply systematic improvements
- `/sc:troubleshoot` Diagnose and resolve issues

#### Analysis Commands
- `/sc:explain` Provide clear explanations
- `/sc:reflect` Task reflection and validation
- `/sc:estimate` Development estimates
- `/sc:spec-panel` Multi-expert specification review

#### Meta Commands
- `/sc:help` List all available commands
- `/sc:index` Generate comprehensive documentation
- `/sc:document` Generate focused documentation
- `/sc:spawn` Meta-system task orchestration
- `/sc:select-tool` Intelligent MCP tool selection

### File Organization

#### Standard Directories
- `claudedocs/` Claude-specific documentation, reports, analyses
- `tests/` All test files (`__tests__/`, `test/`)
- `scripts/` Utility scripts (`tools/`, `bin/`)

#### File Naming Conventions
- Follow language standards (camelCase for JS, snake_case for Python)
- Descriptive names that clearly indicate purpose
- Match existing project patterns

### Context Window Management

#### Resource Zones
- **🟢 Green Zone (0-75%)**: Full capabilities, normal verbosity
- **🟡 Yellow Zone (75-85%)**: Efficiency mode, reduced verbosity
- **🔴 Red Zone (85%+)**: Essential operations only, minimal output

#### Optimization Strategies
- **Parallel Operations**: Execute independent tasks concurrently
- **Batch Operations**: Group similar operations for efficiency
- **Agent Delegation**: Use Task agents for complex multi-step work
- **Symbol Compression**: Use visual symbols for logic and status
- **Structured Templates**: Organized formats reducing repetitive text

### Git Workflow

#### Branch Strategy
- **Feature Branches**: All work on feature branches, never main/master
- **Incremental Commits**: Frequent meaningful commits
- **Restore Points**: Commit before risky operations

#### Commit Guidelines
- Descriptive messages (avoid "fix", "update", "changes")
- Verify with `git diff` before staging
- Non-destructive workflow with rollback capability

---

## Quick Reference

### When to Use Which MCP
```
Documentation     → Context7
UI Components     → Magic
Bulk Edits        → Morphllm
Browser Testing   → Playwright
Symbol Operations → Serena
Deep Analysis     → Sequential
```

### Decision Tree
```
>3 steps?          → TodoWrite required
>75% context?      → Token efficiency mode
Multi-tool task?   → Orchestration mode
Vague requirements? → Brainstorming mode
Complex analysis?  → Sequential MCP
Symbol operation?  → Serena MCP
UI component?      → Magic MCP
```

### Priority Rules
```
Safety > Scope > Quality > Speed
Evidence > Assumptions
Parallel > Sequential (when possible)
Specific Tool > Generic Tool
Complete Implementation > Partial Feature
```
