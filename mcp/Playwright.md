# Playwright MCP Server

**Purpose**: Browser automation and end-to-end testing with real browser environments

## Triggers
- E2E testing requests: user flows, integration tests
- Browser automation: web scraping, form submission
- Visual testing: screenshot comparison, UI validation
- Accessibility testing: ARIA, keyboard navigation, screen readers
- Multi-browser testing: Chrome, Firefox, Safari, Edge

## Choose When
- **Over unit tests**: For testing full user workflows and browser interactions
- **For real environments**: When testing actual browser behavior vs mocked
- **For visual validation**: Screenshot testing, responsive design verification
- **For accessibility**: Testing keyboard navigation, screen reader compatibility
- **Not for logic testing**: Pure function testing, business logic validation

## Works Best With
- **Magic**: Magic generates UI → Playwright tests user interactions
- **Sequential**: Sequential plans test strategy → Playwright executes scenarios
- **Context7**: Context7 provides test patterns → Playwright implements browser tests

## Examples
```
"test user login flow end-to-end" → Playwright (browser interaction testing)
"validate form submission and error handling" → Playwright (E2E workflow)
"test responsive design across viewports" → Playwright (visual testing)
"check keyboard navigation accessibility" → Playwright (a11y testing)
"test pure calculation function" → Native unit tests (logic testing)
```

## Claude Code Without Playwright

When Playwright MCP is unavailable, Claude Code uses these alternatives:

**Native Testing Approaches**
- **Unit tests**: Test individual components and functions with Jest, Vitest, Mocha
- **Manual testing**: Developer executes test scenarios manually in browser
- **WebFetch**: Fetch pages and validate HTML content (limited validation)
- **Screenshot tools**: Bash commands for basic screenshot capture

**Workflow Differences**
- **Real browser**: No real browser automation vs Playwright's actual browser control
- **User interactions**: Cannot test clicks, typing, navigation vs Playwright's full interaction
- **Visual testing**: No screenshot comparison vs Playwright's visual regression
- **Cross-browser**: Single environment testing vs Playwright's multi-browser support

**When to use Native vs Playwright**
- Native is sufficient for: Unit tests, component tests, API testing, logic validation
- Playwright adds value for: E2E workflows, browser automation, visual testing, accessibility validation

## Word Dictionary

**E2E testing**: End-to-end testing - validating complete user workflows from start to finish

**Browser automation**: Programmatic control of browser actions (clicks, typing, navigation)

**Visual regression**: Testing for unintended visual changes by comparing screenshots

**Headless browser**: Browser running without graphical interface for automated testing

**Test fixtures**: Reusable test setup and teardown code for consistent test environments

**Selector**: CSS or XPath expression for finding elements in DOM

**Viewport**: Visible area of web page - screen size for responsive testing

**Accessibility tree**: Browser's representation of page structure for assistive technologies
