# Module 07 Solutions: Vibe Coding Power Tools

## Complete Rule Configuration

### Code Quality Rule (`.agent/rules/code-quality.md`)

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

### Security Rule (`.agent/rules/security.md`)

```markdown
# Security Requirements

## Never Do
- Never commit API keys, tokens, or secrets
- Never use eval() or new Function()
- Never trust user input without validation
- Never log sensitive data (passwords, tokens, PII)

## Always Do
- Use environment variables for secrets
- Validate and sanitize all user input
- Use parameterized queries for database access
- Implement proper authentication checks

## Dependencies
- Check npm audit before adding new packages
- Prefer well-maintained packages (recent commits, many users)
- Pin dependency versions in production
```

---

## MCP Server Configurations

### Firebase MCP Server

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

### Playwright MCP Server (Browser Testing)

```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/playwright-mcp"]
    }
  }
}
```

### Multiple MCP Servers

```json
{
  "mcpServers": {
    "firebase-mcp-server": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/sequential-thinking-mcp"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}"
      }
    }
  }
}
```

---

## Workflow Examples

### Test All Workflow (`.agent/workflows/test-all.md`)

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

### Deploy Workflow (`.agent/workflows/deploy.md`)

```markdown
# /deploy

## Goal
Deploy the application to Firebase Hosting.

## Prerequisites
- User must be logged into Firebase CLI
- Firebase project must be configured

## Steps
1. Run linting to catch issues: `npm run lint`
2. Run tests to verify: `npm run test`
3. Build production bundle: `npm run build`
4. Deploy to Firebase: `firebase deploy --only hosting`
5. Report the deployment URL

## Safety Checks
- Abort if linting fails
- Abort if tests fail
- Confirm with user before deploying to production

## Output
- Deployment URL
- Build size summary
- Any warnings during build
```

### Create Component Workflow (`.agent/workflows/create-component.md`)

```markdown
# /create-component

## Goal
Generate a new React component with tests and documentation.

## Input
Component name from user prompt

## Steps
1. Create component file: `src/components/{Name}/{Name}.tsx`
2. Create test file: `src/components/{Name}/{Name}.test.tsx`
3. Create index file: `src/components/{Name}/index.ts`
4. Add component to barrel export if exists

## Component Template
- Functional component with TypeScript
- Props interface exported
- JSDoc documentation
- Accessibility attributes included

## Test Template
- Render test
- Props handling test
- Interaction test skeleton
- Accessibility test with jest-axe

## Output
List of files created and next steps
```

---

## Skill Example

### Git Commit Formatter Skill

**Directory structure:**
```
.agent/skills/git-commit-formatter/
├── SKILL.md
└── examples/
    └── commits.md
```

**SKILL.md:**
```markdown
---
name: git-commit-formatter
description: Formats commit messages using the Conventional Commits specification
activation: When the user mentions "commit", "git commit", or asks to format a commit message
---

## Goal
Ensure all commit messages follow the Conventional Commits specification.

## Instructions
Format commit messages as: `<type>(<scope>): <description>`

### Allowed Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Rules
- Description must be lowercase
- Description must not end with a period
- Scope is optional but recommended
- Keep description under 72 characters
- Use imperative mood ("add" not "added")

## Examples
See examples/commits.md for input/output pairs.
```

**examples/commits.md:**
```markdown
# Commit Message Examples

Input: "Added login button"
Output: feat(auth): add login button

Input: "Fixed bug in checkout"
Output: fix(checkout): resolve calculation error in cart total

Input: "Updated readme"
Output: docs: update readme with installation instructions

Input: "Cleaned up code formatting"
Output: style: format code according to prettier config

Input: "Made the search faster"
Output: perf(search): optimize query with indexing
```

---

## Firebase Studio Prompting Examples

### Good Initial Prompt

```
Create an expense tracker app where users can:
- Add expenses with amount, category, and date
- View a list of all expenses sorted by date
- Filter expenses by category
- See a monthly spending summary

Design: Clean, minimal, dark theme with blue accents.
```

### Effective Iteration Prompts

**Using Select Tool:**
```
Make the expense list use cards instead of a plain table,
with a subtle shadow and rounded corners.
```

**Using Annotate Tool:**
```
[Draw circle around category dropdown]
Add icons next to each category name and make the dropdown wider.
```

**Asking for Options:**
```
Tell me two different ways to implement the monthly summary:
1. A simple table
2. A visual chart
Explain the pros and cons of each.
```

**Incremental Feature Addition:**
```
Now add a feature to export expenses as CSV.
Put the export button in the top right corner of the expense list.
```

---

## Troubleshooting Guide

### Rule Not Loading

**Symptoms:** Agent doesn't follow the rule you created

**Checks:**
1. File is in `.agent/rules/` directory
2. File has `.md` extension
3. File content is valid Markdown
4. Restart Antigravity after adding rules

**Verification command:**
```
What rules are currently active in this workspace?
```

### MCP Server Connection Failed

**Symptoms:** MCP server shows as offline or errors on use

**Checks:**
1. Validate JSON syntax in `mcp_config.json`
2. Ensure command is installed (`npx` requires npm)
3. Check environment variables are set
4. Look for error messages in terminal

**Common fixes:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall the MCP package
npx -y firebase-tools@latest mcp
```

### Workflow Not Triggering

**Symptoms:** Typing `/workflow-name` doesn't work

**Checks:**
1. File is in `.agent/workflows/` directory
2. File name matches the command (without `/`)
3. First heading matches `# /workflow-name` format

**Verification:**
```
List all available workflows in this workspace.
```

---

## Key Takeaways

### When to Use Antigravity vs. Firebase Studio

| Scenario | Best Tool |
|----------|-----------|
| Complex multi-file refactoring | Antigravity |
| Rapid prototyping from scratch | Firebase Studio |
| Projects with existing codebase | Antigravity |
| Quick MVP with Firebase backend | Firebase Studio |
| Team projects with custom standards | Antigravity + Rules |
| Learning/experimenting | Firebase Studio |

### The Mindset Shift

**Before vibe coding:**
- Focus on syntax and implementation details
- Context switching between research, coding, testing
- Write every line manually

**After vibe coding:**
- Focus on architecture and requirements
- Direct agents, review their work
- Apply engineering principles to AI output
- Trust but verify - test everything
