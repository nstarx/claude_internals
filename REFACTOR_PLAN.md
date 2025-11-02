# SuperClaude Framework Refactoring Plan

**Created**: 2025-11-02
**Status**: Planning Phase
**Estimated Duration**: 8-12 work sessions
**Context Window Strategy**: Chunk-based processing (max 50K tokens per session)

---

## Executive Summary

### Current State Analysis

**Total Content**: ~5,519 lines across 23 markdown files + 2 HTML files

**File Distribution**:
- Largest: `context_memory_complex_scenarios.md` (2,446 lines, 76KB)
- Second: `strategic_context_management.md` (610 lines, 20KB)
- Third: `claude_code_guide.md` (468 lines, 16KB)

**Content Categories**:
1. **Modes** (6 files): Brainstorming, Business Panel, Introspection, Orchestration, Task Management, Token Efficiency
2. **MCP Servers** (5 files): Context7, Magic, Morphllm, Playwright, Serena
3. **Business Features** (2 files): Business Panel Examples, Business Symbols
4. **Core Framework** (4 files): Principles, Rules, Flags, Glossary (new)
5. **Documentation** (3 files): Claude Code Guide, Strategic Context, Complex Scenarios
6. **Viewers** (2 files): index.html, complex_scenarios.html

**Problems Identified**:
1. ❌ Largest file is too big for efficient context loading (2,446 lines)
2. ❌ No clear directory structure (flat organization)
3. ❌ Duplicate/overlapping content across files
4. ❌ Missing glossary (✅ CREATED)
5. ❌ No chunking strategy for large documents
6. ❌ HTML viewers contain embedded content (not modular)

### Refactoring Goals

**Primary Objectives**:
1. ✅ Create comprehensive glossary (COMPLETED)
2. 🎯 Break large files into loadable chunks (≤500 lines each)
3. 🎯 Organize files into logical directory structure
4. 🎯 Create master index for easy navigation
5. 🎯 Eliminate content duplication
6. 🎯 Optimize for Claude context window (chunks ≤50K tokens)

**Success Metrics**:
- No single file >600 lines
- All chunks loadable in <30K tokens
- Clear navigation path between related content
- Zero content duplication
- Improved discoverability

---

## Proposed Directory Structure

```
claude_internal/
├── README.md                          # Main entry point
├── GLOSSARY.md                        # ✅ Comprehensive glossary (CREATED)
├── REFACTOR_PLAN.md                   # This file
├── REFACTOR_PROGRESS.md               # Progress tracking (TO CREATE)
├── CLAUDE.md                          # Project-specific instructions
│
├── core/                              # Core framework files
│   ├── PRINCIPLES.md                  # Engineering principles
│   ├── RULES.md                       # Behavioral rules
│   └── FLAGS.md                       # Command flags
│
├── modes/                             # Behavioral modes
│   ├── README.md                      # Modes overview
│   ├── Brainstorming.md
│   ├── Business_Panel.md
│   ├── Introspection.md
│   ├── Orchestration.md
│   ├── Task_Management.md
│   └── Token_Efficiency.md
│
├── mcp/                               # MCP server documentation
│   ├── README.md                      # MCP overview
│   ├── Context7.md
│   ├── Magic.md
│   ├── Morphllm.md
│   ├── Playwright.md
│   ├── Serena.md
│   └── Sequential.md                  # (to be created)
│
├── business/                          # Business analysis features
│   ├── README.md                      # Business panel overview
│   ├── Panel_Overview.md              # Main business panel docs
│   ├── Panel_Examples.md              # Usage examples
│   ├── Panel_Symbols.md               # Symbol system
│   └── Expert_Frameworks.md           # Individual expert details
│
├── guides/                            # User guides and tutorials
│   ├── README.md                      # Guides index
│   ├── Getting_Started.md
│   ├── Claude_Code_Guide.md
│   ├── Strategic_Context_Management.md
│   └── chunks/                        # Large guide chunks
│       ├── Complex_Scenarios_01.md
│       ├── Complex_Scenarios_02.md
│       ├── Complex_Scenarios_03.md
│       ├── Complex_Scenarios_04.md
│       └── Complex_Scenarios_05.md
│
├── reference/                         # Quick reference materials
│   ├── Quick_Reference.md             # One-page cheat sheet
│   ├── Command_Reference.md           # All slash commands
│   ├── Symbol_Reference.md            # All symbols consolidated
│   └── Decision_Trees.md              # When to use what
│
├── examples/                          # Real-world examples
│   ├── README.md                      # Examples index
│   ├── Workflow_Examples.md
│   ├── Integration_Patterns.md
│   └── Use_Cases.md
│
├── web/                               # Web viewers and assets
│   ├── index.html                     # Main documentation viewer
│   ├── complex_scenarios.html         # Scenarios viewer
│   ├── styles/                        # CSS files
│   │   └── main.css
│   └── scripts/                       # JavaScript files
│       └── navigation.js
│
└── archive/                           # Deprecated/old content
    └── old_structure/
        └── (moved original files here during refactor)
```

