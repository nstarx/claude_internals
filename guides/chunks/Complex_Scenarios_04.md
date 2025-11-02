# Complex Scenarios - Part 4: Advanced Workflows

**Part**: 4 of 5 | **Previous**: [Part 3: Multi-Agent Coordination](Complex_Scenarios_03.md) | **Next**: [Part 5: Edge Cases & Troubleshooting](Complex_Scenarios_05.md)
**Parent Guide**: [Guides Overview](../README.md) | **Complete Document**: Located in `claudedocs/context_memory_complex_scenarios.md`

---

## Scenario 6: Large-Scale Refactoring (Extract Microservice) - Continued

5. ADR (Architecture Decision Records)

## Key Metrics
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| User API response time | 200ms | 45ms | 78% faster |
| Authentication time | 150ms | 30ms | 80% faster |
| Monolith LOC | 150K | 146.5K | 3.5K removed |
| Service independence | Monolith only | 2 services | Modularity ↑ |
| Scalability | Limited | Independent | Can scale separately |

## Architecture Improvements
- **Separation of Concerns**: User logic isolated
- **Independent Scaling**: User service scales based on auth load
- **Technology Flexibility**: Microservice can use different stack
- **Team Autonomy**: Separate team can own User service

## Lessons Learned

### What Went Well ✅
1. **Gradual migration**: Strangler fig pattern worked perfectly
2. **Memory-driven**: Context persistence saved weeks of re-analysis
3. **Caching strategy**: Essential for performance
4. **Monitoring**: Caught issues early with good observability

### What Could Be Better 🤔
1. **Session analysis**: Should have done deeper session analysis upfront
2. **Team communication**: Weekly syncs helped, should have done daily
3. **Testing**: More integration tests would have caught edge cases earlier
4. **Documentation**: Should have documented decisions as we made them (not weekly)

### Anti-Patterns Avoided ❌
1. Big bang migration: Gradual approach prevented disaster
2. Perfect abstraction: Started pragmatic, refactored later
3. Over-engineering: Built only what was needed
4. Ignoring monolith: Improved monolith code during extraction

## Reusable Playbook
This extraction can serve as template for:
- Extracting Billing Service (next quarter)
- Extracting Notification Service
- Any future monolith decomposition

## Next Targets for Extraction
1. **Billing Service** (Q1 2026) - High priority, security benefits
2. **Notification Service** (Q2 2026) - Medium priority, scaling benefits
3. **Search Service** (Q3 2026) - Low priority, technology flexibility
")

Token Usage: 8K tokens
Time: 2 hours final documentation
```

### Refactoring Metrics

| Metric | Without Memory | With Memory | Improvement |
|--------|----------------|-------------|-------------|
| Initial Analysis | 40K tokens (repeated exploration) | 15K tokens (structured) | 62% reduction |
| Weekly Status | 10K tokens/week (re-analyze) | 6K tokens/week (reference) | 40% reduction |
| Total Project Tokens | 160K+ tokens | 87K tokens | 46% reduction |
| Context Switching | Constant re-discovery | Load memories | 80% faster orientation |
| Knowledge Retention | Tribal knowledge | Documented playbook | Reusable for future |
| Project Success | High risk of failure | Successful execution | On time, no downtime |

### Key Success Factors

1. **Comprehensive Analysis**: Deep dependency analysis upfront saved surprises
2. **Weekly Status Updates**: Memory system tracked progress and issues
3. **Lessons Learned**: Captured learnings weekly, not just at end
4. **Reusable Playbook**: Future extractions will use this as template
5. **Context Persistence**: 12-week project, context available entire time

---

## Scenario 7: Multi-Team Coordination (API Design)

### Context
Designing new v2 API across 5 backend teams, 3 frontend teams, 2 mobile teams. API must be consistent, RESTful, and serve all clients. 30+ engineers involved.

### Challenge
- **Many Stakeholders**: 10 teams with different needs and opinions
- **Design Decisions**: Hundreds of decisions about structure, naming, auth, errors
- **Consensus Building**: Need agreement across teams
- **Documentation**: All decisions must be documented and accessible

### Week 1: API Design Kickoff

**Traditional Approach**: ❌ Chaos

```bash
- 10 meetings with different teams
- Everyone has different opinions
- Decisions made in Slack, lost in history
- Same questions asked repeatedly
- No central source of truth
- Engineers frustrated, progress slow
```

**With Context Memory**: ✅ Structured

```bash
/sc:load

