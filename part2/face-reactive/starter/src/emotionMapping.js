// ============================================
// BLENDSHAPE TO EMOTION MAPPING
// TODO 1: Implement emotion detection (15 minutes)
// ============================================

/**
 * Helper: Get blendshape score by name
 * COMPLETE - Use this to access blendshape values
 */
function getBlendshapeScore(blendshapes, name) {
  const shape = blendshapes.find(b => b.categoryName === name);
  return shape ? shape.score : 0;
}

/**
 * Detect emotion from MediaPipe blendshapes
 *
 * TODO 1: Implement emotion detection (15 minutes)
 *
 * MediaPipe provides 52 ARKit blendshapes, each with a score from 0.0 to 1.0.
 * Key blendshapes for emotion detection:
 *
 * HAPPY:
 * - mouthSmileLeft (score > 0.5)
 * - mouthSmileRight (score > 0.5)
 *
 * SURPRISED:
 * - browInnerUp (raised eyebrows, score > 0.5)
 * - eyeWideLeft (wide eyes, score > 0.5)
 * - eyeWideRight (wide eyes, score > 0.5)
 *
 * SAD:
 * - mouthFrownLeft (score > 0.5)
 * - mouthFrownRight (score > 0.5)
 * - browInnerUp (should be LOW, < 0.2)
 *
 * ANGRY:
 * - browDownLeft (furrowed brows, score > 0.5)
 * - browDownRight (furrowed brows, score > 0.5)
 *
 * EXCITED:
 * - mouthSmileLeft + mouthSmileRight (combined > 1.0)
 * - jawOpen (score > 0.4)
 *
 * CALM/NEUTRAL:
 * - Default when no strong expressions detected
 *
 * HINTS:
 * - Use getBlendshapeScore(blendshapes, 'mouthSmileLeft') to get scores
 * - Threshold of 0.5 works well for most expressions
 * - Check multiple blendshapes together for better accuracy
 * - Return one of: 'happy', 'sad', 'surprised', 'angry', 'excited', 'calm'
 *
 * @param {Array} blendshapes - Array of {categoryName: string, score: number}
 * @returns {string} Detected emotion
 */
export function detectEmotion(blendshapes) {
  // TODO: Extract key blendshape values
  // Example:
  // const smileLeft = getBlendshapeScore(blendshapes, 'mouthSmileLeft');
  // const smileRight = getBlendshapeScore(blendshapes, 'mouthSmileRight');

  // TODO: Implement emotion detection logic
  // Example:
  // if (smileLeft > 0.5 && smileRight > 0.5) {
  //   return 'happy';
  // }

  // TODO: Check for surprised (raised brows + wide eyes)

  // TODO: Check for sad (frown + not raised brows)

  // TODO: Check for angry (furrowed brows)

  // TODO: Check for excited (wide smile + jaw open)

  // Default: return calm
  return 'calm';
}
