# Workshop Infrastructure

Infrastructure utilities for the "Beyond Chatbots" AI workshop at Google Stockholm.

## Purpose

With 40 participants hitting the Gemini API simultaneously, a single API key will exhaust quota quickly:
- **Free tier:** 15 requests/minute per key
- **With 1 key:** 900 requests/hour (insufficient)
- **With 3 keys:** 2,700 requests/hour (3x safety margin)

## Components

### QuotaAwareAPI (`quota-monitor.js`)

Multi-key Gemini API wrapper with automatic quota failover.

**Features:**
- Round-robin key rotation
- Automatic failover on 429 (quota exceeded) errors
- Exponential backoff (100ms, 200ms, 400ms, ...)
- Real-time usage statistics
- Quota reset detection (1-minute intervals)

**Usage:**

```javascript
import { QuotaAwareAPI, createFromEnv, generateContent } from './quota-monitor.js';

// Option 1: Manual key configuration
const api = new QuotaAwareAPI([
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
], { verbose: true });

// Option 2: Auto-load from environment
const api = createFromEnv({ verbose: true });

// Option 3: Simple content generation
const text = await generateContent(api, 'Tell me about Stockholm');
console.log(text);

// Raw API call (for structured output, multimodal, etc.)
const response = await api.call(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Hello!' }] }]
    })
  }
);

// View statistics
api.printStats();
```

**Options:**

| Option | Default | Description |
|--------|---------|-------------|
| `verbose` | `false` | Log request/rotation info |
| `maxRetries` | `keys.length` | Max retry attempts |
| `resetInterval` | `60000` (1 min) | Quota reset check interval |

**Statistics:**

```javascript
const stats = api.getStats();
// {
//   currentKey: 1,
//   totalKeys: 3,
//   activeKeys: 2,
//   totalRequests: 150,
//   totalErrors: 5,
//   successRate: '96.7%',
//   uptime: '45s',
//   requestCounts: [50, 60, 40],
//   errorCounts: [2, 3, 0],
//   quotaExhausted: ['Key 2']
// }
```

## Environment Variables

Copy `api-keys.env.example` to `.env` and configure:

```bash
# Required: At least one key
GEMINI_API_KEY=your-primary-key-here
GEMINI_KEY_1=your-primary-key-here

# Recommended: Backup keys for 40-person workshop
GEMINI_KEY_2=your-backup-key-2-here
GEMINI_KEY_3=your-backup-key-3-here

# Optional: Additional keys for larger workshops
GEMINI_KEY_4=your-backup-key-4-here
GEMINI_KEY_5=your-backup-key-5-here
```

## Quota Estimation

**Workshop: 40 participants, 3.5 hours**

| Scenario | Requests | Keys Needed |
|----------|----------|-------------|
| Conservative (10 req/person) | 400 | 1 key sufficient |
| Moderate (20 req/person) | 800 | 1-2 keys |
| Heavy (40 req/person) | 1,600 | 2-3 keys |
| Safety margin (3x) | - | 3 keys recommended |

**Calculation:**
- 3 keys x 15 RPM = 45 requests/minute
- 45 RPM x 60 min = 2,700 requests/hour
- 2,700 x 3.5 hours = 9,450 total capacity
- Workshop needs: ~500-1,500 requests
- **Safety margin: 6x-18x capacity**

## Monitoring During Workshop

### Client-Side

Add to your code:
```javascript
// Log stats every 10 requests (when verbose)
const api = createFromEnv({ verbose: true });

// Manual stats check
setInterval(() => api.printStats(), 60000);
```

### Console Output Example

```
--- API Quota Stats ---
   Current: Key 2/3
   Active Keys: 2/3
   Total Requests: 150
   Total Errors: 5
   Success Rate: 96.7%
   Since Last Reset: 45s
   Quota Exhausted: Key 1
   Per-key breakdown:
     Key 1: 50 requests, 3 errors (exhausted)
     Key 2: 60 requests, 2 errors
     Key 3: 40 requests, 0 errors
------------------------
```

## Troubleshooting

### All keys exhausted

```
Error: All 3 API keys exhausted or failed after 3 attempts.
```

**Solutions:**
1. Wait 1 minute for quota reset (15 RPM resets each minute)
2. Add more API keys to environment
3. Use offline mock (`backup/mocks/gemini-api-mock.js`)
4. Ask participants to slow down, work on non-API tasks

### Single key failing

Rotation happens automatically. Check for:
- Invalid/revoked API key
- Key restricted to specific IPs/referrers
- Billing issues (if using paid tier)

### High error rate (>10%)

- Check network connectivity
- Verify API endpoint URL is correct
- Check for model name changes (gemini-2.0-flash may be renamed)
- Verify response structure matches expectations

## See Also

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [api-keys.env.example](./api-keys.env.example) - Environment variable template
