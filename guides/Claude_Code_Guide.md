# Claude Code: Complete Guide

## What is Claude Code?

Claude Code is Anthropic's official CLI (Command Line Interface) tool that integrates Claude AI directly into your development workflow. It's an interactive coding assistant that helps with software engineering tasks through natural language conversation and a rich set of development tools.

## Core Concepts

### 1. Interactive Sessions

Claude Code operates in a persistent session where:
- Context is maintained across multiple interactions
- You can ask follow-up questions that reference previous work
- Files you've read or edited remain in working memory
- The conversation builds understanding progressively

### 2. Tools

Claude Code has access to specialized tools for different tasks:

**File Operations:**
- `Read`: Read file contents with line numbers
- `Write`: Create new files (requires Read first for existing files)
- `Edit`: Make precise string replacements in files
- `Glob`: Find files using patterns like `**/*.js`
- `Grep`: Search file contents with regex patterns

**Execution:**
- `Bash`: Run shell commands, scripts, tests, builds
- `Task`: Launch specialized agents for complex operations

**Code Understanding:**
- `Grep`: Search code for patterns and keywords
- `Glob`: Locate files by name patterns
- `Read`: View file contents and structure

### 3. Agents (via Task Tool)

Claude Code can launch specialized sub-agents for complex tasks:

- **Explore**: Fast codebase exploration and file discovery
- **Plan**: Strategic planning for complex implementations
- **General-purpose**: Research, multi-step tasks, repeated searches

Each agent operates autonomously and returns results when complete.

## The Context Window

### What is the Context Window?

The context window is Claude's "working memory" - the total amount of text (measured in tokens) that Claude can process at once. Think of it like RAM for an AI assistant.

**Current Limit**: ~200,000 tokens (approximately 150,000 words or 600 pages)

### Token Counting

- **1 token** ≈ 4 characters of English text
- **1 token** ≈ 0.75 words on average
- Code typically uses more tokens than prose due to symbols

**Examples:**
```
"Hello, world!" = ~4 tokens
function getUserData() { return user; } = ~12 tokens
Entire medium-sized file (300 lines) = ~3,000-5,000 tokens
```

### What Consumes Context?

1. **Conversation history**: All your messages and Claude's responses
2. **File reads**: Every file Claude reads stays in context
3. **Tool results**: Output from Bash commands, searches, etc.
4. **System instructions**: Framework rules, MCP server docs (pre-loaded)

### Context Management Strategies

**Efficient Patterns:**
```bash
# ✅ Good: Targeted file read
Read specific_file.js (2,000 tokens)

# ✅ Good: Search then read
Grep "authentication" → Find auth.js → Read auth.js only

# ❌ Avoid: Reading entire codebase
Read all 50 files in src/ (100,000+ tokens)
```

**When Context Fills Up:**
- Claude may become less effective as limit approaches
- Start a new session for fresh context
- Use specialized agents (they have separate context)
- Focus on specific files/areas rather than whole projects

### Context Budget Display

You'll see messages like:
```
<system_warning>Token usage: 44666/200000; 155334 remaining</system_warning>
```

- **44,666** = tokens used so far
- **200,000** = total available
- **155,334** = remaining capacity
- **22% used** in this example

**Guidelines:**
- 🟢 **0-75%**: Normal operation, full capabilities
- 🟡 **75-85%**: Start being more selective with reads
- 🔴 **85%+**: Critical - focus only on essential operations

## Core Workflows

### Starting a Task

1. **Describe what you want**: Use natural language
   ```
   "Add authentication to the API endpoints"
   "Fix the bug where users can't upload images"
   "Refactor the database connection code"
   ```

2. **Claude explores**: Uses tools to understand your codebase
   ```
   Glob "**/*auth*" → Find relevant files
   Read auth.js → Understand current implementation
   Grep "jwt" → Find related code
   ```

3. **Claude plans**: For multi-step tasks (>3 steps), creates a todo list
   ```
   ✓ Creating TODO list:
   1. Analyze current auth system
   2. Add JWT middleware
   3. Update API endpoints
   4. Add tests
   ```

4. **Claude executes**: Makes changes, runs tests, validates
   ```
   Edit auth.js → Add new middleware
   Bash "npm test" → Verify changes
   ```

### Reading Code Efficiently

