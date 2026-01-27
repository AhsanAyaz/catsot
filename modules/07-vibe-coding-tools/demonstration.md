# Module 07 Demonstration: Vibe Coding Power Tools

**Duration:** 8-10 minutes
**Format:** Instructor-led walkthrough of Antigravity and Firebase Studio

## Introduction (1 minute)

**The paradigm shift:**

| Era | Approach | Developer Role |
|-----|----------|----------------|
| Traditional | Write every line | Typist |
| AI-Assisted | Autocomplete suggestions | Writer with helper |
| Vibe Coding | Describe, AI implements | Creative director |

**What is vibe coding?**

Term coined by **Andrej Karpathy** (OpenAI co-founder, former Tesla AI lead) in February 2025:

> "Vibe coding is prompting AI tools to generate code rather than writing code manually. You describe what you want, AI implements it, you iterate."

**Today's demonstration:**

We'll explore two powerful vibe coding environments:
1. **Google Antigravity** - Agent-first IDE with autonomous execution
2. **Firebase Studio** - Cloud-based prototyping with visual feedback

---

## Part A: Google Antigravity (5 minutes)

### Step 1: The Three Surfaces (1 minute)

**Show:** Open Antigravity and highlight the three main areas

**Agent Manager (Mission Control):**
- Shows all active agent sessions
- Parallel task orchestration
- Real-time conversation monitoring

**Editor View:**
- VS Code-based interface
- AI-enhanced with inline commands
- `Cmd + L` opens Agent Panel
- `Cmd + I` triggers inline AI commands

**Browser Control:**
- Dedicated Chrome automation
- Agents test and verify their own work
- Screenshot artifacts for feedback

**Point out:**
> "Unlike traditional IDEs with AI in a sidebar, Antigravity gives agents control over all three surfaces. The agent can write code, run tests in terminal, AND verify in browser - all autonomously."

### Step 2: Model Switching (30 seconds)

**Action:** Open Agent Panel (`Cmd + L`)

**Show:** Model selection dropdown

**Available models:**
- **Gemini 3 Pro** - Default, strong reasoning
- **Gemini 3 Flash** - Faster, simpler tasks
- **Claude Opus 4.5** - Premium reasoning (if available)
- **Claude Sonnet 4.5** - Cost-effective coding

**When to switch:**
- Complex reasoning → Gemini 3 Pro or Claude Opus 4.5
- Quick edits → Gemini 3 Flash
- Code review → Claude Sonnet 4.5

**Point out:**
> "You can switch models mid-conversation without losing context. Different models have different strengths."

### Step 3: Configuring MCP Servers (1.5 minutes)

**What is MCP?**

Model Context Protocol - Extends agent capabilities by connecting to external tools and services.

**Action:** Click `...` menu → MCP Servers → Open MCP Store

**Show:** Available MCP servers:
- Firebase - Project management, Auth, Firestore
- Playwright - Browser automation
- Supabase - Database operations
- Context-7 - Up-to-date code documentation

**Action:** Click "Manage MCP Servers" → "View raw config"

**Show:** The `mcp_config.json` file location:
- macOS/Linux: `~/.gemini/antigravity/mcp_config.json`
- Windows: `C:\Users\<USER>\\.gemini\antigravity\mcp_config.json`

**Example configuration:**
```json
{
  "mcpServers": {
    "firebase-mcp-server": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    }
  }
}
```

**Point out:**
> "MCP servers give agents real capabilities - they can actually create Firebase projects, manage databases, run browser tests. Not just write code about these things."

### Step 4: Rules and Workflows (1.5 minutes)

**Action:** Click `...` menu → Customizations → Rules

**Explain the difference:**

| Type | When Active | Example |
|------|-------------|---------|
| **Rules** | Always on | "Never commit API keys" |
| **Workflows** | Triggered by `/` | `/test` runs test suite |

**Show:** Create a simple rule

**File location:** `.agent/rules/typescript-style.md`

```markdown
# TypeScript Code Style

- Always use TypeScript strict mode
- Use PascalCase for classes, camelCase for functions
- All functions must have JSDoc comments
- Never use `any` type - use proper typing
```

**Action:** Show workflow creation

