// ============================================
// QR CODE SCANNER - COMPLETE
// ============================================
// This file handles QR code scanning using html5-qrcode library.
// Camera setup and scanning are fully implemented.

let scanner = null;

/**
 * Start QR code scanning
 * @param {Function} onSuccess - Callback when QR code is scanned
 * @param {Function} onError - Callback for scan errors
 */
export async function startScanning(onSuccess, onError) {
  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0,
    rememberLastUsedCamera: true
  };

  // Create scanner instance
  scanner = new Html5QrcodeScanner('qr-reader', config, false);

  // Render scanner with callbacks
  scanner.render(
    (decodedText, decodedResult) => {
      console.log('QR Code detected:', decodedText);

      // Stop scanning after successful scan
      stopScanning();

      // Call success callback
      onSuccess(decodedText);
    },
    (errorMessage) => {
      // Scan errors are frequent during scanning
      // Only call error callback for logging
      if (onError) {
        onError(errorMessage);
      }
    }
  );
}

/**
 * Stop QR code scanning and cleanup
 */
export function stopScanning() {
  if (scanner) {
    scanner.clear().catch(err => {
      console.error('Error stopping scanner:', err);
    });
    scanner = null;
  }
}

// COMPLETE - QR scanner infrastructure ready
