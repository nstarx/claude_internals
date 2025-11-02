# MCP Server Selection Guide

**Purpose**: Comprehensive decision framework for choosing the optimal MCP server(s) for any task

## Quick Selection Matrix

| Your Task | Primary MCP | Why? | Alternative |
|-----------|-------------|------|-------------|
| UI components, forms, layouts | **Magic** | Modern patterns, a11y built-in | Manual coding |
| Complex debugging, system design | **Sequential** | Hypothesis testing, structured reasoning | Native analysis |
| Symbol operations, refactoring | **Serena** | Semantic understanding, LSP integration | Grep + Edit |
| Bulk pattern edits, style enforcement | **Morphllm** | Token-efficient transformations | Bash sed/awk |
| Official docs, framework patterns | **Context7** | Curated, version-specific docs | WebSearch |
| E2E testing, browser automation | **Playwright** | Real browser, visual testing | Unit tests |

---

## Decision Trees

### 1. Code Understanding & Analysis

```
Need to understand code?
├─ Symbol-level (classes, functions, references)
│  └─ **Serena** - Semantic code navigation with LSP
├─ Pattern-level (repeated structures, anti-patterns)
│  └─ **Sequential** - Multi-step analysis with hypothesis testing
├─ Architecture-level (system design, dependencies)
│  └─ **Sequential** + **Serena** - Combined semantic + reasoning
└─ Documentation (official patterns, API reference)
   └─ **Context7** - Curated library documentation
```

### 2. Code Modification

```
Need to modify code?
├─ Single symbol (rename, extract, move)
│  └─ **Serena** - Symbol operations with dependency tracking
├─ Multiple files with same pattern
│  └─ **Morphllm** - Bulk pattern-based edits (token efficient)
├─ UI components (forms, buttons, layouts)
│  └─ **Magic** - Modern component generation from 21st.dev
└─ Complex refactoring (architectural changes)
   └─ **Sequential** (plan) + **Serena** (analyze) + **Morphllm** (execute)
```

### 3. Testing & Validation

```
Need to test functionality?
├─ End-to-end user workflows
│  └─ **Playwright** - Real browser automation and interaction
├─ Visual regression testing
│  └─ **Playwright** - Screenshot comparison across browsers
├─ Accessibility testing
│  └─ **Playwright** - Keyboard nav, screen reader, ARIA validation
└─ Unit/integration tests
   └─ Native tools (Jest, Vitest, Mocha)
```

### 4. Problem Solving

```
Need to solve a complex problem?
├─ Multi-step reasoning required
│  └─ **Sequential** - Structured hypothesis-driven analysis
├─ Need official documentation
│  └─ **Context7** - Authoritative patterns and APIs
├─ Large codebase navigation
│  └─ **Serena** - Project memory and semantic search
└─ Simple, direct solution
   └─ Native Claude - Built-in reasoning sufficient
```

---

## Combination Strategies

### Power Combinations

**🎯 Architectural Refactoring**
```
Sequential → Serena → Morphllm
1. Sequential: Analyze system and plan transformation
2. Serena: Identify all symbols and dependencies
3. Morphllm: Execute bulk pattern changes efficiently
```

**🎨 Modern UI Development**
```
Context7 → Magic → Playwright
1. Context7: Get official framework patterns
2. Magic: Generate components following patterns
3. Playwright: Test user interactions and accessibility
```

**🔍 Complex Debugging**
```
Sequential → Serena → Context7
1. Sequential: Systematic hypothesis testing
2. Serena: Navigate code symbols and references
3. Context7: Verify against official documentation
```

**📦 Framework Migration**
```
Serena → Sequential → Context7 → Morphllm
1. Serena: Map all current usage patterns
2. Sequential: Plan migration strategy
3. Context7: Get new framework patterns
4. Morphllm: Apply bulk transformations
```

