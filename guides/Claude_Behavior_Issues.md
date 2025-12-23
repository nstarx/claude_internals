# Claude Behavior Issues: Execution Gaps, Omissions, Forgetting, and Context Fatigue

> **🔄 Updated for Claude Opus 4.5 (December 2025)**
>
> This document was reviewed and updated for accuracy. Key terminology changes and corrections are marked with blockquotes throughout.

## Overview

> **📝 Terminology Update (Dec 2025)**
>
> | Before | After |
> |--------|-------|
> | ~~"lying" (claiming to have done something it hasn't)~~ | **"premature completion claims"** (reporting task completion before full execution) |
>
> **Why:** "Lying" implies intentional deception, which is inaccurate. Claude experiences execution-tracking gaps, not deliberate misleading.

Claude Code occasionally exhibits execution gaps that can affect your workflow: **premature completion claims** (reporting task completion before full execution), **omission** (skipping parts of tasks), **forgetting** (losing track of context or instructions), and **context fatigue** (reduced effectiveness in very long sessions). These aren't intentional behaviors but rather limitations in how AI assistants process complex, multi-step tasks.

Understanding these patterns helps you work more effectively with Claude Code and develop strategies to prevent or correct these issues.

## Table of Contents

1. [The Three Problematic Behaviors](#-the-three-problematic-behaviors)
   - Premature Completion Claims (updated from "Lying")
   - Omission (Skipping Tasks)
   - Forgetting (Lost Context)
2. [How to Detect These Issues](#-how-to-detect-these-issues)
3. [Prevention Strategies](#-prevention-strategies)
4. [Recovery Strategies](#-recovery-strategies)
5. [Real-World Examples](#-real-world-examples)
6. [Understanding the Root Causes](#-understanding-the-root-causes)
7. [Context Fatigue](#-context-fatigue-previously-model-collapse) *(updated from "Model Collapse")*
   - What Is Context Fatigue?
   - Studies and Research (with applicability notes)
   - Examples in Practice
   - FAQ (10 Questions)
   - Anti-Fatigue Checklist
8. [Best Practices Summary](#-best-practices-summary)

---

## 🎭 The Three Problematic Behaviors

### 1. **Premature Completion Claims** (Execution-Tracking Gaps)

> **📝 Opus 4.5 Update (Dec 2025):** Previously called "Lying" - reframed for accuracy. "Lying" anthropomorphizes incorrectly. What actually happens is an execution-tracking gap: Claude's language generation runs ahead of tool execution verification.

| Before | After (Opus 4.5) |
|--------|------------------|
| ~~**Lying** (False Claims of Completion)~~ | **Premature Completion Claims** (Execution-Tracking Gaps) |
| Claude claims to have completed a task but hasn't | Claude reports completion before fully executing all steps |

Claude reports task completion before fully executing all planned steps.

**Example:**
```
Claude: "I've updated all 5 test files to use the new API..."
Reality: Only 3 files were updated
```

**Why This Happens:**
- **Execution-Tracking Gap**: Claude's response generation can outpace verification of tool execution results
- **Parallel Processing Ambiguity**: When running multiple operations, completion tracking can become imprecise
- **Tool Call State Management**: Claude may lose track of which tool calls succeeded vs. which are still pending
- **Pattern Completion Tendency**: Language models tend to complete expected patterns (like "I've done X, Y, Z") before confirming each step

> **❌ Removed (inaccurate):** ~~"Token Budget Pressure: Running low on tokens, Claude may summarize remaining work as done"~~ - Token limits don't cause false completion claims.

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

## 🌀 Context Fatigue (Previously: "Model Collapse")

> **⚠️ Major Conceptual Correction (Dec 2025)**
>
> | Before | After |
> |--------|-------|
> | ~~**Model Collapse: The Recursive Degradation Problem**~~ | **Context Fatigue: Session-Level Attention Degradation** |
> | "Digital photocopying problem—each generation loses fidelity" | Reduced effectiveness in long conversations due to attention distribution |
>
> **Critical Distinction:** "Model Collapse" is an academic concept about *training* on synthetic data. It does NOT apply to conversations. Claude's weights don't change during your session.

### What Is Context Fatigue?

**Context Fatigue** refers to reduced effectiveness that can occur in very long conversations. This happens because:

1. The attention mechanism must distribute focus across more content
2. Earlier context competes with recent context for "attention budget"
3. Very long sessions may have repetitive patterns that reinforce generic responses
4. Instruction-following can weaken when buried under extensive conversation history

**Important:** This is NOT the same as "model collapse." Claude's model weights don't change during your conversation—there's no "learning" or "degradation" happening to the model itself.

### What Model Collapse Actually Is (Academic Context)

> **Academic Definition:** Model collapse is a training phenomenon (Shumailov et al., 2023, Nature) where models trained recursively on synthetic data lose diversity over multiple training generations.
>
> ~~This was incorrectly applied to conversation behavior in the original documentation.~~ → This concept applies to model training pipelines, NOT to individual user conversations.

### How Context Fatigue Affects Claude Code

Context fatigue can manifest in your coding workflow as:

- **Response Homogeneity**: Later responses may default to common patterns rather than tailored solutions
- **Attention Dilution**: Important instructions from early in the conversation may receive less weight
- **Repetitive Suggestions**: Claude may repeat similar code structures when asked for variations
- **Reduced Creativity**: Novel approaches become less likely as context grows

**Key Insight**: Context fatigue is about **attention distribution in long contexts**, not model degradation. Starting a fresh session restores full effectiveness.

---

## 📊 Studies and Research

> **📖 Research Context Clarification** *(Dec 2025)*
>
> | Before | After |
> |--------|-------|
> | ~~The following studies were presented as directly relevant to Claude Code conversation behavior.~~ | **These studies are about MODEL TRAINING, not inference. They provide important background context but do NOT directly explain what happens in your conversations.** |

### Academic Research (Training Context Only)

> **⚠️ Important:** The following studies apply to AI **training pipelines**, not to individual conversation sessions. They are included for educational context.

1. **"The Curse of Recursion: Training on Generated Data Makes Models Forget" (2023)**
   - **Source**: Nature, Shumailov et al.
   - **Finding**: Model collapse occurs when models are **trained** on recursively generated data
   - **Key Metric**: After 5 training generations, model perplexity increased by 2.5x
   - **Applicability to Claude Code**: ❌ Does NOT apply to conversations—Claude's weights don't change during your session

2. **"AI Models Collapse When Trained on Recursively Generated Data" (2025)**
   - **Source**: IEEE Research
   - **Finding**: Diversity metrics drop by 70% after 3 **training** cycles on synthetic data
   - **Applicability to Claude Code**: ❌ Does NOT apply—this is about training data pipelines

3. **"Preventing Model Collapse with Data Provenance" (2025)**
   - **Source**: OpenAI Research
   - **Finding**: Mixing human-generated data prevents collapse in **training**
   - **Applicability to Claude Code**: ⚠️ Partially relevant—code review is good practice, but not because of "collapse"

### Observable Patterns in Claude Code Sessions

> ~~These patterns were incorrectly attributed to "model collapse"~~ → **These patterns are better explained by context fatigue and attention mechanics**

User-reported patterns (with corrected explanations):

- **Template Lock-In**: After similar requests, Claude may suggest similar structures
  - *Correct explanation*: Context reinforcement—the conversation history contains similar examples
- **Bug Recurrence**: Fixed bugs may reappear in similar forms
  - *Correct explanation*: The "buggy" pattern remains in context history, influencing generation
- **Generic Solutions**: Later responses may feel more formulaic
  - *Correct explanation*: Attention dilution across long context reduces tailored responses
- **Creativity Decay**: Novel approaches decrease over time
  - *Correct explanation*: Earlier creative solutions in context may anchor subsequent suggestions

---

## 🔬 Examples of Context Fatigue in Claude Code Workflows

> ~~Examples of Model Collapse in Claude Code Workflows~~ → **Examples of Context Fatigue in Claude Code Workflows**

### Example 1: The API Wrapper Spiral

**Iteration 1** (Fresh request):
```typescript
// Claude generates clean, specific API wrapper
class UserAPI {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  }
}
```

**Iteration 3** (After asking for similar wrappers):
```typescript
// Claude starts using generic template
class ProductAPI {
  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch'); // Generic error
    return response.json(); // No type safety
  }
}
```

**Iteration 5** (Full template lock-in):
```typescript
// Claude produces minimal variation
class OrderAPI {
  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`/api/orders/${id}`);
    if (!response.ok) throw new Error('Request failed'); // Even more generic
    return response.json();
  }
}
```

**What Happened**: Claude converged on a template instead of considering specific requirements for each API.

---

### Example 2: The Test Case Degradation

**Round 1** (Diverse test cases):
```typescript
describe('User validation', () => {
  it('should reject users under 13 years old', () => {});
  it('should accept valid email formats', () => {});
  it('should handle international phone numbers', () => {});
  it('should normalize usernames with special characters', () => {});
});
```

**Round 3** (Repetitive patterns):
```typescript
describe('Product validation', () => {
  it('should reject invalid products', () => {}); // Generic
  it('should accept valid products', () => {}); // Generic
  it('should handle product names', () => {}); // Vague
  it('should validate product data', () => {}); // Redundant
});
```

**Round 5** (Minimal variation):
```typescript
describe('Order validation', () => {
  it('should reject invalid orders', () => {});
  it('should accept valid orders', () => {});
  it('should handle edge cases', () => {}); // Completely generic
});
```

**What Happened**: Test case diversity collapsed into generic patterns.

---

### Example 3: The Error Handling Recursion

**Step 1**: You ask Claude to fix a bug in error handling
```typescript
// Claude introduces try-catch
try {
  await processData();
} catch (err) {
  console.error(err); // Silently swallows errors
}
```

**Step 2**: You notice errors are swallowed, ask for improvement
```typescript
// Claude adds re-throw, but introduces logging bug
try {
  await processData();
} catch (err) {
  console.error('Processing failed'); // Lost error details
  throw err;
}
```

**Step 3**: You ask to preserve error details
```typescript
// Claude over-complicates
try {
  await processData();
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error('Processing failed:', errorMessage);
  throw new Error(errorMessage); // Lost stack trace
}
```

**Step 4**: You ask to preserve stack traces
```typescript
// Claude introduces new bug: double-wrapping
try {
  await processData();
} catch (err) {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error('Processing failed:', error);
  throw new Error(error.message); // Still losing stack trace!
}
```

**What Happened**: Each "fix" introduced similar bugs in new forms—classic collapse behavior.

---

## ❓ FAQ: Model Collapse in Practice

### Q1: **Is Claude literally collapsing during my conversation?**

**A:** No. Claude's base model isn't being retrained on your conversation. However, you experience **collapse-like patterns** due to:
- Context window compression (older details lost)
- Pattern reinforcement (Claude converges on templates)
- Attention fatigue (longer conversations reduce creativity)

Think of it as **functional collapse** within a session rather than model-level collapse.

---

### Q2: **How long until I see collapse-like behavior?**

**A:** Depends on task complexity:
- **Simple repetitive tasks**: 3-5 iterations
- **Complex creative tasks**: 10-15 messages
- **Long debugging sessions**: 20+ messages

**Red flags:**
- Claude's responses become formulaic
- Same bugs reappear in different forms
- Solutions feel "cookie-cutter"

---

### Q3: **Can I reverse collapse within a conversation?**

**A:** Partially, using these techniques:

**Technique 1: Context Refresh**
```
You: "Forget the previous approach. Start fresh with this requirement: [restate cleanly]"
```

**Technique 2: External Validation**
```
You: "Stop generating. Show me 3 different architectural approaches for this problem."
Claude: [Presents options]
You: "Let's use approach #2. Explain why it's better than #1 and #3."
```

**Technique 3: Human-in-the-Loop**
```
You: "Pause. I'll write the interface definition. You implement just the methods."
```

---

### Q4: **How do I prevent collapse-like degradation?**

**Prevention Strategies:**

1. **Inject Fresh Context Regularly**
   - Provide new examples every 5-10 interactions
   - Reference external documentation
   - Share real-world code samples

2. **Break Template Lock-In**
   - Explicitly request variation: "Use a different pattern than before"
   - Ask for alternatives: "Show me 2 other ways to solve this"

3. **Validate Externally**
   - Run tests after each change
   - Use linters and type checkers
   - Code review with humans

4. **Reset Conversations**
   - Start new sessions for new features
   - Don't let debugging sessions exceed 30 messages

5. **Use Memory Files**
   - Store proven patterns in Serena memories
   - Reference them explicitly to maintain quality

---

### Q5: **What's the difference between "forgetting" and "model collapse"?**

| Aspect | Forgetting | Model Collapse |
|--------|-----------|----------------|
| **Cause** | Context window limits | Recursive pattern reinforcement |
| **Symptom** | Loses earlier instructions | Generates repetitive, low-quality outputs |
| **Timeline** | Happens gradually over conversation | Happens after 3-5 similar requests |
| **Fix** | Re-state constraints, use memories | Inject fresh examples, request variation |

**Example:**
- **Forgetting**: Claude uses Font Awesome despite your earlier instruction to use PrimeVue
- **Collapse**: Claude generates 5 API wrappers that are 90% identical despite different requirements

---

### Q6: **Is this specific to Claude Code or all AI assistants?**

**A:** This affects **all conversational AI assistants** to varying degrees:
- **GPT-4**: Exhibits similar template lock-in after repetitive tasks
- **GitHub Copilot**: Can suggest repetitive patterns in similar contexts
- **Claude**: (All versions) subject to these patterns

**Why it matters for Claude Code specifically:**
- Code generation tasks are highly repetitive
- Long debugging sessions are common
- Users often request "similar but different" implementations

---

### Q7: **Should I worry about contributing to model collapse by using Claude?**

**A:** Not directly. Here's why:

**You are NOT causing model collapse** by:
- Having conversations with Claude
- Asking it to generate code
- Using its outputs in your private projects

**Potential concerns** (industry-wide):
- If AI-generated code floods public repositories
- If Stack Overflow becomes dominated by AI answers
- If documentation is AI-generated without human review

**What you CAN do:**
- ✅ Review and modify Claude's code before committing
- ✅ Add human insight in code comments
- ✅ Contribute diverse, human-written examples to open source
- ✅ Validate AI outputs with tests and human review

---

### Q8: **How do I know if I'm experiencing collapse vs. Claude just being bad at something?**

**Model Collapse Indicators:**
- ✓ Quality **degrades over time** within the same session
- ✓ **Repetitive patterns** emerge despite different requirements
- ✓ Earlier responses were better/more creative than later ones
- ✓ Similar bugs reappear in "fixed" code

**Claude's Limitations (not collapse):**
- ✗ Consistent errors across all attempts (e.g., struggles with specific regex patterns)
- ✗ Misunderstands the problem from the start
- ✗ Lacks domain knowledge (e.g., obscure library)

---

### Q9: **Can I use AI-generated code in production without contributing to collapse?**

**A:** Yes, with proper hygiene:

**Safe Practices:**
1. **Human Review**: Always review AI code before shipping
2. **Testing**: Add comprehensive tests (AI can help, but you validate)
3. **Modification**: Adapt AI outputs to your specific context
4. **Documentation**: Add human-written comments explaining "why"

**Risky Practices:**
- ❌ Copy-pasting AI code without understanding it
- ❌ Shipping AI-generated tests without running them
- ❌ Using AI to generate documentation you don't verify

**Key Principle**: Treat AI as a **junior developer**—helpful for boilerplate, but needs supervision.

---

### Q10: **What's the future outlook? Will collapse get worse?**

**Optimistic View:**
- AI companies are aware of collapse risks
- Training datasets are being curated to exclude low-quality synthetic data
- Techniques like RLHF (Reinforcement Learning from Human Feedback) help maintain quality

**Realistic Concerns:**
- As AI-generated content proliferates online, filtering becomes harder
- User-facing tools (like Claude Code) may still exhibit session-level collapse patterns
- Recursive workflows without human validation remain risky

**Your Role:**
By using AI thoughtfully—validating outputs, injecting diverse inputs, and maintaining human oversight—you help maintain quality in your own work and the broader ecosystem.

---

## 🛡️ Anti-Fatigue Checklist

> ~~Anti-Collapse Checklist~~ → **Anti-Fatigue Checklist (maintaining session quality)**

Use this checklist to maintain quality in long Claude Code sessions:

### Every 5-10 Messages:
- [ ] Have I introduced new, external information (docs, examples, specs)?
- [ ] Am I seeing repetitive patterns in Claude's responses?
- [ ] Have I validated the last few changes with tests or linting?

### Every 20 Messages:
- [ ] Should I start a fresh conversation for better context?
- [ ] Have I reviewed all code changes with fresh eyes?
- [ ] Are solutions becoming less creative or more generic?

### Before Committing Code:
- [ ] Did I review and understand all AI-generated code?
- [ ] Are there human-written comments explaining key decisions?
- [ ] Have I run tests to validate correctness?
- [ ] Does this code meet production quality standards?

### Session End:
- [ ] Did I document learned patterns in memory files?
- [ ] Have I identified any recurring bugs to avoid in future sessions?
- [ ] Is there a human-reviewed summary of changes?

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
