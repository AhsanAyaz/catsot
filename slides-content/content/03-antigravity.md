# Antigravity — Agent-First Development

**Module 04** | ~35 minutes
The paradigm shift from AI-assisted to AI-first

Note:

- This is the main event — longest module
- Covers the four pillars: Rules, Workflows, Skills, MCP

---

<video src="assets/videos/AIEvolution.mp4" controlsautoplay loop muted></video>
<!-- .element: style=" border-radius: 12px;" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### You-First vs Agent-First

| Aspect | **You-First (Traditional)** | **Agent-First (Antigravity)** |
|--------|---------------------------|------------------------------|
| **Your role** | Write code | Supervise agents |
| **AI role** | Autocomplete, suggestions | Autonomous execution |
| **Workflow** | Type → Tab → Edit | Describe → Review → Approve |
| **Output** | Code snippets | Full implementations |

---

## Mission Control Interface

- Orchestrate multiple parallel agents
- Monitor async task progress
- Review artifacts before merging

Note:

- Show the manager view in Antigravity
- Demonstrate parallel agent execution

---

<!-- .slide: style="font-size: 0.8em" -->
### Artifacts Over Text

**Agents don't just chat — they create deliverables**

| Artifact Type | Description |
|---------------|-------------|
| **Implementation Plans** | Architecture docs before coding |
| **Code Diffs** | Reviewable changes |
| **Walkthroughs** | Proof of work with screenshots |
| **Browser Recordings** | Video of agent testing the app |

**Verifiable work, not just text responses**

---

## The Four Pillars

Agent behavior is customized through:

1. **Agent Rules** — Passive guardrails
<!-- .element: class="fragment" -->

1. **Workflows** — User-triggered macros
<!-- .element: class="fragment" -->

1. **Agent Skills** — Semantically triggered capabilities
<!-- .element: class="fragment" -->

1. **MCP Servers** — External tool connections
<!-- .element: class="fragment" -->

Let's explore each...

---

### 1. Agent Rules

**Passive, always-on guardrails**

```markdown
# .gemini/rules.md

## Coding Standards
- Always use TypeScript
- Never hardcode API keys
- Use conventional commits

## Security
- Never expose credentials in logs
- Validate all user inputs
```

Rules are checked on EVERY agent action

---

<!-- .slide: style="font-size: 0.8em" -->
### Rules: Passive by Design

| ✅ Good for Rules | ❌ Not for Rules |
|------------------|-----------------|
| "Always use TypeScript" | "Deploy to staging" |
| "Never commit secrets" | "Run the test suite" |
| "Use conventional commits" | "Generate documentation" |

**If it's an action, it's NOT a rule**

---

### 2. Workflows

**User-triggered macros (/commands)**

```markdown
# .agent/workflows/deploy.md
---
description: Deploy the app to staging
---

1. Run `npm test`
2. Build with `npm run build`
3. Deploy with `firebase deploy --only hosting`
4. Verify deployment at staging URL
```

**Invoke with:** `/deploy`

---

<!-- .slide: style="font-size: 0.8em" -->
### Workflows: Step-by-Step

| ✅ Good for Workflows | ❌ Not for Workflows |
|----------------------|---------------------|
| "/deploy" sequence | "Always format on save" |
| "/test" + coverage | "Use semicolons" |
| "/release" checklist | "Never use any" |

**If it's a sequence, it's a workflow**

---

### 3. Agent Skills

**Semantically triggered capabilities**

```markdown
# .agent/skills/validate-staging/SKILL.md
--

```markdown
------------------------------------
name: Validate Staging

--
<video src="assets/videos/AgentSkills.mp4" controls autoplay loop muted></video>
<!-- .element: style="border-radius: 12px; max-height: 45vh;" -->

--

## Steps

1. Ping the staging URL
2. Check for 200 response
3. Verify database connection
4. Report results

```

**Triggered by:** "Is staging healthy?"

---

<!-- .slide: style="font-size: 0.8em" -->
### Skills: Progressive Disclosure

**Skills are NOT always loaded**

| Traditional Prompts | Agent Skills |
|--------------------|--------------|
| Always in context | Loaded on demand |
| Consume tokens | Zero cost until used |
| Generic | Project-specific |

**Ask:** "Is staging healthy?"
**Agent:** *Equips* validate-staging skill → Executes

---

### Skills: Scope

**Global Scope** (`~/.gemini/antigravity/skills/`)
<!-- .element: class="fragment" -->

- Available across ALL projects
<!-- .element: class="fragment" -->
- Example: "JSON Formatter", "Git Conventional Commits"
<!-- .element: class="fragment" -->

**Workspace Scope** (`.agent/skills/`)
<!-- .element: class="fragment" -->

- Project-specific logic
<!-- .element: class="fragment" -->
- Example: "Validate Our Staging", "Run Our E2E Suite"
<!-- .element: class="fragment" -->

---

### Skills: Tribal Knowledge

**Encode your team's knowledge**

Instead of:
> "Hey, how do we deploy again? What's the staging URL?"

Create a skill:

```markdown
# skills/deploy-staging/SKILL.md
description: Deploy to our staging environment

1. Build: npm run build:staging
2. Deploy: firebase deploy --project staging-xyz
3. Verify: curl https://staging.ourapp.com/health
```

**Knowledge persists, never repeated**

---

### 4. MCP Servers

**Model Context Protocol — External tools**

```json
// .gemini/settings.json
{
  "mcpServers": {
    "notebooklm": { "command": "notebooklm-mcp" },
    "prisma": { "command": "prisma-mcp-server" },
    "github": { "command": "gh-mcp" }
  }
}
```

**Agents gain new abilities from each server**

---

<!-- .slide: style="font-size: 0.8em" -->
### MCP: The Agent's Hands

| MCP Server | Abilities Gained |
|------------|-----------------|
| **NotebookLM** | Query your research notebooks |
| **Prisma** | Database operations, migrations |
| **GitHub** | Create PRs, list issues |
| **Firebase** | Deploy, manage Firestore |

**Agents interact with REAL systems**

---

### NotebookLM MCP Deep Dive

**Connect research to code**

```text
User: "Check my Firebase notebook for 
       Firestore security rule patterns"

Agent: [Queries NotebookLM] 
       Based on your documentation [source 3],
       here's the recommended pattern...

       // Generated code follows
```

**Research → Code in one flow**

---

### Browser Subagent

**Agents can test their own work**

- Navigate web pages
<!-- .element: class="fragment" -->
- Click buttons, fill forms
<!-- .element: class="fragment" -->
- Take screenshots
<!-- .element: class="fragment" -->
- Record video walkthroughs
<!-- .element: class="fragment" -->

---

<!-- .slide: style="font-size: 0.8em" -->
### Antigravity Quick Summary

| Pillar | Purpose | Trigger |
|--------|---------|---------|
| **Rules** | Always-on guardrails | Passive |
| **Workflows** | Step-by-step macros | `/command` |
| **Skills** | Smart capabilities | Semantic ("Is X healthy?") |
| **MCP** | External tools | Agent needs them |

---

### Key Takeaways

✅ **Agent-First** = Supervise, don't type
<!-- .element: class="fragment" -->

✅ **Mission Control** = Parallel agent orchestration
<!-- .element: class="fragment" -->

✅ **Rules** = Passive guardrails
<!-- .element: class="fragment" -->

✅ **Workflows** = Triggered sequences
<!-- .element: class="fragment" -->

✅ **Skills** = Smart, semantic capabilities
<!-- .element: class="fragment" -->

✅ **MCP** = External tool connections
<!-- .element: class="fragment" -->

**Next:** Gemini CLI — same power, terminal interface
