// ============================================
// QUOTA-AWARE GEMINI API WRAPPER
// Multi-key rotation with automatic failover
// ============================================
//
// Purpose: Prevent workshop quota exhaustion when 40 participants
// hit the Gemini API simultaneously. Free tier: 15 RPM per key.
// With 3 keys: 45 RPM capacity = 2700 requests/hour.
//
// Usage:
//   import { QuotaAwareAPI } from './quota-monitor.js';
//   const api = new QuotaAwareAPI([key1, key2, key3]);
//   const response = await api.call(endpoint, options);
//
// ============================================

/**
 * Multi-key Gemini API wrapper with automatic quota failover.
 * Implements round-robin key rotation and exponential backoff.
 */
export class QuotaAwareAPI {
  /**
   * Create a new QuotaAwareAPI instance.
   * @param {string[]} keys - Array of Gemini API keys
   * @param {Object} options - Configuration options
   * @param {number} options.resetInterval - Interval for stats reset (ms), default 60000
   * @param {number} options.maxRetries - Max retry attempts, default equals key count
   * @param {boolean} options.verbose - Log verbose output, default false
   */
  constructor(keys, options = {}) {
    this.keys = keys.filter(k => k); // Remove empty/undefined keys

    if (this.keys.length === 0) {
      throw new Error('QuotaAwareAPI requires at least one API key');
    }

    this.currentIndex = 0;
    this.requestCounts = new Array(this.keys.length).fill(0);
    this.errorCounts = new Array(this.keys.length).fill(0);
    this.quotaExhaustedAt = new Array(this.keys.length).fill(null);
    this.lastReset = Date.now();
    this.resetInterval = options.resetInterval || 60000; // 1 minute
    this.maxRetries = options.maxRetries || this.keys.length;
    this.verbose = options.verbose || false;
    this.totalRequestCount = 0;
  }

  /**
   * Make an API call with automatic key rotation on quota errors.
   * @param {string} endpoint - The API endpoint URL
   * @param {Object} options - Fetch options (method, headers, body, etc.)
   * @returns {Promise<Response>} - The fetch response
   * @throws {Error} - If all keys are exhausted
   */
  async call(endpoint, options = {}) {
    let attempts = 0;

    // Reset quota exhaustion flags after reset interval
    this.checkQuotaReset();

    while (attempts < this.maxRetries) {
      const key = this.keys[this.currentIndex];
      const keyLabel = `Key ${this.currentIndex + 1}/${this.keys.length}`;

      // Skip keys that are known to be quota-exhausted
      if (this.quotaExhaustedAt[this.currentIndex]) {
        if (this.verbose) {
          console.log(`   ${keyLabel} quota exhausted, skipping...`);
        }
        this.rotateKey();
        attempts++;
        continue;
      }

      try {
        const response = await fetch(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            'x-goog-api-key': key // Gemini uses x-goog-api-key header
          }
        });

        // Handle quota exhaustion (429 Too Many Requests)
        if (response.status === 429) {
          this.errorCounts[this.currentIndex]++;
          this.quotaExhaustedAt[this.currentIndex] = Date.now();

          if (this.verbose) {
            console.warn(`   ${keyLabel} quota exceeded (429), rotating...`);
          }

          this.rotateKey();
          attempts++;
          await this.backoff(attempts);
          continue;
        }

        // Handle other 4xx/5xx errors (but don't rotate for client errors like 400)
        if (response.status >= 500) {
          this.errorCounts[this.currentIndex]++;

          if (this.verbose) {
            console.warn(`   ${keyLabel} server error (${response.status}), rotating...`);
          }

          this.rotateKey();
          attempts++;
          await this.backoff(attempts);
          continue;
        }

        // Success - increment counter and return
        this.requestCounts[this.currentIndex]++;
        this.totalRequestCount++;

        if (this.verbose) {
          console.log(`   ${keyLabel} request #${this.totalRequestCount} successful`);
        }

        // Periodic stats (every 10 requests when verbose)
        if (this.verbose && this.totalRequestCount % 10 === 0) {
          this.printStats();
        }

        return response;

      } catch (error) {
        this.errorCounts[this.currentIndex]++;

        if (this.verbose) {
          console.error(`   ${keyLabel} request failed: ${error.message}`);
        }

        this.rotateKey();
        attempts++;
        await this.backoff(attempts);
      }
    }

    throw new Error(
      `All ${this.keys.length} API keys exhausted or failed after ${attempts} attempts. ` +
      `Try again in 1 minute for quota reset.`
    );
  }

  /**
   * Rotate to the next API key in round-robin fashion.
   */
  rotateKey() {
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
  }

  /**
   * Exponential backoff delay.
   * @param {number} attempt - Current attempt number (1-based)
   */
  async backoff(attempt) {
    // Exponential backoff: 100ms, 200ms, 400ms, 800ms... max 2s
    const delay = Math.min(100 * Math.pow(2, attempt - 1), 2000);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Check if quota reset interval has passed and clear exhaustion flags.
   */
  checkQuotaReset() {
    const now = Date.now();

    if (now - this.lastReset >= this.resetInterval) {
      // Clear all quota exhaustion flags
      this.quotaExhaustedAt = new Array(this.keys.length).fill(null);
      this.lastReset = now;

      if (this.verbose) {
        console.log('   Quota reset interval passed, all keys available');
      }
    }
  }

  /**
   * Get current API usage statistics.
   * @returns {Object} - Statistics object
   */
  getStats() {
    const totalRequests = this.requestCounts.reduce((a, b) => a + b, 0);
    const totalErrors = this.errorCounts.reduce((a, b) => a + b, 0);
    const activeKeys = this.quotaExhaustedAt.filter(t => t === null).length;

    return {
      currentKey: this.currentIndex + 1,
      totalKeys: this.keys.length,
      activeKeys,
      requestCounts: [...this.requestCounts],
      errorCounts: [...this.errorCounts],
      totalRequests,
      totalErrors,
      successRate: totalRequests > 0
        ? ((totalRequests - totalErrors) / totalRequests * 100).toFixed(1) + '%'
        : 'N/A',
      uptime: Math.floor((Date.now() - this.lastReset) / 1000) + 's',
      quotaExhausted: this.quotaExhaustedAt.map((t, i) => t ? `Key ${i + 1}` : null).filter(Boolean)
    };
  }

  /**
   * Print current API usage statistics to console.
   */
  printStats() {
    const stats = this.getStats();

    console.log('\n--- API Quota Stats ---');
    console.log(`   Current: Key ${stats.currentKey}/${stats.totalKeys}`);
    console.log(`   Active Keys: ${stats.activeKeys}/${stats.totalKeys}`);
    console.log(`   Total Requests: ${stats.totalRequests}`);
    console.log(`   Total Errors: ${stats.totalErrors}`);
    console.log(`   Success Rate: ${stats.successRate}`);
    console.log(`   Since Last Reset: ${stats.uptime}`);

    if (stats.quotaExhausted.length > 0) {
      console.log(`   Quota Exhausted: ${stats.quotaExhausted.join(', ')}`);
    }

    console.log('   Per-key breakdown:');
    stats.requestCounts.forEach((count, i) => {
      const exhausted = this.quotaExhaustedAt[i] ? ' (exhausted)' : '';
      console.log(`     Key ${i + 1}: ${count} requests, ${stats.errorCounts[i]} errors${exhausted}`);
    });
    console.log('------------------------\n');
  }

  /**
   * Reset all statistics (useful for testing or new sessions).
   */
  resetStats() {
    this.requestCounts = new Array(this.keys.length).fill(0);
    this.errorCounts = new Array(this.keys.length).fill(0);
    this.quotaExhaustedAt = new Array(this.keys.length).fill(null);
    this.lastReset = Date.now();
    this.totalRequestCount = 0;
    this.currentIndex = 0;
  }
}

