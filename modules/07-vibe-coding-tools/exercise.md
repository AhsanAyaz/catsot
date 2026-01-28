# Module 07 Exercise: Vibe Coding Power Tools

**Duration:** 12-15 minutes
**Choose your path:** Option A (Guided) or Option B (Independent)

---

## Option A: Guided Path - Configure Your Development Environment

Follow these steps to set up rules, MCP servers, and skills in Antigravity.

### Part 1: Create a Code Quality Rule (3 minutes)

**Step 1:** Create the rules directory (if it doesn't exist)

In your project folder, create: `.agent/rules/`

**Step 2:** Create a TypeScript style rule

Create file: `.agent/rules/code-quality.md`

```markdown
# Code Quality Standards

## TypeScript Rules
- Always use TypeScript strict mode
- Never use the `any` type - use proper typing or `unknown`
- Prefer interfaces over type aliases for object shapes
- Use `const` by default, `let` only when reassignment is needed

## Function Requirements
- All exported functions must have JSDoc comments
- Maximum function length: 50 lines
- Maximum parameters: 4 (use options object for more)

## Naming Conventions
- PascalCase for classes and interfaces
- camelCase for functions and variables
- SCREAMING_SNAKE_CASE for constants

## Error Handling
- Never swallow errors silently
- Always log errors with context
- Use typed error classes for domain errors
```

**Step 3:** Verify the rule is active

In the Antigravity chat, type:
```
Show me what rules are currently active in this workspace.
```

The agent should list your code-quality.md rule.

### Part 2: Configure Firebase MCP Server (3 minutes)

**Step 1:** Access MCP configuration

1. Click `...` menu in Agent Panel
2. Select "MCP Servers"
3. Click "Manage MCP Servers"
4. Select "View raw config"

**Step 2:** Add Firebase MCP server

In `mcp_config.json`, add:

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

**Step 3:** Enable the server

1. Return to "Manage MCP servers"
2. Click refresh
3. Verify firebase-mcp-server appears

**Step 4:** Test the MCP server

In chat, ask:
```
List the Firebase projects available in my account.
```

The agent should use the MCP server to query your Firebase projects.

### Part 3: Create a Testing Workflow (3 minutes)

**Step 1:** Create workflows directory

Create: `.agent/workflows/`

**Step 2:** Create test workflow

Create file: `.agent/workflows/test-all.md`

```markdown
# /test-all

## Goal
Run all tests and provide a summary of results.

## Steps
1. Find all test files (*.test.ts, *.spec.ts)
2. Run the test suite using the project's test runner
3. Capture test output
4. Generate a summary table:
   - Total tests
   - Passed tests
   - Failed tests
   - Skipped tests
5. For any failures, show the error message and file location
6. Suggest fixes for common failure patterns

## Output Format
Provide results as a markdown table with:
| Status | Count |
|--------|-------|
| Passed | X |
| Failed | Y |
| Skipped | Z |

Then list any failures with:
- File path
- Test name
- Error message
- Suggested fix
```

**Step 3:** Test the workflow

In chat, type:
```
/test-all
```

The agent should execute your workflow and run the test suite.

### Part 4: Try Firebase Studio App Prototyping (3-4 minutes)

**Step 1:** Open Firebase Studio

Navigate to: studio.firebase.google.com

**Step 2:** Start a new prototype

Click "Create new project" → "App Prototyping"

**Step 3:** Describe your app

Enter a prompt:
```
Create a simple expense tracker where users can:
- Add expenses with amount, category, and date
- View a list of all expenses
- Filter by category
- See a total for the current month

Use a clean, professional design with a blue accent color.
```

**Step 4:** Iterate using visual tools

Once the prototype generates:

1. **Use Select tool:** Click on the "Add Expense" button and type:
   ```
   Make this button larger and use a gradient from blue to purple
   ```

2. **Use Annotate tool:** Draw a circle around the expense list and type:
   ```
   Add alternating row colors for better readability
   ```

3. **Try rollback:** Click "Restore" to go back to the previous version, then try a different approach.

---

## Option B: Independent Path - Build Your Own Configuration

### Challenge: Configure for Your Use Case

Set up a complete development environment for a project type you commonly work on.

**Requirements:**

1. **Create 2-3 rules** that enforce your team's coding standards
   - Consider: style, testing, documentation, security

2. **Configure at least one MCP server** for tools you use
   - Ideas: Firebase, Supabase, GitHub, Playwright

3. **Create a workflow** for a common task
   - Ideas: `/deploy`, `/review-pr`, `/create-component`, `/document`

4. **Try Firebase Studio** with a project idea relevant to your work

### Example Ideas by Role

**Frontend Developer:**
- Rule: Accessibility requirements (ARIA labels, keyboard nav)
- MCP: Playwright for visual testing
- Workflow: `/create-component` that generates component + test + story

**Backend Developer:**
- Rule: API design patterns (REST conventions, error formats)
- MCP: Database MCP for schema inspection
- Workflow: `/create-endpoint` that generates route + controller + test

**Full Stack:**
- Rule: Security checklist (input validation, auth patterns)
- MCP: Firebase for full-stack integration
- Workflow: `/feature` that creates frontend + backend + tests

### Share Your Configuration

After completing, share with a neighbor:
- What rules did you create?
- What workflows would save you the most time?
- What MCP servers would you want if they existed?

---

## Success Criteria

### Option A (Guided)

- [ ] Created a code quality rule in `.agent/rules/`
- [ ] Agent confirms the rule is active
- [ ] Firebase MCP server configured and responding
- [ ] Test workflow created and executable via `/test-all`
- [ ] Built a simple app in Firebase Studio App Prototyping
- [ ] Used at least one visual tool (Select or Annotate)

### Option B (Independent)

- [ ] Created 2-3 meaningful rules for your use case
- [ ] Configured at least one MCP server
- [ ] Created a useful workflow for a common task
- [ ] Tested configurations by prompting the agent
- [ ] Built a prototype relevant to your work in Firebase Studio

---

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Rule not loading | Wrong file location | Ensure it's in `.agent/rules/` with `.md` extension |
| MCP server not appearing | Config syntax error | Validate JSON in mcp_config.json |
| Workflow not triggering | Wrong directory | Ensure it's in `.agent/workflows/` |
| Firebase MCP fails | Auth issue | Run `firebase login` in terminal first |
| App Prototyping stuck | Complex prompt | Simplify to 5-7 features max |

---

## Going Further

If you finish early, try these advanced challenges:

### Advanced Challenge 1: Create a Skill
Create a complete skill with validation:

```
my-skill/
├── SKILL.md
├── scripts/
│   └── validate.py
└── examples/
    ├── input1.txt
    └── output1.txt
```

### Advanced Challenge 2: Multi-Model Workflow
Create a workflow that uses different models for different steps:
- Claude Opus for planning
- Gemini Flash for implementation
- Claude Sonnet for code review

### Advanced Challenge 3: Parallel Agents
In Antigravity, spawn multiple agents:
- Agent 1: Refactor the component
- Agent 2: Write tests for the new component
- Agent 3: Update documentation

Watch them work in parallel from the Agent Manager.

### Advanced Challenge 4: Compare Environments
Build the same feature in both Antigravity and Firebase Studio:
- Which was faster?
- Which produced better code?
- When would you use each?

---

## Reflection Questions

Before moving to Part 2, consider:

1. **How does your role change** when AI agents do the implementation?
2. **What human skills become MORE important** in vibe coding?
3. **Where should humans stay in the loop** vs. trusting agents fully?
4. **How would you introduce** these tools to your team?