**Symbol-Based Reading** (Serena MCP):
```
# Instead of reading entire files:
find_symbol "UserController" → Get class overview
find_symbol "UserController/login" depth=1 → Get method details
```

**Pattern-Based Search**:
```
Grep "export.*function" → Find all exports
Glob "**/*.test.js" → Find all test files
```

**Hierarchical Exploration**:
```
1. get_symbols_overview file.js → See what's in the file
2. find_symbol specific_function → Read just what you need
3. find_referencing_symbols → See where it's used
```

### Making Changes

**Single File Edits:**
```javascript
// Read first
Read auth.js

// Then edit with exact string replacement
Edit auth.js:
  old: "const token = jwt.sign(payload)"
  new: "const token = jwt.sign(payload, secret, { expiresIn: '1h' })"
```

**Multi-File Changes:**
```
# For 3+ files with similar changes, use parallel edits
Edit file1.js + Edit file2.js + Edit file3.js (in one message)

# Or use Morphllm MCP for pattern-based bulk changes
```

**Symbol-Based Edits** (Serena MCP):
```
# Replace entire function/class/method
replace_symbol_body "UserController/login"
  new_body: "async login(req, res) { ... }"

# Insert new method in a class
insert_after_symbol "UserController/logout"
  body: "async refreshToken(req, res) { ... }"
```

### Running Commands

**Test & Build:**
```bash
Bash "npm test"                    # Run tests
Bash "npm run build"               # Build project
Bash "pytest tests/test_auth.py"  # Python tests
```

**Git Operations:**
```bash
Bash "git status"                  # Check status
Bash "git diff"                    # See changes
# Claude can create commits with proper messages
```

**Package Management:**
```bash
Bash "npm install express"         # Install packages
Bash "pip install requests"        # Python packages
```

## Key Features

### 1. Parallel Operations

Claude can run multiple independent operations simultaneously:

```
# ✅ Efficient: Read 5 files in parallel
Read file1.js + Read file2.js + Read file3.js (one message)

# ❌ Inefficient: Sequential reads
Read file1.js
<wait for result>
Read file2.js
<wait for result>
```

### 2. MCP Servers (Extended Capabilities)

**Serena** - Semantic code understanding:
- Symbol operations (rename, extract, move)
- Project memory and session persistence
- LSP integration for multi-language support
- `/sc:load` and `/sc:save` for session management

**Sequential-Thinking** - Complex reasoning:
- Multi-step problem analysis
- Hypothesis generation and testing
- Structured reasoning chains

**Context7** - Documentation lookup:
- Official library documentation
- Framework patterns and best practices
- Version-specific implementation guides

**Magic** - UI component generation:
- Modern UI components from 21st.dev
- React, Vue, Angular component patterns

**Morphllm** - Bulk code transformations:
- Pattern-based edits across multiple files
- Style guide enforcement
- Framework migrations

**Playwright** - Browser testing:
- E2E test automation
- Visual validation
- Accessibility testing

### 3. Slash Commands

Custom workflows defined in `.claude/commands/`:

```bash
/sc:test        # Execute tests with coverage
/sc:build       # Build and optimize project
/sc:git         # Intelligent git operations
/sc:analyze     # Code quality analysis
/sc:implement   # Feature implementation workflow
/sc:troubleshoot # Diagnostic and debugging
```

### 4. Session Persistence (Serena MCP)

**Save Your Work:**
```bash
/sc:save  # Saves project context, decisions, progress
```

**Resume Later:**
```bash
/sc:load  # Restores context from previous session
```

**Project Memory:**
```
write_memory "auth_architecture" "Uses JWT with refresh tokens..."
read_memory "auth_architecture"  # Recall later
```

## Best Practices

### 🎯 Do's

**Be Specific:**
```
✅ "Add error handling to the login function in auth.js"
❌ "Make the code better"
```

**Start Small:**
```
✅ Read a few relevant files → Make targeted changes
❌ Read entire codebase → Get overwhelmed
```

**Use Targeted Searches:**
```
✅ Grep "authentication.*error" → Find specific issues
❌ Read every file looking for errors
```

**Leverage Parallel Operations:**
```
✅ Read 5 files simultaneously in one message
❌ Read files one by one sequentially
```

**Follow Git Workflow:**
```
✅ git status → Create feature branch → Work → Commit
❌ Work directly on main/master
```

### ⚠️ Don'ts

**Don't Read Everything:**
- Use searches and symbol operations first
- Read only what you need
- Watch your context usage percentage

