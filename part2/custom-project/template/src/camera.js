/**
 * Camera Helper
 *
 * Simple wrapper around getUserMedia for camera access.
 * Returns video element ready for use.
 */

export async function setupCamera(options = {}) {
  const {
    facingMode = 'user',  // 'user' for front camera, 'environment' for back
    width = 640,
    height = 480
  } = options;

  const constraints = {
    video: {
      facingMode,
      width: { ideal: width },
      height: { ideal: height }
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;

    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => resolve(video);
      video.onerror = reject;
    });
  } catch (err) {
    console.error('Camera access denied:', err);
    throw new Error('Unable to access camera. Please grant permission.');
  }
}

export function stopCamera(video) {
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }
}
