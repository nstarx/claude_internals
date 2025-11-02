# Use Cases

**Real-world scenarios with recommended approaches**

[Examples Home](README.md) | [Workflow Examples](Workflow_Examples.md) | [Integration Patterns](Integration_Patterns.md)

---

## Overview

This guide presents common real-world scenarios with concrete recommendations for tools, modes, and workflows. Find your situation and follow the recommended approach.

---

## Startup & Product Development

### Use Case 1: MVP Development

**Situation**: Building first version of product with limited time

**Recommended Approach**:
```bash
# 1. Validate idea
/sc:brainstorm --uc Build MVP for [product idea]

# 2. Strategic validation
/sc:business-panel --experts "christensen,godin" MVP strategy

# 3. Design lean architecture
/sc:design --scope project MVP architecture with essential features only

# 4. Generate workflow
/sc:workflow MVP development plan

# 5. Rapid implementation
--magic --c7 /sc:implement Core features

# 6. Basic testing
/sc:test --play Critical user flows

# 7. Launch validation
/sc:business-panel --experts "drucker,godin" Go-to-market strategy
```

**Key Tools**: Brainstorming, Business Panel, Magic, Task Management
**Timeline**: 2-4 weeks for basic MVP
**Focus**: Speed + validation over perfection

---

### Use Case 2: Product-Market Fit Analysis

**Situation**: Product launched, analyzing user feedback for improvements

**Recommended Approach**:
```bash
# 1. Analyze user feedback
/sc:business-panel @user-feedback.csv --experts "christensen,godin,meadows"

# Christensen: Jobs-to-be-done analysis
# Godin: Remarkability assessment
# Meadows: System patterns in user behavior

# 2. Identify critical improvements
/sc:workflow Priority features from feedback analysis

# 3. Design improvements
/sc:design --scope module [Top 3 features from analysis]

# 4. Implement with validation
/sc:implement --task-manage [Priority 1 feature]
/sc:test --play User flow for new feature

# 5. Measure impact
/sc:business-panel --mode socratic Evaluate feature impact on PMF
```

**Key Tools**: Business Panel (JTBD, Purple Cow), Design, Implementation
**Outcome**: Data-driven product improvements

---

## Enterprise Development

### Use Case 3: Legacy System Modernization

**Situation**: Large legacy codebase needs modernization

**Recommended Approach**:
```bash
# Session 1: Analysis
/sc:load
--serena --seq Analyze legacy system architecture and dependencies

# 2. Risk assessment
/sc:business-panel --experts "taleb,meadows" @legacy-analysis.md
# Taleb: Antifragility - risk management
# Meadows: System leverage points

# 3. Modernization strategy
/sc:design --scope system --ultrathink Incremental modernization strategy

# 4. Generate phased workflow
/sc:workflow Modernization plan with backward compatibility

/sc:save

# Session 2-N: Implementation
/sc:load
/sc:implement --task-manage --validate Phase 1: [Component]
/sc:test
/sc:reflect
/sc:save

# Continue for each phase...
```

**Key Tools**: Serena (understanding), Sequential (analysis), Business Panel (risk)
**Timeline**: 6-18 months
**Focus**: Safety, incrementality, validation

---

### Use Case 4: Microservices Migration

**Situation**: Monolith → Microservices transformation

**Recommended Approach**:
```bash
# Phase 1: Strategic analysis
/sc:business-panel --experts "drucker,meadows,collins" @current-architecture.md

# 2. Technical design
/sc:design --scope system --think-hard Microservices architecture

# 3. Specification review
/sc:spec-panel @microservices-design.md

# 4. Service boundary analysis
--serena --seq Identify service boundaries in monolith

# 5. Migration workflow
/sc:workflow Zero-downtime microservices migration

# 6. Phased extraction
# For each service:
/sc:implement --task-manage --serena Extract [ServiceName] with API compatibility
--play E2E tests for migrated service
/sc:analyze --focus performance [ServiceName]

# 7. System validation
/sc:test Integration tests across all services
/sc:analyze --scope system --focus architecture
```

**Key Tools**: Serena, Sequential, Business Panel, /sc:design
**Timeline**: 12-24 months
**Focus**: Zero downtime, incremental migration

---

## Security & Compliance

### Use Case 5: Security Audit & Hardening

**Situation**: Need to audit and improve application security

