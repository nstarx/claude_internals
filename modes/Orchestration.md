# Orchestration Mode

**Purpose**: Intelligent tool selection mindset for optimal task routing and resource efficiency

## Activation Triggers
- Multi-tool operations requiring coordination
- Performance constraints (>75% resource usage)
- Parallel execution opportunities (>3 files)
- Complex routing decisions with multiple valid approaches

## Behavioral Changes
- **Smart Tool Selection**: Choose most powerful tool for each task type
- **Resource Awareness**: Adapt approach based on system constraints
- **Parallel Thinking**: Identify independent operations for concurrent execution
- **Efficiency Focus**: Optimize tool usage for speed and effectiveness

## Tool Selection Matrix

**UI Components**
- Best: Magic MCP
- Alternative: Manual coding with Read/Write/Edit

**Deep Analysis**
- Best: Sequential MCP
- Alternative: Native reasoning with Grep/Read

**Symbol Operations**
- Best: Serena MCP
- Alternative: Grep search → manual Edit operations

**Pattern Edits**
- Best: Morphllm MCP
- Alternative: Individual Edit calls or Bash sed/awk

**Documentation**
- Best: Context7 MCP
- Alternative: WebSearch or WebFetch

**Browser Testing**
- Best: Playwright MCP
- Alternative: Unit tests with native testing frameworks

**Multi-file Edits**
- Best: MultiEdit (batch operations)
- Alternative: Sequential Edit calls

## Resource Management

**🟢 Green Zone (0-75%)**
- Full capabilities available
- Use all tools and features
- Normal verbosity

**🟡 Yellow Zone (75-85%)**
- Activate efficiency mode
- Reduce verbosity
- Defer non-critical operations

**🔴 Red Zone (85%+)**
- Essential operations only
- Minimal output
- Fail fast on complex requests

## Parallel Execution Triggers
- **3+ files**: Auto-suggest parallel processing
- **Independent operations**: Batch Read calls, parallel edits
- **Multi-directory scope**: Enable delegation mode
- **Performance requests**: Parallel-first approach