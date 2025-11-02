# Workflow Examples

**Real-world multi-step development workflows using SuperClaude framework**

[Examples Home](README.md) | [Integration Patterns](Integration_Patterns.md) | [Use Cases](Use_Cases.md)

---

## Feature Development Workflows

### Workflow 1: New Feature from Vague Idea

**Scenario**: User says "I want to improve our onboarding experience"

**Steps**:
```bash
# 1. Discovery Phase
/sc:brainstorm I want to improve our onboarding experience

# Claude asks clarifying questions:
# - What aspects of onboarding need improvement?
# - Who are the target users?
# - What metrics define success?
# User provides answers...

# 2. Requirements Clarification
# After brainstorming, we have: "Add interactive tutorial with tooltips
# and progress tracking for first-time users"

# 3. Generate Implementation Workflow
/sc:workflow Add interactive tutorial with tooltips and progress tracking for first-time users

# Outputs structured workflow with phases

# 4. Implementation with tracking
/sc:implement --task-manage Interactive tutorial system with tooltips and progress tracking

# Claude creates todos:
# [ ] Design tutorial state management
# [ ] Create tooltip component
# [ ] Implement progress tracker
# [ ] Add tutorial triggers
# [ ] Test tutorial flow
# [ ] Update documentation

# 5. Implementation proceeds with progress tracking...

# 6. Testing
/sc:test tests/tutorial/

# 7. Quality validation
/sc:reflect Completed tutorial system implementation
```

**Outcome**: Full feature delivered with proper planning, tracking, and validation

**Tools Used**: Brainstorming Mode, /sc:workflow, /sc:implement, Task Management Mode

---

### Workflow 2: API Feature with Documentation

**Scenario**: "Build REST API for product catalog with full documentation"

**Steps**:
```bash
# 1. Design Phase
/sc:design --scope module REST API for product catalog with CRUD operations

# Outputs: API design specification with endpoints, data models, validation

# 2. Check official patterns
--c7 "Express.js REST API best practices"

# Gets official patterns for Express.js APIs

# 3. Implementation
/sc:implement --task-manage --c7 Product catalog REST API with validation and error handling

# Implementation proceeds with:
# - Task tracking
# - Official Express patterns
# - Proper validation

# 4. Testing
/sc:test --coverage api/products/

# 5. Documentation generation
/sc:document --type api src/api/products/

# Generates API documentation

# 6. Validation
/sc:analyze --focus security src/api/products/

# Security analysis of new API

# 7. Commit
/sc:git commit
```

**Outcome**: Production-ready API with documentation and security validation

**Tools Used**: /sc:design, Context7 MCP, /sc:implement, /sc:document, /sc:analyze

---

### Workflow 3: UI Component with Testing

**Scenario**: "Create a modern checkout form with validation"

**Steps**:
```bash
# 1. Generate component with Magic
--magic Create checkout form with:
- Email, shipping address, payment method
- Real-time validation
- Accessibility support
- Mobile responsive

# Magic generates modern component

# 2. Integration
/sc:task --task-manage Integrate checkout form with payment API

# Tasks:
# [ ] Add payment API integration
# [ ] Connect validation to backend
# [ ] Add error handling
# [ ] Test payment flow

# 3. E2E Testing
--play Create E2E test for checkout flow:
1. Fill form with valid data
2. Submit payment
3. Verify confirmation page

# Playwright generates browser test

# 4. Accessibility validation
/sc:analyze --focus accessibility src/components/CheckoutForm.tsx

# 5. Commit
/sc:git commit
```

**Outcome**: Complete, tested, accessible checkout form

**Tools Used**: Magic MCP, Playwright MCP, Task Management Mode

---

## Refactoring Workflows

### Workflow 4: Large-Scale Code Refactoring

**Scenario**: "Refactor 50 components to use new theme API"

