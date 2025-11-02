# Sequential MCP Server

**Purpose**: Structured multi-step reasoning and hypothesis-driven problem solving with reflective analysis

## Triggers
- Complex debugging requiring systematic analysis
- Multi-component system design and architecture planning
- Problems requiring hypothesis generation and verification
- Situations needing course correction during analysis
- Tasks requiring maintained context over multiple reasoning steps
- Need to filter irrelevant information during problem solving

## Choose When
- **Over native reasoning**: When problems require explicit step-by-step verification
- **For complex analysis**: Multi-layered problems with interdependencies
- **For hypothesis testing**: Generate solution → verify → refine cycle
- **For adaptive reasoning**: When initial approach may need revision mid-analysis
- **Not for simple tasks**: Straightforward operations with clear single-step solutions

## Works Best With
- **Context7**: Sequential reasons about patterns → Context7 provides authoritative docs
- **Serena**: Serena provides semantic context → Sequential analyzes architectural impact
- **Magic**: Sequential plans component structure → Magic generates implementations
- **Morphllm**: Sequential identifies patterns → Morphllm applies bulk transformations

## Key Features
- **Dynamic thought adjustment**: Can increase/decrease estimated steps as understanding deepens
- **Self-correction**: Ability to question and revise previous reasoning steps
- **Branching logic**: Explore alternative approaches when needed
- **Hypothesis-driven**: Generate solutions → verify against constraints → iterate
- **Context filtering**: Ignore irrelevant information to focus on core problem

## Examples
```
"Debug why authentication is failing intermittently" → Sequential (systematic hypothesis testing)
"Design a scalable microservices architecture" → Sequential (multi-component analysis)
"Analyze this complex algorithm's behavior" → Sequential (step-by-step breakdown)
"Refactor this monolith to modular design" → Sequential (structured transformation planning)
"Explain what this simple function does" → Native Claude (single-step analysis sufficient)
```

## Claude Code Without Sequential

When Sequential MCP is unavailable, Claude Code uses these alternatives:

**Native Capabilities**
- **Built-in reasoning**: Claude's native chain-of-thought processing
- **Iterative analysis**: Manual multi-step reasoning without explicit structure
- **Task tool**: Launch agents for complex multi-step operations
- **TodoWrite**: Break down complex tasks into trackable steps

**Workflow Differences**
- **Explicit steps**: Less visible reasoning chain vs Sequential's transparent thought process
- **Hypothesis tracking**: Implicit verification vs Sequential's explicit hypothesis testing
- **Course correction**: Less structured pivoting vs Sequential's formal revision markers
- **Branching**: Linear reasoning vs Sequential's ability to explore alternatives

**When to use Native vs Sequential**
- Native is sufficient for: Linear problems, single-domain analysis, straightforward debugging
- Sequential adds value for: Complex systems, hypothesis-driven analysis, multi-step verification, adaptive reasoning

## Reasoning Patterns

### Linear Analysis
Best for: Problems with clear progression, single solution path
```
Sequential: thought 1 → thought 2 → thought 3 → conclusion
```

### Hypothesis-Driven
Best for: Debugging, root cause analysis, solution exploration
```
Sequential: hypothesis → verification → revision → new hypothesis → validation
```

### Branching Exploration
Best for: Design decisions, architectural choices, trade-off analysis
```
Sequential: initial path → branch point → explore alternative → compare → decide
```

### Progressive Refinement
Best for: Complex architectures, iterative improvement, optimization
```
Sequential: broad analysis → identify focus areas → deep dive → synthesize → refine
```

## Word Dictionary

**Hypothesis-driven**: Problem-solving approach that generates testable solutions and verifies them systematically

**Chain of thought**: Explicit sequence of reasoning steps that build upon each other

**Course correction**: Ability to recognize when current reasoning path is suboptimal and adjust approach

**Thought revision**: Questioning or modifying previous reasoning steps based on new insights

**Branching logic**: Exploring multiple solution paths simultaneously or sequentially

**Progressive refinement**: Starting with rough understanding and iteratively improving precision

**Context filtering**: Actively ignoring irrelevant information to focus reasoning on essential elements

**Adaptive reasoning**: Adjusting analysis strategy based on emerging understanding of the problem