---

## Chunking Strategy for Large Files

### Problem Files Requiring Chunking

**1. context_memory_complex_scenarios.md** (2,446 lines → 5 chunks)
```
Target chunks of ~500 lines each:
- Complex_Scenarios_01.md (lines 1-500)     → Session Context Patterns
- Complex_Scenarios_02.md (lines 501-1000)  → Memory Management Strategies
- Complex_Scenarios_03.md (lines 1001-1500) → Multi-Agent Coordination
- Complex_Scenarios_04.md (lines 1501-2000) → Advanced Workflows
- Complex_Scenarios_05.md (lines 2001-2446) → Edge Cases & Troubleshooting
```

**2. strategic_context_management.md** (610 lines → 2 chunks)
```
- Strategic_Context_01.md (lines 1-350)   → Fundamentals & Architecture
- Strategic_Context_02.md (lines 351-610) → Advanced Patterns & Examples
```

**3. claude_code_guide.md** (468 lines → Keep as single file, acceptable size)

**4. RULES.md** (257 lines → Keep as single file, acceptable size)

### Chunk Loading Pattern

Each chunk will include:
1. **Navigation Header**: Links to previous/next chunks
2. **Context Breadcrumbs**: Where this fits in overall structure
3. **Self-Contained Content**: Complete section with all dependencies
4. **Cross-References**: Links to related chunks/files

**Example Chunk Header**:
```markdown
# Complex Scenarios - Part 1: Session Context Patterns

**Part**: 1 of 5 | **Previous**: [Overview](README.md) | **Next**: [Part 2: Memory Management](Complex_Scenarios_02.md)
**Parent Guide**: [Guides](../README.md) | **Related**: [Task Management Mode](../modes/Task_Management.md)

---

[Content here...]
```

### Token Budget per Session

**Target Token Usage**:
- Single chunk: 10-20K tokens
- Two related chunks: 20-35K tokens
- Three chunks + context: 35-50K tokens
- Maximum safe load: 50K tokens (leaves 25% buffer)

**Loading Strategies**:
1. **Linear**: Load chunks sequentially for comprehensive understanding
2. **Targeted**: Load only relevant chunks for specific tasks
3. **Progressive**: Start with overview, drill down as needed
4. **Parallel**: Load multiple independent chunks in different sessions

---

## Refactoring Phases

### Phase 1: Foundation & Structure (Sessions 1-2)

**Goals**: Create directory structure, move core files, establish patterns

**Tasks**:
1. ✅ Create `GLOSSARY.md` (COMPLETED)
2. ✅ Create `REFACTOR_PLAN.md` (CURRENT)
3. Create `REFACTOR_PROGRESS.md` tracking file
4. Create new directory structure
5. Create README files for each directory
6. Move core files (PRINCIPLES, RULES, FLAGS) → `core/`
7. Create Quick Reference guide

**Session 1 Chunk Load**:
```
- REFACTOR_PLAN.md (this file)
- Current directory structure
- PRINCIPLES.md, RULES.md, FLAGS.md
```
**Estimated**: 15-20K tokens