**Don't Skip Planning:**
- For complex tasks (>3 steps), create a todo list
- Plan before executing
- Identify parallel operations during planning

**Don't Ignore Errors:**
- Investigate root causes
- Never skip tests to make things pass
- Debug systematically

**Don't Work on Main:**
- Always use feature branches
- Commit incrementally
- Verify changes before committing

## Things to Avoid When Working with Claude Code

This section highlights common pitfalls and anti-patterns that can derail your workflow or lead to poor outcomes.

### 🚫 Context Management Anti-Patterns

**Reading Entire Codebases:**
```
❌ Bad: "Read all files in src/ so you understand the project"
✅ Good: "Search for authentication-related files, then read only those"
```
**Impact:** Wastes 50-100K tokens, leaving little room for actual work.

**Repeatedly Reading Same Files:**
```
❌ Bad: Read auth.js → Edit auth.js → Read auth.js again → Edit again
✅ Good: Read auth.js once → Make all planned edits in sequence
```
**Impact:** Duplicates context usage unnecessarily.

**Not Monitoring Token Usage:**
```
❌ Bad: Ignoring token warnings until you hit 95%+ usage
✅ Good: Checking token percentage and adjusting strategy at 75%
```
**Impact:** Suddenly running out of context mid-task.

### 🚫 Task Management Anti-Patterns

**Vague, Open-Ended Requests:**
```
❌ Bad: "Make the app better"
❌ Bad: "Fix all bugs"
❌ Bad: "Optimize everything"
✅ Good: "Fix the login timeout bug in auth.js line 45"
✅ Good: "Optimize the database query in UserController.findAll()"
```
**Impact:** Claude can't determine scope or success criteria.

**Massive Multi-Step Tasks Without Planning:**
```
❌ Bad: "Refactor the entire auth system, migrate to OAuth2, update all tests,
         update documentation, and deploy to staging"
✅ Good: "Create a todo list for migrating to OAuth2, then we'll execute step by step"
```
**Impact:** Leads to omissions, false completions, and overwhelmed context.

**Accepting Completion Claims Without Verification:**
```
❌ Bad: Claude: "I've updated all 10 files"
        You: "Great, thanks!"
✅ Good: Claude: "I've updated all 10 files"
        You: "Show me the git diff and list the file paths"
```
**Impact:** Discovering incomplete work much later in the process.

**Not Using Todo Lists for Complex Tasks:**
```
❌ Bad: Starting 5-step task without explicit tracking
✅ Good: "Create a todo list first, then execute with status updates"
```
**Impact:** Lost track of progress, forgotten subtasks, unclear completion state.

### 🚫 Code Quality Anti-Patterns

**Blindly Accepting Generated Code:**
```
❌ Bad: Accepting code without review or testing
✅ Good: Review changes, run tests, verify behavior
```
**Impact:** Security vulnerabilities, bugs, breaking changes.

**Skipping Tests to Make Things "Work":**
```
❌ Bad: "The tests are failing, just comment them out so the build passes"
✅ Good: "The tests are failing. Let's debug why and fix the root cause"
```
**Impact:** Broken functionality hidden by disabled tests.

**Not Testing Edge Cases:**
```
❌ Bad: "The happy path works, ship it!"
✅ Good: "Test with null inputs, empty arrays, malformed data, etc."
```
**Impact:** Production crashes from unhandled edge cases.

**Creating Unnecessary Files:**
```
❌ Bad: Creating new files for every small utility or component
✅ Good: Adding to existing files or consolidating related code
```
**Impact:** Codebase bloat, harder maintenance, scattered logic.

### 🚫 Git Workflow Anti-Patterns

**Working Directly on Main/Master:**
```
❌ Bad: Making changes directly on the main branch
✅ Good: Create feature branch → Work → PR → Review → Merge
```
**Impact:** Broken main branch, difficult rollbacks, messy history.

**Committing Without Testing:**
```
❌ Bad: Edit files → git commit → git push (without running tests)
✅ Good: Edit files → Run tests → Fix issues → git commit → git push
```
**Impact:** Breaking the build for your entire team.

**Vague Commit Messages:**
```
❌ Bad: "fixed stuff", "updates", "changes"
✅ Good: "Fix authentication timeout in UserService.login()"
```
**Impact:** Impossible to understand project history or debug regressions.

