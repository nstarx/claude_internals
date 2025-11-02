# Migration Guide: SuperClaude Framework v2.0

This guide helps you migrate from the old flat file structure to the new organized directory structure.

**Migration Date**: 2025-11-02
**From**: Flat structure (v1.0)
**To**: Organized directories (v2.0)

---

## 🔄 What Changed

### Directory Organization

The framework has been reorganized from a flat structure into logical directories:
- **core/** - Framework fundamentals (PRINCIPLES, RULES, FLAGS)
- **modes/** - Behavioral mode specifications
- **mcp/** - MCP server documentation
- **business/** - Business analysis features
- **guides/** - Comprehensive user guides
- **reference/** - Quick reference materials
- **examples/** - Real-world usage examples
- **web/** - Web viewers and assets

### Large File Chunking

Large files have been split into manageable chunks:
- `context_memory_complex_scenarios.md` → 5 chunks in `guides/chunks/`
- `strategic_context_management.md` → 2 parts in `guides/`

### Web Assets Modularization

HTML viewers now have separated assets:
- Inline CSS → `web/styles/` (4 files)
- Inline JS → `web/scripts/` (4 files)

---

## 📋 File Location Mapping

### Core Framework Files

| Old Location | New Location |
|--------------|--------------|
| `PRINCIPLES.md` | `core/PRINCIPLES.md` |
| `RULES.md` | `core/RULES.md` |
| `FLAGS.md` | `core/FLAGS.md` |

### Mode Files

| Old Location | New Location |
|--------------|--------------|
| `MODE_Brainstorming.md` | `modes/Brainstorming.md` |
| `MODE_Business_Panel.md` | `modes/Business_Panel.md` |
| `MODE_Introspection.md` | `modes/Introspection.md` |
| `MODE_Orchestration.md` | `modes/Orchestration.md` |
| `MODE_Task_Management.md` | `modes/Task_Management.md` |
| `MODE_Token_Efficiency.md` | `modes/Token_Efficiency.md` |

### MCP Documentation Files

| Old Location | New Location |
|--------------|--------------|
| `MCP_Context7.md` | `mcp/Context7.md` |
| `MCP_Magic.md` | `mcp/Magic.md` |
| `MCP_Morphllm.md` | `mcp/Morphllm.md` |
| `MCP_Playwright.md` | `mcp/Playwright.md` |
| `MCP_Serena.md` | `mcp/Serena.md` |
| *(new file)* | `mcp/Sequential.md` |

### Business Analysis Files

| Old Location | New Location |
|--------------|--------------|
| `BUSINESS_PANEL_EXAMPLES.md` | `business/Panel_Examples.md` |
| `BUSINESS_SYMBOLS.md` | `business/Panel_Symbols.md` |
| `MODE_Business_Panel.md` (extracted) | `business/Panel_Overview.md` |
| *(new file)* | `business/Expert_Frameworks.md` |

### Guide Files

| Old Location | New Location |
|--------------|--------------|
| `claudedocs/claude_code_guide.md` | `guides/Claude_Code_Guide.md` |
| `claudedocs/strategic_context_management.md` | `guides/Strategic_Context_01.md` (lines 1-374) |
|  | `guides/Strategic_Context_02.md` (lines 375-610) |
| `claudedocs/context_memory_complex_scenarios.md` | `guides/chunks/Complex_Scenarios_01.md` (lines 1-500) |
|  | `guides/chunks/Complex_Scenarios_02.md` (lines 501-1000) |
|  | `guides/chunks/Complex_Scenarios_03.md` (lines 1001-1500) |
|  | `guides/chunks/Complex_Scenarios_04.md` (lines 1501-2000) |
|  | `guides/chunks/Complex_Scenarios_05.md` (lines 2001-2446) |

### Web Viewer Files

| Old Location | New Location |
|--------------|--------------|
| `index.html` | `web/index.html` |
| `claudedocs/complex_scenarios.html` | `web/complex_scenarios.html` |
| *(inline CSS)* | `web/styles/main.css` |
| *(inline CSS)* | `web/styles/components.css` |
| *(inline CSS)* | `web/styles/navigation.css` |
| *(inline CSS)* | `web/styles/responsive.css` |
| *(inline JS)* | `web/scripts/navigation.js` |
| *(inline JS)* | `web/scripts/markdown-loader.js` |
| *(inline JS)* | `web/scripts/ui-components.js` |
| *(inline JS)* | `web/scripts/icons-config.js` |

### New Reference Files

These files are new additions in v2.0:

| File | Description |
|------|-------------|
| `reference/Quick_Reference.md` | One-page framework cheat sheet |
| `reference/Command_Reference.md` | Comprehensive slash command documentation |
| `reference/Symbol_Reference.md` | Consolidated symbol system |
| `reference/Decision_Trees.md` | Decision frameworks for tool/mode selection |
| `reference/Mode_Selection_Guide.md` | When to use which mode |
| `reference/MCP_Selection_Guide.md` | When to use which MCP server |

### New Example Files

| File | Description |
|------|-------------|
| `examples/Workflow_Examples.md` | 12 comprehensive real-world workflows |
| `examples/Integration_Patterns.md` | Mode & MCP combination patterns |
| `examples/Use_Cases.md` | 16 scenario-based examples |

---

## 🔗 Updating @References

### For Global CLAUDE.md (~/.claude/CLAUDE.md)

The global CLAUDE.md has been updated to use the new paths. If you have a custom version, update your @references:

**Old**:
```markdown
@PRINCIPLES.md
@RULES.md
@FLAGS.md
@MODE_Brainstorming.md
@MODE_Business_Panel.md
@MCP_Context7.md
@BUSINESS_PANEL_EXAMPLES.md
```

**New**:
```markdown
@core/PRINCIPLES.md
@core/RULES.md
@core/FLAGS.md
@modes/Brainstorming.md
@modes/Business_Panel.md
@mcp/Context7.md
@business/Panel_Examples.md
```

### For Project CLAUDE.md

Project-specific CLAUDE.md files should remain unchanged unless they directly reference framework files.

---

## ⚠️ Breaking Changes

### None Expected

This refactoring was designed to be **backwards compatible**:
- ✅ All file contents preserved (git history intact)
- ✅ Global @references automatically updated
- ✅ No API or interface changes
- ✅ Original files backed up in `archive/old_structure/`

### Potential Issues

**Issue**: Custom scripts referencing old file paths
- **Solution**: Update file paths using the mapping table above

**Issue**: Bookmarks to specific files
- **Solution**: Update bookmarks using the new structure

**Issue**: External documentation links
- **Solution**: Update links to point to new locations

---

## 📦 Archived Files

All original files have been preserved in `archive/old_structure/` for reference:

```
archive/old_structure/
├── MODE_Business_Panel.md               # Original business panel mode
├── README_VIEWER.md                     # Old viewer readme
├── claude_code_guide.md                 # Original guide (now in guides/)
├── context_memory_complex_scenarios.md  # Original (now chunked)
└── strategic_context_management.md      # Original (now split)
```

These files are kept for:
1. **Rollback capability** - Can restore if needed
2. **Reference** - Compare old vs new organization
3. **Historical record** - Preserve original structure

---

## 🔄 Rollback Procedures

### If You Need to Revert

**Phase-Level Rollback** (if specific phase has issues):
```bash
# Find phase commits
git log --oneline | grep "Phase"

# Revert specific phase (replace X with phase number)
git revert <phase-X-commit-hash>
```

**Complete Rollback** (return to pre-refactor state):
```bash
# Find pre-refactor snapshot
git log --oneline | grep "pre-refactor"

# Create new branch from snapshot
git checkout <pre-refactor-commit-hash>
git checkout -b refactor-rollback
```

**Archive Recovery** (restore from backup):
```bash
# Restore specific file
cp archive/old_structure/<filename> ./

# Restore all archived files
cp -r archive/old_structure/* ./
```

---

## ✅ Verification Steps

After migrating, verify everything is working:

### 1. Check File Locations
```bash
# Verify all expected directories exist
ls -d core/ modes/ mcp/ business/ guides/ reference/ examples/ web/

# Verify no missing files
for file in core/*.md modes/*.md mcp/*.md; do
  [ -f "$file" ] || echo "MISSING: $file"
done
```

### 2. Validate Cross-References
```bash
# Check that @references resolve correctly
# Load SuperClaude framework and verify no errors
```

### 3. Test Web Viewers
```bash
# Open web viewers in browser
open web/index.html
open web/complex_scenarios.html
```

### 4. Check File Sizes
```bash
# Ensure no file exceeds 600 lines
find . -name "*.md" -exec wc -l {} \; | awk '$1 > 600 {print $0}'
```

---

## 🆕 New Features in v2.0

### Enhanced Navigation
- **README files** in every directory with cross-references
- **Chunk navigation** with prev/next links in large files
- **Quick Reference** one-page cheat sheet

### Better Organization
- **Logical grouping** by purpose (modes, mcp, business, etc.)
- **Shallow hierarchy** (max 2-3 levels) for easy navigation
- **Consistent naming** (no prefixes like MODE_ or MCP_)

### Token Optimization
- **File size limits** (≤600 lines per file)
- **Chunk loading** for large documents
- **Efficient context** usage (<50K tokens per session)

### Comprehensive Documentation
- **Decision trees** for mode/MCP selection
- **12+ workflow examples** with detailed explanations
- **Symbol reference** consolidated across all domains
- **Command reference** for all slash commands

---

## 📚 Next Steps After Migration

1. **Familiarize with new structure**
   - Browse through new directories
   - Read README files in each directory
   - Check out the Quick Reference

2. **Update bookmarks/shortcuts**
   - Update any saved links to documentation
   - Update IDE shortcuts to new file paths

3. **Explore new features**
   - Check out new reference materials
   - Review workflow examples
   - Try the decision trees

4. **Provide feedback**
   - Report any broken links
   - Suggest improvements
   - Share your experience

---

## 🆘 Getting Help

If you encounter issues during migration:

1. **Check archived files**: `archive/old_structure/` has originals
2. **Review progress**: See `REFACTOR_PROGRESS.md` for details
3. **Consult refactor plan**: `REFACTOR_PLAN.md` has full strategy
4. **Use git history**: All moves preserved with `git log --follow <file>`

---

## 📊 Migration Statistics

- **Files organized**: 23 markdown files + 2 HTML files
- **Directories created**: 8 main directories + subdirectories
- **Files chunked**: 2 large files → 7 chunks
- **New files created**: 12 reference and example files
- **CSS files**: 1 inline → 4 modular files
- **JS files**: 1 inline → 4 modular files
- **Token efficiency**: ~50% reduction in typical session load
- **Max file size**: 2,446 lines → 600 lines max
- **Total work sessions**: 14 sessions over 8 days

---

## 🎉 Benefits of v2.0

1. **Easier Navigation**: Clear directory structure, intuitive organization
2. **Faster Loading**: Chunked files, optimized context usage
3. **Better Discovery**: README files, decision trees, quick reference
4. **Enhanced Maintainability**: Modular structure, logical grouping
5. **Improved Scalability**: Easy to add new modes, MCPs, examples
6. **Token Efficiency**: 50% reduction in context loading
7. **Better Documentation**: Comprehensive guides, examples, references

---

**Migration Complete** ✅

Welcome to SuperClaude Framework v2.0!

For questions or issues, consult:
- [REFACTOR_PLAN.md](REFACTOR_PLAN.md) - Complete refactoring strategy
- [REFACTOR_PROGRESS.md](REFACTOR_PROGRESS.md) - Detailed progress log
- [README.md](README.md) - Framework overview and navigation

---

**Last Updated**: 2025-11-02
**Migration Version**: 1.0 → 2.0
**Status**: Complete