**Session 2 Chunk Load**:
```
- core/ README files
- Quick Reference creation
- GLOSSARY.md for reference
```
**Estimated**: 20-25K tokens

### Phase 2: Mode Organization (Sessions 3-4)

**Goals**: Organize behavioral modes, create mode overview, extract patterns

**Tasks**:
1. Create `modes/README.md` overview
2. Move all MODE_*.md files → `modes/`
3. Rename files (remove MODE_ prefix)
4. Extract common patterns across modes
5. Create mode selection decision tree
6. Update cross-references

**Session 3 Chunk Load**:
```
- modes/Brainstorming.md
- modes/Introspection.md
- modes/Orchestration.md
```
**Estimated**: 12-18K tokens

**Session 4 Chunk Load**:
```
- modes/Task_Management.md
- modes/Token_Efficiency.md
- modes/Business_Panel.md (overview only)
```
**Estimated**: 18-25K tokens

### Phase 3: MCP Documentation (Sessions 5-6)

**Goals**: Organize MCP server docs, standardize format, create overview

**Tasks**:
1. Create `mcp/README.md` overview
2. Move all MCP_*.md files → `mcp/`
3. Rename files (remove MCP_ prefix)
4. Standardize documentation format
5. Create MCP selection guide
6. Document Sequential MCP (currently missing)
7. Update cross-references

**Session 5 Chunk Load**:
```
- mcp/Context7.md
- mcp/Magic.md
- mcp/Morphllm.md
```
**Estimated**: 10-15K tokens

**Session 6 Chunk Load**:
```
- mcp/Playwright.md
- mcp/Serena.md
- Create mcp/Sequential.md (new)
- mcp/README.md overview
```
**Estimated**: 15-20K tokens

### Phase 4: Business Panel Refactor (Sessions 7-8)

**Goals**: Organize business analysis docs, split large files, create examples

**Tasks**:
1. Create `business/README.md` overview
2. Move BUSINESS_*.md files → `business/`
3. Rename and reorganize:
   - BUSINESS_PANEL_EXAMPLES.md → Panel_Examples.md
   - BUSINESS_SYMBOLS.md → Panel_Symbols.md
   - Extract from MODE_Business_Panel.md → Panel_Overview.md
4. Create Expert_Frameworks.md (detailed expert bios)
5. Update cross-references

**Session 7 Chunk Load**:
```
- business/Panel_Overview.md (extracted)
- business/Panel_Symbols.md
```
**Estimated**: 15-20K tokens

**Session 8 Chunk Load**:
```
- business/Panel_Examples.md
- business/Expert_Frameworks.md (new)
- business/README.md
```
**Estimated**: 18-25K tokens

### Phase 5: Large File Chunking (Sessions 9-11)

**Goals**: Break down massive files into loadable chunks

**Tasks**:
1. Create `guides/chunks/` directory
2. Analyze and split `context_memory_complex_scenarios.md`:
   - Part 1: Session Context Patterns
   - Part 2: Memory Management Strategies
   - Part 3: Multi-Agent Coordination
   - Part 4: Advanced Workflows
   - Part 5: Edge Cases & Troubleshooting
3. Split `strategic_context_management.md`:
   - Part 1: Fundamentals & Architecture
   - Part 2: Advanced Patterns & Examples
4. Move `claude_code_guide.md` → `guides/`
5. Create navigation between chunks
6. Update all cross-references

**Session 9 Chunk Load**:
```
- context_memory_complex_scenarios.md (lines 1-800 for analysis)
- Create Complex_Scenarios_01.md
- Create Complex_Scenarios_02.md
```
**Estimated**: 25-30K tokens

**Session 10 Chunk Load**:
```
- context_memory_complex_scenarios.md (lines 801-1600)
- Create Complex_Scenarios_03.md
- Create Complex_Scenarios_04.md
```
**Estimated**: 25-30K tokens

**Session 11 Chunk Load**:
```
- context_memory_complex_scenarios.md (lines 1601-2446)
- Create Complex_Scenarios_05.md
- Split strategic_context_management.md
- Create chunk navigation README
```
**Estimated**: 28-35K tokens

