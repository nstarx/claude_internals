# PRD: Section Infographics Toggle Feature

## Executive Summary
Add a toggleable infographics view to each of the 21 sections in the Strategic Context Management documentation site. Users can switch between text content and visual infographic representation for enhanced understanding.

---

## Feature Overview

### User Story
> As a user, I want to toggle an infographics view for any section, so I can understand complex concepts visually when I prefer graphical representation over text.

### Goals
1. Enhance comprehension through visual learning
2. Provide quick visual summaries for each section
3. Maintain consistency across all infographics
4. Non-disruptive toggle that preserves scroll position

---

## Technical Architecture

### Toggle Component
```html
<!-- Added to each section header -->
<div class="view-toggle">
    <button class="toggle-btn active" data-view="text">
        <i class="pi pi-align-left"></i> Text
    </button>
    <button class="toggle-btn" data-view="infographic">
        <i class="pi pi-chart-bar"></i> Visual
    </button>
</div>
```

### CSS Structure
```
styles/
├── infographics.css          # Main infographics styles
├── infographics-common.css   # Shared visual components
```

### JavaScript Handler
```
scripts/
├── infographics-toggle.js    # Toggle logic and state management
```

### Infographic Storage
```
data/
├── infographics/             # SVG/HTML infographic files
│   ├── overview-infographic.html
│   ├── working-memory-infographic.html
│   └── ... (21 files total)
```

---

## Section-by-Section PRD

### 1. Claude Code Methodology (`claude-code-methodology`)
**Content Focus**: Claude Code features, capabilities, workflow patterns

**Infographic Elements**:
- Central hub diagram showing Claude Code at center
- Radiating spokes to: Tools, MCP Servers, Context Management, Task Agents
- Color-coded capability zones
- Workflow arrow showing: Input → Processing → Output

**Visual Style**: Hub-and-spoke architecture diagram

---

### 2. Overview (`overview`)
**Content Focus**: Strategic Context Management definition and core challenge

**Infographic Elements**:
- Large central definition card with key metrics
- Four corner pillars: Token Windows (200K limit), Session Amnesia, Info Overload, Cognitive Load
- Central "Strategic Response" arrow pointing to solution
- Badge showing ≥90% context relevance goal

**Visual Style**: Four-pillar foundation diagram

---

### 3. Working Memory & Quality (`working-memory`)
**Content Focus**: Memory constraints, quality metrics, decay patterns

**Infographic Elements**:
- Brain illustration with memory zones (Short-term, Working, Long-term)
- Memory decay curve visualization
- Quality score gauge (0-100%)
- Token budget pie chart

**Visual Style**: Cognitive model with gauges

---

### 4. Architecture (`architecture`)
**Content Focus**: System architecture, components, data flow

**Infographic Elements**:
- Layered architecture diagram (3-tier or microservices)
- Component boxes with connection arrows
- Data flow indicators (read/write paths)
- Integration points highlighted

**Visual Style**: Technical architecture blueprint

---

### 5. Core Principles (`principles`)
**Content Focus**: Foundational principles for context management

**Infographic Elements**:
- Pyramid/hierarchy of principles
- Each principle as a colored block
- Interconnection lines showing relationships
- "Foundation to Peak" progression

**Visual Style**: Principle pyramid

---

### 6. Strategic Patterns (`patterns`)
**Content Focus**: Reusable patterns for context optimization

**Infographic Elements**:
- Pattern cards in grid layout
- Each card: Icon, Name, Brief benefit
- Connection lines between related patterns
- Category groupings with color coding

**Visual Style**: Pattern catalog grid

---

### 7. Tool Integration (`tools`)
**Content Focus**: MCP tools, built-in tools, integration strategies

**Infographic Elements**:
- Tool taxonomy tree
- Categories: File, Search, Code, External
- Each tool with icon and one-liner
- Integration flow arrows

**Visual Style**: Tool ecosystem map

---