**File location:** `.agent/workflows/review.md`

```markdown
# /review

## Goal
Review the current file for code quality issues.

## Steps
1. Check for TypeScript errors
2. Look for common anti-patterns
3. Suggest refactoring opportunities
4. Output as markdown checklist
```

**Point out:**
> "Rules are guardrails - they're always active. Workflows are macros - you trigger them when needed. Use `/review` in chat to run the workflow."

### Step 5: Agent Skills (30 seconds)

**Explain:** Skills are modular expertise packages the agent loads on-demand.

**Location:** `.agent/skills/` or `~/.gemini/antigravity/skills/`

**Five skill levels:**
1. **Basic routing** - Pure SKILL.md instructions
2. **Reference** - SKILL.md + documentation files
3. **Few-shot** - SKILL.md + example pairs
4. **Tool use** - SKILL.md + validation scripts
5. **Composition** - All components combined

**Show:** Example skill structure:
```
my-skill/
├── SKILL.md          # Definition file
├── scripts/          # Validation scripts
├── references/       # Documentation
└── examples/         # Input/output pairs
```

**Point out:**
> "Skills enable progressive disclosure - the agent only loads heavy context when it needs that specific capability."

---

## Part B: Firebase Studio (3 minutes)

### Step 1: Two Development Modes (30 seconds)

**Show:** Open Firebase Studio (studio.firebase.google.com)

**Explain the two modes:**

| Mode | Interface | Best For |
|------|-----------|----------|
| **Full-Control** | Code OSS IDE | Experienced devs, complex projects |
| **App Prototyping** | Natural language prompts | Rapid prototyping, MVPs |

**Point out:**
> "App Prototyping uses an agent to build complete apps from descriptions. Currently Next.js only, more frameworks coming."

### Step 2: Visual Communication Tools (1 minute)

**Action:** Start a simple app prototype

**Prompt example:**
```
Create a task manager where users can add, complete, and delete tasks.
Use a clean, minimal design with a dark theme.
```

**Show three visual tools:**

**1. Annotate Tool:**
- Click Annotate icon
- Draw directly on the preview
- Add shapes, text, arrows to indicate changes

**2. Select Tool:**
- Click Select icon
- Click specific UI elements
- Describe changes for that element

**3. Image Attachments:**
- Attach wireframes, color palettes, reference images
- "Show don't tell" - faster than describing

**Point out:**
> "A picture is worth a thousand prompts. Using visual tools reduces iteration cycles significantly."

### Step 3: Version Control and Rollback (30 seconds)

**Show:** The version history

**Action:** Click "Restore" on a previous version

**Point out:**
> "Sometimes the agent misunderstands or introduces bugs. Restore lets you quickly get back to a working state and try a different approach."

### Step 4: Best Practices for Prompting (1 minute)

**The Elevator Pitch approach:**
- Keep initial prompts 10-30 seconds when spoken
- Describe: What it is, what it does, how it looks
- Stay within 10-feature limit

**One change at a time:**
- Request one change per conversation turn
- Enables easy rollback if something breaks
- Think in terms of "good stopping points"

**Ask for implementation options:**
```
Tell me at least two ways to implement user authentication,
explain their pros and cons.
```

**Point out:**
> "Firebase Studio excels at showing you options before committing to an approach. Use this to make informed decisions."

---

## Key Takeaways (30 seconds)

**When to use each tool:**

| Scenario | Tool |
|----------|------|
| Complex refactoring, multi-file changes | Antigravity |
| Rapid prototyping from scratch | Firebase Studio |
| Precision surgical edits | Traditional IDE or Cursor |
| Team project with custom standards | Antigravity + Rules + Skills |

**The mindset shift:**
- You're now a **creative director**, not a typist
- Your job is to **review, approve, and iterate**
- Apply engineering principles to AI-generated code
- **Test everything** - trust but verify

---

## Transition to Exercise

"Now it's your turn! In the next 12-15 minutes, you'll:
1. Configure an MCP server for Firebase
2. Create a custom rule for code quality
3. Build a simple workflow for testing
4. Try the App Prototyping agent in Firebase Studio

Choose the guided path for step-by-step instructions, or the independent path to explore your own use case. Let's get started!"