### Phase 6: Reference & Examples (Session 12)

**Goals**: Create consolidated reference materials and examples

**Tasks**:
1. Create `reference/` directory structure
2. Create Quick_Reference.md (one-page cheat sheet)
3. Create Command_Reference.md (all slash commands)
4. Create Symbol_Reference.md (consolidated symbols)
5. Create Decision_Trees.md (when to use what)
6. Create `examples/` directory
7. Extract examples from various files
8. Create example index and categories

**Session 12 Chunk Load**:
```
- Create all reference materials
- Extract and organize examples
- GLOSSARY.md for reference
```
**Estimated**: 20-30K tokens

### Phase 7: Web Assets & Viewers (Session 13)

**Goals**: Separate HTML/CSS/JS, make web viewers modular

**Tasks**:
1. Create `web/` directory structure
2. Move index.html → web/
3. Move complex_scenarios.html → web/
4. Extract inline CSS → web/styles/main.css
5. Extract inline JS → web/scripts/navigation.js
6. Update HTML to reference external assets
7. Make viewers data-driven (load MD content dynamically)

**Session 13 Chunk Load**:
```
- index.html (extraction)
- complex_scenarios.html (extraction)
- Create modular assets
```
**Estimated**: 15-25K tokens

### Phase 8: Cleanup & Validation (Session 14)

**Goals**: Archive old files, validate all links, final testing

**Tasks**:
1. Create `archive/old_structure/` directory
2. Move original files to archive (backup)
3. Validate all cross-references and links
4. Test chunk loading patterns
5. Update main README.md with new structure
6. Create migration guide
7. Final validation of REFACTOR_PROGRESS.md
8. Generate final documentation index

**Session 14 Chunk Load**:
```
- Validation scripts
- Link checking
- README updates
- Archive operations
```
**Estimated**: 15-20K tokens

---

## Content Deduplication Plan

### Identified Duplications

**1. Symbol Definitions**
- BUSINESS_SYMBOLS.md
- MODE_Token_Efficiency.md (symbol systems)
- Various inline symbol usage

**Resolution**:
- Keep BUSINESS_SYMBOLS.md for business-specific symbols
- Keep MODE_Token_Efficiency.md for technical symbols
- Create `reference/Symbol_Reference.md` as consolidated master
- Cross-reference from individual files

**2. MCP Usage Patterns**
- Scattered across MODE files
- Repeated in guide documents
- Examples in BUSINESS_PANEL_EXAMPLES.md

**Resolution**:
- Consolidate into `mcp/README.md` overview
- Create `reference/Decision_Trees.md` for selection logic
- Keep only contextual examples in individual files

**3. Flag Definitions**
- FLAGS.md (primary source)
- Repeated in various MODE files
- Examples scattered throughout

**Resolution**:
- FLAGS.md remains primary source
- Create `reference/Command_Reference.md` for quick lookup
- Mode files reference FLAGS.md, don't duplicate

**4. Workflow Examples**
- BUSINESS_PANEL_EXAMPLES.md
- claudedocs/context_memory_complex_scenarios.md
- Various MODE files

**Resolution**:
- Extract all examples → `examples/` directory
- Categorize by type (workflow, integration, use case)
- Individual files link to examples, don't embed

---

## Migration & Rollback Strategy

### Safe Migration Process

**Pre-Migration**:
1. ✅ Create refactoring plan (this file)
2. Create progress tracking
3. Git commit current state → "pre-refactor snapshot"
4. Create `archive/old_structure/` backup

**During Migration**:
1. Work in feature branch: `refactor/directory-restructure`
2. Complete one phase at a time
3. Git commit after each phase
4. Update REFACTOR_PROGRESS.md continuously
5. Test chunk loading after each phase

**Post-Migration**:
1. Validate all cross-references
2. Test chunk loading patterns
3. Run link checker
4. Review with stakeholders
5. Merge to main with comprehensive commit message

### Rollback Plan