### 8. Metrics & Optimization (`metrics`)
**Content Focus**: KPIs, measurement strategies, optimization targets

**Infographic Elements**:
- Dashboard-style layout with metric cards
- Each metric: Name, Target, Current (placeholder)
- Progress bars and trend indicators
- Formula snippets in callout boxes

**Visual Style**: Metrics dashboard

---

### 9. Interactive Simulations (`simulators`)
**Content Focus**: Available simulators and their purposes

**Infographic Elements**:
- Simulator showcase cards
- Each simulator: Screenshot/icon, Name, Purpose
- "Try it" call-to-action indicators
- Category tags (Token, Memory, Cognitive, etc.)

**Visual Style**: Feature showcase gallery

---

### 10. The /compact Command (`compact-command`)
**Content Focus**: Compact command usage, options, benefits

**Infographic Elements**:
- Command syntax highlighted box
- Before/After comparison (token count)
- Options as toggleable switches visual
- Savings percentage highlight

**Visual Style**: Command reference card

---

### 11. Cost of Not Using Tools (`without-tools`)
**Content Focus**: Consequences of manual approaches

**Infographic Elements**:
- Split comparison: With Tools vs Without Tools
- Cost factors: Time, Tokens, Accuracy, Effort
- Red/Green color coding for bad/good
- Warning icons on anti-patterns

**Visual Style**: Comparison matrix

---

### 12. Common Antipatterns (`antipatterns`)
**Content Focus**: What NOT to do

**Infographic Elements**:
- Antipattern cards with ⚠️ warning icons
- Each: Name, Why Bad, Better Alternative
- Red-to-green transformation arrows
- Severity indicators

**Visual Style**: Warning catalog

---

### 13. Things to Avoid (`things-to-avoid`)
**Content Focus**: Specific behaviors and practices to avoid

**Infographic Elements**:
- "Avoid" list with ❌ icons
- Grouped by category
- Impact severity (High/Medium/Low)
- Quick alternative suggestions

**Visual Style**: Avoidance checklist

---

### 14. Claude Behavior Issues (`behavior-issues`)
**Content Focus**: Known Claude limitations and behaviors

**Infographic Elements**:
- Issue cards with problem/solution pairs
- Categorized: Model Collapse, Context Loss, Hallucination
- Mitigation strategy indicators
- Frequency/Impact matrix

**Visual Style**: Issue tracker board

---

### 15. How Claude Code Really Works (`advanced-topics`)
**Content Focus**: Under-the-hood explanation

**Infographic Elements**:
- System architecture diagram
- Request lifecycle flowchart
- Component interaction arrows
- "Behind the scenes" callouts

**Visual Style**: Technical deep-dive diagram

---

### 16. Honest Self-Assessment (`self-assessment`)
**Content Focus**: Claude's capabilities and limitations

**Infographic Elements**:
- Strength/Weakness radar chart
- Capability spectrum bars
- "I can" vs "I cannot" split view
- Confidence level indicators

**Visual Style**: Assessment radar

---

### 17. Advanced Techniques (`advanced`)
**Content Focus**: Expert-level strategies

**Infographic Elements**:
- Technique progression ladder
- Beginner → Intermediate → Advanced path
- Technique cards with complexity ratings
- Prerequisites and dependencies

**Visual Style**: Skill progression map

---

### 18. Framework Integration (`integration`)
**Content Focus**: How to integrate with existing workflows

**Infographic Elements**:
- Integration points diagram
- Existing system + Framework overlay
- Connection protocol indicators
- Setup checklist visual

**Visual Style**: Integration blueprint

---

### 19. Practical Workflows (`workflows`)
**Content Focus**: Step-by-step workflow guides

**Infographic Elements**:
- Workflow swimlanes
- Step numbers with arrows
- Decision diamonds
- Output/artifact boxes

**Visual Style**: Process flowcharts

---

