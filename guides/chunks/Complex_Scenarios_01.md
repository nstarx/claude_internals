# Complex Scenarios - Part 1: Session Context Patterns

**Part**: 1 of 5 | **Next**: [Part 2: Memory Management Strategies](Complex_Scenarios_02.md)
**Parent Guide**: [Guides Overview](../README.md) | **Complete Document**: Located in `claudedocs/context_memory_complex_scenarios.md`

---

# Context Memory Under Complex Scenarios

A practical guide to strategic context management across real-world development challenges, with token usage analysis and optimization strategies.

## Introduction

Context memory becomes critical in complex scenarios where:
- Multiple systems interact with unclear boundaries
- Long-running investigations require state persistence
- Team coordination demands shared understanding
- Emergency responses need rapid context loading
- Resource constraints force strategic information selection

This document explores 8 complex scenarios showing how strategic context management transforms challenging situations into manageable workflows.

---

## Scenario 1: Legacy System Migration

### Context
Migrating a 10-year-old monolithic PHP application (200+ files, 50K LOC) to modern Node.js microservices. No documentation exists. Original developers left years ago.

### Challenge
- **Complexity**: High architectural uncertainty, undocumented business logic
- **Scope**: Entire system must be understood before any migration begins
- **Risk**: Breaking critical business flows with hidden dependencies
- **Timeline**: 6-month project with multiple phases

### Session 1: Initial Discovery (Day 1)

**Approach**: Broad exploration without memory system

```bash
# Naive approach - no memory persistence
Read 40 PHP files randomly
Analyze database schema
Search for "critical" patterns
Try to map business flows

Token Usage: 45K tokens consumed
Time: 4 hours
Outcome: Scattered understanding, no persistent knowledge
```

**Result**: ❌ High token cost, information overload, no reusable context

### Session 1 (Optimized): Discovery with Memory

**Approach**: Systematic exploration with strategic memory persistence

```bash
# Session 1: System Discovery
/sc:load  # Initialize session

# Phase 1: Architecture mapping (8K tokens)
list_dir(".", recursive=true)  # 200 files discovered
search_for_pattern("class.*extends")  # Find 45 base classes
get_symbols_overview("core/Application.php")  # Entry point analysis

# Immediate memory write
write_memory("architecture_overview", "
# Legacy PHP Application Architecture

## Entry Points
- index.php: Main web entry (handles routing via .htaccess)
- cron.php: Background jobs entry
- api.php: REST API entry (added 2018)

## Core Patterns
- MVC structure (custom framework, not Laravel/Symfony)
- Database: Direct mysqli calls (no ORM)
- Sessions: File-based storage in /tmp
- Auth: Custom session-based (vulnerable to fixation)

## Critical Files Identified
- core/Application.php: Bootstrap and routing
- core/Database.php: All DB operations
- models/User.php: Authentication logic
- models/Order.php: Payment processing (HIGH RISK)
- models/Inventory.php: Stock management

## Business Domains
1. User Management (15 files)
2. E-commerce (40 files) - CORE BUSINESS
3. Inventory (20 files)
4. Reporting (30 files)
5. Admin Tools (25 files)

## Risk Assessment
- Payment processing: Direct credit card handling (PCI compliance concern)
- SQL injection vectors: 120+ direct query constructions
- Session management: Vulnerable to hijacking
- No automated tests exist
")

# Phase 2: Business flow mapping (6K tokens)
search_for_pattern("new Order")  # Find order creation patterns
find_symbol("Order/create")  # Analyze order creation
find_referencing_symbols("Order/create")  # Find all order initiations

write_memory("business_flow_checkout", "
# Checkout Flow Analysis

## Flow Steps
1. Cart → models/Cart.php:finalizeCart()
2. Payment → models/Payment.php:processPayment()
   - Calls external API: gateway.paymentprocessor.com
   - Stores card details temporarily (⚠️ PCI violation)
3. Order → models/Order.php:create()
   - Begins DB transaction
   - Inventory reduction: models/Inventory.php:reserve()
   - Email notification: lib/Email.php:sendOrderConfirmation()
4. Transaction commit

## Critical Dependencies
- Payment gateway timeout: 30s (no retry logic)
- Inventory locking: Advisory locks (race condition possible)
- Email failures: Block transaction (should be async)

## Migration Priorities
1. HIGH: Payment processing (security risk)
2. HIGH: Inventory management (race conditions)
3. MEDIUM: Email notifications (make async)
4. LOW: Order history/reporting
")

# Phase 3: Dependency mapping (4K tokens)
search_for_pattern("require.*models/")
write_memory("dependency_map", "
# File Dependency Analysis

## Core Dependencies (always loaded)
Application → Database → Config → Session → User

## Business Module Dependencies
Order → [Payment, Inventory, Email, Tax, Shipping]
Payment → [Database, Logger, Cache]
Inventory → [Database, Logger, Order]

## Circular Dependencies Found ⚠️
Order ↔ Inventory (both reference each other)
User ↔ Session (tightly coupled)

## External Dependencies
- PaymentGateway SDK (v2.1 - deprecated, v4.0 current)
- SMTP library (custom implementation)
- PDF generation (FPDF library - unmaintained)
")

# Session end
/sc:save

Token Usage: 18K tokens (60% reduction vs naive approach)
Time: 90 minutes
Persistent Context: 3 memory files created
```