**Phase-Level Rollback**:
```bash
# If Phase N has issues, rollback to Phase N-1 commit
git log --oneline | grep "Phase"
git revert <phase-N-commit-hash>
```

**Complete Rollback**:
```bash
# Return to pre-refactor state
git checkout pre-refactor-snapshot
git checkout -b refactor-retry-v2
```

**Archive Recovery**:
```bash
# Restore from archive if needed
cp -r archive/old_structure/* ./
```

---

## Validation Checklist

### Per-Phase Validation

After completing each phase, verify:

- [ ] All files in correct directories
- [ ] README files created for new directories
- [ ] Cross-references updated and working
- [ ] No broken links
- [ ] Chunk navigation working (if applicable)
- [ ] Git commit completed
- [ ] REFACTOR_PROGRESS.md updated
- [ ] Test chunk loading within token budget

### Final Validation (Phase 8)

- [ ] All files organized correctly
- [ ] No duplicate content (except intentional cross-references)
- [ ] All large files chunked appropriately (≤600 lines)
- [ ] Chunk loading tested (<50K tokens per session)
- [ ] All cross-references validated
- [ ] Web viewers working with modular assets
- [ ] Archive backup completed
- [ ] Main README.md updated
- [ ] GLOSSARY.md complete and accurate
- [ ] Migration guide created
- [ ] Final git commit with detailed message

---

## Risk Assessment

### High Risk Items

**🔴 Breaking Cross-References**
- **Risk**: Moving files may break @references in CLAUDE.md
- **Mitigation**: Update all @references systematically, validate before committing
- **Impact**: HIGH - Could break Claude Code framework loading

**🔴 Chunking Loss of Context**
- **Risk**: Splitting large files may lose narrative flow
- **Mitigation**: Careful chunk boundaries, strong navigation, self-contained sections
- **Impact**: MEDIUM - Reduced usability if not done well

### Medium Risk Items

**🟡 Duplication During Transition**
- **Risk**: Temporary duplication while reorganizing
- **Mitigation**: Clear phase ordering, immediate cleanup
- **Impact**: MEDIUM - Confusion and increased maintenance

**🟡 HTML Viewer Breakage**
- **Risk**: Extracting assets may break web viewers
- **Mitigation**: Test after extraction, keep backup
- **Impact**: LOW-MEDIUM - Viewers are supplementary

### Low Risk Items

**🟢 Directory Proliferation**
- **Risk**: Too many directories reduces discoverability
- **Mitigation**: Keep structure shallow (max 2-3 levels)
- **Impact**: LOW - Easy to flatten if needed

---

## Success Criteria

### Quantitative Metrics

- ✅ GLOSSARY.md created (COMPLETED)
- 🎯 Max file size: ≤600 lines (currently: 2,446 lines)
- 🎯 Max chunk load: ≤50K tokens
- 🎯 Directory depth: ≤3 levels
- 🎯 Zero broken cross-references
- 🎯 100% of large files chunked
- 🎯 All phases completed within 14 sessions

### Qualitative Metrics

- 🎯 Easy navigation between related content
- 🎯 Clear discoverability of features
- 🎯 Reduced cognitive load when loading docs
- 🎯 Improved maintainability
- 🎯 Better onboarding for new users
- 🎯 Efficient context window usage

---

## Timeline & Resource Estimate

### Estimated Effort

**Total Sessions**: 14 work sessions
**Session Duration**: 45-90 minutes each
**Total Time**: 12-21 hours
**Recommended Pace**: 2-3 sessions per day max

### Recommended Schedule

**Week 1**: Phases 1-3 (Foundation, Modes, MCPs)
- Day 1: Phase 1 (Sessions 1-2)
- Day 2: Phase 2 (Sessions 3-4)
- Day 3: Phase 3 (Sessions 5-6)

**Week 2**: Phases 4-6 (Business, Chunking, Reference)
- Day 4: Phase 4 (Sessions 7-8)
- Day 5: Phase 5 (Sessions 9-11)
- Day 6: Phase 6 (Session 12)