**Recommended Approach**:
```bash
# 1. Comprehensive security analysis
/sc:analyze --focus security --think-hard .

# Identifies:
# - Vulnerability patterns
# - Insecure dependencies
# - Authentication issues
# - Data exposure risks

# 2. Business risk assessment
/sc:business-panel --experts "taleb" Security risk analysis

# 3. Prioritized remediation plan
/sc:workflow Security hardening based on risk priority

# 4. Implementation
/sc:implement --task-manage --validate Security improvements

# Tasks include:
# - Fix SQL injection vulnerabilities
# - Implement rate limiting
# - Add input validation
# - Update dependencies
# - Add security headers

# 5. Validation
/sc:analyze --focus security . (rerun)
--play Security-focused E2E tests

# 6. Documentation
/sc:document --type guide Security implementation guide
```

**Key Tools**: /sc:analyze (security focus), Business Panel (Taleb), Validation
**Outcome**: Security posture improved with documented practices

---

### Use Case 6: GDPR Compliance Implementation

**Situation**: Need to make application GDPR compliant

**Recommended Approach**:
```bash
# 1. Requirements analysis
/sc:brainstorm GDPR compliance requirements

# 2. Gap analysis
--serena Identify all locations handling personal data

# 3. Design compliance architecture
/sc:design --scope system GDPR compliance architecture:
- Data minimization
- Right to erasure
- Data portability
- Consent management

# 4. Implementation workflow
/sc:workflow GDPR compliance implementation

# 5. Systematic implementation
/sc:implement --task-manage GDPR compliance features

# Includes:
# - Consent management system
# - Data export functionality
# - Data deletion workflows
# - Privacy policy management
# - Audit logging

# 6. Testing
--play Test GDPR user rights workflows
/sc:test Compliance validation tests

# 7. Documentation
/sc:document --type guide GDPR compliance documentation
```

**Key Tools**: Serena (find data), Design, Task Management, Playwright
**Outcome**: GDPR-compliant application with documentation

---

## Performance Optimization

### Use Case 7: Application Performance Crisis

**Situation**: Production application experiencing severe performance issues

**Recommended Approach**:
```bash
# 1. Emergency analysis
/sc:troubleshoot --ultrathink --seq @performance-logs.txt

# Sequential structures investigation:
# - Hypothesis: Database N+1 queries
# - Hypothesis: Memory leak
# - Hypothesis: Unoptimized rendering

# 2. Deep performance analysis
/sc:analyze --focus performance --think-hard src/

# 3. Get official optimization patterns
--c7 React performance optimization patterns
--c7 Node.js performance best practices

# 4. Design optimization strategy
/sc:design --scope project Performance optimization plan

# 5. Implement fixes
/sc:improve --focus performance --task-manage src/

# Fixes:
# - Add database query optimization
# - Implement caching layer
# - Fix memory leaks
# - Add React.memo/useMemo
# - Optimize bundle size

# 6. Measure improvement
/sc:test --performance Performance benchmarks

# 7. System validation
--play Performance-focused E2E tests
```

**Key Tools**: Sequential, /sc:analyze, Context7, /sc:improve
**Timeline**: 1-2 weeks for critical fixes
**Focus**: Measure → Fix → Validate cycle

---

### Use Case 8: Scalability Preparation

**Situation**: Preparing for 10x traffic increase

**Recommended Approach**:
```bash
# 1. Strategic analysis
/sc:business-panel --experts "meadows,taleb" Scalability and resilience strategy

# 2. Architecture review
/sc:analyze --scope system --focus architecture

# 3. Scalability design
/sc:design --scope system --think-hard Architecture for 10x scale

# Design includes:
# - Horizontal scaling strategy
# - Caching layers
# - Database sharding
# - CDN integration
# - Load balancing

# 4. Implementation workflow
/sc:workflow Scalability improvements

# 5. Phased implementation
/sc:implement --task-manage Phase 1: Caching layer
/sc:implement --task-manage Phase 2: Database optimization
/sc:implement --task-manage Phase 3: Horizontal scaling

# 6. Load testing
--play Load tests for 10x traffic

# 7. Monitoring
/sc:implement --task-manage Monitoring and alerting system
```

**Key Tools**: Business Panel (systems thinking), Design, Task Management
**Outcome**: Production-ready at scale

---

## Team Collaboration

### Use Case 9: Code Review & Knowledge Sharing

**Situation**: Large PR needs comprehensive review

