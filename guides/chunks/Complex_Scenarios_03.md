# Complex Scenarios - Part 3: Multi-Agent Coordination

**Part**: 3 of 5 | **Previous**: [Part 2: Memory Management Strategies](Complex_Scenarios_02.md) | **Next**: [Part 4: Advanced Workflows](Complex_Scenarios_04.md)
**Parent Guide**: [Guides Overview](../README.md) | **Complete Document**: Located in `claudedocs/context_memory_complex_scenarios.md`

---

## Scenario 5: Security Audit & Remediation - Continued

# Security Audit Results - November 2025

## Summary
- Total vulnerabilities: 47
- Critical: 8
- High: 15
- Medium: 18
- Low: 6

## Critical Vulnerabilities (IMMEDIATE ACTION REQUIRED)

### C1: SQL Injection in User Search [CVSS 9.8]
**Location**: api-service/src/controllers/userController.ts:45
**Issue**: User input directly concatenated into SQL query
```typescript
// Vulnerable code
const query = `SELECT * FROM users WHERE name LIKE '%${req.query.search}%'`;
```
**Impact**: Full database access, data exfiltration possible
**Exploitability**: High (public endpoint, no auth required)
**Priority**: P0 - Fix immediately

### C2: JWT Secret Hardcoded [CVSS 9.1]
**Location**: auth-service/config/production.js:12
**Issue**: JWT secret is hardcoded string, committed to git
```javascript
// Vulnerable code
jwtSecret: 'super-secret-key-123'
```
**Impact**: Anyone with repo access can forge tokens
**Exploitability**: High (secret in git history)
**Priority**: P0 - Rotate immediately, use env vars

### C3: Prototype Pollution in lodash [CVSS 8.8]
**Location**: web-app/package.json
**Issue**: lodash@4.17.15 (vulnerable version)
**CVE**: CVE-2019-10744
**Impact**: RCE possible in specific scenarios
**Exploitability**: Medium (requires specific usage patterns)
**Priority**: P0 - Update to lodash@4.17.21

### C4-C8: [Additional critical vulnerabilities...]

## High Vulnerabilities (Fix within 7 days)
### H1: XSS in Comment System [CVSS 7.5]
**Location**: web-app/src/components/Comments.tsx:89
**Issue**: User comments rendered with dangerouslySetInnerHTML
**Impact**: Session hijacking, credential theft
**Exploitability**: Medium (requires authenticated user)
**Priority**: P1

### H2-H15: [Additional high vulnerabilities...]

## Remediation Strategy
1. Critical (P0): Fix within 24 hours
2. High (P1): Fix within 7 days
3. Medium (P2): Fix within 30 days
4. Low (P3): Fix within 90 days

## Resource Allocation
- Day 1-2: Critical vulnerabilities (2 developers)
- Week 1: High vulnerabilities (1 developer)
- Month 1: Medium vulnerabilities (0.5 developer)
- Quarter: Low vulnerabilities (as time permits)
")

Token Usage: 8K tokens
Time: 2 hours triage
```

### Session 2: Critical Vulnerability Fixes (Day 1)

```bash
/sc:load
read_memory("security_audit_2025")

# Fix C1: SQL Injection
find_symbol("userController/search", include_body=true)
# ... review code ...

