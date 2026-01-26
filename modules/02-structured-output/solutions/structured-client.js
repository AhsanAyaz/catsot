// ============================================
// STRUCTURED OUTPUT GEMINI CLIENT
// Uses QuotaAwareAPI for workshop resilience
// ============================================
//
// This client demonstrates structured (JSON) output generation,
// complementing the JSON Schema exercises in this module.
//
// Key insight: The 'description' field in schemas acts as
// model instructions, not just documentation.
//
// Usage:
//   import { generateStructured } from './structured-client.js';
//   const recipe = await generateStructured(recipeSchema, 'Swedish meatballs');
//
// ============================================

import { QuotaAwareAPI, createFromEnv } from '../../../infrastructure/quota-monitor.js';

// Initialize API with environment keys
let geminiAPI = null;

function getAPI() {
  if (!geminiAPI) {
    geminiAPI = createFromEnv({ verbose: false });
  }
  return geminiAPI;
}

/**
 * Generate structured JSON output using a schema.
 * This demonstrates Module 02's core concept: controlled output format.
 *
 * @param {Object} schema - JSON Schema defining output structure
 * @param {string} prompt - The generation prompt
 * @param {string} model - Model name, default 'gemini-2.0-flash-001'
 * @returns {Promise<Object>} - Parsed JSON matching schema
 */
export async function generateStructured(schema, prompt, model = 'gemini-2.0-flash-001') {
  const api = getAPI();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const result = await response.json();

  if (!result.candidates || result.candidates.length === 0) {
    throw new Error('No response generated');
  }

  // Parse the JSON response
  const jsonText = result.candidates[0].content.parts[0].text;
  return JSON.parse(jsonText);
}

/**
 * Generate structured output with enum constraints.
 * Demonstrates controlled vocabulary in schemas.
 *
 * @param {string[]} allowedValues - Enum values for classification
 * @param {string} prompt - Item to classify
 * @returns {Promise<Object>} - Classification result
 */
export async function classify(allowedValues, prompt) {
  const schema = {
    type: 'object',
    properties: {
      category: {
        type: 'string',
        description: 'The classified category',
        enum: allowedValues
      },
      confidence: {
        type: 'string',
        description: 'Confidence level: high, medium, or low',
        enum: ['high', 'medium', 'low']
      },
      reasoning: {
        type: 'string',
        description: 'Brief explanation of the classification'
      }
    },
    required: ['category', 'confidence', 'reasoning']
  };

  return generateStructured(schema, `Classify the following: ${prompt}`);
}

/**
 * Generate a recipe with structured format.
 * Example schema from Module 02 exercises.
 *
 * @param {string} dishName - Name of the dish
 * @returns {Promise<Object>} - Structured recipe
 */
export async function generateRecipe(dishName) {
  const recipeSchema = {
    type: 'object',
    description: 'A complete recipe with ingredients and step-by-step instructions',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the dish'
      },
      prepTime: {
        type: 'integer',
        description: 'Preparation time in minutes',
        minimum: 1,
        maximum: 180
      },
      cookTime: {
        type: 'integer',
        description: 'Cooking time in minutes',
        minimum: 0,
        maximum: 480
      },
      servings: {
        type: 'integer',
        description: 'Number of servings',
        minimum: 1,
        maximum: 20
      },
      difficulty: {
        type: 'string',
        description: 'Recipe difficulty level',
        enum: ['easy', 'medium', 'hard']
      },
      ingredients: {
        type: 'array',
        description: 'List of ingredients with quantities',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            amount: { type: 'string' },
            notes: { type: 'string' }
          },
          required: ['name', 'amount']
        }
      },
      steps: {
        type: 'array',
        description: 'Step-by-step cooking instructions',
        items: { type: 'string' }
      }
    },
    required: ['name', 'prepTime', 'cookTime', 'servings', 'difficulty', 'ingredients', 'steps']
  };

  return generateStructured(recipeSchema, `Create a recipe for ${dishName}`);
}

/**
 * Generate a product review analysis.
 * Example schema for extracting structured data from text.
 *
 * @param {string} reviewText - Raw review text
 * @returns {Promise<Object>} - Structured analysis
 */
export async function analyzeReview(reviewText) {
  const analysisSchema = {
    type: 'object',
    description: 'Structured analysis of a product review',
    properties: {
      sentiment: {
        type: 'string',
        description: 'Overall sentiment',
        enum: ['positive', 'neutral', 'negative', 'mixed']
      },
      rating: {
        type: 'integer',
        description: 'Inferred rating out of 5',
        minimum: 1,
        maximum: 5
      },
      pros: {
        type: 'array',
        description: 'Positive aspects mentioned',
        items: { type: 'string' }
      },
      cons: {
        type: 'array',
        description: 'Negative aspects mentioned',
        items: { type: 'string' }
      },
      summary: {
        type: 'string',
        description: 'One-sentence summary of the review'
      }
    },
    required: ['sentiment', 'rating', 'pros', 'cons', 'summary']
  };

  return generateStructured(analysisSchema, `Analyze this review: ${reviewText}`);
}

/**
 * Get current API usage statistics.
 */
export function getStats() {
  return getAPI().getStats();
}

/**
 * Print API usage statistics to console.
 */
export function printStats() {
  getAPI().printStats();
}

// ============================================
// Example usage (uncomment to run):
// ============================================
//
// import dotenv from 'dotenv';
// dotenv.config({ path: 'infrastructure/api-keys.env' });
//
// // Generate a recipe
// const recipe = await generateRecipe('Swedish meatballs');
// console.log(JSON.stringify(recipe, null, 2));
//
// // Classify a product
// const classification = await classify(
//   ['electronics', 'clothing', 'food', 'home', 'other'],
//   'wireless noise-cancelling headphones'
// );
// console.log(classification);
//
// // Analyze a review
// const analysis = await analyzeReview(
//   'Great product but shipping was slow. Battery life exceeds expectations.'
// );
// console.log(analysis);
//
// printStats();