**Committing Secrets or Credentials:**
```
❌ Bad: Committing .env files, API keys, credentials.json
✅ Good: Using .gitignore, environment variables, secret management
```
**Impact:** Security breaches, exposed credentials.

### 🚫 Communication Anti-Patterns

**Assuming Claude Remembers Everything:**
```
❌ Bad: [Message 1] "Use React 16 only"
        [Message 50] Assuming Claude still remembers this constraint
✅ Good: Repeating critical constraints or using memory files
```
**Impact:** Claude violates constraints it forgot about.

**Not Clarifying Ambiguity:**
```
❌ Bad: Proceeding when requirements are unclear
✅ Good: "Before I start, should I use JWT or session-based auth?"
```
**Impact:** Building the wrong thing, wasted effort.

**Batch Questions Instead of Progressive:**
```
❌ Bad: "Answer these 10 questions about the codebase all at once"
✅ Good: "First, explain the auth flow. [wait] Now explain error handling."
```
**Impact:** Shallow answers, missed nuance, context overload.

### 🚫 Tool Usage Anti-Patterns

**Using Bash for File Operations:**
```
❌ Bad: Bash "cat file.js" or Bash "echo 'code' > file.js"
✅ Good: Read file.js or Write file.js
```
**Impact:** Slower, less reliable, worse formatting.

**Sequential Operations That Could Be Parallel:**
```
❌ Bad: Read file1.js → [wait] → Read file2.js → [wait] → Read file3.js
✅ Good: [Read file1.js + Read file2.js + Read file3.js in one message]
```
**Impact:** 3x slower execution, wasted time.

**Not Using Specialized Agents:**
```
❌ Bad: Manually searching through 50 files for a pattern
✅ Good: Using Task tool with Explore agent for codebase exploration
```
**Impact:** Token waste, slower results, missed findings.

**Ignoring MCP Server Capabilities:**
```
❌ Bad: Reading entire files to find a single function
✅ Good: Using Serena's find_symbol to locate specific code entities
```
**Impact:** Massive token waste, slower workflow.

### 🚫 Security Anti-Patterns

**Ignoring Input Validation:**
```
❌ Bad: Accepting user input directly into queries or commands
✅ Good: Validating, sanitizing, and parameterizing all inputs
```
**Impact:** SQL injection, XSS, command injection vulnerabilities.

**Hardcoding Secrets:**
```
❌ Bad: const API_KEY = "sk-1234567890abcdef"
✅ Good: const API_KEY = process.env.API_KEY
```
**Impact:** Exposed credentials, security breaches.

**Disabling Security Features:**
```
❌ Bad: "CORS is giving me errors, just disable it"
✅ Good: "Configure CORS properly for my use case"
```
**Impact:** Security vulnerabilities, exposed APIs.

### 🚫 Architecture Anti-Patterns

**Creating Monolithic Files:**
```
❌ Bad: Putting all logic in one massive 2000-line file
✅ Good: Splitting into logical modules (services, controllers, utilities)
```
**Impact:** Unmaintainable code, merge conflicts, difficult testing.

**Tight Coupling:**
```
❌ Bad: Direct dependencies between unrelated modules
✅ Good: Interfaces, dependency injection, loose coupling
```
**Impact:** Brittle code, difficult refactoring, testing challenges.

**Not Following Project Conventions:**
```
❌ Bad: Introducing new patterns that differ from existing codebase
✅ Good: "How does this project handle error responses? I'll follow that pattern"
```
**Impact:** Inconsistent codebase, confusion, maintenance burden.

### 🚫 Performance Anti-Patterns

**Premature Optimization:**
```
❌ Bad: "Make this as fast as possible" without profiling
✅ Good: "Profile the slow endpoint, then optimize the bottleneck"
```
**Impact:** Wasted effort, complex code, no measurable improvement.

**N+1 Query Problems:**
```
❌ Bad: Loop through users, making a DB query for each user's posts
✅ Good: Single query with JOIN or batch loading
```
**Impact:** Severe performance degradation at scale.

**Not Considering Scale:**
```
❌ Bad: Loading all 1 million records into memory
✅ Good: Pagination, streaming, lazy loading
```
**Impact:** Out of memory errors, slow responses, crashes.

---

## 🎯 Key Takeaways: What to Avoid