**Recommended Approach**:
```bash
# 1. Load PR context
/sc:load

# 2. Comprehensive analysis
/sc:analyze --serena @pr-diff.patch

# Analysis covers:
# - Code quality
# - Security issues
# - Performance implications
# - Architecture fit
# - Test coverage

# 3. Specification review (if design doc exists)
/sc:spec-panel @design-doc.md

# 4. Generate review comments
/sc:document --type review Code review for PR #[number]

# 5. Knowledge capture
/sc:document --type guide Pattern guide from PR insights

# 6. Save for team
/sc:save
```

**Key Tools**: Serena, /sc:analyze, /sc:document
**Outcome**: Comprehensive review + knowledge documentation

---

### Use Case 10: Onboarding New Team Member

**Situation**: New developer joining, needs to understand codebase

**Recommended Approach**:
```bash
# 1. Generate project overview
/sc:index

# Creates comprehensive documentation:
# - Project structure
# - Key components
# - Dependencies
# - Architecture patterns

# 2. Document key flows
/sc:explain --serena Core user authentication flow
/sc:explain --serena Data processing pipeline
/sc:explain --serena API structure

# 3. Create onboarding guide
/sc:document --type guide Developer onboarding guide

# 4. Generate example workflows
/sc:document --type tutorial Common development workflows

# 5. Save onboarding context
/sc:save onboarding-context
```

**Key Tools**: /sc:index, /sc:explain, Serena, /sc:document
**Outcome**: Complete onboarding documentation

---

## Business Strategy

### Use Case 11: Competitive Analysis

**Situation**: Evaluating competitive landscape for strategic planning

**Recommended Approach**:
```bash
# 1. Structured competitive analysis
/sc:business-panel --experts "porter,kim,christensen" @market-research.pdf

# Porter: Five forces analysis
# Kim/Mauborgne: Blue ocean opportunities
# Christensen: Disruption potential

# 2. Risk assessment
/sc:business-panel --experts "taleb" --mode debate Competitive risks

# 3. Strategic positioning
/sc:business-panel --experts "porter,drucker" Optimal competitive positioning

# 4. Innovation opportunities
/sc:business-panel --experts "christensen,godin" Disruptive innovation opportunities

# 5. Communication strategy
/sc:business-panel --experts "doumont" @stakeholder-deck.pptx

# 6. Comprehensive report
/sc:document --type guide Competitive analysis & strategic recommendations
```

**Key Tools**: Business Panel (multiple frameworks), /sc:document
**Outcome**: Multi-framework strategic analysis

---

### Use Case 12: Pivot Decision

**Situation**: Considering major business pivot

**Recommended Approach**:
```bash
# 1. Current state analysis
/sc:business-panel --mode discussion @current-business-model.md

# 2. Pivot evaluation (debate mode)
/sc:business-panel --mode debate Should we pivot to [new direction]?

# Experts debate:
# - For pivot: New opportunities, market trends
# - Against pivot: Current momentum, switching costs
# - Systems view: Organizational implications

# 3. Risk analysis
/sc:business-panel --experts "taleb,meadows" Pivot risk assessment

# Taleb: Antifragility - survival probability
# Meadows: System dynamics of organizational change

# 4. Financial modeling
/sc:estimate Financial impact of pivot vs stay

# 5. Decision framework
/sc:business-panel --mode socratic Help develop pivot decision criteria

# 6. Implementation planning (if pivot approved)
/sc:workflow Pivot execution plan

# 7. Comprehensive decision document
/sc:document --type guide Pivot analysis & recommendation
```

**Key Tools**: Business Panel (debate & socratic modes), /sc:estimate
**Outcome**: Well-reasoned pivot decision with documentation

---

## Documentation & Knowledge Management

### Use Case 13: Technical Documentation Generation

**Situation**: API needs comprehensive documentation

**Recommended Approach**:
```bash
# 1. Generate API reference
/sc:document --type api src/api/

# Creates:
# - Endpoint documentation
# - Request/response schemas
# - Authentication details
# - Error codes

# 2. Create user guide
/sc:document --type guide src/api/

# Creates:
# - Getting started guide
# - Common use cases
# - Code examples
# - Best practices

# 3. Generate interactive examples
--c7 Official API documentation patterns

# 4. Create tutorial series
/sc:document --type tutorial Authentication tutorial
/sc:document --type tutorial Data operations tutorial
/sc:document --type tutorial Advanced features tutorial

# 5. Optimize documentation clarity
/sc:business-panel --experts "doumont" @api-documentation.md

# Doumont optimizes for:
# - Cognitive load
# - Clear structure
# - Reader needs

# 6. Generate comprehensive index
/sc:index docs/api/
```

