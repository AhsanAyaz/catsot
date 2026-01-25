# Structured Prompt Template

## Pattern: Role + Task + Context + Format

Use this template to create effective, structured prompts that guide the model toward consistent, high-quality responses.

## Template

```
<system_instruction>
You are a [ROLE - e.g., code review assistant, technical writer].
[BEHAVIOR - e.g., Provide constructive feedback, Keep explanations concise].
</system_instruction>

<task>
[WHAT TO DO - e.g., Analyze the following code, Summarize this article]
</task>

<context>
[ADDITIONAL INFO - e.g., Target audience is beginners, Focus on security issues]
</context>

<input>
[THE ACTUAL CONTENT TO PROCESS]
</input>

<output_format>
[HOW TO STRUCTURE RESPONSE - e.g., JSON, bullet points, step-by-step]
</output_format>
```

## Example Usage

### Unstructured (worse):

```
Review this code and tell me if there are any problems and also suggest improvements and make it better.

def login(username, password):
    if username == "admin" and password == "admin":
        return True
    return False
```

**Issues with this approach:**
- No clear role or perspective for the model
- Multiple vague requests ("problems", "improvements", "make it better")
- No output format specified
- Results will vary across different code samples

### Structured (better):

```
<system_instruction>
You are a security-focused code review assistant.
Identify security vulnerabilities and suggest improvements.
Keep feedback actionable and specific.
</system_instruction>

<task>
Review the following code for security issues and best practices.
</task>

<context>
This is authentication code for a web application.
Target audience: intermediate developers.
</context>

<input>
def login(username, password):
    if username == "admin" and password == "admin":
        return True
    return False
</input>

<output_format>
{
  "security_issues": ["issue 1", "issue 2"],
  "severity": "high|medium|low",
  "recommendations": ["action 1", "action 2"]
}
</output_format>
```

**Expected response:**
```json
{
  "security_issues": [
    "Hardcoded credentials in source code",
    "Plain text password comparison (no hashing)",
    "Single admin account with predictable credentials",
    "No rate limiting or brute force protection"
  ],
  "severity": "high",
  "recommendations": [
    "Remove hardcoded credentials and use environment variables or secure storage",
    "Implement password hashing with bcrypt or argon2",
    "Use a proper authentication system with salted hashes",
    "Add rate limiting and account lockout after failed attempts"
  ]
}
```

## Why This Works

- **Clear role:** Model knows what perspective to take (security-focused reviewer)
- **Explicit task:** No ambiguity about what to do
- **Relevant context:** Model understands constraints and target audience
- **Defined format:** Output is predictable and parseable
- **XML tags:** Help model parse different sections clearly (especially with complex prompts)

## When to Use

- Complex tasks requiring specific behavior or perspective
- Consistent output format needed across multiple inputs
- Multiple pieces of context must be provided (code + requirements + constraints)
- Combining with structured output (Module 02) for guaranteed JSON structure

## Variations

### Using Markdown Instead of XML

```markdown
# System Instruction
You are a technical writer creating beginner-friendly documentation.

## Task
Explain the following code snippet in simple terms.

## Context
- Audience: developers new to Python
- Focus: What the code does, not implementation details

## Input
[code here]

## Output Format
- **What it does:** [one sentence]
- **How it works:** [2-3 bullet points]
- **Common use cases:** [examples]
```

Both XML tags and Markdown headings work. Choose based on:
- **XML tags:** Better for deeply nested structures, mixing formats
- **Markdown:** More readable for humans, familiar to developers

## Tips

1. **Start with the role:** Define who the model should be
2. **Be specific in task:** "Analyze for security issues" vs. "make it better"
3. **Provide relevant context:** Target audience, constraints, focus areas
4. **Show the format:** Example output structure guides the model
5. **Iterate:** Test with multiple inputs, refine based on results