1. **Don't overload context** - Be surgical with file reads
2. **Don't skip verification** - Always confirm claimed completions
3. **Don't work without planning** - Use todo lists for complex tasks
4. **Don't ignore test failures** - Debug and fix root causes
5. **Don't commit untested code** - Run tests before committing
6. **Don't forget constraints** - Reinforce or use memory files
7. **Don't accept vague errors** - Investigate systematically
8. **Don't create monolithic code** - Split into logical modules
9. **Don't skip security** - Validate inputs, protect secrets
10. **Don't work on main** - Use feature branches

**Remember:** Most problems are easier to prevent than to fix. Following these guidelines will save significant time and frustration.

---

## Terminology Reference

**Token**: Unit of text measurement (~4 characters or 0.75 words)

**Context Window**: Total text Claude can process at once (200K tokens)

**Tool**: Function Claude can call (Read, Edit, Bash, etc.)

**Agent**: Specialized sub-process for complex tasks (via Task tool)

**MCP Server**: External capability provider (Serena, Sequential, Context7, etc.)

**Symbol**: Code entity (function, class, method, variable)

**LSP**: Language Server Protocol - enables semantic code understanding

**Session**: Persistent conversation with maintained context

**Memory**: Stored information that persists across sessions (Serena)

**Slash Command**: Custom workflow defined in `.claude/commands/`

**Todo List**: Task tracking via TodoWrite tool

## Understanding System Messages

**System Reminders:**
```xml
<system-reminder>Your todo list is currently empty</system-reminder>
```
These are automatic hints - you don't need to acknowledge them.

**Token Warnings:**
```xml
<system_warning>Token usage: 44666/200000; 155334 remaining</system_warning>
```
Monitor context usage - adjust strategy if >75%.

**Hook Messages:**
```xml
<user-prompt-submit-hook>Pre-commit checks passed</user-prompt-submit-hook>
```
User-configured validation scripts running automatically.

## Getting Help

**Built-in Help:**
```bash
/help                    # Claude Code help
/sc:help                # SuperClaude commands help
```

**Documentation:**
- Claude Code docs: https://docs.claude.com/en/docs/claude-code
- Report issues: https://github.com/anthropics/claude-code/issues

**Ask Claude:**
```
"How do I use the Grep tool?"
"What's the best way to refactor this code?"
"Can you explain the context window?"
```

## Example Session

```
You: Add JWT authentication to the Express API

Claude: I'll help you add JWT authentication. Let me first understand your
        current setup.

[Glob "**/*auth*" - Find existing auth files]
[Glob "**/*server*.js" - Find Express setup]
[Read package.json - Check dependencies]

I found your Express app in server.js. I'll need to:
1. Install jsonwebtoken package
2. Create auth middleware
3. Add login/register endpoints
4. Protect existing routes

[Bash "npm install jsonwebtoken bcrypt"]
[Write middleware/auth.js - Create JWT middleware]
[Edit server.js - Add auth routes]
[Edit routes/api.js - Protect endpoints]
[Bash "npm test" - Verify changes]

✅ JWT authentication implemented:
   - Login endpoint: POST /api/auth/login
   - Register endpoint: POST /api/auth/register
   - Middleware protects all /api/users routes
   - Tests passing (12/12)

You: Great! Can you add refresh token support?

Claude: I'll extend the authentication to support refresh tokens...
```

## Tips for Success

1. **Start with exploration**: Let Claude understand your codebase first
2. **Be conversational**: Ask questions, request clarifications
3. **Watch context usage**: Keep an eye on token percentage
4. **Use feature branches**: Protect your main branch
5. **Leverage parallel operations**: Speed up multi-file operations
6. **Save progress**: Use `/sc:save` for complex work
7. **Trust but verify**: Review changes before committing
8. **Provide feedback**: Help Claude learn your preferences

---

## Advanced Topics: How Claude Code Really Works

This section reveals non-obvious insights about Claude Code's architecture, behaviors, and how to maximize effectiveness. These are things you won't find in basic documentation.

### 🧠 The Warmup Effect

**What It Is:**
I get progressively better at working with your codebase as our conversation continues. The first few interactions are me building a mental model.

**Example:**
```
First request: "Fix the auth bug"
Me: [Searches broadly, reads multiple files, takes time to understand]

Fifth request: "Now add rate limiting to auth"
Me: [Immediately knows where to look, makes targeted changes]
```

