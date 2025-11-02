# Integration Patterns

**Mode and MCP combinations for optimal workflows**

[Examples Home](README.md) | [Workflow Examples](Workflow_Examples.md) | [Use Cases](Use_Cases.md)

---

## Overview

This guide shows effective combinations of behavioral modes and MCP servers for common scenarios. Learn which tools work well together and when to use them.

---

## Core Integration Patterns

### Pattern 1: Semantic Analysis + Bulk Transformation

**Combination**: Serena + Morphllm + Task Management

**Use Case**: Large-scale code refactoring

**Why it works**:
- Serena provides semantic understanding
- Morphllm applies transformations efficiently
- Task Management tracks progress

**Example**:
```bash
/sc:task --task-manage --serena --morph Migrate 100 components from class to hooks

# Flow:
# 1. Serena analyzes component structure
# 2. Identifies all class components
# 3. Morphllm applies transformation pattern
# 4. Task tracking ensures completion

# Result: 40-50% token savings, semantic safety
```

**Token Efficiency**: ⚡ High (30-50% savings)
**Safety**: ✅ High (semantic understanding)

---

### Pattern 2: Official Patterns + UI Generation

**Combination**: Context7 + Magic

**Use Case**: Building UI components with best practices

**Why it works**:
- Context7 provides framework-specific patterns
- Magic generates modern components
- Components follow official guidelines

**Example**:
```bash
--c7 --magic Create form with React Hook Form patterns:
- Email validation
- Password strength
- Accessibility features

# Flow:
# 1. Context7 fetches React Hook Form docs
# 2. Magic generates component following official patterns
# 3. Result: Modern, accessible, pattern-compliant form

# Result: Production-ready component
```

**Token Efficiency**: 🟢 Moderate
**Quality**: ✅ High (official patterns)

---

### Pattern 3: Deep Analysis + Structured Reasoning

**Combination**: Sequential + Context7 + Introspection

**Use Case**: Complex debugging or system design

**Why it works**:
- Sequential provides structured thinking
- Context7 brings relevant documentation
- Introspection shows reasoning process

**Example**:
```bash
/sc:troubleshoot --think-hard --seq --c7 --introspect Complex memory leak in React app

# Flow:
# 1. Sequential structures investigation
# 2. Generates hypotheses
# 3. Context7 fetches React memory management docs
# 4. Introspection shows reasoning
# 5. Tests hypotheses systematically

# Result: Root cause identified with explanation
```

**Token Efficiency**: 🔴 Lower (deep analysis)
**Effectiveness**: ✅ Very High (complex problems)

---

### Pattern 4: Discovery + Workflow + Implementation

**Combination**: Brainstorming → /sc:workflow → Task Management + /sc:implement

**Use Case**: Feature development from vague idea

**Why it works**:
- Brainstorming clarifies requirements
- Workflow structures implementation
- Task Management tracks execution

**Example**:
```bash
# Phase 1: Discovery
/sc:brainstorm --uc I want better user engagement

# Clarified: "Add gamification with badges and leaderboards"

# Phase 2: Workflow
/sc:workflow Gamification system with badges and leaderboards

# Phase 3: Implementation
/sc:implement --task-manage Gamification system from workflow spec

# Result: Clear path from idea to implementation
```

**Token Efficiency**: 🟢 Good (phased approach)
**Completeness**: ✅ Very High (nothing missed)

---

### Pattern 5: Symbol Operations + Session Persistence

**Combination**: Serena (/sc:load, /sc:save) + Symbol Operations

**Use Case**: Multi-session refactoring

**Why it works**:
- Context preserved across sessions
- Symbol operations maintain semantic integrity
- Large refactorings can span multiple days

**Example**:
```bash
# Day 1
/sc:load
--serena Rename architecture: Monolith → Microservices prep
/sc:save

# Day 2
/sc:load
# Context restored
--serena Extract service boundaries
/sc:save

# Day 3
/sc:load
# Context restored
--serena Complete service extraction
/sc:reflect
/sc:save

# Result: Multi-day refactoring with continuous context
```

**Token Efficiency**: ⚡ Very High (context reuse)
**Safety**: ✅ High (semantic operations)

---

## Mode-Specific Integration Patterns

### Brainstorming Mode Combinations

#### Brainstorm + Business Panel
**Use Case**: Strategic exploration

```bash
/sc:brainstorm Exploring new market opportunities
# After clarification:
/sc:business-panel Evaluate market entry strategy for [clarified opportunity]

# Result: Idea → Strategy
```

#### Brainstorm + Design
**Use Case**: Architectural exploration

