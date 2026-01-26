# Workshop Infrastructure Setup

Complete setup guide for the "Beyond Chatbots" AI workshop infrastructure.

## Quick Start

```bash
# 1. Copy environment template
cp infrastructure/api-keys.env.example infrastructure/api-keys.env

# 2. Add your API keys (get from https://aistudio.google.com/app/apikey)
# Edit infrastructure/api-keys.env with your keys

# 3. Test the setup
node infrastructure/test-quota-monitor.js
```

## API Key Configuration

### Get API Keys

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key" (repeat 3 times for workshop)
4. Copy each key to `infrastructure/api-keys.env`

### Configuration File

Create `infrastructure/api-keys.env` (or copy from `.env.example`):

```bash
# Required: At least one key
GEMINI_API_KEY=AIza...your-key-here
GEMINI_KEY_1=AIza...your-key-here

# Recommended: Backup keys for 40-person workshop
GEMINI_KEY_2=AIza...backup-key-2
GEMINI_KEY_3=AIza...backup-key-3
```

### Google-Sponsored Access

This workshop mentions "Google-sponsored API access" in PROJECT.md.

Contact the workshop organizer (Google Stockholm) to:
- Confirm quota limits for sponsored keys
- Verify if higher than free tier (15 RPM, 1500 RPD)
- Get instructions for using sponsored project/keys

Sponsored access benefits:
- Higher rate limits (potentially 60+ RPM)
- Pre-configured billing (no cost to participants)
- Dedicated project isolation

## Load Environment Variables

### Node.js

Install dotenv:
```bash
npm install dotenv
```

Load in your code:
```javascript
import dotenv from 'dotenv';
dotenv.config({ path: 'infrastructure/api-keys.env' });

// Now use QuotaAwareAPI
import { createFromEnv } from './infrastructure/quota-monitor.js';
const api = createFromEnv({ verbose: true });
```

### Python

Install python-dotenv:
```bash
pip install python-dotenv
```

Load in your code:
```python
from dotenv import load_dotenv
load_dotenv('infrastructure/api-keys.env')

# Now use QuotaAwareGemini
from modules.logic_engine.solutions.logic_engine_ai import create_from_env
api = create_from_env(verbose=True)
```

### Browser (Workshop Participants)

For browser-based exercises, provide keys via a setup script:

```html
<script>
  // Set by workshop facilitator before session
  window.GEMINI_API_KEY = 'workshop-provided-key';
</script>
```

Or use a configuration endpoint:
```javascript
const config = await fetch('/api/workshop-config').then(r => r.json());
window.GEMINI_API_KEY = config.apiKey;
```

## Verify Setup

### Quick Test

```bash
node infrastructure/test-quota-monitor.js
```

Expected output:
```
QuotaAwareAPI initialized with 3 key(s)
Testing API calls...
   Key 1/3 request #1 successful
   Key 2/3 request #2 successful
   Key 3/3 request #3 successful

--- API Quota Stats ---
   Current: Key 1/3
   Active Keys: 3/3
   Total Requests: 3
   Success Rate: 100%
------------------------

All tests passed!
```

### Verify Key Count

```javascript
import { createFromEnv } from './infrastructure/quota-monitor.js';
const api = createFromEnv();
console.log(`Keys loaded: ${api.getStats().totalKeys}`);
// Should output: Keys loaded: 3
```

## Quota Monitoring During Workshop

### Real-Time Dashboard

Google Cloud Console provides real-time quota monitoring:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Navigate: IAM & Admin > Quotas
4. Filter: "Generative Language API" or "Gemini API"
5. Monitor: Requests per minute, requests per day

### Set Up Alerts

Configure quota alerts at 80% threshold:

1. In Quotas page, click on a quota metric
2. Click "Create Alert"
3. Set threshold: 80%
4. Add notification channel (email, Slack, etc.)

### Client-Side Monitoring

Add to your code for live monitoring:

```javascript
// Log stats every 60 seconds
setInterval(() => api.printStats(), 60000);

// Or after every 10 requests (automatic with verbose: true)
const api = createFromEnv({ verbose: true });
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

### All Keys Exhausted

**Error:**
```
Error: All 3 API keys exhausted or failed after 3 attempts.
```

**Solutions:**

1. **Wait for quota reset** (1 minute for RPM)
   ```javascript
   // Quota resets each minute
   // Wait 60 seconds and retry
   ```

2. **Add more keys**
   - Create additional keys in AI Studio
   - Add to api-keys.env as GEMINI_KEY_4, etc.

3. **Use offline mock**
   ```javascript
   // Switch to mock for non-API exercises
   import { mockGenerateContent } from './backup/mocks/gemini-api-mock.js';
   ```

4. **Pace the workshop**
   - Ask participants to work on non-API tasks
   - Stagger API-heavy exercises across groups

### Single Key Failing

**Behavior:** One key fails repeatedly while others work.

**Causes:**
- Invalid or revoked key
- Key restricted to specific IPs/referrers
- Billing issues (paid tier)

**Solutions:**

1. Rotation happens automatically (no action needed)
2. Check key in AI Studio dashboard
3. Verify key restrictions in API Credentials

### High Error Rate (>10%)

**Causes:**
- Network connectivity issues
- API endpoint changes
- Model name changes

**Diagnosis:**
```javascript
const stats = api.getStats();
console.log(`Error rate: ${stats.totalErrors / stats.totalRequests * 100}%`);
```

**Solutions:**

1. Check network: `ping generativelanguage.googleapis.com`
2. Verify endpoint URL in quota-monitor.js
3. Check model name: `gemini-flash-latest` may be renamed
4. Check response structure in API documentation

### API Key Not Found

**Error:**
```
No API keys found. Set GEMINI_KEY_1, GEMINI_KEY_2, ...
```

**Solutions:**

1. Verify file exists: `ls infrastructure/api-keys.env`
2. Verify path in dotenv.config()
3. Check file format (no spaces around `=`)
4. Verify keys are not empty strings

## Pre-Workshop Checklist

- [ ] Created 3+ API keys in AI Studio
- [ ] Copied to `infrastructure/api-keys.env`
- [ ] Ran `test-quota-monitor.js` successfully
- [ ] Verified key count matches expectation
- [ ] Set up quota alerts in Cloud Console
- [ ] Prepared offline mock as backup
- [ ] Tested on workshop venue network (if possible)

## See Also

- [README.md](./README.md) - Overview and quick reference
- [api-keys.env.example](./api-keys.env.example) - Environment template
- [quota-monitor.js](./quota-monitor.js) - QuotaAwareAPI implementation