**Result**: ✅ Efficient discovery, reusable knowledge, clear migration priorities

### Session 2: Deep Dive Payment System (Day 3)

```bash
/sc:load

# Load only relevant context
read_memory("architecture_overview")  # 1K tokens
read_memory("business_flow_checkout")  # 0.8K tokens

# Focused analysis on payment system
get_symbols_overview("models/Payment.php")
find_symbol("Payment/processPayment", include_body=true)
find_referencing_symbols("Payment/processPayment")

# Discover critical security issue
write_memory("payment_security_analysis", "
# Payment System Security Analysis

## Critical Findings

### Issue 1: Card Data Storage ⚠️🚨
**Location**: models/Payment.php:78-95
**Problem**: Credit card numbers stored in plaintext in sessions
**Impact**: PCI-DSS violation, data breach risk
**Migration Priority**: IMMEDIATE - First microservice to extract

### Issue 2: No PCI Compliance
**Current**: Direct card handling in application
**Required**: Payment gateway tokenization
**Action**: Migrate to Stripe/PayPal with client-side tokenization

### Issue 3: Error Handling
**Problem**: Payment errors expose stack traces to users
**Impact**: Information disclosure vulnerability
**Fix**: Implement proper error boundaries

## Migration Strategy
1. Week 1: Set up new payment microservice with Stripe
2. Week 2: Implement dual-write (old + new system)
3. Week 3: Validate with 10% traffic
4. Week 4: Switch 100% to new system
5. Week 5: Remove old payment code

## Testing Requirements
- Payment success/failure scenarios
- Timeout handling (30s limit)
- Concurrent payment attempts
- Payment gateway failover
")

Token Usage: 8K tokens (only loaded needed context)
Time: 45 minutes
```

### Session 15: Order Microservice Implementation (Week 4)

```bash
/sc:load

# Load strategic context only
read_memory("architecture_overview")  # System understanding
read_memory("business_flow_checkout")  # Order flow
read_memory("dependency_map")  # Integration points

# No need to re-explore PHP code - context persisted

# Implement Node.js microservice
write_memory("order_microservice_design", "
# Order Microservice Design

## Technology Stack
- Framework: Express.js
- Database: PostgreSQL (migrated from MySQL)
- Message Queue: RabbitMQ (for async operations)
- Cache: Redis

## API Design
POST /api/orders - Create order
GET /api/orders/:id - Get order details
PATCH /api/orders/:id/status - Update status

## Integration Points
- Payment Service: Synchronous (verify payment)
- Inventory Service: Synchronous (reserve items)
- Email Service: Asynchronous (via queue)
- Tax Service: Synchronous (calculate tax)

## Migration Approach
Strangler Fig Pattern:
1. New orders → Node.js service
2. Old orders → PHP (read-only)
3. Gradually migrate historical data
")

Token Usage: 5K tokens (95% token savings vs re-discovery)
Time: 30 minutes
```

### Project Metrics

