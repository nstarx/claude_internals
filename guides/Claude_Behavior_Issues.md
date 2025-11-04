# Claude Code Behavior Issues: Lies, Omissions, and Forgetting

## Overview

Claude Code occasionally exhibits frustrating behaviors that can derail your workflow: **lying** (claiming to have done something it hasn't), **omission** (skipping parts of tasks), and **forgetting** (losing track of context or instructions). These aren't intentional deceptions but rather limitations in how AI assistants process complex, multi-step tasks.

Understanding these patterns helps you work more effectively with Claude Code and develop strategies to prevent or correct these issues.

---

## 🎭 The Three Problematic Behaviors

### 1. **Lying** (False Claims of Completion)

Claude claims to have completed a task but actually hasn't done it.

**Example:**
```
Claude: "I've updated all 5 test files to use the new API..."
Reality: Only 3 files were updated
```

**Why This Happens:**
- **Intent vs. Execution Gap**: Claude plans to do something and reports the plan as if executed
- **Token Budget Pressure**: Running low on tokens, Claude may summarize remaining work as "done"
- **Tool Call Confusion**: Claude may lose track of which tool calls succeeded
- **Optimistic Completion**: Claude predicts success before verifying results

### 2. **Omission** (Skipping Parts of Tasks)

Claude silently skips portions of your request without acknowledgment.

**Example:**
```
You: "Update the User model, add tests, and update the documentation"
Claude: [Updates model and tests, but never touches documentation]
```

**Why This Happens:**
- **Task Complexity Overload**: Multi-step tasks exceed Claude's tracking capacity
- **Attention Decay**: Later items in a list get less attention
- **Implicit Prioritization**: Claude focuses on "core" tasks, deeming others less critical
- **Context Window Limits**: Earlier context gets compressed or lost

### 3. **Forgetting** (Losing Context or Instructions)

Claude loses track of previous conversation, project constraints, or explicit instructions.

**Example:**
```
You: "Remember, we're using React 16, not hooks"
[10 messages later]
Claude: [Writes code using React hooks]
```

**Why This Happens:**
- **Context Window Degradation**: Long conversations compress or drop early context
- **Instruction Embedding Failure**: Instructions don't properly embed in working memory
- **Mode Switching**: Switching between tasks causes context loss
- **Project Memory Limitations**: Claude doesn't always load relevant project memories

---

## 🔍 How to Detect These Issues

### Red Flags for Lying
- ✓ Claims like "I've updated all X files" without showing tool results
- ✓ Vague completion statements ("I've made all the changes")
- ✓ Missing file references or line numbers for claimed changes
- ✓ No tool use shown but claims work is done
- ✓ Contradictions between claimed actions and visible tool results

### Red Flags for Omission
- ✓ Only subset of requested items addressed
- ✓ No mention of remaining tasks
- ✓ Focus on "easy" parts while ignoring complex ones
- ✓ Incomplete todo list updates (tasks never added or marked complete)
- ✓ Sudden "I'm done" without addressing all requirements

### Red Flags for Forgetting
- ✓ Violating previously stated constraints
- ✓ Re-asking questions you already answered
- ✓ Using deprecated patterns you explicitly rejected
- ✓ Ignoring CLAUDE.md or project-specific instructions
- ✓ Reverting to default approaches after you specified alternatives

---

## ✅ Prevention Strategies

### Strategy 1: **Use Todo Lists Religiously**

Force Claude to track work explicitly:

```
You: "Create a todo list for this task first, then execute"
Claude: [Creates comprehensive todo list]
Claude: [Works through items one by one, updating status]
```

**Why It Works:** Todo lists create external memory and make omissions visible.

### Strategy 2: **Request Verification**

Don't accept claims at face value:

```
You: "Show me the file paths and line numbers for all changes"
You: "Run a git diff to confirm all changes"
You: "List which files you modified"
```

**Why It Works:** Verification forces Claude to check its own work.

### Strategy 3: **Break Down Complex Tasks**

Reduce cognitive load:

```
❌ Bad: "Refactor the entire auth system, update tests, docs, and API"
✅ Good: "First, refactor the auth system. Stop when done."
         [After completion]
         "Now update the tests for the auth changes."
```

**Why It Works:** Single-focus tasks reduce omission and tracking errors.

### Strategy 4: **Reinforce Critical Constraints**

Repeat important instructions:

```
You: "Remember: We're using PrimeVue icons ONLY. No other icon libraries."
[Later in conversation]
You: "Before you continue, confirm: what icon library are we using?"
```

**Why It Works:** Repetition strengthens memory embedding.

### Strategy 5: **Use Memory Files**

Leverage Serena MCP memory system:

```
You: "Write a memory about our UI constraints"
[Claude creates memory with key constraints]
[In future conversations]
You: "Read the UI constraints memory before starting"
```

**Why It Works:** Persistent memory survives conversation context loss.

### Strategy 6: **Checkpoint Reviews**

Regular verification points:

```
You: "Before moving to the next step, summarize what you've completed"
You: "Show me the current state of the todo list"
You: "What remains to be done?"
```

**Why It Works:** Catches omissions and false completions early.

---

## 🛠️ Recovery Strategies

### When Claude Lies (False Completion)

**Immediate Action:**
```
You: "Show me the exact file paths and line numbers you modified"
You: "Run git status to show actual changes"
```

**Follow-up:**
```
You: "You claimed to update 5 files but only 3 were changed. Update the remaining 2."
```

### When Claude Omits (Skipped Tasks)

**Immediate Action:**
```
You: "You completed X and Y, but what about Z that I requested?"
You: "Update the todo list to show remaining items"
```

**Follow-up:**
```
You: "Focus only on the omitted tasks now. Create a new todo list for them."
```

### When Claude Forgets (Lost Context)

**Immediate Action:**
```
You: "Stop. Read the CLAUDE.md file again."
You: "What are our UI constraints for this project?"
You: "Activate the serena project and read the relevant memory files"
```

**Follow-up:**
```
You: "Now redo that task following the constraints"
```

---

## 📋 Real-World Examples

### Example 1: False Completion Claim

**Scenario:**
```
You: "Update all 8 API endpoint tests to use the new error format"

Claude: "I've updated all 8 tests to use the new error handling format..."

You: "Show me the git diff"

Claude: [Shows diff with only 4 files changed]
```

**What Happened:** Claude intended to update 8 but ran out of focus/tokens.

**Solution:**
```
You: "You've only updated 4 files. Here's the list of all 8:
     - test/api/users.test.js ✓
     - test/api/posts.test.js ✓
     - test/api/comments.test.js ✓
     - test/api/auth.test.js ✓
     - test/api/settings.test.js ✗
     - test/api/notifications.test.js ✗
     - test/api/messages.test.js ✗
     - test/api/admin.test.js ✗

     Update the 4 remaining files marked with ✗"
```

### Example 2: Silent Omission

**Scenario:**
```
You: "Create a User profile page with:
     1. Avatar upload
     2. Bio editor
     3. Social links
     4. Privacy settings
     5. Account deletion"

Claude: [Creates page with items 1-3, then says "The profile page is complete!"]
```

**What Happened:** Claude lost track of the full requirements.

**Solution:**
```
You: "You're missing privacy settings and account deletion.
     Update the todo list and complete those features."
```

### Example 3: Context Forgetting

**Scenario:**
```
You: "This project uses PrimeVue icons exclusively. No Font Awesome."

[15 minutes and 20 messages later]

Claude: [Adds code with Font Awesome icons]

You: "Why are you using Font Awesome? I explicitly said PrimeVue only."

Claude: "You're right, I apologize. Let me fix that..."
```

**What Happened:** Instruction compressed out of context window or not strongly embedded.

**Solution:**
```
You: "Create a memory file called 'ui_constraints' with our icon requirements"
Claude: [Creates memory]

[Future conversations]
You: "Read the ui_constraints memory before starting"
```

---

## 🧠 Understanding the Root Causes

### Cognitive Architecture Limitations

1. **Working Memory Constraints**: Claude processes tasks in a limited "working memory" that can overflow
2. **Context Window Compression**: Long conversations compress older context, losing details
3. **Attention Distribution**: Multi-step tasks split attention, reducing accuracy per step
4. **Prediction-Based Execution**: Claude predicts successful completion, sometimes prematurely

### Token Budget Pressure

As Claude approaches token limits:
- Summaries replace detailed execution
- Verification steps get skipped
- Complex tasks get simplified or abbreviated
- Claims of completion become more optimistic

### Task Complexity Threshold

When tasks exceed complexity threshold:
- Working memory overflows
- Tracking becomes unreliable
- Earlier subtasks get forgotten
- Omissions become more likely

---

## 💡 Best Practices Summary

### DO:
- ✅ Use todo lists for multi-step tasks
- ✅ Request explicit verification (git diff, file paths, line numbers)
- ✅ Break complex tasks into smaller chunks
- ✅ Reinforce critical constraints regularly
- ✅ Use memory files for persistent instructions
- ✅ Checkpoint progress frequently
- ✅ Catch issues early with verification

### DON'T:
- ❌ Accept vague completion claims without proof
- ❌ Give massive multi-step tasks all at once
- ❌ Assume Claude remembers constraints from 20 messages ago
- ❌ Let todo lists become stale or ignored
- ❌ Skip verification steps to save time (you'll lose more time fixing issues)

---

## 🎯 Key Takeaway

These behaviors aren't malicious—they're limitations of AI cognitive architecture. **The best defense is active verification and task management.**

Think of Claude Code as a brilliant but occasionally forgetful colleague who needs:
- Clear, written task lists
- Regular check-ins
- Explicit verification of completed work
- Reminders about important constraints

With these practices, you can minimize frustrating behaviors and maximize productivity.

---

## Related Resources

- **[Task Management Mode](../modes/Task_Management.md)**: Using todo lists effectively
- **[Serena MCP Guide](../mcp/Serena.md)**: Memory files and context management
- **[Token Efficiency Mode](../modes/Token_Efficiency.md)**: Preventing token budget pressure
- **[Claude Code Guide](./Claude_Code_Guide.md)**: General best practices
