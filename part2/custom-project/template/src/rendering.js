/**
 * Rendering Helper
 *
 * Setup for Canvas 2D or Three.js rendering.
 * Choose one based on your project needs.
 */

/**
 * Setup Canvas 2D rendering
 * Returns { canvas, ctx, width, height }
 */
export function setupCanvas(containerId = 'app') {
  const container = document.getElementById(containerId);

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return { canvas, ctx, width: canvas.width, height: canvas.height };
}

/**
 * Setup Three.js rendering
 * Returns { scene, camera, renderer }
 */
export function setupThreeJS(containerId = 'app') {
  // Assumes Three.js loaded from CDN
  if (typeof THREE === 'undefined') {
    throw new Error('Three.js not loaded. Uncomment CDN script in index.html');
  }

  const container = document.getElementById(containerId);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}