```bash
/sc:brainstorm System architecture options
# After clarification:
/sc:design --scope system [clarified architecture]

# Result: Exploration → Specification
```

---

### Task Management Mode Combinations

#### Task Management + Orchestration
**Use Case**: Complex multi-tool operations

```bash
/sc:task --task-manage --orchestrate Migrate database schema

# Orchestration optimizes:
# - Tool selection (Serena for analysis)
# - Parallel operations where possible
# - Resource efficiency

# Task Management tracks:
# - Progress across all steps
# - Dependencies
# - Completion status
```

#### Task Management + Token Efficiency
**Use Case**: Large operations under context pressure

```bash
/sc:task --task-manage --uc Large-scale refactoring

# Token Efficiency provides:
# - Symbol-based updates (30-50% savings)
# - Compressed progress reports
# - Efficient task tracking

# Task Management maintains:
# - Complete tracking
# - All todos visible
```

---

### Token Efficiency Mode Combinations

#### Ultra-Compressed + Serena + Morphllm
**Use Case**: Maximum efficiency for bulk operations

```bash
--uc --serena --morph Update 200 files with new API pattern

# Result:
# - 40% token reduction from --uc
# - 30% reduction from Morphllm
# - Combined: ~55-60% total savings

# Output style:
# ✅ analyze → 200 files
# 📊 pattern → old API → new API
# 🔄 transform → batch
# ✅ val → tests pass
```

**Token Efficiency**: ⚡⚡ Extreme (55-60% savings)

---

## MCP-Specific Integration Patterns

### Context7 Integration Patterns

#### Context7 + Sequential (Deep Learning)
```bash
--c7 --seq --think-hard Learn advanced React patterns

# Sequential structures learning
# Context7 provides official docs
# Deep understanding achieved
```

#### Context7 + Magic (Pattern-Based Generation)
```bash
--c7 --magic Generate auth components following Auth0 patterns

# Context7: Auth0 official patterns
# Magic: Component generation
# Result: Pattern-compliant components
```

---

### Serena Integration Patterns

#### Serena + Sequential (Architecture Analysis)
```bash
--serena --seq Analyze system architecture and dependencies

# Serena: Semantic understanding
# Sequential: Structured analysis
# Result: Comprehensive architecture map
```

#### Serena + Morphllm + Task Management (Bulk Refactoring)
```bash
--serena --morph --task-manage Refactor 50 services

# Serena: Analyze dependencies
# Morphllm: Apply transformations
# Task Mgmt: Track all 50 services
# Result: Safe, tracked, efficient refactoring
```

---

### Playwright Integration Patterns

#### Playwright + Task Management (E2E Suite)
```bash
/sc:test --play --task-manage Generate E2E test suite

# Playwright: Browser automation
# Task Mgmt: Track test creation
# Result: Complete E2E coverage
```

#### Playwright + Magic (Component + Test)
```bash
--magic --play Create checkout form with E2E tests

# Magic: Generate form component
# Playwright: Generate E2E tests
# Result: Component + tests together
```

---

## Business Analysis Integration Patterns

### Business Panel + Design
**Use Case**: Business-validated architecture

```bash
# Phase 1: Strategic analysis
/sc:business-panel --experts "drucker,porter,meadows" Product architecture strategy

# Phase 2: Technical design
/sc:design --scope system [Architecture from business analysis]

# Result: Strategy-aligned technical design
```

### Business Panel + Spec Review
**Use Case**: Multi-dimensional specification validation

```bash
# Technical review
/sc:spec-panel @specification.md

# Business review
/sc:business-panel @specification.md

# Result: Technical + business validation
```

---

## Anti-Patterns (Don't Do This)

### ❌ Over-Tooling
```bash
# BAD: Too many MCPs for simple task
--c7 --seq --serena --morph --magic --play Simple file read

# GOOD: Just read the file
Read: simple-file.txt
```

### ❌ Wrong Tool Combination
```bash
# BAD: Magic for backend
--magic Create database migration

# GOOD: Direct implementation
/sc:implement Database migration
```

### ❌ Mode Conflicts
```bash
# BAD: Brainstorming with ultra-compression
--brainstorm --uc Explore ideas

# GOOD: Brainstorming needs full verbosity
--brainstorm Explore ideas
```

### ❌ Context Waste
```bash
# BAD: Deep analysis for trivial task
--ultrathink --all-mcp Read config file

# GOOD: Direct operation
Read: config.json
```

---

## Pattern Selection Guide

### By Complexity

**Simple (1-2 steps)**:
- No special tools needed
- Direct operations