write_memory("security_fix_c1_sql_injection", "
# Security Fix: C1 - SQL Injection in User Search

## Original Vulnerable Code
```typescript
// api-service/src/controllers/userController.ts:45
export async function searchUsers(req: Request, res: Response) {
  const searchTerm = req.query.search as string;
  const query = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%'`;
  const results = await db.raw(query);
  return res.json(results);
}
```

## Fixed Code
```typescript
export async function searchUsers(req: Request, res: Response) {
  const searchTerm = req.query.search as string;

  // Input validation
  if (!searchTerm || searchTerm.length > 100) {
    return res.status(400).json({ error: 'Invalid search term' });
  }

  // Parameterized query (prevents SQL injection)
  const results = await db('users')
    .where('name', 'like', `%${searchTerm}%`)
    .select('id', 'name', 'email', 'created_at');

  return res.json(results);
}
```

## Changes Made
1. Input validation: Length check (prevent DoS)
2. Parameterized query: Use ORM instead of raw SQL
3. Limited columns: Don't expose sensitive data
4. Same functionality: User search still works

## Testing
- Unit test: SQL injection attempts rejected
- Integration test: Normal search works
- Security test: Attempted injection logged

## Verification
✅ Manual testing: Tried `search=' OR '1'='1` → Safely handled
✅ Automated test: Added to security test suite
✅ Code review: Approved by security team

## Deployment
- Deployed to production: 2025-11-01 14:30 UTC
- Monitored for 2 hours: No issues
- Marked as RESOLVED in audit tracking
")

# Fix C2: JWT Secret
write_memory("security_fix_c2_jwt_secret", "
# Security Fix: C2 - JWT Secret Hardcoded

## Original Vulnerable Code
```javascript
// auth-service/config/production.js:12
module.exports = {
  jwtSecret: 'super-secret-key-123',
  jwtExpiry: '24h'
};
```

## Fixed Code
```javascript
// auth-service/config/production.js:12
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY || '24h'
};
```

## Remediation Steps
1. ✅ Generate new secure secret: `openssl rand -base64 64`
2. ✅ Store in AWS Secrets Manager
3. ✅ Update Kubernetes secrets
4. ✅ Deploy new configuration
5. ✅ Rotate secret (invalidates all existing tokens)
6. ✅ Monitor login metrics (expected spike in logins)
7. ✅ Remove hardcoded secret from git history (BFG Repo-Cleaner)

## Impact
- All users logged out (expected)
- New tokens issued with secure secret
- Old tokens invalidated
- Sent email notification to users about security update

## Verification
✅ Environment variable loaded correctly
✅ Secret not in code or git history
✅ Token generation working
✅ Token validation working

## Deployment
- Deployed to production: 2025-11-01 16:00 UTC
- User communication: Email sent at 15:45 UTC
- Monitoring: Login spike as expected, stabilized after 2 hours
- Marked as RESOLVED in audit tracking
")

Token Usage: 12K tokens (includes code review)
Time: 6 hours (2 critical fixes)
```

### Session 5: Compliance Documentation (Day 3)

```bash
/sc:load

# Load all fix documentation
read_memory("security_audit_2025")
read_memory("security_fix_c1_sql_injection")
read_memory("security_fix_c2_jwt_secret")
# ... load all fix memories ...

# Generate compliance report
write_memory("security_audit_remediation_report", "
# Security Audit Remediation Report
Generated: 2025-11-03
Audit Period: 2025-11-01 to 2025-11-03

## Executive Summary
- Total vulnerabilities: 47
- Remediated (72 hours): 23 (49%)
- In Progress: 18 (38%)
- Scheduled: 6 (13%)

## Critical Vulnerabilities (100% Remediated)
| ID | Description | CVSS | Status | Fix Date |
|----|-------------|------|--------|----------|
| C1 | SQL Injection | 9.8 | ✅ FIXED | 2025-11-01 |
| C2 | JWT Secret Hardcoded | 9.1 | ✅ FIXED | 2025-11-01 |
| C3 | Prototype Pollution | 8.8 | ✅ FIXED | 2025-11-01 |
| C4 | XXE Vulnerability | 8.7 | ✅ FIXED | 2025-11-02 |
| C5 | Command Injection | 8.5 | ✅ FIXED | 2025-11-02 |
| C6 | Path Traversal | 8.4 | ✅ FIXED | 2025-11-02 |
| C7 | Insecure Deserialization | 8.2 | ✅ FIXED | 2025-11-03 |
| C8 | CORS Misconfiguration | 8.1 | ✅ FIXED | 2025-11-03 |

## High Vulnerabilities (80% Remediated)
[12/15 fixed, 3 in progress]

## Remediation Evidence
Each fix includes:
- Original vulnerable code
- Fixed code with explanation
- Testing performed
- Deployment timestamp
- Verification results

## Compliance Attestation
I, [Security Lead], attest that:
1. All critical vulnerabilities remediated within 24 hours
2. 80% of high vulnerabilities remediated within 72 hours
3. Remaining vulnerabilities scheduled with clear timelines
4. All fixes tested and verified
5. Production deployments monitored and stable

Signature: ________________
Date: 2025-11-03
")

Token Usage: 4K tokens (synthesis of all fixes)
Time: 1 hour
Persistent Value: Compliance documentation for auditors
```