**Steps**:
```bash
# 1. Analysis phase
/sc:analyze --serena src/components/

# Understand component structure and dependencies

# 2. Find all theme usage
--serena Find all usages of old theme API

# Serena finds all locations using old API

# 3. Plan transformation
/sc:task --task-manage Migrate all components to new theme API

# 4. Bulk transformation
--morph --task-manage Apply pattern:
OLD: import { theme } from './oldTheme'
NEW: import { useTheme } from './newThemeApi'

OLD: theme.colors.primary
NEW: useTheme().colors.primary

# Morphllm applies transformation across all 50 files
# 30-50% token savings vs sequential edits

# 5. Validation
/sc:test tests/components/

# 6. Build check
/sc:build

# 7. Quality check
/sc:reflect Completed theme API migration across 50 components
```

**Outcome**: Consistent refactoring across large codebase with validation

**Tools Used**: Serena MCP, Morphllm MCP, Task Management Mode

**Token Savings**: ~35% using Morphllm vs sequential edits

---

### Workflow 5: Symbol Rename with Dependency Tracking

**Scenario**: "Rename UserService to AccountService across entire project"

**Steps**:
```bash
# 1. Load project context
/sc:load

# 2. Find all references
--serena Find all references to UserService

# Serena provides:
# - All locations where UserService is used
# - Import statements
# - Type references
# - Comments

# 3. Plan rename
/sc:task --task-manage Rename UserService to AccountService with dependency updates

# 4. Execute rename
--serena Rename symbol UserService to AccountService

# Serena performs semantic rename across:
# - Class definition
# - All imports
# - All usages
# - Type definitions
# - Test files

# 5. Update related documentation
/sc:document --update docs/services/

# 6. Test everything
/sc:test

# 7. Save context
/sc:save

# 8. Commit
/sc:git commit
```

**Outcome**: Safe, complete rename with no broken references

**Tools Used**: Serena MCP (session persistence + symbol operations)

---

## Debugging Workflows

### Workflow 6: Complex Bug Investigation

**Scenario**: "Application crashes intermittently on checkout"

**Steps**:
```bash
# 1. Deep analysis with structured thinking
/sc:troubleshoot --think-hard --seq Application crashes intermittently during checkout

# Sequential MCP provides:
# - Hypothesis generation
# - Structured investigation steps
# - Hypothesis testing
# - Verification

# Claude identifies: "Race condition in payment state management"

# 2. Analyze payment flow
/sc:analyze --serena src/payment/

# 3. Find all state updates
--serena Find all references to paymentState

# 4. Root cause analysis with introspection
--introspect Analyze race condition in payment state

# Claude shows thinking process:
# 🤔 Multiple async operations updating paymentState
# ⚡ No locking mechanism
# 💡 Add state machine with explicit transitions

# 5. Design fix
/sc:design --scope module Payment state machine with race condition prevention

# 6. Implement fix
/sc:implement --validate Payment state machine with atomic transitions

# 7. Add regression test
/sc:test Write test for concurrent payment operations

# 8. Verify fix
--play Test checkout flow with concurrent operations

# 9. Reflect on solution
/sc:reflect Fixed race condition in payment state
```

**Outcome**: Root cause found, fixed, tested with regression prevention

**Tools Used**: Sequential MCP, Serena MCP, Introspection Mode, Playwright MCP

---

### Workflow 7: Performance Investigation

**Scenario**: "Dashboard is slow with large datasets"

**Steps**:
```bash
# 1. Performance analysis
/sc:analyze --focus performance src/dashboard/

# Identifies issues:
# - Unnecessary re-renders
# - Missing memoization
# - Large data processing in render

# 2. Deep dive with official patterns
--c7 --think React performance optimization patterns

# Gets official React optimization strategies

# 3. Plan improvements
/sc:improve --focus performance --task-manage src/dashboard/Dashboard.tsx

# Tasks:
# [ ] Add React.memo to expensive components
# [ ] Use useMemo for computed values
# [ ] Implement virtual scrolling for list
# [ ] Move data processing to Web Worker

# 4. Implement optimizations (tracked)

# 5. Measure improvement
/sc:test --performance tests/dashboard.perf.test.js

# 6. Validate no regressions
/sc:test tests/dashboard/

# 7. Document optimizations
/sc:document --type guide src/dashboard/performance.md
```

