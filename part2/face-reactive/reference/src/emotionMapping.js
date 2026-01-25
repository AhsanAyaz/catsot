// ============================================
// BLENDSHAPE TO EMOTION MAPPING - COMPLETE
// ============================================

/**
 * Helper: Get blendshape score by name
 */
function getBlendshapeScore(blendshapes, name) {
  const shape = blendshapes.find(b => b.categoryName === name);
  return shape ? shape.score : 0;
}

/**
 * Detect emotion from MediaPipe blendshapes
 *
 * COMPLETE - Maps 52 ARKit blendshapes to simplified emotions
 *
 * Uses threshold-based detection with 0.5 as base threshold.
 * Emotions are prioritized: excited > happy > surprised > angry > sad > calm
 *
 * @param {Array} blendshapes - Array of {categoryName: string, score: 0.0-1.0}
 * @returns {string} Detected emotion (happy, sad, surprised, angry, excited, calm)
 */
export function detectEmotion(blendshapes) {
  // Extract key blendshape values
  const smileLeft = getBlendshapeScore(blendshapes, 'mouthSmileLeft');
  const smileRight = getBlendshapeScore(blendshapes, 'mouthSmileRight');
  const frownLeft = getBlendshapeScore(blendshapes, 'mouthFrownLeft');
  const frownRight = getBlendshapeScore(blendshapes, 'mouthFrownRight');
  const browInnerUp = getBlendshapeScore(blendshapes, 'browInnerUp');
  const eyeWideLeft = getBlendshapeScore(blendshapes, 'eyeWideLeft');
  const eyeWideRight = getBlendshapeScore(blendshapes, 'eyeWideRight');
  const jawOpen = getBlendshapeScore(blendshapes, 'jawOpen');
  const browDownLeft = getBlendshapeScore(blendshapes, 'browDownLeft');
  const browDownRight = getBlendshapeScore(blendshapes, 'browDownRight');

  // Emotion detection thresholds
  const THRESHOLD = 0.5;

  // EXCITED: Wide smile + open jaw (high energy happiness)
  // Check this first as it's a combination of happy + additional features
  if ((smileLeft + smileRight) > 1.0 && jawOpen > 0.4) {
    return 'excited';
  }

  // HAPPY: Symmetrical smile
  // Both corners of mouth raised significantly
  if (smileLeft > THRESHOLD && smileRight > THRESHOLD) {
    return 'happy';
  }

  // SURPRISED: Raised eyebrows + wide eyes
  // Combination of brow raise and eye widening
  if (browInnerUp > THRESHOLD && (eyeWideLeft > THRESHOLD || eyeWideRight > THRESHOLD)) {
    return 'surprised';
  }

  // ANGRY: Furrowed brows (both sides)
  // Inner brows pulled down and together
  if (browDownLeft > THRESHOLD && browDownRight > THRESHOLD) {
    return 'angry';
  }

  // SAD: Frown + not raised brows
  // Mouth corners down, brows not raised (to distinguish from worried/concerned)
  if ((frownLeft > THRESHOLD || frownRight > THRESHOLD) && browInnerUp < 0.2) {
    return 'sad';
  }

  // DEFAULT: Calm/neutral
  // No strong expressions detected
  return 'calm';
}