### Audit Metrics

| Metric | Without Memory | With Memory | Improvement |
|--------|----------------|-------------|-------------|
| Vulnerability Triage | 8 hours (constant re-reading) | 2 hours | 75% faster |
| Fix Documentation | Ad-hoc notes, incomplete | Comprehensive memory files | Complete audit trail |
| Compliance Report | 16 hours manual compilation | 1 hour synthesis | 94% faster |
| Context Switching | High (re-reading audit report) | Low (load relevant memories) | Minimal overhead |
| Token Usage | 60K (repeated analysis) | 24K (structured approach) | 60% reduction |
| Audit Readiness | Incomplete documentation | Full compliance evidence | Pass audit |

### Key Success Factors

1. **Structured Triage**: Memory system organized 47 vulnerabilities clearly
2. **Fix Documentation**: Each fix documented as it was made (not after)
3. **Progress Tracking**: Memory files showed real-time status
4. **Compliance Ready**: Documentation format matched audit requirements
5. **Knowledge Retention**: Security patterns captured for future prevention

---

## Scenario 6: Large-Scale Refactoring (Extract Microservice)

### Context
Monolithic application (150K LOC) needs User Service extracted into independent microservice. Must maintain backward compatibility during 3-month migration.

### Challenge
- **Scope Uncertainty**: Which code belongs to User Service?
- **Hidden Dependencies**: 150K LOC, decades of accumulated coupling
- **Zero Downtime**: Can't break existing functionality
- **Gradual Migration**: Strangler fig pattern over 3 months

### Session 1: Dependency Analysis (Week 1)

```bash
/sc:load

# Use Serena MCP for symbol analysis
find_symbol("User", depth=2)  # Find User class and all methods
find_referencing_symbols("User")  # Find all references

# Use Sequential MCP for dependency analysis
Use Sequential MCP: "Analyze User class dependencies and coupling"

write_memory("refactor_user_service_analysis", "
# User Service Extraction Analysis

## Current State
- User class: 3,500 LOC in monolith
- Direct references: 247 files
- Indirect dependencies: 1,200+ files (via method calls)

## User Class Responsibilities (Analysis)
1. **Core Identity** (Should extract ✅)
   - Authentication (login, logout, session management)
   - Profile management (CRUD operations)
   - Password management (reset, change)
   - Email verification

2. **Authorization** (Should extract ✅)
   - Role management (admin, user, guest)
   - Permission checks (canEditPost, canDeleteComment)

3. **User Preferences** (Should extract ✅)
   - Settings (theme, language, notifications)
   - Privacy settings

4. **Social Features** (Maybe extract 🤔)
   - Friends/followers (complex bidirectional relationships)
   - User activity feed

5. **Billing** (Should NOT extract ❌)
   - Payment methods
   - Subscription management
   - (This belongs to separate Billing Service)

## Dependency Mapping

### Incoming Dependencies (What depends on User?)
- **Authentication**: 50 files call User.authenticate()
- **Authorization**: 180 files call User.can*() methods
- **Profile Display**: 30 files call User.getProfile()
- **Email**: 40 files call User.email property

### Outgoing Dependencies (What does User depend on?)
- Database: Direct SQL queries (needs abstraction)
- **Session**: Tightly coupled to session management
- Email Service: For verification/password reset
- Logger: For audit trail
- **Cache**: Redis for session storage
- **Payment**: User.hasActiveSubscription() ⚠️ (circular dependency)

## Critical Coupling Issues
1. **Circular Dependency**: User ↔ Payment
   - User.hasActiveSubscription() calls Payment service
   - Payment needs User for billing info
   - Solution: Event-driven architecture, remove direct calls

2. **Session Management**: Tightly coupled to monolith's session
   - User authentication writes to monolith session
   - Extracting requires new session strategy
   - Solution: JWT tokens, gradually migrate

3. **Database Transactions**: User operations span multiple tables
   - User creation also creates Profile, Settings, Permissions
   - Need distributed transaction strategy
   - Solution: Saga pattern or eventual consistency

## Extraction Strategy

### Phase 1: Preparation (Week 1-2)
- Create new microservice skeleton
- Set up database schema (PostgreSQL)
- Implement repository pattern in monolith (decouple from direct SQL)

### Phase 2: Dual-Write (Week 3-5)
- Write to both monolith and microservice
- Read from monolith only
- Validate data consistency

### Phase 3: Gradual Read Migration (Week 6-9)
- 10% reads from microservice (monitor errors)
- 50% reads from microservice
- 100% reads from microservice

### Phase 4: Write Migration (Week 10-11)
- Stop writing to monolith
- Microservice is source of truth
- Monolith reads from microservice API

### Phase 5: Cleanup (Week 12)
- Remove User code from monolith
- Archive old database tables
- Update documentation

## Risk Assessment
- **High Risk**: Session management migration (affects all users)
- **Medium Risk**: Permission checks (security-critical)
- **Low Risk**: Profile management (read-heavy, forgiving)

## Success Metrics
- Zero downtime during migration
- <1% error rate increase
- Response time improvement (monolith was slow)
- Clean separation of concerns
")

Token Usage: 15K tokens (deep analysis with Sequential + Serena)
Time: 8 hours (complex dependency analysis)
```