**Moderate (3-5 steps)**:
- Single mode: --task-manage
- Single MCP if needed

**Complex (>5 steps)**:
- Mode + MCP combination
- Example: --task-manage --serena

**Very Complex (system-wide)**:
- Multiple modes + MCPs
- Example: --task-manage --orchestrate --serena --seq

---

### By Domain

**Frontend Development**:
- --magic (components)
- --c7 (framework patterns)
- --play (E2E tests)

**Backend Development**:
- --serena (symbol operations)
- --c7 (framework patterns)
- --seq (complex logic)

**Refactoring**:
- --serena (understanding)
- --morph (transformation)
- --task-manage (tracking)

**Strategic/Business**:
- /sc:business-panel (analysis)
- /sc:design (technical design)
- /sc:workflow (implementation plan)

**Debugging**:
- --seq (structured reasoning)
- --introspect (show thinking)
- --serena (code understanding)

---

### By Context Pressure

**Context < 50%**:
- All tools available
- Full verbosity

**Context 50-75%**:
- Normal operations
- Consider --orchestrate

**Context 75-85%**:
- Add --token-efficient
- Use symbols

**Context 85%+**:
- Add --uc
- Essential only
- Plan checkpoint

---

## Advanced Patterns

### Pattern: Adaptive Tool Selection

**Dynamic based on task evolution**:

```bash
# Start simple
Create user management feature

# Task grows complex
# Claude auto-suggests: --task-manage

# Symbol operations needed
# Claude auto-suggests: --serena

# Context pressure builds
# Claude auto-suggests: --uc

# Result: Tools adapt to needs
```

### Pattern: Wave Execution

**Phase-based tool progression**:

```bash
# Wave 1: Discovery
--brainstorm

# Wave 2: Analysis
--seq --c7

# Wave 3: Design
/sc:design

# Wave 4: Implementation
--task-manage --serena

# Wave 5: Validation
--play /sc:test

# Wave 6: Business validation
/sc:business-panel
```

### Pattern: Parallel Agent Orchestration

**Multiple specialized agents**:

```bash
/sc:spawn Complex full-stack feature

# Spawns:
# - Backend agent: --serena /sc:implement
# - Frontend agent: --magic /sc:implement
# - Test agent: --play /sc:test
# - Docs agent: /sc:document

# Coordinator: --orchestrate --task-manage
```

---

## Token Efficiency Comparison

### Pattern Efficiency Table

| Pattern | Token Cost | Efficiency | Use Case |
|---------|-----------|------------|----------|
| Direct operation | Low | ⚡⚡⚡ | Simple tasks |
| Single mode | Medium | ⚡⚡ | Moderate tasks |
| Mode + MCP | Medium-High | ⚡⚡ | Complex tasks |
| Multiple MCPs | High | ⚡ | Very complex |
| With --uc | -30-50% | ⚡⚡⚡ | Context pressure |
| Serena + Morphllm | Medium | ⚡⚡⚡ | Bulk operations |
| Sequential + Context7 | High | ⚡ | Deep analysis |

---

## Integration Pattern Recipes

### Recipe 1: Production-Ready Feature
```bash
1. /sc:workflow        # Plan
2. --c7                # Official patterns
3. /sc:implement       # Build
4. --play              # E2E test
5. /sc:analyze         # Quality check
6. /sc:business-panel  # Strategic validation
```

### Recipe 2: Efficient Large Refactoring
```bash
1. --serena            # Analyze
2. --uc --morph        # Transform (efficient)
3. --task-manage       # Track
4. /sc:test            # Validate
5. /sc:reflect         # Review
```

### Recipe 3: Complex Debugging
```bash
1. --seq --think-hard  # Structure investigation
2. --introspect        # Show reasoning
3. --c7                # Get docs if needed
4. --serena            # Navigate codebase
5. /sc:test            # Verify fix
```

### Recipe 4: Strategic Feature
```bash
1. /sc:brainstorm      # Clarify idea
2. /sc:business-panel  # Strategic validation
3. /sc:design          # Technical design
4. /sc:workflow        # Implementation plan
5. /sc:implement       # Build
```

---

## Related Documentation

- **[Workflow Examples](Workflow_Examples.md)**: Complete workflows
- **[Use Cases](Use_Cases.md)**: Scenario-based examples
- **[Decision Trees](../reference/Decision_Trees.md)**: Tool selection
- **[Quick Reference](../reference/Quick_Reference.md)**: Pattern cheat sheet

---

**Version**: 1.0
**Last Updated**: 2025-11-02
