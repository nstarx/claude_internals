# Mode Selection Decision Tree

Quick guide to choosing the right behavioral mode for your task.

## Decision Flow

```
START: What type of task do you have?
│
├─ [Vague/Unclear Requirements]
│  └─> 🧠 Brainstorming Mode
│     - Help me figure out what I need
│     - Thinking about creating...
│     - Not sure what the best approach is
│
├─ [Complex Multi-Step Task]
│  └─> 📋 Task Management Mode
│     - >3 distinct steps
│     - Multiple file/directory scope
│     - Needs progress tracking
│     - Requires session persistence
│
├─ [Business/Strategic Analysis]
│  └─> 💼 Business Panel Mode
│     - Market analysis
│     - Competitive strategy
│     - Business model design
│     - Strategic planning
│
├─ [Multiple Tools/Optimization Needed]
│  └─> 🎯 Orchestration Mode
│     - Performance constraints
│     - Parallel execution opportunities
│     - Complex tool routing decisions
│     - Resource optimization needed
│
├─ [Need to Understand My Reasoning]
│  └─> 🔍 Introspection Mode
│     - Error recovery
│     - Pattern recognition
│     - Framework compliance check
│     - Self-analysis
│
├─ [Token/Context Constraints]
│  └─> ⚡ Token Efficiency Mode
│     - Context usage >75%
│     - Large-scale operations
│     - Need compressed communication
│     - Symbol-based output preferred
│
└─ [Standard Development Task]
   └─> Default Behavior
      - Single file edits
      - Clear requirements
      - Straightforward implementation
```

## Mode Combinations

Modes can work together! Common combinations:

### Task Management + Orchestration
Complex multi-step projects requiring tool optimization
```
Example: Large codebase refactor with parallel operations
```

### Task Management + Token Efficiency
Large projects with context constraints
```
Example: Processing 50+ files with limited context
```

### Brainstorming + Business Panel
Strategic discovery with expert validation
```
Example: Exploring new product directions
```

### Introspection + Task Management
Complex problem-solving with self-monitoring
```
Example: Debugging multi-layer architecture issues
```

## Trigger Keywords

### Brainstorming
- "maybe", "thinking about", "not sure", "explore", "figure out"
- "help me understand what I need"
- "what's the best approach"

### Task Management
- "implement", "refactor", "organize", "systematically"
- ">3 steps", "multiple files", "across directories"
- "track progress", "remember state"

### Business Panel
- "strategy", "market", "competitive", "business model"
- "strategic planning", "positioning", "value proposition"
- "/sc:business-panel"

### Orchestration
- "optimize", "parallel", "efficient", "performance"
- "multiple tools", "resource constraints"
- "best tool for", "fastest way"

### Introspection
- "analyze my reasoning", "why did I", "reflect on"
- "pattern in my behavior", "am I following"
- "self-analysis", "meta-cognitive"

### Token Efficiency
- "compressed", "concise", "brief", "token limit"
- ">75% context usage", "symbol notation"
- "--uc", "--ultracompressed"

## Manual Activation

Use flags when you want explicit mode activation:

```bash
# Brainstorming
--brainstorm, --bs

# Business Panel
--business-panel, --bp

# Introspection
--introspect, --introspection

# Task Management
--task-manage, --delegate

# Orchestration
(auto-activated based on context)

# Token Efficiency
--uc, --ultracompressed
```

## Auto-Activation Confidence

Modes auto-activate when confidence threshold is met:

| Mode | Confidence Threshold | Trigger Strength |
|------|---------------------|------------------|
| Brainstorming | 60% | Medium (asks user if unsure) |
| Business Panel | 70% | High (domain keywords) |
| Introspection | 70% | High (explicit requests) |
| Orchestration | 75% | Very High (resource signals) |
| Task Management | 70% | High (complexity signals) |
| Token Efficiency | 80% | Very High (context pressure) |

## Examples by Scenario

### Scenario: "I want to build something but not sure what"
**Selected Mode**: 🧠 Brainstorming
**Reasoning**: Vague requirements, discovery needed
**Outcome**: Requirements elicitation through Socratic dialogue

### Scenario: "Refactor authentication across 20 files"
**Selected Mode**: 📋 Task Management + 🎯 Orchestration
**Reasoning**: Multi-step (>3), multiple files, needs optimization
**Outcome**: Hierarchical task breakdown with parallel execution

### Scenario: "Analyze this market entry strategy document"
**Selected Mode**: 💼 Business Panel
**Reasoning**: Business/strategic content detected
**Outcome**: Multi-expert analysis with synthesis

### Scenario: "Why did my last solution fail?"
**Selected Mode**: 🔍 Introspection
**Reasoning**: Self-analysis request, error recovery
**Outcome**: Pattern analysis and learning insights

### Scenario: "Implement feature X (token usage at 78%)"
**Selected Mode**: ⚡ Token Efficiency + 📋 Task Management
**Reasoning**: Context pressure + multi-step task
**Outcome**: Compressed communication with progress tracking

## Quick Decision Matrix

| Task Clarity | Task Size | Domain | Recommended Mode |
|--------------|-----------|--------|------------------|
| Low | Any | Any | 🧠 Brainstorming |
| High | Large (>3 steps) | Technical | 📋 Task Management |
| High | Any | Business | 💼 Business Panel |
| High | Complex | Technical | 🎯 Orchestration |
| Any | Any | Meta-analysis | 🔍 Introspection |
| Any | Any (context pressure) | Any | ⚡ Token Efficiency |

## Related Documentation

- [All Modes Overview](../modes/README.md)
- [Core Framework Rules](../core/RULES.md)
- [MCP Server Selection](../mcp/README.md)
- [Quick Reference](./Quick_Reference.md)
