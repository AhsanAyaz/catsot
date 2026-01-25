// ============================================
// GEMINI INTEGRATION FOR FACE-REACTIVE PROJECT
// Uses QuotaAwareAPI for workshop resilience
// ============================================
//
// This module provides AI-powered features for the face-reactive
// visualization, demonstrating how to combine:
// - MediaPipe face detection (real-time emotion)
// - Gemini API (AI-generated content)
// - Canvas visualization (visual output)
//
// Example uses:
// - Generate descriptions of detected emotions
// - Create personalized visualization parameters
// - Generate affirmations based on mood
//
// Usage:
//   import { generateEmotionResponse, getEmotionVisualizationParams } from './geminiIntegration.js';
//   const response = await generateEmotionResponse('happy');
//
// ============================================

import { QuotaAwareAPI, createFromEnv, generateContent } from '../../../../infrastructure/quota-monitor.js';

// Initialize API - will be populated on first use
let geminiAPI = null;

/**
 * Get or create the QuotaAwareAPI instance.
 * Lazily initialized to avoid errors if env vars not set.
 */
function getAPI() {
  if (!geminiAPI) {
    try {
      geminiAPI = createFromEnv({ verbose: false });
    } catch (e) {
      console.warn('Gemini API not configured:', e.message);
      return null;
    }
  }
  return geminiAPI;
}

/**
 * Check if Gemini API is available.
 * @returns {boolean} True if API keys are configured
 */
export function isGeminiAvailable() {
  return getAPI() !== null;
}

/**
 * Generate a response based on detected emotion.
 * Can be used for affirmations, descriptions, or suggestions.
 *
 * @param {string} emotion - Detected emotion (happy, sad, surprised, angry, relaxed, neutral)
 * @param {string} responseType - Type of response: 'affirmation', 'description', 'suggestion'
 * @returns {Promise<string>} - Generated text
 */
export async function generateEmotionResponse(emotion, responseType = 'affirmation') {
  const api = getAPI();

  if (!api) {
    return getFallbackResponse(emotion, responseType);
  }

  const prompts = {
    affirmation: `Generate a short, encouraging affirmation (1-2 sentences) for someone who is feeling ${emotion}. Be warm and supportive.`,
    description: `Describe the emotion "${emotion}" in a poetic, visual way (2-3 sentences). Focus on colors, movements, and sensations.`,
    suggestion: `Suggest one simple activity (1 sentence) that someone feeling ${emotion} might enjoy.`
  };

  const prompt = prompts[responseType] || prompts.affirmation;

  try {
    return await generateContent(api, prompt);
  } catch (e) {
    console.warn('Gemini API call failed, using fallback:', e.message);
    return getFallbackResponse(emotion, responseType);
  }
}

/**
 * Get visualization parameters based on emotion.
 * Uses AI to generate creative particle system configurations.
 *
 * @param {string} emotion - Detected emotion
 * @returns {Promise<Object>} - Visualization parameters
 */
