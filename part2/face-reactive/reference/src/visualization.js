// ============================================
// PARTICLE VISUALIZATION SYSTEM - COMPLETE
// ============================================

let canvas = null;
let ctx = null;
let particles = [];
const MAX_PARTICLES = 150;

// Particle object pooling - COMPLETE
// Pre-create particles and reuse them (no allocations in render loop)
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = 5;
    this.color = '#CCCCCC';
    this.active = false;
  }

  reset(x, y, vx, vy, size, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.active = true;
  }
}

/**
 * Initialize visualization canvas and particles
 * COMPLETE - Infrastructure ready
 */
export function initVisualization(canvasEl) {
  canvas = canvasEl;
  ctx = canvas.getContext('2d');

  // Set canvas to fill window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create particle pool (object pooling pattern)
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const p = new Particle();
    p.reset(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      5,
      '#CCCCCC'
    );
    particles.push(p);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Emotion to visual parameters mapping
 * COMPLETE - Research-based color and movement mapping
 *
 * Based on Russell's circumplex model:
 * - Happy/Excited: Warm colors (gold/orange), high energy (fast movement)
 * - Sad/Calm: Cool colors (blue), low energy (slow movement)
 * - Surprised: Bright colors (yellow), erratic movement (very fast)
 * - Angry: Intense colors (red), medium-high energy (fast, large)
 */
const emotionParams = {
  happy: {
    color: '#FFD700',  // Warm gold - positive valence, medium arousal
    velocityMultiplier: 2.0,
    sizeMultiplier: 1.2,
    particleCount: 100
  },
  sad: {
    color: '#4A4A8A',  // Cool dark blue - negative valence, low arousal
    velocityMultiplier: 0.3,
    sizeMultiplier: 0.8,
    particleCount: 50
  },
  excited: {
    color: '#FF6B35',  // Vibrant orange - positive valence, high arousal
    velocityMultiplier: 3.5,
    sizeMultiplier: 1.5,
    particleCount: 150
  },
  calm: {
    color: '#6B9BD1',  // Soft blue - neutral valence, low arousal
    velocityMultiplier: 0.8,
    sizeMultiplier: 1.0,
    particleCount: 80
  },
  surprised: {
    color: '#FFEB3B',  // Bright yellow - neutral valence, very high arousal
    velocityMultiplier: 4.0,
    sizeMultiplier: 1.0,
    particleCount: 120
  },
  angry: {
    color: '#D32F2F',  // Deep red - negative valence, high arousal
    velocityMultiplier: 2.5,
    sizeMultiplier: 1.8,
    particleCount: 100
  }
};

/**
 * Update particle visualization based on detected emotion
 * COMPLETE - Object pooling pattern for performance
 *
 * Updates existing particles instead of creating new ones.
 * This prevents garbage collection pauses and maintains consistent 60fps.
 *
 * @param {string} emotion - Detected emotion
 */
export function updateVisualization(emotion) {
  // Get emotion parameters (fallback to calm if unknown emotion)
  const params = emotionParams[emotion] || emotionParams.calm;

  // Update existing particles (object pooling - no allocations!)
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const p = particles[i];

    // Activate/deactivate based on particle count for this emotion
    p.active = i < params.particleCount;

    if (p.active) {
      // Update visual properties
      p.color = params.color;
      p.size = 5 * params.sizeMultiplier;

      // Update velocity (random direction, emotion-specific speed)
      p.vx = (Math.random() - 0.5) * params.velocityMultiplier;
      p.vy = (Math.random() - 0.5) * params.velocityMultiplier;

      // Randomize position (creates burst effect on emotion change)
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
    }
  }
}

/**
 * Update particle positions (called every frame)
 * COMPLETE - Physics simulation ready
 */
function updateParticles() {
  for (let p of particles) {
    if (!p.active) continue;

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges (creates infinite field effect)
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }
}

/**
 * Render particles to canvas (called every frame)
 * COMPLETE - Drawing logic ready
 */
export function renderVisualization() {
  if (!ctx) return;

  // Update positions
  updateParticles();

  // Clear canvas with fade effect (creates particle trails)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw particles
  for (let p of particles) {
    if (!p.active) continue;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
