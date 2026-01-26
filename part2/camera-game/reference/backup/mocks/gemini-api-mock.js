/**
 * Gemini API Offline Mock
 *
 * Returns realistic responses for offline development and testing.
 * Use when:
 * - Developing without internet connection
 * - API quota exhausted
 * - Testing without making real API calls
 *
 * Usage (Node.js):
 *   const { getMockResponse } = require('./gemini-api-mock.js');
 *   const response = getMockResponse('What ingredients do I have?');
 *
 * Usage (Browser - as mock server):
 *   Start with: node backup/mocks/mock-server.js
 *   Then use http://localhost:3000/mock as API endpoint
 */

// Realistic mock responses matching Gemini API format
const mockResponses = {
  // Recipe analysis (Module 03 - Image understanding)
  recipe: {
    candidates: [{
      content: {
        parts: [{
          text: JSON.stringify({
            name: "Swedish Meatballs (Kottbullar)",
            ingredients: [
              "500g ground beef",
              "100g breadcrumbs",
              "1 egg",
              "200ml cream",
              "1 onion, finely diced",
              "Salt and white pepper",
              "Butter for frying"
            ],
            steps: [
              "Mix ground beef, breadcrumbs, egg, and half the cream in a bowl",
              "Add finely diced onion, salt, and white pepper",
              "Let mixture rest for 15 minutes in refrigerator",
              "Roll into small balls (about 2cm diameter)",
              "Fry in butter over medium heat until golden brown",
              "Serve with lingonberry jam and mashed potatoes"
            ],
            servings: 4,
            prepTime: "20 minutes",
            cookTime: "15 minutes",
            difficulty: "Easy",
            cuisine: "Swedish"
          }, null, 2)
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 150,
      candidatesTokenCount: 200,
      totalTokenCount: 350
    }
  },

  // Emotion detection (Module 06 - Code execution, face-reactive project)
  emotion: {
    candidates: [{
      content: {
        parts: [{
          text: JSON.stringify({
            emotion: "happy",
            confidence: 0.85,
            description: "The person appears cheerful and engaged with a genuine smile.",
            secondaryEmotions: [
              { emotion: "excited", confidence: 0.45 },
              { emotion: "relaxed", confidence: 0.30 }
            ],
            suggestedColor: "#FFD700",
            suggestedParticleEffect: "rising_sparkles"
          }, null, 2)
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 100,
      candidatesTokenCount: 120,
      totalTokenCount: 220
    }
  },

  // Product review analysis (Module 02 - Structured output)
  review: {
    candidates: [{
      content: {
        parts: [{
          text: JSON.stringify({
            sentiment: "positive",
            rating: 4,
            summary: "Customer enjoyed the product quality but noted slow shipping.",
            keyPoints: [
              "Excellent build quality",
              "Good value for money",
              "Delivery took longer than expected"
            ],
            recommendedAction: "address_shipping"
          }, null, 2)
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 80,
      candidatesTokenCount: 100,
      totalTokenCount: 180
    }
  },

  // Code analysis (Module 03 - Image understanding)
  code: {
    candidates: [{
      content: {
        parts: [{
          text: JSON.stringify({
            language: "JavaScript",
            purpose: "Event handler for button click that updates UI state",
            complexity: "Low",
            suggestions: [
              "Consider adding error handling for edge cases",
              "Extract magic numbers into named constants",
              "Add JSDoc comments for better documentation"
            ],
            securityConcerns: [],
            estimatedTokens: 150
          }, null, 2)
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 200,
      candidatesTokenCount: 150,
      totalTokenCount: 350
    }
  },

  // Game action (camera-game multiplayer)
  game: {
    candidates: [{
      content: {
        parts: [{
          text: JSON.stringify({
            action: "click",
            pointsAwarded: 10,
            multiplier: 1.0,
            feedback: "Nice click! Keep going!",
            nextChallenge: null
          }, null, 2)
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 50,
      candidatesTokenCount: 60,
      totalTokenCount: 110
    }
  },

  // Default fallback
  default: {
    candidates: [{
      content: {
        parts: [{
          text: "This is a mock response from the offline Gemini API. " +
                "The real API is currently unavailable. " +
                "Your prompt was received but not processed by the actual model. " +
                "For testing purposes, try prompts containing keywords like: " +
                "'recipe', 'ingredient', 'emotion', 'feeling', 'review', 'code', or 'game'."
        }]
      },
      finishReason: "STOP"
    }],
    usageMetadata: {
      promptTokenCount: 50,
      candidatesTokenCount: 80,
      totalTokenCount: 130
    }
  }
};

/**
 * Get a mock response based on prompt content
 * @param {string} prompt - The user's prompt
 * @returns {object} Mock response in Gemini API format
 */
function getMockResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // Check for recipe/ingredient keywords
  if (lowerPrompt.includes('recipe') ||
      lowerPrompt.includes('ingredient') ||
      lowerPrompt.includes('cook') ||
      lowerPrompt.includes('food')) {
    return mockResponses.recipe;
  }

  // Check for emotion/feeling keywords
  if (lowerPrompt.includes('emotion') ||
      lowerPrompt.includes('feeling') ||
      lowerPrompt.includes('mood') ||
      lowerPrompt.includes('face') ||
      lowerPrompt.includes('expression')) {
    return mockResponses.emotion;
  }

  // Check for review/sentiment keywords
  if (lowerPrompt.includes('review') ||
      lowerPrompt.includes('sentiment') ||
      lowerPrompt.includes('feedback') ||
      lowerPrompt.includes('opinion')) {
    return mockResponses.review;
  }

  // Check for code analysis keywords
  if (lowerPrompt.includes('code') ||
      lowerPrompt.includes('function') ||
      lowerPrompt.includes('program') ||
      lowerPrompt.includes('script')) {
    return mockResponses.code;
  }

  // Check for game keywords
  if (lowerPrompt.includes('game') ||
      lowerPrompt.includes('score') ||
      lowerPrompt.includes('click') ||
      lowerPrompt.includes('play')) {
    return mockResponses.game;
  }

  // Default response
  return mockResponses.default;
}

/**
 * Simulate API latency for more realistic testing
 * @param {string} prompt - The user's prompt
 * @param {number} minDelay - Minimum delay in ms (default: 200)
 * @param {number} maxDelay - Maximum delay in ms (default: 800)
 * @returns {Promise<object>} Mock response after simulated delay
 */
async function getMockResponseWithDelay(prompt, minDelay = 200, maxDelay = 800) {
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  await new Promise(resolve => setTimeout(resolve, delay));
  return getMockResponse(prompt);
}

/**
 * Check if we should use mock (for environment detection)
 * @returns {boolean} True if mock should be used
 */
function shouldUseMock() {
  // Check for offline mode
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return true;
  }

  // Check for explicit flag
  if (typeof window !== 'undefined' && window.GEMINI_OFFLINE_MODE) {
    return true;
  }

  // Check for Node.js environment variable
  if (typeof process !== 'undefined' && process.env && process.env.GEMINI_OFFLINE_MODE) {
    return true;
  }

  return false;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getMockResponse,
    getMockResponseWithDelay,
    shouldUseMock,
    mockResponses
  };
}

// Export for ES modules
if (typeof window !== 'undefined') {
  window.GeminiMock = {
    getMockResponse,
    getMockResponseWithDelay,
    shouldUseMock,
    mockResponses
  };
}