/**
 * Create a QuotaAwareAPI instance from environment variables.
 * Looks for GEMINI_KEY_1, GEMINI_KEY_2, GEMINI_KEY_3, etc.
 * Falls back to GEMINI_API_KEY if no numbered keys found.
 *
 * @param {Object} options - QuotaAwareAPI options
 * @returns {QuotaAwareAPI} - Configured API instance
 */
export function createFromEnv(options = {}) {
  const keys = [];

  // Collect numbered keys (GEMINI_KEY_1, GEMINI_KEY_2, etc.)
  for (let i = 1; i <= 10; i++) {
    const key = process.env[`GEMINI_KEY_${i}`];
    if (key) {
      keys.push(key);
    }
  }

  // Fallback to single key
  if (keys.length === 0 && process.env.GEMINI_API_KEY) {
    console.warn('   No GEMINI_KEY_* found, using single GEMINI_API_KEY');
    keys.push(process.env.GEMINI_API_KEY);
  }

  if (keys.length === 0) {
    throw new Error(
      'No API keys found. Set GEMINI_KEY_1, GEMINI_KEY_2, ... or GEMINI_API_KEY environment variables.'
    );
  }

  console.log(`   QuotaAwareAPI initialized with ${keys.length} key(s)`);

  return new QuotaAwareAPI(keys, options);
}

/**
 * Convenience function to make a Gemini API call with quota awareness.
 *
 * @param {QuotaAwareAPI} api - The QuotaAwareAPI instance
 * @param {string} prompt - The text prompt to send
 * @param {string} model - Model name, default 'gemini-2.0-flash'
 * @returns {Promise<string>} - The generated text response
 */
export async function generateContent(api, prompt, model = 'gemini-2.0-flash') {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await api.call(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error (${response.status}): ${error}`);
  }

  const result = await response.json();

  if (!result.candidates || result.candidates.length === 0) {
    throw new Error('No response generated');
  }

  return result.candidates[0].content.parts[0].text;
}

// Default export for convenience
export default QuotaAwareAPI;
