# OLD: Agent Features: Tips & Tricks

Master the agent-first tooling for maximum productivity

Note:

- This section covers advanced agent features
- Skills, Workflows, MCP Servers
- Real code examples from this project

---

## Agent Skills

**Skills** = Domain-specific knowledge the agent loads on-demand

```
.agent/skills/
└── remotion-best-practices/
    ├── SKILL.md          # Main entry point
    └── rules/
        ├── animations.md
        ├── timing.md
        └── ...
```

Note:

- Skills are markdown files with instructions
- Agent reads them when relevant to task
- Loaded lazily (only when needed)

---

## SKILL.md Format

```yaml
---
name: remotion-best-practices
description: Best practices for Remotion
metadata:
  tags: remotion, video, react
---

## When to use
Use when dealing with Remotion code.

## How to use
Read rule files for detailed patterns:
- rules/animations.md
- rules/timing.md
```

Note:

- YAML frontmatter with name + description
- Markdown body with instructions
- Link to detailed rule files

---

## Creating a Skill

**1. Create the folder structure:**

```bash
mkdir -p .agent/skills/my-skill/rules
```

**2. Create SKILL.md:**

```markdown
---
name: my-skill
description: What this skill does
---

## When to use
Describe when agent should use this.
```

**3. Add rule files with code examples**

---

## MCP Servers

**Model Context Protocol** = External tool integration

The agent gains new capabilities through MCP servers:

| Server | Capabilities |
|--------|-------------|
| `angular-cli` | Angular documentation search |
| `prisma-mcp-server` | Database migrations, Prisma Studio |
| `notebooklm-mcp` | Query your research notebooks |

Note:

- MCP extends agent's abilities
- Zero hallucinations with NotebookLM
- Run external tools safely

---

## MCP Configuration

**Location:** `~/.gemini/antigravity/mcp_config.json`

```json
{
  "mcpServers": {
    "notebooklm-mcp": {
      "command": "notebooklm-mcp"
    },
    "prisma-mcp-server": {
      "command": "npx",
      "args": ["-y", "prisma", "mcp"]
    }
  }
}
```

Note:

- Each server has command + args
- Can pass environment variables
- Disable with `"disabled": true`

---

## Using MCP: NotebookLM

**Setup:**

```bash
npx notebooklm-mcp@latest auth
```

**Usage:**

```
Research how to use structured output in Gemini
using NotebookLM before implementing
```

**Result:** Grounded answers from YOUR documents

Note:

- Zero hallucinations
- Answers backed by your knowledge base
- Query Gemini API, MediaPipe, Firebase docs

---

## Workflows

**Workflows** = Reusable step-by-step procedures

```
.agent/workflows/
├── deploy.md
└── pull-upstream.md
```

**Format:**

```yaml
---
description: Deploy to production
---

1. Run tests: `npm test`
2. Build: `npm run build`
3. Deploy: `firebase deploy`
```

Note:

- Like saved macros for common tasks
- Agent follows steps exactly
- Use with `/workflow-name` command

---

## Workflow Tips

**Turbo annotation** = Auto-run safe commands

```markdown
2. Make a folder called foo

// turbo
3. Run npm install
```

The `// turbo` annotation auto-approves step 3.

**Turbo-all** = Auto-run entire workflow

```markdown
// turbo-all
1. npm install
2. npm run build
```

---

## Artifacts

**Artifacts** = Files the agent creates for you

| Type | Purpose |
|------|---------|
| `task.md` | Track task progress |
| `implementation_plan.md` | Design before coding |
| `walkthrough.md` | Document what was done |

**Location:** `~/.gemini/antigravity/brain/<conversation-id>/`

Note:

- Artifacts show proof of work
- Include screenshots and recordings
- Review before approving

---

## Best Practices

1. **Skills** → Add domain knowledge for your stack
2. **MCP** → Connect external tools (NotebookLM, Prisma)
3. **Workflows** → Codify repeatable procedures
4. **Artifacts** → Review plans before execution

**The agent works for YOU** — configure it to match your workflow