**Outcome**: Dashboard performance improved with documentation

**Tools Used**: Context7 MCP, /sc:analyze, /sc:improve, Task Management Mode

---

## Business Analysis Workflows

### Workflow 8: Strategic Planning with Expert Panel

**Scenario**: "Evaluate whether to pivot to B2B market"

**Steps**:
```bash
# 1. Initial analysis in debate mode
/sc:business-panel --mode debate "Should we pivot from B2C to B2B SaaS?"

# Debate between experts:
# - Porter: Analyzes competitive forces in both markets
# - Christensen: Applies jobs-to-be-done framework
# - Taleb: Evaluates risks and antifragility
# - Kim/Mauborgne: Explores blue ocean opportunities
# - Meadows: Systems thinking on business model shift

# Synthesis shows productive tensions and recommendations

# 2. Deep dive on specific framework
/sc:business-panel --experts "porter" @market_analysis.pdf --think-hard

# Porter's detailed five forces analysis

# 3. Risk assessment
/sc:business-panel --experts "taleb,meadows" --mode discussion Risk analysis of B2B pivot

# Taleb: Antifragility perspective
# Meadows: System leverage points

# 4. Implementation strategy
/sc:business-panel --experts "drucker,collins" Implementation strategy for B2B transition

# Management and execution excellence perspectives

# 5. Communication plan
/sc:business-panel --experts "doumont" @stakeholder_presentation.pptx

# Optimize communication clarity

# 6. Generate comprehensive report
/sc:document --type guide Strategic analysis: B2C to B2B pivot
```

**Outcome**: Comprehensive strategic analysis from multiple expert frameworks

**Tools Used**: Business Panel Mode, Sequential MCP, /sc:document

---

## System Design Workflows

### Workflow 9: Microservices Architecture Design

**Scenario**: "Design microservices architecture for e-commerce platform"

**Steps**:
```bash
# 1. High-level design with deep thinking
/sc:design --scope system --ultrathink Microservices architecture for e-commerce platform

# Comprehensive design with:
# - Service boundaries
# - Communication patterns
# - Data management
# - Deployment strategy

# 2. Validate design against official patterns
--c7 Microservices patterns for Node.js

# 3. Specification review by experts
/sc:spec-panel @architecture_design.md

# Expert panel reviews specification for:
# - Completeness
# - Best practices
# - Potential issues
# - Improvements

# 4. Business validation
/sc:business-panel --experts "drucker,meadows" @architecture_design.md

# Validate from business and systems perspective

# 5. Generate implementation workflow
/sc:workflow @architecture_design.md

# Breakdown into implementation phases

# 6. Documentation
/sc:document --type reference Microservices architecture guide

# 7. Save for implementation phase
/sc:save
```

**Outcome**: Validated architecture design ready for implementation

**Tools Used**: /sc:design, Context7 MCP, /sc:spec-panel, Business Panel, Sequential MCP

---

## Session Management Workflows

### Workflow 10: Long-Running Project Across Sessions

**Day 1**:
```bash
# Start session
/sc:load

# Discovery
/sc:brainstorm Build a multi-tenant SaaS platform

# Design
/sc:design --scope system Multi-tenant SaaS architecture

# Generate workflow
/sc:workflow @design_spec.md

# Begin implementation
/sc:implement --task-manage Database schema and tenant isolation

# Work for 2 hours...

# Checkpoint
/sc:save
# Note: "Completed database schema design, starting API implementation"
```

**Day 2**:
```bash
# Restore context
/sc:load
# Context restored: "Day 1 completed database schema, ready for API implementation"

# Continue implementation
/sc:implement --task-manage REST API with tenant isolation

# Work proceeds with full context...

# Checkpoint
/sc:save
```

**Day 3**:
```bash
# Restore context
/sc:load

# Complete implementation
/sc:implement --task-manage Frontend with tenant switching

# Testing
/sc:test --coverage

# Final validation
/sc:reflect Multi-tenant SaaS platform implementation complete

# Business analysis
/sc:business-panel --mode socratic Evaluate multi-tenant SaaS go-to-market strategy

# Final save
/sc:save
```