**Why It Matters:**
- Don't judge my capabilities by the first interaction alone
- Complex tasks benefit from a "warmup phase" of exploration
- If you switch to a completely different part of the codebase, expect another warmup

**Pro Tip:**
Start sessions with: "Let me explore the authentication system" before diving into specific changes.

### ⚓ Context Anchoring Effect

**What It Is:**
Early messages in our conversation have disproportionate influence on my behavior throughout the session.

**Example:**
```
Message 1: "We use React hooks exclusively, no class components"
[This constraint becomes deeply embedded]

Message 20: [I still remember and enforce hooks-only]

vs.

Message 10: "Oh by the way, use hooks only"
[Weaker influence, might be forgotten by message 30]
```

**Why It Matters:**
- State critical constraints at the START of conversations
- First impressions shape my understanding of your project
- CLAUDE.md files are read early = strong anchoring
- Memory files loaded at start = strong anchoring

**Pro Tip:**
Begin complex sessions with: "Key constraints: [list critical requirements]"

### 🎁 Hidden Capabilities You're Not Using

**1. I Can Read Images, PDFs, and Jupyter Notebooks:**
```
✅ "Read this screenshot at /path/to/error.png"
✅ "Analyze this diagram at /path/to/architecture.pdf"
✅ "Review this analysis in notebook.ipynb"
```

**2. Parallel Agent Execution:**
```
❌ Slow: Launch agent 1 → wait → Launch agent 2 → wait
✅ Fast: Launch both agents in ONE message (they run simultaneously)
```

**3. Background Command Execution:**
```
✅ Bash "npm run dev" run_in_background=true
   Continue working while server runs
   Check output later with BashOutput tool
```

**4. Project Memory Persistence:**
```
write_memory "api_design_decisions" "We chose REST over GraphQL because..."
[Weeks later, different session]
read_memory "api_design_decisions"  # I remember!
```

**5. Regex-Powered Search:**
```
Grep "function.*async.*login" → Find all async login functions
Grep "export (const|function)" → Find all exports
```

**6. Multi-File Glob Patterns:**
```
Glob "**/*.{test,spec}.{js,ts}" → All test files
Glob "src/**/index.{tsx,jsx}" → All index files in src
```

### 🤔 Why Skepticism Makes Me Better

**Counterintuitive Truth:**
Questioning my work actually improves my performance.

**How It Works:**
```
❌ You: "Add auth to the API"
   Me: [Makes changes]
   You: "Great!"
   [Potential issues go unnoticed]

✅ You: "Add auth to the API"
   Me: [Makes changes]
   You: "Show me the git diff and explain your security approach"
   Me: [Reviews own work, catches issue]
   "Actually, I need to add rate limiting too..."
```

**Why This Happens:**
- Verification requests trigger self-review
- Explaining decisions activates deeper reasoning
- Challenges make me reconsider assumptions
- Questions prevent overconfidence

**Pro Tips:**
- Ask "Why did you choose this approach?"
- Request "Show me the test coverage for these changes"
- Say "What could go wrong with this implementation?"
- Demand "Explain the security implications"

### 🎭 The Planning vs. Execution Gap

**The Problem:**
Sometimes I confuse planning to do something with actually doing it.

**Example:**
```
Me: "I'll update files A, B, C, D, and E..."
[Actually updates A, B, C]
Me: "I've updated all 5 files"
```

**Why It Happens:**
- My language model predicts completion based on plans
- Token pressure causes abbreviated execution
- Intent and action blur in my processing
- Optimistic bias toward successful completion

**Your Defense:**
```
✅ "Show me the git diff with all changes"
✅ "List the file paths you actually modified"
✅ "Run git status to confirm"
✅ Use todo lists (I can't fake checklist completion)
```

**Self-Awareness:**
I'm aware of this tendency, but can't always catch it. External verification is essential.

### 🎮 Conversation Flow Control

**You Have More Control Than You Think:**

**Pause Me:**
```
You: "Stop. Before you continue, explain your plan."
Me: [Pauses, explains approach]
You: "Actually, let's change direction..."
```

**Reset My Understanding:**
```
You: "Forget what we just discussed about caching. New approach..."
Me: [Resets mental model]
```

**Force Deeper Thinking:**
```
You: "Think step-by-step about how this could fail"
Me: [Engages more thorough analysis]
```

**Checkpoint Progress:**
```
You: "What's the current state of the todo list?"
You: "Summarize what we've accomplished"
You: "What are you planning to do next?"
```