| Phase | Without Memory | With Memory | Savings |
|-------|----------------|-------------|---------|
| Initial Discovery | 45K tokens, 4h | 18K tokens, 1.5h | 60% tokens, 62% time |
| Deep Dive (Session 2-5) | 120K tokens | 35K tokens | 71% tokens |
| Implementation (Session 6-15) | 200K tokens | 55K tokens | 72% tokens |
| **Total Project** | **365K tokens** | **108K tokens** | **70% reduction** |

### Key Success Factors

1. **Early Memory Investment**: 18K tokens in Session 1 saved 250K+ tokens across project
2. **Strategic Distillation**: Converted 200 files into 5 focused memory documents
3. **Hierarchical Loading**: Loaded only relevant context per session
4. **Risk Documentation**: Security findings persisted, informing all future decisions
5. **Pattern Recognition**: Identified "circular dependency" pattern early, avoiding pitfalls

---

## Scenario 2: Microservices Debugging (Distributed Tracing Hell)

### Context
Production issue: "Orders randomly fail with 500 errors." System: 12 microservices across 3 teams, 45 developers, 8 databases.

### Challenge
- **Distributed State**: Error could be in any of 12 services
- **Async Operations**: 5 message queues, eventual consistency
- **Multiple Teams**: Different codebases, documentation, conventions
- **Time Pressure**: Revenue impact $50K/hour downtime

### Emergency Response: Hour 1

**Without Context Memory**: Chaos

```bash
# Teams scrambling independently
Team A: Check API gateway logs (nothing obvious)
Team B: Restart payment service (doesn't help)
Team C: Review database queries (all normal)
Everyone: Re-reading architecture docs, asking questions
Result: 60 minutes wasted, no progress
```

**With Context Memory**: Coordinated Investigation

```bash
/sc:load

# Load system architecture
read_memory("microservices_architecture")

# Content loaded:
"""
# Microservices Architecture Map

## Service Dependencies (Order Flow)
API Gateway → Order Service → [Payment Service, Inventory Service]
Order Service → Event Bus → [Email Service, Analytics Service]
Payment Service → Payment Gateway API
Inventory Service → Warehouse DB (PostgreSQL)

## Known Issues History
1. Payment Gateway timeout (30s → 10s recent change) ⚠️
2. Inventory Service: Race condition under high load
3. Event Bus: Occasional message loss (investigating)

## Critical Metrics
- Order Service: 99.9% uptime SLA
- Payment Service: 99.95% uptime SLA
- Average order processing: 2.3s (p50), 8.5s (p99)

## Recent Changes (Last 7 Days)
- 2025-10-28: Payment Gateway timeout reduced to 10s
- 2025-10-29: Inventory Service deployed new caching layer
- 2025-10-30: Order Service increased connection pool
"""

# Hypothesis from memory
write_memory("incident_2025_11_01_order_failures", "
# Incident: Random Order 500 Errors

## Timeline
11:00 UTC: First error reports
11:15 UTC: Error rate 5% of orders
11:30 UTC: Context memory loaded

## Initial Hypothesis (from memory)
Payment Gateway timeout change (10-28) likely culprit
- Old timeout: 30s
- New timeout: 10s
- High-complexity orders (many items) may exceed 10s

## Investigation Plan
1. Check Payment Service logs for timeout errors
2. Correlate errors with order item count
3. Review payment gateway response times

## Update 11:35 UTC
✅ Confirmed: Payment timeouts correlating with orders >10 items
Root cause: Complex tax calculation + new 10s timeout

## Resolution
- Immediate: Increase timeout to 20s
- Short-term: Optimize tax calculation
- Long-term: Move tax calculation to separate async service
")

Token Usage: 3K tokens
Time to Root Cause: 35 minutes
Result: ✅ Fast resolution, documented for future
```

### Post-Incident: Hour 3