**Outcome**: Multi-day project with continuous context preservation

**Tools Used**: Serena MCP (/sc:load, /sc:save), Task Management, Business Panel

---

## Token-Efficient Workflows

### Workflow 11: Large Operation Under Context Pressure

**Scenario**: Context at 80%, need to refactor authentication system

**Steps**:
```bash
# 1. Enable ultra-compression
--uc --task-manage Refactor authentication to JWT-based system

# Claude uses:
# - Symbol communication (→, ⇒, ∴, ✅, 🔧)
# - Abbreviations (cfg, impl, val, sec)
# - Structured templates
# - Minimal verbosity

# Example output:
# 📋 Tasks:
# 1. 🔧 cfg → JWT setup
# 2. 🔐 impl → token gen/val
# 3. ⚡ migrate → session → JWT
# 4. 🧪 test → auth flow
# 5. ✅ val → sec scan

# 2. Efficient analysis
--uc --serena Find auth dependencies

# Symbol-rich output with 40% token savings

# 3. Pattern-based transformation
--uc --morph session-based → JWT pattern

# 4. Compressed validation
--uc /sc:test auth/

# 5. Save for next session (context too high)
/sc:save
```

**Outcome**: Major refactoring completed with 40% token reduction

**Tools Used**: Ultra-Compressed Mode (--uc), Serena MCP, Morphllm MCP

**Token Savings**: ~40% throughout workflow

---

## Complex Multi-Domain Workflows

### Workflow 12: Full-Stack Feature from Scratch

**Scenario**: "Build full social sharing feature with analytics"

**Steps**:
```bash
# 1. Spawn meta-orchestration
/sc:spawn Build complete social sharing feature:
- Backend API for share tracking
- Frontend share buttons with preview
- Analytics dashboard
- Email notifications on shares

# Intelligent breakdown into specialized tasks:

# Backend Task (delegated):
/sc:implement --task-manage --serena Social sharing API with analytics

# Frontend Task (delegated):
/sc:implement --task-manage --magic Share button components with preview cards

# Analytics Task (delegated):
/sc:implement --task-manage --serena Analytics aggregation and dashboard

# Testing Task (delegated):
/sc:test --play E2E tests for complete sharing workflow

# 2. Integration phase
/sc:task --orchestrate Integrate all social sharing components

# 3. System validation
/sc:analyze --scope system social-sharing-feature/

# 4. Documentation
/sc:document --type guide Social sharing feature guide

# 5. Business validation
/sc:business-panel --experts "godin,meadows" Evaluate viral potential of sharing feature

# 6. Final commit
/sc:git pr main
```

**Outcome**: Complete full-stack feature with business validation

**Tools Used**: /sc:spawn, Multiple MCPs, Orchestration Mode, Business Panel

---

## Best Practices Demonstrated

### Workflow Pattern Summary

1. **Always start with clarity**: Use /sc:brainstorm for vague requirements
2. **Plan before executing**: Use /sc:workflow for complex tasks
3. **Track progress**: Use --task-manage for >3 steps
4. **Choose right tools**: Match MCPs to task type
5. **Validate throughout**: Test, analyze, reflect at each phase
6. **Save context**: Use /sc:save for long operations
7. **Optimize tokens**: Use --uc when context >75%
8. **Business alignment**: Use /sc:business-panel for strategic validation

### Token Efficiency Tips

- Start without flags, add as needed
- Use --uc proactively when context >75%
- Combine modes for efficiency (--task-manage --uc --serena)
- Leverage batch operations (--morph for bulk edits)
- Save/load context to avoid re-explaining

---

## Related Documentation

- **[Integration Patterns](Integration_Patterns.md)**: Mode and MCP combinations
- **[Use Cases](Use_Cases.md)**: Scenario-based examples
- **[Quick Reference](../reference/Quick_Reference.md)**: Pattern cheat sheet
- **[Decision Trees](../reference/Decision_Trees.md)**: Tool selection guide

---

**Version**: 1.0
**Last Updated**: 2025-11-02