# Initialize API design memory
write_memory("api_v2_design_principles", "
# API v2 Design Principles

## Goals
1. RESTful design (strict adherence to REST principles)
2. Consistency across all endpoints
3. Backward compatible where possible
4. Client-agnostic (works for web, iOS, Android, partners)

## Design Principles

### Resource Naming
- Plural nouns: /users, /orders, /products
- Kebab-case for multi-word: /payment-methods, /order-items
- No verbs in URLs: Use HTTP methods instead

### HTTP Methods
- GET: Retrieve resource(s)
- POST: Create resource
- PUT: Replace entire resource
- PATCH: Partial update
- DELETE: Remove resource

### Response Format
All responses follow this structure:
```json
{
  \"data\": { ... },           // Success: Resource data
  \"meta\": { ... },           // Optional: Pagination, totals
  \"error\": { ... }           // Error: Error details
}
```

### Error Format
```json
{
  \"error\": {
    \"code\": \"validation_error\",
    \"message\": \"User-friendly message\",
    \"details\": [
      {
        \"field\": \"email\",
        \"issue\": \"Invalid email format\"
      }
    ]
  }
}
```

### Authentication
- Bearer tokens: `Authorization: Bearer <token>`
- JWT format (claims: user_id, roles, exp)
- Token refresh: POST /auth/refresh

### Pagination
Query params:
- page: Page number (1-indexed)
- per_page: Items per page (default: 20, max: 100)

Response meta:
```json
\"meta\": {
  \"page\": 1,
  \"per_page\": 20,
  \"total_pages\": 5,
  \"total_items\": 93
}
```

### Filtering & Sorting
- Filtering: ?status=active&role=admin
- Sorting: ?sort=created_at&order=desc

### Versioning
- URL versioning: /api/v2/users
- Major versions only (v1, v2, v3)
- No minor versions in URL

## Decision Log
[Decisions will be logged here as they're made]
")

Token Usage: 5K tokens
Time: 2 hours (collaborative design session)
```

### Week 2: Design Decisions (Async Collaboration)

```bash
/sc:load

# Teams propose ideas, decisions logged in memory

write_memory("api_v2_decision_log", "
# API v2 Decision Log

## Decision 1: Nested Resources vs Query Params
**Date**: 2025-11-03
**Participants**: Backend Team A, Backend Team C, Frontend Team 1
**Question**: How to get user's orders?
  - Option A: /users/:id/orders (nested)
  - Option B: /orders?user_id=:id (query param)

**Decision**: Use query params (Option B)
**Rationale**:
- Nested resources create coupling
- Query params more flexible for filtering
- Easier to implement pagination/sorting
- Mobile team prefers flat structure

**Dissent**: Backend Team A preferred nesting for \"semantic clarity\"
**Resolution**: Consistency and flexibility outweigh semantic preference

---

## Decision 2: Date Format
**Date**: 2025-11-03
**Question**: ISO 8601 with timezone or Unix timestamp?
  - Option A: ISO 8601 (\"2025-11-03T14:30:00Z\")
  - Option B: Unix timestamp (1730642400)

**Decision**: ISO 8601 with UTC timezone (Option A)
**Rationale**:
- Human readable (easier debugging)
- Standard across industry
- JavaScript/Swift/Kotlin have native parsing

**Unanimous**: All teams agreed

---

## Decision 3: Partial Response (Field Selection)
**Date**: 2025-11-04
**Participants**: Mobile Team 1, Mobile Team 2, Backend Team B
**Question**: Should API support field selection to reduce payload?
  Example: GET /users/:id?fields=id,name,email

**Decision**: YES, implement field selection
**Rationale**:
- Mobile networks: Bandwidth is precious
- Large resources: User object has 40+ fields
- Performance: Less data = faster responses

**Implementation**: Query param ?fields=field1,field2,...
**Default**: Return all fields if not specified

---

## Decision 4: Bulk Operations
**Date**: 2025-11-05
**Question**: How to handle bulk creates/updates?
  - Option A: POST /users with array
  - Option B: POST /users/bulk with array
  - Option C: No bulk operations, client makes multiple requests

**Decision**: Separate bulk endpoints (Option B)
**Rationale**:
- Clear distinction between single and bulk ops
- Easier to implement rate limiting separately
- Clearer error handling (partial success possible)

**Examples**:
- POST /users/bulk (create multiple users)
- PATCH /users/bulk (update multiple users)
- DELETE /users/bulk (delete multiple users)

**Error Handling**: Return status for each item
```json
{
  \"data\": {
    \"succeeded\": [
      { \"index\": 0, \"id\": \"user_123\" },
      { \"index\": 2, \"id\": \"user_125\" }
    ],
    \"failed\": [
      {
        \"index\": 1,
        \"error\": { \"code\": \"validation_error\", \"message\": \"...\" }
      }
    ]
  }
}
```

---

## Decision 5: Rate Limiting Headers
**Date**: 2025-11-05
**Question**: Should API return rate limit info in headers?

**Decision**: YES
**Headers**:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1730642400
```

**Status Code**: 429 Too Many Requests when exceeded

---

## Decision 6: API Key vs OAuth for Partners
**Date**: 2025-11-06
**Participants**: Backend Team A, Security Team, Partner Team
**Question**: How should API partners authenticate?
  - Option A: API Key
  - Option B: OAuth 2.0
  - Option C: Both

**Decision**: Both (Option C)
**Rationale**:
- API Key: Simple for server-to-server
- OAuth: Required for user-delegated access
- Different use cases warrant different auth

**API Key Use Case**: Partner's backend calling our API
**OAuth Use Case**: Partner's app accessing user data on their behalf

---

## Decision Counter
Total decisions: 27
Unanimous: 18
Voted: 9
Controversial: 3 (documented with rationale)
")

Token Usage: 8K tokens (accumulated over week)
Time: Various async discussions
```

### Week 4: API Specification Generation

```bash
/sc:load

# Load all design decisions
read_memory("api_v2_design_principles")
read_memory("api_v2_decision_log")

# Generate OpenAPI spec (automated with Serena + decisions)
write_memory("api_v2_users_endpoint_spec", "
# Users Endpoint Specification

## GET /api/v2/users
List all users (paginated)

### Query Parameters
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| page | int | No | 1 | Page number (1-indexed) |
| per_page | int | No | 20 | Items per page (max: 100) |
| sort | string | No | created_at | Sort field |
| order | string | No | desc | Sort order (asc/desc) |
| status | string | No | - | Filter by status |
| role | string | No | - | Filter by role |
| fields | string | No | - | Comma-separated fields to return |

### Response (200 OK)
```json
{
  \"data\": [
    {
      \"id\": \"user_123\",
      \"name\": \"John Doe\",
      \"email\": \"john@example.com\",
      \"status\": \"active\",
      \"role\": \"user\",
      \"created_at\": \"2025-01-15T10:30:00Z\",
      \"updated_at\": \"2025-10-20T14:22:00Z\"
    }
  ],
  \"meta\": {
    \"page\": 1,
    \"per_page\": 20,
    \"total_pages\": 5,
    \"total_items\": 93
  }
}
```

### Errors
- 400: Invalid query parameters
- 401: Unauthorized (missing/invalid token)
- 429: Rate limit exceeded

---

## GET /api/v2/users/:id
Get single user by ID

### Path Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | User ID |

### Query Parameters
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| fields | string | No | - | Comma-separated fields to return |

### Response (200 OK)
```json
{
  \"data\": {
    \"id\": \"user_123\",
    \"name\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"status\": \"active\",
    \"role\": \"user\",
    \"created_at\": \"2025-01-15T10:30:00Z\",
    \"updated_at\": \"2025-10-20T14:22:00Z\"
  }
}
```

### Errors
- 400: Invalid user ID format
- 401: Unauthorized
- 404: User not found

---

## POST /api/v2/users
Create new user

### Request Body
```json
{
  \"name\": \"Jane Smith\",
  \"email\": \"jane@example.com\",
  \"password\": \"secure_password_123\",
  \"role\": \"user\"
}
```

### Response (201 Created)
```json
{
  \"data\": {
    \"id\": \"user_456\",
    \"name\": \"Jane Smith\",
    \"email\": \"jane@example.com\",
    \"status\": \"pending_verification\",
    \"role\": \"user\",
    \"created_at\": \"2025-11-01T15:00:00Z\"
  }
}
```

### Errors
- 400: Validation error
- 401: Unauthorized
- 409: Email already exists

---

[... Additional endpoints: PUT, PATCH, DELETE, POST /bulk, etc. ...]
")

Token Usage: 10K tokens (specification generation)
Time: 4 hours (mostly automated from design decisions)
```