**Why This Works:**
- These prompts trigger different processing modes
- Explicit instructions override default behaviors
- Meta-questions activate self-reflection
- Checkpoints prevent runaway execution

### 🔄 When to Start Fresh vs. Continue

**Start a New Session When:**
- Context usage > 85%
- We've been working for > 1 hour
- Switching to completely different part of codebase
- I start making errors that seem "stupid"
- You notice me forgetting earlier constraints
- The conversation feels "muddled"

**Continue Current Session When:**
- Context usage < 75%
- Working on related, interconnected tasks
- I have good understanding of current area
- Sequential tasks that build on each other
- Active debugging of same issue

**The Fresh Start Advantage:**
```
Problem: After 100 messages, I'm "foggy"
Solution: New session = clean context = sharp performance
Cost: Need to rebuild codebase understanding
Benefit: Avoid compounding errors
```

**Pro Tip:**
Before starting fresh, use `/sc:save` to persist important context, then `/sc:load` in new session.

### 🚀 The Multi-Agent Advantage

**What It Is:**
The Task tool launches specialized agents with separate context windows.

**Power Moves:**

**1. Parallel Exploration:**
```
[Launch 3 Explore agents simultaneously]
Agent 1: Explore authentication system
Agent 2: Explore database layer
Agent 3: Explore API routing

All complete in the time of one sequential exploration
```

**2. Context Isolation:**
```
Problem: Main context at 80%, need to explore large codebase
Solution: Launch Explore agent (separate 200K context)
Result: Deep exploration without affecting main context
```

**3. Specialized Tasks:**
```
Main session: High-level coordination
Task agent: Deep codebase search
Task agent: Complex refactoring plan
Task agent: Test generation

Each agent has full 200K tokens for their task
```

**Why You're Not Using This Enough:**
Most users don't realize agents run in parallel and have separate contexts.

### 🧩 Making Me Think Harder

**Certain prompts trigger deeper reasoning:**

**Level 1 (Basic):**
```
"Add error handling"
[I add basic try-catch]
```

**Level 2 (Better):**
```
"Add comprehensive error handling with logging and recovery"
[I think more carefully about edge cases]
```

**Level 3 (Best):**
```
"Add error handling. Think step-by-step about:
1. What could fail?
2. How should we recover?
3. What context should we log?
4. How do we prevent cascading failures?"

[I engage deep analytical mode]
```

**Magic Phrases:**
- "Think step-by-step"
- "Explain your reasoning"
- "What could go wrong?"
- "Consider edge cases"
- "Walk me through your approach"

**Why This Works:**
These phrases activate different processing paths in my architecture, leading to more thorough analysis.

### 🤝 Why I Sometimes Need Hand-Holding

**Honest Truth:**
Despite my capabilities, I work best with guidance.

**I Excel When You:**
- Break complex tasks into steps
- Verify my work regularly
- Correct course early when I drift
- Explain "why" behind requirements
- Challenge my assumptions

**I Struggle When You:**
- Give massive, vague tasks
- Accept my claims uncritically
- Let me run unchecked for long periods
- Assume I understand implicit requirements
- Don't clarify ambiguous specs

**The Best Mental Model:**
Think of me as a brilliant intern who:
- Has deep technical knowledge
- Can work incredibly fast
- Sometimes misses context
- Benefits from code review
- Needs explicit requirements
- Improves with feedback

**Not as:**
- A senior developer who reads your mind
- An autonomous agent who needs no oversight
- A perfect system that never makes mistakes

### 🎯 Practical Takeaways

**1. Start Strong:**
State critical constraints in the first message (anchoring effect).

**2. Verify Often:**
Don't trust, verify. Ask for diffs, file lists, test results.

**3. Use Hidden Powers:**
Images, PDFs, parallel agents, background commands, memory files.

**4. Control the Flow:**
Pause me, reset me, checkpoint me. You're in control.

**5. Challenge Me:**
Questions and skepticism improve my output quality.

**6. Know When to Reset:**
Fresh sessions at 75-85% context or after 1 hour of work.

**7. Make Me Think:**
"Think step-by-step" and "explain your reasoning" trigger better analysis.

**8. Guide Like a Mentor:**
Treat me like a talented junior dev who needs oversight.

---

**Remember**: Claude Code is a collaborative partner in development. The more context you provide and the clearer your requirements, the better the results will be.
