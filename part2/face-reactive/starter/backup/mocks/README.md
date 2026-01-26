# Gemini API Mock

Offline mock for Gemini API that returns realistic responses without network calls.

## When to Use

1. **Offline Development** - Working without internet connection
2. **API Quota Exhausted** - Free tier (250 req/day) limit reached
3. **Testing** - Predictable responses for unit/integration tests
4. **Workshop Fallback** - If API issues arise during live sessions

## Available Mock Responses

| Keyword Triggers | Response Type | Example Prompt |
|-----------------|---------------|----------------|
| `recipe`, `ingredient`, `cook`, `food` | Swedish Meatballs recipe | "What recipe can I make with these ingredients?" |
| `emotion`, `feeling`, `mood`, `face` | Emotion detection result | "What emotion is this person showing?" |
| `review`, `sentiment`, `feedback` | Product review analysis | "Analyze this customer review" |
| `code`, `function`, `program` | Code analysis result | "Explain what this code does" |
| `game`, `score`, `click`, `play` | Game action response | "Process this game click" |
| (none matched) | Default fallback | Any other prompt |

## Usage

### Browser (Direct Import)

```javascript
// Option 1: Include via script tag
<script src="/backup/mocks/gemini-api-mock.js"></script>

// Then use:
const response = window.GeminiMock.getMockResponse("Analyze my recipe");
console.log(response.candidates[0].content.parts[0].text);
```

### Browser (Environment Detection)

```javascript
// In your main.js - automatic fallback
async function callGeminiAPI(prompt) {
  // Check if we should use mock
  if (window.GeminiMock && window.GeminiMock.shouldUseMock()) {
    console.log('[Mock] Using offline Gemini mock');
    return window.GeminiMock.getMockResponseWithDelay(prompt);
  }

  // Real API call
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );
  return response.json();
}
```

### Node.js

```javascript
const { getMockResponse, getMockResponseWithDelay } = require('./gemini-api-mock.js');

// Synchronous
const response = getMockResponse("What emotion is shown?");
console.log(JSON.parse(response.candidates[0].content.parts[0].text));

// With simulated latency (200-800ms)
const delayedResponse = await getMockResponseWithDelay("Analyze this recipe");
```

### Feature Flag Pattern

```javascript
// Set this flag to force mock mode
window.GEMINI_OFFLINE_MODE = true;

// Or via environment variable (Node.js)
// GEMINI_OFFLINE_MODE=true node app.js

// The shouldUseMock() function will check:
// 1. navigator.onLine === false
// 2. window.GEMINI_OFFLINE_MODE === true
// 3. process.env.GEMINI_OFFLINE_MODE is set
```

## Response Format

All responses match the Gemini API format:

```javascript
{
  candidates: [{
    content: {
      parts: [{ text: "..." }]  // JSON stringified or plain text
    },
    finishReason: "STOP"
  }],
  usageMetadata: {
    promptTokenCount: 100,
    candidatesTokenCount: 150,
    totalTokenCount: 250
  }
}
```

## Limitations

1. **Static responses** - Same keywords always return same response
2. **No actual AI** - Responses are pre-defined, not generated
3. **No image processing** - Image prompts not analyzed
4. **No context** - Each call is independent, no conversation history

## Workshop Integration

For the workshop, you can enable mock mode globally if API issues arise:

```html
<!-- Add at top of any HTML file to force mock mode -->
<script>
  window.GEMINI_OFFLINE_MODE = true;
</script>
<script src="/backup/mocks/gemini-api-mock.js"></script>
```

## Extending

To add new mock responses, edit `gemini-api-mock.js`:

```javascript
// Add to mockResponses object
myNewResponse: {
  candidates: [{
    content: {
      parts: [{
        text: JSON.stringify({ /* your response */ })
      }]
    },
    finishReason: "STOP"
  }],
  usageMetadata: {
    promptTokenCount: 50,
    candidatesTokenCount: 100,
    totalTokenCount: 150
  }
}

// Add keyword detection in getMockResponse()
if (lowerPrompt.includes('mynewkeyword')) {
  return mockResponses.myNewResponse;
}
```
