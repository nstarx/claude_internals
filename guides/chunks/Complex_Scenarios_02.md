# Complex Scenarios - Part 2: Memory Management Strategies

**Part**: 2 of 5 | **Previous**: [Part 1: Session Context Patterns](Complex_Scenarios_01.md) | **Next**: [Part 3: Multi-Agent Coordination](Complex_Scenarios_03.md)
**Parent Guide**: [Guides Overview](../README.md) | **Complete Document**: Located in `claudedocs/context_memory_complex_scenarios.md`

---

## Scenario 3: Full-Stack Feature (New Checkout Flow) - Continued

POST /api/checkout/bnpl/eligibility
  → Check if customer/cart qualifies for BNPL

POST /api/checkout/bnpl/initiate
  → Create payment plan with Klarna

POST /api/checkout/bnpl/complete
  → Finalize order after Klarna approval

GET /api/account/payment-plans
  → List customer's active payment plans

## Klarna Integration
- SDK: @klarna/payments-sdk
- Auth: OAuth 2.0 (merchant credentials)
- Endpoints:
  - Create session: POST /payments/v1/sessions
  - Authorize: POST /payments/v1/authorizations/{auth_token}
  - Capture: POST /ordermanagement/v1/orders/{order_id}/captures

## Error Handling
- Klarna timeout: 15s max
- Eligibility denied: Return alternative payment methods
- Authorization failure: Rollback order, release inventory

## Testing Strategy
- Unit tests: Payment plan calculations
- Integration tests: Klarna API (use sandbox)
- E2E tests: Full checkout flow
")

Token Usage: 5K tokens
Time: 1 hour
```

### Session 2: Backend Implementation (Developer A)

```bash
/sc:load

# Load feature design
read_memory("feature_bnpl_architecture")

# Implement backend with focused context
# (No need to reload entire system architecture)