**🧪 Comprehensive Testing**
```
Magic → Playwright → Sequential
1. Magic: Generate UI components
2. Playwright: Create E2E test scenarios
3. Sequential: Analyze test coverage and edge cases
```

---

## When NOT to Use MCP Servers

**Use Native Tools When:**
- ✅ Simple single-file edits
- ✅ Reading/writing basic code
- ✅ Straightforward analysis
- ✅ Well-known patterns from training data
- ✅ Quick explanations

**MCP servers add overhead - only use when their specialized capabilities provide clear value**

---

## MCP Server Deep Dive

### Context7: Official Documentation
**Best For**: Framework compliance, version-specific APIs, authoritative patterns

**Choose When:**
- Implementing with specific library/framework versions
- Need official best practices, not generic solutions
- API correctness is critical
- Migrating between versions

**Skip When:**
- General programming questions
- Internal codebase patterns
- Well-known common patterns
- Custom implementations

**Fallback**: WebSearch → WebFetch → Built-in knowledge

---

### Magic: Modern UI Components
**Best For**: Rapid UI development, design system adherence, accessibility

**Choose When:**
- Standard UI components (forms, cards, navigation)
- Need modern patterns (responsive, accessible, animated)
- Following 21st.dev or design systems
- Prototyping quickly

**Skip When:**
- Highly custom/brand-specific designs
- Non-UI code generation
- Backend components
- Data visualization (use specialized libraries)

**Fallback**: Manual coding with Read/Write/Edit

---

### Morphllm: Pattern-Based Edits
**Best For**: Bulk transformations, style enforcement, token efficiency

**Choose When:**
- Multi-file pattern replacements (>5 files)
- Style guide enforcement across codebase
- Framework updates (class components → hooks)
- Bulk text transformations

**Skip When:**
- Semantic refactoring (symbol renames)
- Single-file edits
- Complex dependency tracking needed
- LSP operations required

**Fallback**: Bash sed/awk, Grep + multiple Edit calls

---

### Playwright: Browser Automation
**Best For**: E2E testing, visual validation, accessibility testing

**Choose When:**
- Testing complete user workflows
- Visual regression testing
- Cross-browser compatibility
- Keyboard navigation and screen readers
- Real browser interactions

**Skip When:**
- Unit testing pure functions
- API testing
- Backend logic validation
- Build/compile testing

**Fallback**: Unit tests (Jest, Vitest), manual testing

---

### Serena: Semantic Code Understanding
**Best For**: Symbol operations, project memory, session persistence

**Choose When:**
- Renaming symbols project-wide
- Finding all references to code elements
- Large codebase navigation (>50 files)
- Need session state across interactions
- LSP-level understanding required

**Skip When:**
- Simple text search/replace
- Small projects (<20 files)
- Pattern-based edits without semantic meaning
- No need for dependency tracking

**Fallback**: Grep (search), Edit (modifications), git commits (state)

---

### Sequential: Structured Reasoning
**Best For**: Complex analysis, hypothesis testing, adaptive problem-solving

**Choose When:**
- Multi-component system analysis
- Debugging complex/intermittent issues
- Architectural design decisions
- Need explicit reasoning chain
- Problem may require course correction

**Skip When:**
- Simple linear problems
- Direct questions with obvious answers
- Single-domain straightforward tasks
- No need for hypothesis verification

**Fallback**: Native Claude reasoning, Task tool for delegation

---

## Performance Considerations

### Token Efficiency
**Most Efficient → Least Efficient**
1. **Morphllm** - Specialized for bulk operations with compression
2. **Serena** - Semantic operations avoid reading full files
3. **Context7** - Curated docs vs full web searches
4. **Magic** - Direct generation vs iterative coding
5. **Sequential** - Explicit reasoning has overhead
6. **Playwright** - Browser automation is resource-intensive

**Strategy**: Use most efficient tool that meets your needs