export async function getEmotionVisualizationParams(emotion) {
  const api = getAPI();

  if (!api) {
    return getDefaultVisualizationParams(emotion);
  }

  const schema = {
    type: 'object',
    description: 'Parameters for emotion-based particle visualization',
    properties: {
      primaryColor: {
        type: 'string',
        description: 'Primary color in hex format (e.g., #FF5733)'
      },
      secondaryColor: {
        type: 'string',
        description: 'Secondary color in hex format'
      },
      particleSpeed: {
        type: 'number',
        description: 'Base speed of particles (0.5 to 3.0)',
        minimum: 0.5,
        maximum: 3.0
      },
      particleSize: {
        type: 'number',
        description: 'Base size of particles in pixels (2 to 20)',
        minimum: 2,
        maximum: 20
      },
      movementPattern: {
        type: 'string',
        description: 'How particles move',
        enum: ['floating', 'spiraling', 'exploding', 'flowing', 'pulsing']
      },
      intensity: {
        type: 'number',
        description: 'Overall intensity of the effect (0.1 to 1.0)',
        minimum: 0.1,
        maximum: 1.0
      }
    },
    required: ['primaryColor', 'secondaryColor', 'particleSpeed', 'movementPattern', 'intensity']
  };

  const prompt = `Create visualization parameters for the emotion "${emotion}".
Choose colors, speeds, and movement patterns that visually represent this emotional state.
For ${emotion}, think about what colors and movements feel right.`;

  try {
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const response = await api.call(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return JSON.parse(result.candidates[0].content.parts[0].text);
  } catch (e) {
    console.warn('Gemini API call failed, using default params:', e.message);
    return getDefaultVisualizationParams(emotion);
  }
}

/**
 * Generate a creative title for the current emotional state.
 *
 * @param {string} emotion - Detected emotion
 * @param {number} intensity - Emotion intensity (0-1)
 * @returns {Promise<string>} - Creative title
 */
export async function generateEmotionTitle(emotion, intensity = 0.5) {
  const api = getAPI();

  if (!api) {
    return `${emotion.charAt(0).toUpperCase() + emotion.slice(1)} Moment`;
  }

  const intensityDesc = intensity > 0.7 ? 'very strong' : intensity > 0.4 ? 'moderate' : 'subtle';

  try {
    return await generateContent(
      api,
      `Create a short, poetic title (2-5 words) for a ${intensityDesc} feeling of ${emotion}. Be creative and evocative.`
    );
  } catch (e) {
    return `${emotion.charAt(0).toUpperCase() + emotion.slice(1)} Moment`;
  }
}

/**
 * Get current API usage statistics.
 * Useful for monitoring during the workshop.
 *
 * @returns {Object|null} - Stats object or null if API not configured
 */
export function getStats() {
  const api = getAPI();
  return api ? api.getStats() : null;
}

/**
 * Print API usage statistics to console.
 */
export function printStats() {
  const api = getAPI();
  if (api) {
    api.printStats();
  } else {
    console.log('Gemini API not configured');
  }
}

// ============================================
// FALLBACK DATA (when API is unavailable)
// ============================================

/**
 * Fallback responses when API is unavailable.
 */
function getFallbackResponse(emotion, responseType) {
  const fallbacks = {
    affirmation: {
      happy: "Your joy is radiant and contagious. Keep spreading that light!",
      sad: "It's okay to feel this way. Every cloud eventually parts.",
      surprised: "Life is full of wonderful surprises. Embrace the unexpected!",
      angry: "Your feelings are valid. Take a deep breath and let it flow.",
      relaxed: "You've found your calm center. This peace is yours to keep.",
      neutral: "In stillness, there is strength. You are grounded and present."
    },
    description: {
      happy: "Warm golden light dancing in spirals, like sunbeams through morning mist.",
      sad: "Gentle blue waves flowing downward, soft and quiet like rain on glass.",
      surprised: "Bright bursts of white and pink, expanding outward like fireworks.",
      angry: "Deep red flames flickering intensely, powerful and consuming.",
      relaxed: "Soft green particles floating lazily, like leaves on a calm pond.",
      neutral: "Steady silver particles drifting, balanced and serene."
    },
    suggestion: {
      happy: "Dance to your favorite song!",
      sad: "Listen to some calming music or take a gentle walk.",
      surprised: "Write down what surprised you - it might be a great story!",
      angry: "Try some deep breathing or go for a brisk walk.",
      relaxed: "Enjoy this moment - maybe with a warm cup of tea.",
      neutral: "This is a good time for mindful observation."
    }
  };

  const emotionFallbacks = fallbacks[responseType] || fallbacks.affirmation;
  return emotionFallbacks[emotion] || emotionFallbacks.neutral;
}

/**
 * Default visualization parameters when API is unavailable.
 */
function getDefaultVisualizationParams(emotion) {
  const defaults = {
    happy: {
      primaryColor: '#FFD700',
      secondaryColor: '#FFA500',
      particleSpeed: 2.0,
      particleSize: 8,
      movementPattern: 'spiraling',
      intensity: 0.9
    },
    sad: {
      primaryColor: '#4169E1',
      secondaryColor: '#6495ED',
      particleSpeed: 0.8,
      particleSize: 6,
      movementPattern: 'flowing',
      intensity: 0.4
    },
    surprised: {
      primaryColor: '#FF69B4',
      secondaryColor: '#FFFFFF',
      particleSpeed: 2.5,
      particleSize: 10,
      movementPattern: 'exploding',
      intensity: 1.0
    },
    angry: {
      primaryColor: '#DC143C',
      secondaryColor: '#8B0000',
      particleSpeed: 2.2,
      particleSize: 12,
      movementPattern: 'pulsing',
      intensity: 0.95
    },
    relaxed: {
      primaryColor: '#90EE90',
      secondaryColor: '#3CB371',
      particleSpeed: 0.6,
      particleSize: 7,
      movementPattern: 'floating',
      intensity: 0.3
    },
    neutral: {
      primaryColor: '#C0C0C0',
      secondaryColor: '#A9A9A9',
      particleSpeed: 1.0,
      particleSize: 5,
      movementPattern: 'floating',
      intensity: 0.5
    }
  };

  return defaults[emotion] || defaults.neutral;
}

// Export the API instance for advanced usage
export { geminiAPI };
