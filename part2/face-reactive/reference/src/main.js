// ============================================
// FACE-REACTIVE VISUALIZATION - MAIN APP
// COMPLETE - Infrastructure ready
// ============================================

import { initFaceLandmarker, processVideoFrame } from './faceDetection.js';
import { detectEmotion } from './emotionMapping.js';
import { initVisualization, updateVisualization, renderVisualization } from './visualization.js';

const statusEl = document.getElementById('status');
const videoEl = document.getElementById('webcam');
const canvasEl = document.getElementById('canvas');

let faceLandmarker = null;
let currentEmotion = 'neutral';

// Camera setup - COMPLETE
async function setupCamera() {
  try {
    statusEl.textContent = 'Requesting camera access...';

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    videoEl.srcObject = stream;

    return new Promise((resolve) => {
      videoEl.onloadedmetadata = () => {
        videoEl.play();
        resolve(videoEl);
      };
    });
  } catch (err) {
    statusEl.textContent = 'Camera access denied. Please allow camera access and reload.';
    throw err;
  }
}

// Face detection callback - COMPLETE
function onFaceDetected(result) {
  if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
    const blendshapes = result.faceBlendshapes[0].categories;

    // Detect emotion from blendshapes
    const emotion = detectEmotion(blendshapes);

    // Update visualization if emotion changed
    if (emotion !== currentEmotion) {
      currentEmotion = emotion;
      updateVisualization(emotion);
      statusEl.textContent = `Detected: ${emotion}`;
    }
  }
}

// Render loop - COMPLETE
function startRenderLoop() {
  function loop() {
    // Process video frame for face detection
    processVideoFrame(videoEl, onFaceDetected);

    // Update and render visualization
    renderVisualization();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

// App initialization - COMPLETE
async function init() {
  try {
    // Setup camera
    await setupCamera();
    statusEl.textContent = 'Camera ready. Initializing face detection...';

    // Initialize MediaPipe Face Landmarker
    faceLandmarker = await initFaceLandmarker();
    statusEl.textContent = 'Face detection ready. Initializing visualization...';

    // Initialize visualization
    initVisualization(canvasEl);
    statusEl.textContent = 'Ready! Make a facial expression.';

    // Start render loop
    startRenderLoop();

  } catch (err) {
    console.error('Initialization error:', err);
    statusEl.textContent = `Error: ${err.message}`;
  }
}

// Start app when page loads
init();