**Key Tools**: /sc:document, Context7, Business Panel (Doumont)
**Outcome**: Complete, clear API documentation

---

### Use Case 14: Architecture Decision Records

**Situation**: Need to document architectural decisions for future reference

**Recommended Approach**:
```bash
# 1. Design new feature architecture
/sc:design --scope module [Feature] architecture

# 2. Multi-expert validation
/sc:spec-panel @architecture-design.md
/sc:business-panel --experts "meadows,drucker" @architecture-design.md

# 3. Document decision
/sc:document --type reference ADR-[number]: [Architecture Decision]

# Template includes:
# - Context
# - Decision
# - Consequences
# - Alternatives considered
# - Expert validations

# 4. Save for future reference
/sc:save architecture-context
```

**Key Tools**: /sc:design, /sc:spec-panel, Business Panel, /sc:document
**Outcome**: Well-documented architecture decisions

---

## Crisis Management

### Use Case 15: Production Incident Response

**Situation**: Critical production bug affecting customers

**Recommended Approach**:
```bash
# 1. Immediate diagnosis
/sc:troubleshoot --ultrathink --seq @error-logs.txt

# Rapid hypothesis testing:
# - Check recent deployments
# - Analyze error patterns
# - Identify root cause

# 2. Quick fix implementation
/sc:implement --validate --safe-mode Hotfix for [critical bug]

# Safe mode: Maximum validation before deploy

# 3. Testing
/sc:test Critical path tests
--play User flow validation

# 4. Deploy verification
/sc:analyze --focus security Hotfix code review

# 5. Root cause analysis
/sc:troubleshoot --think-hard --introspect Root cause of production incident

# Shows detailed reasoning process

# 6. Preventive measures
/sc:improve --focus quality Add validation to prevent recurrence

# 7. Incident report
/sc:document --type guide Incident report: [Incident]

# 8. Business impact assessment
/sc:business-panel --experts "taleb,drucker" Incident impact & prevention strategy
```

**Key Tools**: Sequential, /sc:troubleshoot, Safe Mode, Business Panel
**Timeline**: Hours for fix, days for prevention
**Focus**: Fix → Validate → Prevent

---

### Use Case 16: Technical Debt Crisis

**Situation**: Technical debt preventing feature development

**Recommended Approach**:
```bash
# 1. Debt analysis
/sc:analyze --scope system --focus quality

# Identifies:
# - Code quality issues
# - Outdated dependencies
# - Missing tests
# - Architecture problems

# 2. Business impact assessment
/sc:business-panel --experts "drucker,collins" Technical debt impact on business goals

# 3. Prioritization
/sc:workflow Technical debt reduction plan by business value

# 4. Systematic cleanup
/sc:cleanup --task-manage src/

# Removes:
# - Unused code
# - Outdated patterns
# - Duplicate logic

# 5. Modernization
/sc:improve --task-manage Modernize core modules

# 6. Test coverage
/sc:test --coverage
# Add tests where missing

# 7. Documentation
/sc:document --type guide Clean code practices

# 8. Validation
/sc:reflect Technical debt reduction completed
```

**Key Tools**: /sc:analyze, Business Panel, /sc:cleanup, /sc:improve
**Outcome**: Sustainable codebase with business alignment

---

## Use Case Selection Guide

### By Role

**Founders/CEOs**:
- Use Case 1: MVP Development
- Use Case 11: Competitive Analysis
- Use Case 12: Pivot Decision

**CTOs/Engineering Managers**:
- Use Case 3: Legacy Modernization
- Use Case 4: Microservices Migration
- Use Case 16: Technical Debt

**Product Managers**:
- Use Case 2: Product-Market Fit
- Use Case 9: Code Review
- Use Case 13: Documentation

**Engineers**:
- Use Case 7: Performance Crisis
- Use Case 5: Security Audit
- Use Case 15: Incident Response

**DevOps/SRE**:
- Use Case 8: Scalability
- Use Case 15: Incident Response
- Use Case 5: Security Audit

---

## Related Documentation

- **[Workflow Examples](Workflow_Examples.md)**: Detailed workflows
- **[Integration Patterns](Integration_Patterns.md)**: Tool combinations
- **[Decision Trees](../reference/Decision_Trees.md)**: Tool selection
- **[Business Panel Examples](../business/Panel_Examples.md)**: Business analysis scenarios

---

**Version**: 1.0
**Last Updated**: 2025-11-02