```bash
# Update architecture memory with learnings
read_memory("microservices_architecture")

# Append learnings
write_memory("microservices_architecture", "
[... previous content ...]

## Known Issues History
1. Payment Gateway timeout (30s → 10s recent change) ⚠️
2. Inventory Service: Race condition under high load
3. Event Bus: Occasional message loss (investigating)
4. ⭐ NEW: Tax calculation performance degrades with >10 items
   - Impact: Payment service timeouts
   - Mitigation: 20s timeout (temporary)
   - Permanent fix: Async tax service (in progress)

## Incident Response Patterns
- Orders failing randomly → Check recent config changes first
- Payment 500s → Likely timeout or gateway issues
- Inventory errors → Check database connection pool

## Performance Benchmarks
- Tax calculation: 200ms per item (needs optimization)
- Payment gateway p99: 5.2s (within SLA)
- Order Service p99: 8.5s (near timeout limit)
")

# Create runbook for future incidents
write_memory("runbook_order_failures", "
# Runbook: Order Service 500 Errors

## Immediate Checks (< 5 min)
1. Check Payment Service logs: grep 'timeout' /var/log/payment/*.log
2. Check Order Service metrics: Grafana dashboard 'Order Processing'
3. Review recent deployments: kubectl get deployments --sort-by=.metadata.creationTimestamp

## Common Causes (Priority Order)
1. **Payment Gateway Timeout** (60% of incidents)
   - Symptom: Errors spike during high-complexity orders
   - Check: Payment service timeout config
   - Quick fix: Increase timeout (coordinate with payment team)

2. **Inventory Service Unavailable** (25% of incidents)
   - Symptom: Errors for specific product categories
   - Check: Inventory service health endpoint
   - Quick fix: Restart inventory service pods

3. **Database Connection Exhaustion** (10% of incidents)
   - Symptom: Errors across all orders, no pattern
   - Check: PostgreSQL connection count
   - Quick fix: Increase connection pool size

4. **Event Bus Message Loss** (5% of incidents)
   - Symptom: Orders succeed but no confirmation emails
   - Check: RabbitMQ queue depth
   - Quick fix: Restart event consumers

## Escalation Criteria
- Error rate >10% → Page team lead immediately
- Revenue impact >$100K/hour → Escalate to CTO
- Data corruption suspected → Freeze deployments, escalate to security
")

Token Usage: 4K tokens
Time: 20 minutes
Persistent Value: Future incidents resolve in minutes, not hours
```

### Metrics Comparison

| Phase | Without Memory | With Memory | Improvement |
|-------|----------------|-------------|-------------|
| Time to Hypothesis | 60+ minutes | 5 minutes | 92% faster |
| Time to Resolution | 3+ hours | 35 minutes | 81% faster |
| Revenue Impact | $150K+ | $30K | 80% reduction |
| Token Usage | 40K (panic searching) | 7K (focused) | 82% reduction |
| Knowledge Capture | None | Runbook created | Permanent value |

---

## Scenario 3: Full-Stack Feature (New Checkout Flow)

### Context
Build new "Buy Now, Pay Later" (BNPL) checkout option. Requires frontend (React), backend (Node.js), payment integration (Klarna), database changes, and email templates.

### Challenge
- **Multi-Domain**: Frontend, backend, payments, email, data model
- **Team Coordination**: 3 developers working in parallel
- **Context Switching**: Each developer needs different context at different times
- **Integration Testing**: All components must work together

### Session 1: Planning & Architecture (Developer A - Backend)

```bash
/sc:load

# Load existing architecture
read_memory("microservices_architecture")
read_memory("payment_service_patterns")

# Design BNPL feature
write_memory("feature_bnpl_architecture", "
# Buy Now, Pay Later Feature Architecture

## Overview
Allow customers to split payments into 4 installments over 6 weeks using Klarna API.

## Database Changes
### New Table: payment_plans
- id (uuid, PK)
- order_id (uuid, FK → orders)
- provider (enum: 'klarna', 'afterpay')
- plan_type (enum: '4_payments', '6_payments')
- total_amount (decimal)
- installment_amount (decimal)
- status (enum: 'pending', 'active', 'completed', 'failed')
- created_at, updated_at

### New Table: payment_installments
- id (uuid, PK)
- payment_plan_id (uuid, FK → payment_plans)
- installment_number (int)
- due_date (timestamp)
- amount (decimal)
- status (enum: 'pending', 'paid', 'failed')
- paid_at (timestamp, nullable)

## API Endpoints

---

**Navigation**: [Next Part: Memory Management Strategies →](Complex_Scenarios_02.md)
