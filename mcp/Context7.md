# Context7 MCP Server

**Purpose**: Official library documentation lookup and framework pattern guidance

## Triggers
- Import statements: `import`, `require`, `from`, `use`
- Framework keywords: React, Vue, Angular, Next.js, Express, etc.
- Library-specific questions about APIs or best practices
- Need for official documentation patterns vs generic solutions
- Version-specific implementation requirements

## Choose When
- **Over WebSearch**: When you need curated, version-specific documentation
- **Over native knowledge**: When implementation must follow official patterns
- **For frameworks**: React hooks, Vue composition API, Angular services
- **For libraries**: Correct API usage, authentication flows, configuration
- **For compliance**: When adherence to official standards is mandatory

## Works Best With
- **Sequential**: Context7 provides docs → Sequential analyzes implementation strategy
- **Magic**: Context7 supplies patterns → Magic generates framework-compliant components

## Examples
```
"implement React useEffect" → Context7 (official React patterns)
"add authentication with Auth0" → Context7 (official Auth0 docs)
"migrate to Vue 3" → Context7 (official migration guide)
"optimize Next.js performance" → Context7 (official optimization patterns)
"just explain this function" → Native Claude (no external docs needed)
```

## Claude Code Without Context7

When Context7 MCP is unavailable, Claude Code uses these alternatives:

**Native Capabilities**
- **Built-in knowledge**: Framework patterns and APIs from training data (up to January 2025)
- **WebSearch**: Real-time search for documentation and current best practices
- **WebFetch**: Direct URL fetching for official documentation pages
- **Pattern inference**: Analyze existing codebase patterns with Grep/Read

**Workflow Differences**
- **Version-specific docs**: WebSearch for latest versions vs Context7's curated docs
- **API accuracy**: May need verification vs Context7's official patterns
- **Pattern guidance**: Infer from existing code vs Context7's framework standards
- **Speed**: Slower multi-step lookups vs Context7's direct access

**When to use Native vs Context7**
- Native is sufficient for: Well-known frameworks, general patterns, internal conventions
- Context7 adds value for: Official compliance, version-specific APIs, authoritative patterns

## Word Dictionary

**Official documentation**: Authoritative reference from library/framework maintainers

**Curated docs**: Pre-processed, high-quality documentation selected for relevance

**Framework patterns**: Standard approaches recommended by framework creators

**Version-specific**: API/feature availability tied to exact version numbers

**Compliance**: Adherence to official standards and best practices

**Library API**: Public interface and methods provided by a code library