### Speed
**Fastest → Slowest**
1. **Serena** - LSP operations are near-instant
2. **Morphllm** - Optimized pattern processing
3. **Magic** - Direct component generation
4. **Context7** - Pre-processed documentation
5. **Sequential** - Multi-step reasoning takes time
6. **Playwright** - Real browser execution is slowest

**Strategy**: Parallel operations when possible (e.g., Serena analysis while Sequential plans)

---

## Common Scenarios

### "I need to add authentication to my app"
```
1. Context7 → Get official auth library patterns (Auth0, Firebase, NextAuth)
2. Magic → Generate login/register UI components
3. Sequential → Plan integration with existing architecture
4. Playwright → Test authentication flows E2E
```

### "My app is slow, need to optimize"
```
1. Sequential → Analyze performance bottlenecks systematically
2. Serena → Find all instances of problematic patterns
3. Context7 → Get official optimization patterns
4. Morphllm → Apply optimizations across codebase
```

### "Migrate from Vue 2 to Vue 3"
```
1. Serena → Map all Vue 2 API usage (mixins, filters, etc.)
2. Sequential → Plan migration strategy and phases
3. Context7 → Get Vue 3 composition API patterns
4. Morphllm → Bulk transform to new patterns
5. Playwright → Validate functionality after migration
```

### "Build a new feature: user dashboard"
```
1. Sequential → Design component architecture and data flow
2. Context7 → Get framework-specific patterns (React, Vue, etc.)
3. Magic → Generate dashboard UI components
4. Serena → Integrate with existing codebase symbols
5. Playwright → Test dashboard workflows and responsiveness
```

### "Debug why tests are flaky"
```
1. Sequential → Systematic hypothesis testing for intermittent failures
2. Serena → Trace test dependencies and shared state
3. Playwright → Identify timing issues in E2E tests
4. Context7 → Verify testing patterns against best practices
```

---

## Advanced Patterns

### Parallel MCP Usage
**When multiple MCPs can work simultaneously:**
```
Parallel execution for efficiency:
- Serena analyzes codebase structure
- Context7 fetches documentation
- Sequential plans implementation
→ Combine results for comprehensive understanding
```

### Sequential MCP Chaining
**When outputs feed into next stage:**
```
Sequential execution for dependencies:
1. Serena identifies symbols → (output)
2. Sequential analyzes relationships → (uses output from 1)
3. Morphllm applies transformations → (uses output from 2)
```

### Fallback Cascading
**When primary MCP unavailable:**
```
Context7 unavailable?
└─ Try WebSearch for docs
   └─ Try WebFetch for direct URL
      └─ Fall back to built-in knowledge
         └─ Infer from existing codebase patterns
```

---

## Quality Gates

### Use MCP When Value Is Clear
✅ **Good MCP Usage**:
- Magic for dashboard: Generates 5 complex components in seconds
- Sequential for debugging: Systematically tests 10 hypotheses
- Serena for refactoring: Tracks 50+ symbol references across files

❌ **Poor MCP Usage**:
- Magic for "hello world" button (manual is faster)
- Sequential for "what does this do?" (native reasoning sufficient)
- Serena for single-file search (Grep is faster)

### Validate MCP Selection
**Ask yourself:**
1. Does this task match the MCP's core strength?
2. Is the MCP faster/better than alternatives?
3. Does the complexity justify the overhead?
4. Could native tools do this sufficiently?

**If answering "no" to questions 1-3, or "yes" to question 4 → Use native tools**

---

## Related Documentation

- **Core Framework**: [FLAGS.md](../core/FLAGS.md) for MCP activation flags
- **Modes**: [Orchestration Mode](../modes/Orchestration.md) for tool selection strategy
- **Individual MCPs**: See [mcp/](../mcp/) directory for detailed documentation
- **Quick Reference**: [Quick_Reference.md](Quick_Reference.md) for one-page cheat sheet

---

**Last Updated**: 2025-11-02
**Version**: 1.0
**Related**: Orchestration Mode, MCP Server Documentation