# After implementation
write_memory("feature_bnpl_backend_status", "
# BNPL Backend Implementation Status

## Completed ✅
- Database migrations created
- Payment plan model and repository
- Klarna service wrapper
- POST /api/checkout/bnpl/eligibility endpoint
- POST /api/checkout/bnpl/initiate endpoint
- Unit tests (95% coverage)

## In Progress 🔄
- POST /api/checkout/bnpl/complete endpoint (80% done)
- Error handling for Klarna timeouts

## Blocked ⏸️
- GET /api/account/payment-plans (waiting for frontend mockups)

## Key Implementation Decisions
1. Used Repository pattern for payment plans (consistent with Order Service)
2. Klarna SDK wrapped in service layer for easier mocking
3. Used Redis for caching eligibility checks (1 hour TTL)
4. Implemented circuit breaker for Klarna API (5 failures = 60s break)

## Integration Points for Frontend
- Eligibility check returns: { eligible: boolean, maxAmount: number, minPurchase: number }
- Initiate returns: { sessionId: string, clientToken: string } for Klarna widget
- Complete expects: { authToken: string, orderId: string }

## Integration Points for Email Service
- Event published: 'payment_plan.created' → Send confirmation email
- Event published: 'installment.due' → Send reminder email (3 days before)
")

Token Usage: 8K tokens
Time: 4 hours implementation
```

### Session 3: Frontend Implementation (Developer B)

```bash
/sc:load

# Load only frontend-relevant context
read_memory("feature_bnpl_architecture")  # Overall design
read_memory("feature_bnpl_backend_status")  # API contracts

# Developer B doesn't need to understand backend internals
# Context memory provides just enough information

write_memory("feature_bnpl_frontend_status", "
# BNPL Frontend Implementation Status

## Completed ✅
- Checkout page: Added BNPL payment option
- Klarna widget integration (@klarna/checkout)
- Eligibility check on cart total change
- Loading states and error handling
- Success/failure modals

## Component Structure
components/
  ├── checkout/
  │   ├── BNPLOption.tsx (main component)
  │   ├── KlarnaWidget.tsx (Klarna iframe wrapper)
  │   ├── PaymentPlanSummary.tsx (shows 4 installments)
  │   └── BNPLEligibility.tsx (shows if eligible)

## API Integration
- Eligibility: useQuery hook, refreshes on cart change
- Initiate: Called when user selects BNPL
- Complete: Called after Klarna authorization

## User Flow
1. Cart page: Show 'Pay in 4' badge if eligible
2. Checkout page: BNPL option with installment breakdown
3. Click BNPL: Load Klarna widget (sessionId from backend)
4. Klarna authorization: Redirect to Klarna, return with authToken
5. Completion: Call backend /complete, show success page

## Testing
- Unit tests: Component rendering, state management
- Integration tests: API mocking with MSW
- E2E tests: Cypress with Klarna sandbox

## Blocked ⏸️
- Account page: Payment plans list (waiting for design approval)
")

Token Usage: 6K tokens (only loaded relevant context)
Time: 3 hours implementation
```

### Session 4: Integration & Testing (Developer C)

```bash
/sc:load

# Load all feature context
read_memory("feature_bnpl_architecture")
read_memory("feature_bnpl_backend_status")
read_memory("feature_bnpl_frontend_status")

# Integration testing with full context
# Discovers integration issue

write_memory("feature_bnpl_integration_issues", "
# BNPL Integration Testing - Issues Found

## Issue 1: Race Condition ⚠️
**Location**: Frontend completes before backend captures payment
**Impact**: Order created but payment not captured
**Root Cause**: Frontend calls /complete before Klarna webhook arrives
**Solution**: Implement polling or websocket for payment confirmation

## Issue 2: Error Handling Mismatch
**Location**: Backend returns 400 for eligibility denied, frontend expects 200 with eligible=false
**Impact**: Error modal shown instead of alternative payment methods
**Solution**: Backend change to return 200 with eligible=false

## Issue 3: Timeout Mismatch
**Location**: Frontend timeout 10s, backend timeout 15s
**Impact**: Frontend shows error before backend completes Klarna call
**Solution**: Align frontend timeout to 20s (buffer for slow Klarna responses)

## Testing Results
- Unit tests: ✅ All passing
- Integration tests: ⚠️ 3 issues found (documented above)
- E2E tests: ⏸️ Blocked until issues resolved

## Next Steps
1. Backend: Change eligibility endpoint response (Developer A)
2. Frontend: Implement payment confirmation polling (Developer B)
3. Both: Align timeout configurations
4. Re-run integration tests
")

Token Usage: 7K tokens
Time: 2 hours testing
```

### Feature Delivery Metrics

| Phase | Without Memory | With Memory | Improvement |
|-------|----------------|-------------|-------------|
| Planning | 3 hours (everyone) | 1 hour (one person) | 67% reduction |
| Implementation | Constant context switching | Focused work | Fewer interruptions |
| Integration | 6 hours debugging | 2 hours testing | 67% reduction |
| Context Loading | 15K per developer/session | 6K per session | 60% reduction |
| **Total Project** | **60K tokens, 3 weeks** | **26K tokens, 2 weeks** | **57% faster, 57% fewer tokens** |

### Key Success Factors

1. **Shared Context**: All developers loaded same architecture memory
2. **Async Updates**: Developers updated status memories for team visibility
3. **Interface Documentation**: Backend documented API contracts for frontend
4. **Issue Tracking**: Integration issues captured in memory, not Slack
5. **Minimal Context**: Each developer loaded only relevant memories

---

## Scenario 4: Performance Optimization Hunt

### Context
Dashboard page load time increased from 2s → 12s over 6 months. Users complaining, revenue impacted. Need to find and fix all performance bottlenecks.

### Challenge
- **Unclear Cause**: Gradual degradation, no obvious culprit
- **Multiple Layers**: Database, API, frontend, caching, network
- **Measurement Needed**: Profile before optimizing
- **Priority Conflicts**: Many possible optimizations, limited time

### Session 1: Performance Profiling

```bash
/sc:load

# Use Sequential MCP for methodical analysis
Use Sequential MCP: "Analyze dashboard performance bottlenecks"

# Sequential thinking guides systematic investigation
# Results stored in memory

write_memory("performance_dashboard_analysis", "
# Dashboard Performance Analysis

## Current State
- Page load: 12.3s (p50), 18.7s (p99)
- Target: <2s (p50), <5s (p99)
- User impact: 23% bounce rate (was 8%)

## Profiling Results (Chrome DevTools)

### Network Analysis
- API calls: 47 requests (!!!)
  - 15x GET /api/stats/* endpoints
  - 12x GET /api/recent/* endpoints
  - 20x GET /api/widgets/* endpoints
- Total data transfer: 3.2 MB uncompressed
- No HTTP/2 multiplexing (HTTP/1.1 only)

### Backend Analysis (Node.js profiler)
- Database queries: 234 queries per page load (!!!)
- N+1 query problem: Users → Orders → OrderItems (3 levels)
- No query result caching
- Missing database indexes on frequently queried columns

### Frontend Analysis (React DevTools)
- 47 components re-render on every data fetch
- No memoization on expensive calculations
- Large bundle size: 2.4 MB (unminified in prod accidentally)
- No code splitting

### Database Analysis (PostgreSQL)
- Query avg time: 45ms (was 5ms 6 months ago)
- Missing indexes: orders.user_id, order_items.order_id
- Table bloat: orders table 40% bloated
- Vacuum needed

## Root Causes Identified
1. **API Explosion** (High Impact): 47 requests vs 3 originally
   - Each widget added made new API call
   - No data aggregation endpoint

2. **N+1 Queries** (High Impact): 234 queries per page
   - Missing eager loading in ORM
   - No query optimization

3. **No Caching** (Medium Impact): Fresh DB queries every time
   - Redis cache available but unused
   - No HTTP caching headers

4. **Frontend Bloat** (Medium Impact): 2.4 MB bundle
   - Production build broken, serving dev build
   - No lazy loading of widgets

5. **Database Decay** (Medium Impact): Indexes missing, bloat
   - Database grew 10x, indexes not added
   - Maintenance schedule not followed

## Optimization Priority
1. Fix production build (Quick win, 70% improvement)
2. Create aggregated API endpoint (High impact)
3. Add database indexes (High impact)
4. Implement Redis caching (Medium impact)
5. Fix N+1 queries (Medium impact)
6. Add code splitting (Low hanging fruit)
")

Token Usage: 12K tokens (including Sequential MCP deep analysis)
Time: 2 hours
```

### Session 2: Quick Wins (Day 1)

```bash
/sc:load
read_memory("performance_dashboard_analysis")

# Optimization 1: Fix production build
# Discovered: webpack.config.js had mode: 'development'

write_memory("performance_optimization_log", "
# Dashboard Performance Optimization Log

## Optimization 1: Production Build Fix ✅
**Change**: webpack.config.js mode: 'development' → 'production'
**Impact**:
- Bundle size: 2.4 MB → 387 KB (84% reduction)
- Page load: 12.3s → 4.8s (61% improvement)
- User metric: Already seeing lower bounce rate

**Time**: 15 minutes
**Tokens**: 1K

## Optimization 2: Database Indexes ✅
**Change**: Added indexes
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

**Impact**:
- Query time: 45ms → 8ms average (82% improvement)
- Database CPU: 80% → 35% utilization

**Time**: 30 minutes
**Tokens**: 2K

## Optimization 3: Aggregated API Endpoint ✅
**Change**: Created /api/dashboard endpoint (replaces 47 calls)
**Implementation**:
```javascript
// Before: 47 separate API calls
GET /api/stats/revenue
GET /api/stats/orders
GET /api/stats/users
// ... 44 more

// After: 1 aggregated call
GET /api/dashboard
{
  stats: { revenue, orders, users, ... },
  recentOrders: [...],
  widgets: [...]
}
```

**Impact**:
- API calls: 47 → 1 (98% reduction)
- Network overhead: 3.2 MB → 145 KB (95% reduction)
- Page load: 4.8s → 2.1s (56% improvement)

**Time**: 3 hours
**Tokens**: 5K

## Current Status (End of Day 1)
- Page load: 2.1s (p50) ✅ Target achieved!
- Bounce rate: 9% (improved from 23%)
- User satisfaction: Already seeing positive feedback

## Remaining Optimizations (Nice to Have)
- Redis caching (would reduce to ~1s)
- Fix N+1 queries (cleaner code, marginal gains now)
- Code splitting (further reduce initial bundle)
")

Token Usage: 8K tokens
Time: 4 hours work
Result: Target achieved in 1 day!
```

### Session 5: Post-Optimization Documentation (Day 2)

```bash
/sc:load
read_memory("performance_dashboard_analysis")
read_memory("performance_optimization_log")

# Document lessons for future
write_memory("performance_best_practices", "
# Performance Best Practices (Lessons from Dashboard Optimization)

## Prevention Strategies

### 1. Production Build Verification
**Problem**: Accidentally deployed dev build for months
**Prevention**:
- CI/CD check: Verify webpack mode in production
- Bundle size monitoring: Alert if >500 KB
- Automated lighthouse scores in CI

### 2. API Request Monitoring
**Problem**: 3 API calls grew to 47 over 6 months
**Prevention**:
- Performance budget: Max 5 API calls per page
- Code review checklist: Question new API calls
- Aggregate endpoints for complex pages

### 3. Database Index Management
**Problem**: Indexes not added as data grew
**Prevention**:
- Query performance monitoring (Datadog APM)
- Alert on queries >50ms
- Quarterly database maintenance review

### 4. Performance Regression Testing
**Problem**: Gradual degradation not caught
**Prevention**:
- Lighthouse CI on every PR
- Performance budget in CI: Fail if load time >3s
- Weekly performance review meeting

## Performance Optimization Checklist

When page load >3s:

### Quick Checks (30 min)
- [ ] Check production build config
- [ ] Count API requests (should be <5)
- [ ] Check bundle size (should be <500 KB)
- [ ] Check for console errors

### Deep Analysis (2 hours)
- [ ] Network tab: Waterfall analysis
- [ ] Database: Query count and timing
- [ ] CPU profiling: Identify hot paths
- [ ] Memory profiling: Check for leaks

### Common Fixes (Priority Order)
1. Fix production build configuration
2. Add database indexes on foreign keys
3. Aggregate multiple API calls
4. Implement response caching
5. Add code splitting
6. Fix N+1 query patterns
7. Optimize expensive calculations

## Metrics to Track
- Page load time (p50, p95, p99)
- Time to interactive (TTI)
- First contentful paint (FCP)
- API request count per page
- Database query count per request
- Bundle size (JS, CSS)
")

Token Usage: 4K tokens
Time: 1 hour documentation
Persistent Value: Future performance issues prevented/resolved faster
```

### Optimization Metrics

| Metric | Before | After Quick Wins | After All | Improvement |
|--------|---------|------------------|-----------|-------------|
| Page Load (p50) | 12.3s | 2.1s | 1.4s | 89% faster |
| API Calls | 47 | 1 | 1 | 98% reduction |
| Bundle Size | 2.4 MB | 387 KB | 287 KB | 88% smaller |
| DB Queries | 234 | 234 | 12 | 95% reduction |
| Bounce Rate | 23% | 9% | 7% | 70% improvement |
| Token Usage | 50K (random optimization) | 24K (strategic) | 52% reduction |
| Time Investment | 2 weeks | 1 day | 80% faster |

### Key Success Factors

1. **Systematic Profiling**: Sequential MCP provided structured analysis
2. **Memory-Driven Priorities**: Analysis stored once, referenced multiple times
3. **Quick Win Focus**: Achieved target without implementing all optimizations
4. **Documentation**: Created reusable performance playbook
5. **Prevention**: Lessons documented to prevent regression

---

## Scenario 5: Security Audit & Remediation

### Context
Annual security audit found 47 vulnerabilities across 8 repositories. Need to prioritize, fix, and verify remediation. Some vulnerabilities are in third-party dependencies, others in application code.

### Challenge
- **Large Volume**: 47 vulnerabilities, limited security expertise
- **Risk Assessment**: Need to prioritize by severity and exploitability
- **Multi-Repository**: Vulnerabilities span multiple codebases
- **Compliance**: Must document all remediations for auditors

### Session 1: Vulnerability Triage

```bash
/sc:load

# Import audit results and categorize
write_memory("security_audit_2025", "

---

**Navigation**: [← Previous: Session Context Patterns](Complex_Scenarios_01.md) | [Next: Multi-Agent Coordination →](Complex_Scenarios_03.md)