### 20. Complex Scenarios (`complex-scenarios`)
**Content Focus**: Multi-step complex situations

**Infographic Elements**:
- Scenario cards with situation description
- Solution pathway visualization
- Multiple branch decision trees
- Outcome indicators

**Visual Style**: Scenario decision tree

---

### 21. Conclusion (`conclusion`)
**Content Focus**: Summary and next steps

**Infographic Elements**:
- Key takeaways as numbered circles
- "What's Next" roadmap arrow
- Resource links as cards
- Call-to-action button visual

**Visual Style**: Summary roadmap

---

## Visual Design System

### Color Palette
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Blue | #3498db |
| Success | Green | #27ae60 |
| Warning | Orange | #f39c12 |
| Danger | Red | #e74c3c |
| Neutral | Gray | #7f8c8d |
| Background | Light | #f8f9fa |

### Typography
- Headings: System font, bold
- Body: System font, regular
- Labels: 12px uppercase
- Numbers: Monospace for metrics

### Icons
- Use PrimeIcons exclusively (per project requirements)
- Consistent 24px size for infographic icons
- 16px for inline indicators

### Layout Grid
- Infographics fit within section container width
- Max height: 600px (scrollable if needed)
- Responsive breakpoints match main site

---

## Implementation Phases

### Phase 1: Infrastructure (Priority: High)
1. Create `styles/infographics.css`
2. Create `scripts/infographics-toggle.js`
3. Create `data/infographics/` directory
4. Modify section HTML template to include toggle

### Phase 2: Core Sections (Priority: High)
Create infographics for:
- Overview
- Working Memory
- Architecture
- Principles
- Patterns

### Phase 3: Tool & Metrics Sections (Priority: Medium)
Create infographics for:
- Tool Integration
- Metrics & Optimization
- Simulators
- Compact Command

### Phase 4: Warning Sections (Priority: Medium)
Create infographics for:
- Without Tools
- Antipatterns
- Things to Avoid
- Behavior Issues

### Phase 5: Advanced Sections (Priority: Lower)
Create infographics for:
- Advanced Topics
- Self-Assessment
- Advanced Techniques
- Integration
- Workflows
- Complex Scenarios
- Conclusion
- Claude Code Methodology

---

## File Deliverables

### New Files to Create
```
styles/infographics.css
scripts/infographics-toggle.js
data/infographics/overview-infographic.html
data/infographics/working-memory-infographic.html
data/infographics/architecture-infographic.html
data/infographics/principles-infographic.html
data/infographics/patterns-infographic.html
data/infographics/tools-infographic.html
data/infographics/metrics-infographic.html
data/infographics/simulators-infographic.html
data/infographics/compact-command-infographic.html
data/infographics/without-tools-infographic.html
data/infographics/antipatterns-infographic.html
data/infographics/things-to-avoid-infographic.html
data/infographics/behavior-issues-infographic.html
data/infographics/advanced-topics-infographic.html
data/infographics/self-assessment-infographic.html
data/infographics/advanced-infographic.html
data/infographics/integration-infographic.html
data/infographics/workflows-infographic.html
data/infographics/complex-scenarios-infographic.html
data/infographics/conclusion-infographic.html
data/infographics/claude-code-methodology-infographic.html
```

### Files to Modify
```
index.html                    # Add infographics CSS/JS references
data/sections/*.html          # Add toggle to each section (21 files)
```

---

## Success Criteria
- [ ] Toggle smoothly switches between views
- [ ] Scroll position preserved on toggle
- [ ] Infographics render correctly on mobile
- [ ] Page load time not significantly impacted
- [ ] Consistent visual style across all infographics
- [ ] Accessibility: proper aria labels on toggle

---

## Open Questions
1. Should toggle state persist across sessions (localStorage)?
2. Should there be a global "View All as Infographics" option?
3. Print stylesheet considerations?

---

*PRD Created: December 2024*
*Sections: 21 total*
*Estimated Infographic Files: 21*