**Week 3**: Phases 7-8 (Web Assets, Cleanup)
- Day 7: Phase 7 (Session 13)
- Day 8: Phase 8 (Session 14) + Buffer for issues

### Resource Requirements

**Tools Needed**:
- Git for version control
- Text editor for markdown editing
- Link validation tool (markdown-link-check or similar)
- Token counter for chunk validation
- File comparison tool for deduplication

**MCP Servers Used**:
- **Serena**: Project memory, session persistence
- **Sequential**: Complex analysis and planning
- **Morphllm**: Bulk file operations and moves (optional)

---

## Post-Refactor Maintenance

### Ongoing Practices

**Adding New Content**:
1. Determine appropriate directory
2. Check if file should be chunked (>600 lines)
3. Update relevant README files
4. Add cross-references
5. Update GLOSSARY.md if new terms

**Modifying Existing Content**:
1. Load only relevant chunks
2. Update cross-references if structure changes
3. Validate chunk boundaries if editing large files
4. Update progress tracking if major changes

**Quality Gates**:
- No file >600 lines without chunking plan
- All new directories get README files
- All new terms added to GLOSSARY.md
- Cross-references validated before commit

---

## Appendix: File Mapping

### Current → New Location Mapping

**Root Files**:
```
PRINCIPLES.md           → core/PRINCIPLES.md
RULES.md                → core/RULES.md
FLAGS.md                → core/FLAGS.md
GLOSSARY.md             → GLOSSARY.md (stays)
README.md               → README.md (updated)
CLAUDE.md               → CLAUDE.md (updated @references)
README_VIEWER.md        → archive/old_structure/
```

**Mode Files**:
```
MODE_Brainstorming.md      → modes/Brainstorming.md
MODE_Business_Panel.md     → modes/Business_Panel.md (+ extract to business/)
MODE_Introspection.md      → modes/Introspection.md
MODE_Orchestration.md      → modes/Orchestration.md
MODE_Task_Management.md    → modes/Task_Management.md
MODE_Token_Efficiency.md   → modes/Token_Efficiency.md
```

**MCP Files**:
```
MCP_Context7.md         → mcp/Context7.md
MCP_Magic.md            → mcp/Magic.md
MCP_Morphllm.md         → mcp/Morphllm.md
MCP_Playwright.md       → mcp/Playwright.md
MCP_Serena.md           → mcp/Serena.md
(new)                   → mcp/Sequential.md
```

**Business Files**:
```
BUSINESS_PANEL_EXAMPLES.md  → business/Panel_Examples.md
BUSINESS_SYMBOLS.md         → business/Panel_Symbols.md
MODE_Business_Panel.md      → business/Panel_Overview.md (extracted)
(new)                       → business/Expert_Frameworks.md
```

**Guide Files**:
```
claudedocs/claude_code_guide.md                    → guides/Claude_Code_Guide.md
claudedocs/strategic_context_management.md         → guides/Strategic_Context_01.md
                                                      guides/Strategic_Context_02.md
claudedocs/context_memory_complex_scenarios.md     → guides/chunks/Complex_Scenarios_01.md
                                                      guides/chunks/Complex_Scenarios_02.md
                                                      guides/chunks/Complex_Scenarios_03.md
                                                      guides/chunks/Complex_Scenarios_04.md
                                                      guides/chunks/Complex_Scenarios_05.md
```

**Web Files**:
```
index.html                              → web/index.html
claudedocs/complex_scenarios.html       → web/complex_scenarios.html
(extracted CSS)                         → web/styles/main.css
(extracted JS)                          → web/scripts/navigation.js
```

---

## Next Steps

1. ✅ GLOSSARY.md created
2. ✅ REFACTOR_PLAN.md created (this file)
3. **IMMEDIATE**: Create REFACTOR_PROGRESS.md tracking file
4. **NEXT SESSION**: Begin Phase 1 - Foundation & Structure
5. **ONGOING**: Update progress tracking after each task

---

**End of Refactoring Plan**
**Last Updated**: 2025-11-02
**Next Review**: After Phase 1 completion
