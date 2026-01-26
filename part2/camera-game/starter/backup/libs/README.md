# Backup CDN Dependencies

Local copies of critical CDN dependencies for offline workshop fallback.

## Files

| File | Version | Source URL | Size |
|------|---------|-----------|------|
| `html5-qrcode.min.js` | 2.3.8 | https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js | ~367KB |
| `mediapipe-vision-bundle.js` | 0.10.15 | https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/vision_bundle.mjs | ~136KB |
| `firebase-app.js` | 10.7.1 | https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js | ~92KB |
| `firebase-database.js` | 10.7.1 | https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js | ~182KB |

## Purpose

These files serve as fallbacks when CDN access fails during the workshop:
- Unreliable WiFi at venue
- CDN blocked by corporate firewall
- CDN temporarily unavailable

## Usage

HTML files in `/part2/` projects use automatic fallback pattern:

```html
<!-- CDN first -->
<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
<!-- Fallback if CDN fails -->
<script>
  window.Html5Qrcode || document.write('<script src="/backup/libs/html5-qrcode.min.js"><\/script>');
</script>
```

## Important Notes

1. **Do not modify these files** - They are production minified builds
2. **MediaPipe version 0.10.15** - Newer versions (0.10.16+) have missing WASM file issues
3. **Firebase modular SDK** - Requires ES module import syntax
4. **MediaPipe WASM files** - The vision_bundle.js loads WASM files from CDN; for fully offline operation, additional WASM files would need to be hosted locally

## Download Date

Downloaded: 2026-01-25

## Updating

To update these files:
```bash
curl -L -o html5-qrcode.min.js "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"
curl -L -o mediapipe-vision-bundle.js "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/vision_bundle.mjs"
curl -L -o firebase-app.js "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
curl -L -o firebase-database.js "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
```
