# MCP Server Configuration

This project is configured to use NotebookLM MCP server for AI-assisted research with zero hallucinations.

## What is NotebookLM MCP?

NotebookLM MCP enables your AI coding assistant (Claude Code, Cursor, etc.) to query your NotebookLM notebooks directly. This means:

- **Zero hallucinations** - Answers come only from your uploaded documents
- **Grounded citations** - Every answer is backed by your knowledge base
- **Autonomous research** - Claude can ask follow-up questions automatically
- **Cross-tool sharing** - One setup works across all MCP-compatible tools

## Setup

### 1. First-time Authentication

Run this command to authenticate with Google:

```bash
npx notebooklm-mcp@latest auth
```

A Chrome window will open. Log in with your Google account that has NotebookLM access.

### 2. Create Your Knowledge Base

1. Go to [notebooklm.google.com](https://notebooklm.google.com)
2. Create a new notebook
3. Upload your documentation:
   - PDFs, Google Docs, websites, YouTube videos
   - For this workshop: upload Gemini API docs, MediaPipe docs, Firebase docs
4. Enable sharing and copy the notebook link

### 3. Add Notebook to Library

Tell Claude:

```
Add https://notebooklm.google.com/notebook/YOUR_ID to library tagged "workshop, gemini, firebase"
```

## Usage

### Research Before Coding

```
Research how to use structured output in Gemini in NotebookLM before implementing
```

### Query Specific Topics

```
What are the blendshape names for MediaPipe face detection? Check NotebookLM.
```

### List Your Notebooks

```
Show me our NotebookLM notebooks
```

### Select a Specific Notebook

```
Use the "Gemini API" notebook for this task
```

## Tool Profiles

The MCP is configured with the `standard` profile (10 tools). Options:

| Profile | Tools | Description |
|---------|-------|-------------|
| `minimal` | 5 | Query-only operations |
| `standard` | 10 | Includes library management |
| `full` | 16 | All capabilities including cleanup |

To change profile, edit `.mcp.json`:

```json
{
  "env": {
    "NOTEBOOKLM_PROFILE": "minimal"
  }
}
```

## Recommended Notebooks for This Workshop

Create and upload these to your NotebookLM:

1. **Gemini API Docs** - Upload from [ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
2. **MediaPipe Vision** - Upload from [ai.google.dev/edge/mediapipe](https://ai.google.dev/edge/mediapipe)
3. **Firebase Realtime Database** - Upload from [firebase.google.com/docs/database](https://firebase.google.com/docs/database)
4. **Antigravity Docs** - Upload from [antigravity.google/docs](https://antigravity.google/docs)
5. **Firebase Studio** - Upload from [firebase.google.com/docs/studio](https://firebase.google.com/docs/studio)

## Troubleshooting

### Authentication Expired

Cookies expire every 2-4 weeks. Re-run:

```bash
npx notebooklm-mcp@latest auth
```

### Too Many Tools (Context Issues)

Switch to minimal profile or disable when not using:

```bash
# In Claude Code
/mcp  # Toggle MCP servers
```

### NotebookLM Not Responding

Check your query quota (free tier: ~50 queries/day).

## Resources

- [NotebookLM MCP GitHub](https://github.com/PleasePrompto/notebooklm-mcp)
- [NotebookLM](https://notebooklm.google.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
