// ============================================
// MEDIAPIPE FACE DETECTION - COMPLETE
// ============================================

// Import MediaPipe as ES module from CDN
// See: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js
import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

const { FaceLandmarker, FilesetResolver } = vision;

let faceLandmarker = null;
let lastVideoTime = -1;

/**
 * Initialize MediaPipe Face Landmarker
 * COMPLETE - Face detection infrastructure ready
 */
export async function initFaceLandmarker() {
  // Load MediaPipe vision tasks WASM runtime
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );

  // Create Face Landmarker with options
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU"  // Use GPU acceleration
    },
    runningMode: "VIDEO",  // Optimized for video processing
    numFaces: 1,  // Detect one face
    minFaceDetectionConfidence: 0.5,
    minFacePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputFaceBlendshapes: true,  // Enable blendshape extraction (52 ARKit blendshapes)
    outputFacialTransformationMatrixes: false
  });

  return faceLandmarker;
}

/**
 * Process video frame and detect faces
 * COMPLETE - Optimized to avoid processing duplicate frames
 *
 * @param {HTMLVideoElement} video - Video element
 * @param {Function} callback - Called with detection results
 */
export function processVideoFrame(video, callback) {
  if (!faceLandmarker) return;

  // Only process new frames (avoid duplicate processing)
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;

    // Detect faces in current video frame
    const result = faceLandmarker.detectForVideo(video, performance.now());

    // Pass results to callback
    if (callback) {
      callback(result);
    }
  }
}