### Session 10: Mid-Migration Status Check (Week 6)

```bash
/sc:load

# Load architecture and check progress
read_memory("refactor_user_service_analysis")

write_memory("refactor_user_service_week6_status", "
# User Service Extraction - Week 6 Status

## Progress Summary
- Phase 1: ✅ Complete (Week 1-2)
- Phase 2: ✅ Complete (Week 3-5)
- Phase 3: 🔄 In Progress (50% reads from microservice)

## Metrics
- Dual-write consistency: 99.98% (acceptable)
- Microservice response time: 45ms avg (monolith was 200ms)
- Error rate: 0.12% (within SLA)
- Data migration: 2.3M users migrated

## Issues Encountered

### Issue 1: Session Migration Complexity ⚠️
**Problem**: JWT migration harder than expected
- Monolith session contains more than just user ID
- Shopping cart, preferences, temporary data all in session
- Can't cleanly separate User data from other session data

**Solution**: Hybrid approach
- User authentication: Moved to JWT (microservice)
- Other session data: Remains in monolith session (for now)
- Shopping cart: Extract to separate service later

### Issue 2: Performance Regression in Permissions
**Problem**: Permission checks slower via API
- Monolith: Single DB query
- Microservice: Network call + DB query
- 150ms added latency on permission-heavy pages

**Solution**: Caching strategy
- Cache user permissions in Redis (5-minute TTL)
- Monolith caches microservice API responses
- Reduced latency to 5ms (better than before!)

### Issue 3: Data Inconsistency in Dual-Write
**Problem**: 0.02% of writes don't match
- Race conditions when user updates profile rapidly
- Monolith and microservice process out of order

**Solution**: Event sourcing
- Microservice publishes events for all changes
- Monolith subscribes and updates (eventual consistency)
- Reconciliation job runs nightly (fixes discrepancies)

## Learnings
1. **Session complexity underestimated**: Should have analyzed session contents earlier
2. **Caching essential**: Network calls need caching for performance
3. **Eventual consistency acceptable**: Users don't notice 0.02% temporary inconsistency

## Next Steps (Week 7-9)
1. Increase microservice read traffic: 50% → 75% → 100%
2. Implement permission caching in more places
3. Monitor error rates and performance
4. Prepare for write migration (Phase 4)
")

Token Usage: 6K tokens (status update, no re-analysis)
Time: 1 hour documentation
```

### Project Completion (Week 12)

```bash
/sc:load

# Load all refactoring memories
read_memory("refactor_user_service_analysis")
read_memory("refactor_user_service_week6_status")
# ... other weekly status memories ...

# Final summary
write_memory("refactor_user_service_completion", "
# User Service Extraction - Project Completion

## Final Status
- Duration: 12 weeks (on schedule)
- User impact: Zero downtime achieved ✅
- Error rate: 0.08% (improved from 0.3% in monolith) ✅
- Performance: 78% faster (45ms vs 200ms) ✅

## Delivered Artifacts
1. User Microservice (Node.js + PostgreSQL)
2. Migration scripts and runbooks
3. Monitoring dashboards (Grafana)
4. API documentation (OpenAPI spec)

---

**Navigation**: [← Previous: Memory Management Strategies](Complex_Scenarios_02.md) | [Next: Advanced Workflows →](Complex_Scenarios_04.md)
