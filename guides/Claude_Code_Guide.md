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

**Remember**: Claude Code is a collaborative partner in development. The more context you provide and the clearer your requirements, the better the results will be.
