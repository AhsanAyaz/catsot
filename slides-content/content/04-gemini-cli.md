# Gemini CLI — Terminal Power

**Module 05** | ~15 minutes
Agent capabilities in your terminal

Note:

- Quick module showing CLI counterpart
- Same skills format as Antigravity

---

## What is Gemini CLI?

**AI coding assistant for the terminal**

- Command-line interface to Gemini
<!-- .element: class="fragment" -->
- Run in any terminal, anywhere
<!-- .element: class="fragment" -->
- No GUI required
<!-- .element: class="fragment" -->
- Same agent capabilities as Antigravity
<!-- .element: class="fragment" -->

**Perfect for:** Terminal-heavy workflows, SSH sessions, quick tasks
<!-- .element: class="fragment" -->

---

## Getting Started

```bash
# Install globally
npm install -g @google/gemini-cli

# Or run with npx
npx @google/gemini-cli

# Start a session
gemini
```

**You're now chatting with Gemini in your terminal**

---

# Same Skills, Different Interface

**The `.gemini/skills/` directory works everywhere**

```markdown
# ~/.gemini/skills/format-json/SKILL.md
---
name: Format JSON
description: Pretty-print and validate JSON
---

When asked to format JSON:
1. Read the input
2. Parse and validate
3. Pretty-print with 2-space indent
```

**Works in Antigravity AND Gemini CLI**

---

<!-- .slide: style="font-size: 0.8em" -->
### CLI vs Antigravity

| Aspect | **Antigravity** | **Gemini CLI** |
|--------|----------------|----------------|
| **Interface** | Full IDE | Terminal |
| **Visual tools** | Browser agent, screenshots | None |
| **Workflow** | Mission Control | Linear execution |
| **Parallel agents** | Yes | Sequential |
| **Best for** | Full-stack projects | Quick scripts |

---

<!-- .slide: style="font-size: 0.8em" -->
### When to Use CLI

| Scenario | Tool |
|----------|------|
| Building a full-stack app | **Antigravity** |
| Quick file transformations | **Gemini CLI** |
| SSH into server, need AI help | **Gemini CLI** |
| Testing UI changes | **Antigravity** |
| Writing a shell script | **Gemini CLI** |
| Complex multi-file refactor | **Antigravity** |

---

## CLI in Action

```bash
gemini "Create a bash script that finds 
 all files modified in the last 24h"
```

```bash
Creating: find-recent.sh
```

```bash
#!/bin/bash
find . -type f -mtime -1 -print
```

```bash
gemini "Make it also show file sizes"
```

```bash
# Agent updates the script...
```

**Quick, iterative, terminal-native**

---

### Key Takeaways

✅ **Gemini CLI** = AI assistant in your terminal
<!-- .element: class="fragment" -->

✅ **Same skills** = Shared `.gemini/skills/` directory
<!-- .element: class="fragment" -->

✅ **No GUI** = Works over SSH, in any terminal
<!-- .element: class="fragment" -->

✅ **Complementary** = Use with Antigravity, not instead
<!-- .element: class="fragment" -->

**Coming up:** ☕ Coffee break, then Firebase Studio!