### Project Metrics

| Activity | Without Memory | With Memory | Improvement |
|----------|----------------|-------------|-------------|
| Design Meetings | 40 hours total (10 teams × 4h) | 10 hours (async + memory) | 75% reduction |
| Decision Documentation | Scattered in Slack/email | Centralized in memory | Searchable, accessible |
| Repeated Questions | Constant ("Why did we decide X?") | None (documented) | 100% elimination |
| Specification Generation | 80 hours manual | 20 hours (semi-automated) | 75% reduction |
| Onboarding New Engineers | 8 hours/person | 1 hour (read memories) | 87% reduction |
| Consensus Building | Weeks of debate | Days of async review | 70% faster |
| Token Usage | 100K+ (repeated discussions) | 35K (structured) | 65% reduction |

### Key Success Factors

1. **Single Source of Truth**: All decisions in memory, not scattered
2. **Async Collaboration**: Teams review and comment on their schedule
3. **Decision Transparency**: Rationale documented, not just outcome
4. **Dissent Captured**: Minority opinions recorded for future reference
5. **Automated Spec Generation**: Design decisions → OpenAPI spec

---

## Scenario 8: Emergency Bug Fix (Production Down)

### Context
**CRITICAL**: Payment processing completely down. Revenue loss: $10K/minute. All hands on deck. Need to identify issue, fix, test, and deploy ASAP.

### Challenge
- **Time Pressure**: Every minute counts
- **High Stress**: Team panicking, stakeholders demanding updates
- **Complex System**: 12 microservices, could be anywhere

---

**Navigation**: [← Previous: Multi-Agent Coordination](Complex_Scenarios_03.md) | [Next: Edge Cases & Troubleshooting →](Complex_Scenarios_05.md)
