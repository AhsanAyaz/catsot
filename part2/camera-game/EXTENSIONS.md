# Camera-Based Multiplayer Game - Extension Challenges

## Overview

Completed the basic multiplayer game? These extension challenges will help you explore advanced features and creative game mechanics. Each challenge includes time estimates, hints, and learning objectives.

Pick challenges that interest you, or combine multiple challenges to create a unique game experience!

---

## Beginner Extensions (10-15 minutes each)

### 1. Player Count Display

**Challenge:** Show "X players online" text in the UI

**What to add:**
- Count players where `online === true`
- Display count above or below player list
- Update count in real-time as players join/leave

**Hints:**
- Filter players: `Object.values(players).filter(p => p.online).length`
- Add to `onPlayersUpdate()` function in main.js
- Create a new div: `<div id="player-count">3 players online</div>`

**Learning:** Object filtering, dynamic UI updates

---

### 2. Color-Coded Scores

**Challenge:** Highlight leading player in green, trailing player in red

**What to add:**
- Calculate player ranks based on score
- Add CSS classes for 1st place, last place, and middle
- Update player list styling dynamically

**Hints:**
- Use `getPlayerRank()` helper function
- Add CSS classes: `.rank-1 { background: #e8f5e9; }`, `.rank-last { background: #ffebee; }`
- Apply class based on rank when rendering player list

**Learning:** Dynamic styling, rankings, CSS class manipulation

---

### 3. Sound Effects

**Challenge:** Play sounds when scores update or players join

**What to add:**
- Sound when button clicked (click, ding, pop)
- Sound when player joins session
- Sound when someone wins

**Hints:**
- Use HTML5 Audio: `const audio = new Audio('click.mp3'); audio.play();`
- Or Web Audio API for generated tones
- Free sounds: https://freesound.org or generate with code

**Learning:** Audio integration, event-driven sounds

**Example:**
```javascript
function playClickSound() {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = 800;
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}
```

---

### 4. Session Code Copy Button

**Challenge:** Add "Copy Session Code" button to share with friends

**What to add:**
- Button next to session code display
- Click to copy code to clipboard
- Show "Copied!" feedback message

**Hints:**
- Use Clipboard API: `navigator.clipboard.writeText(sessionCode)`
- Add button in session-info div
- Show temporary success message

**Learning:** Clipboard API, user feedback patterns

---

## Intermediate Extensions (20-30 minutes each)

### 5. Countdown Timer

**Challenge:** Add 60-second timer, end game when time expires

**What to add:**
- Timer display showing remaining seconds
- Start timer when first player joins
- End game for all players when timer reaches 0
- Declare highest score as winner

**Hints:**
- Store `startTime` in Firebase gameData
- Calculate remaining: `60 - Math.floor((Date.now() - startTime) / 1000)`
- Use `setInterval()` to update display every second
- Check if time === 0 in the interval

**Learning:** Time synchronization, countdown logic, time-based game mechanics

**Gotcha:** Each player's clock might be slightly different - use Firebase `serverTimestamp()` for accuracy

---

### 6. QR Code Generation

**Challenge:** Generate QR code for session instead of using external tool

**What to add:**
- "Create New Game" button that generates random session code
- Display QR code as canvas or image
- Let host share generated code with players

**Hints:**
- Use qrcode.js library: `<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>`
- Generate code: `new QRCode(element, { text: sessionCode, width: 256, height: 256 })`
- Random session code: `'game-' + Math.random().toString(36).substring(7)`

**Learning:** QR code generation, canvas API, session creation

---

### 7. Player Avatars

**Challenge:** Let players choose emoji or color as avatar

**What to add:**
- Avatar selection screen before joining game
- Store avatar choice in Firebase player data
- Display avatar next to player name in list

**Hints:**
- Add `avatar` field to player data: `{ name, score, avatar, online }`
- Show emoji picker or color buttons before joining
- Render avatar in player list: `<span class="avatar">${player.avatar}</span>`

**Learning:** User customization, Firebase data structure, emoji handling

**Emoji options:** 😀 😎 🤖 👾 🦄 🐶 🐱 🦊 🐼 🐯 🦁 🐸 🐵

---

### 8. Round System

**Challenge:** Support multiple rounds with score reset

**What to add:**
- "New Round" button for game host
- Reset all player scores to 0
- Track round number (Round 1, Round 2, etc.)
- Keep round history for stats

**Hints:**
- Add `currentRound` to gameData in Firebase
- Create reset function that updates all player scores to 0
- Listen to round changes and update UI
- Consider storing round winners in separate path

**Learning:** Game state management, round lifecycle, data persistence

---

### 9. Combo System

**Challenge:** Award bonus points for clicking in rapid succession

**What to add:**
- Track time between clicks
- Award 2x points if clicked within 0.5 seconds
- Show combo multiplier on screen
- Reset combo if too slow

**Hints:**
- Store `lastClickTime` variable
- Calculate `timeSinceLastClick = Date.now() - lastClickTime`
- If `< 500ms`, increment combo counter
- Display: `x2 Combo!`, `x3 Combo!`, etc.

**Learning:** Time-based mechanics, multiplier systems, combo patterns

---

## Advanced Extensions (45+ minutes each)

### 10. Camera Selfie Challenge

**Challenge:** Players take selfie when button clicked instead of just clicking

**What to add:**
- Capture photo from webcam on button click
- Display captured photo in player card
- Store photo as data URL in Firebase
- Show gallery of all player photos

**Hints:**
- Use `getUserMedia()` to access camera
- Capture frame: Draw video to canvas, convert to data URL
- Store in Firebase: `player.photo = canvas.toDataURL('image/jpeg', 0.5)`
- Display: `<img src="${player.photo}" />`

**Learning:** Camera API, image capture, data URLs, Base64 encoding

**Warning:** Photos increase database size - compress images and limit resolution (e.g., 200x200px)

---

### 11. Leaderboard Persistence

**Challenge:** Store high scores across sessions

**What to add:**
- Global leaderboard path in Firebase
- Write top score when game ends
- Display all-time top 10 players
- Show player's best score

**Hints:**
- Create `/leaderboard/{playerId}` path with best score
- Update only if new score > previous best
- Query top 10: Use Firebase `orderByChild('score').limitToLast(10)`
- Display separate from current game

**Learning:** Data persistence, leaderboard design, Firebase queries

---

### 12. Spectator Mode

**Challenge:** Allow non-playing users to watch game in real-time

**What to add:**
- "Spectate" button on start screen
- Read-only view of game state
- See all players and scores live
- No ability to click or affect game

**Hints:**
- Create `/spectators/{spectatorId}` path in Firebase
- Listen to session data without writing to players path
- Same UI but disable action button
- Show "Spectating" badge

**Learning:** Different user roles, read-only connections, observer pattern

---

### 13. Team Mode

**Challenge:** Support 2 teams competing for combined score

**What to add:**
- Team selection (Red vs Blue) when joining
- Aggregate scores by team
- Show team totals prominently
- First team to 50 points wins

**Hints:**
- Add `teamId` field to player data: `{ name, score, teamId, online }`
- Calculate team scores: Sum all players where `teamId === 'red'`
- Display team totals above player list
- Check team score for win condition

**Learning:** Team mechanics, data aggregation, group competition

---

### 14. Power-ups System

**Challenge:** Add power-ups (2x points, freeze opponents, shield)

**What to add:**
- Power-up buttons that activate special abilities
- Cooldown timers (can only use once per 30 seconds)
- Visual effects when power-up active
- Store power-up state in Firebase

**Hints:**
- Add `activePowerUp` and `powerUpExpiry` to player data
- Types: `double-points`, `freeze-others`, `shield`, `speed-boost`
- Check power-up state in `onActionButtonClick()`
- Show countdown: `Math.ceil((expiryTime - Date.now()) / 1000)` seconds

**Learning:** Game mechanics, status effects, cooldown systems

---

### 15. Reaction Time Game

**Challenge:** Change game from clicker to reaction time test

**What to add:**
- Show green light at random intervals
- Players click when green (too early = penalty)
- Measure reaction time in milliseconds
- Fastest average reaction wins

**Hints:**
- Random delay: `setTimeout(() => showGreen(), Math.random() * 5000 + 2000)`
- Measure: `reactionTime = Date.now() - greenLightTime`
- Store array of reaction times per player
- Calculate average: `times.reduce((a, b) => a + b) / times.length`

**Learning:** Timing mechanics, average calculations, array operations

---

### 16. Gesture-Based Controls

**Challenge:** Use hand gestures instead of button clicks

**What to add:**
- Use MediaPipe hand tracking
- Detect thumbs up, peace sign, or fist gestures
- Trigger score on specific gesture
- Show hand skeleton overlay

**Hints:**
- Use MediaPipe Hands: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker
- Detect gestures from landmark positions
- Call `onActionButtonClick()` when gesture detected
- Similar pattern to face detection from PATH-01

**Learning:** Hand tracking, gesture recognition, MediaPipe integration

---

## Performance Challenges

### 17. Offline Support

**Challenge:** Continue playing when internet drops, sync when reconnected

**What to add:**
- Detect when Firebase disconnects
- Queue score updates locally
- Sync queued updates when reconnected
- Show offline indicator

**Hints:**
- Firebase offline persistence: Enable in config
- Listen to `.info/connected` for connection status
- Store pending updates in array
- Flush queue when connection restored

**Learning:** Offline-first design, sync strategies, connection handling

---

### 18. Rate Limiting

**Challenge:** Prevent spam clicking (max 1 click per second)

**What to add:**
- Track time of last click
- Reject clicks within cooldown period
- Show cooldown progress bar
- Punish spammers with score penalty

**Hints:**
- Store `lastClickTime`
- Check: `if (Date.now() - lastClickTime < 1000) return;`
- Visual cooldown: Update progress bar width based on remaining time
- Anti-cheat: Server-side validation (Firebase rules)

**Learning:** Rate limiting, anti-cheat mechanisms, user feedback

---

## Firebase-Specific Challenges

### 19. Security Rules

**Challenge:** Add Firebase security rules to prevent cheating

**What to add:**
- Rules that validate score increments (can't jump from 5 to 100)
- Prevent modifying other players' scores
- Limit session creation rate
- Validate data types and required fields

**Hints:**
- Create `database.rules.json` file
- Use `.validate` to enforce constraints: `"score": { ".validate": "newData.val() >= 0 && newData.val() <= 1000" }`
- Use auth to restrict writes: `"$playerId": { ".write": "auth.uid === $playerId" }`
- Test rules in Firebase Emulator UI

**Learning:** Firebase security, server-side validation, access control

**Example rules:**
```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        "players": {
          "$playerId": {
            ".write": "!data.exists() || data.child('score').val() <= newData.child('score').val()",
            ".validate": "newData.hasChildren(['name', 'score', 'online'])",
            "score": {
              ".validate": "newData.val() >= 0 && newData.val() <= 1000"
            }
          }
        }
      }
    }
  }
}
```

---

### 20. Presence Heartbeat

**Challenge:** Improve presence detection with periodic heartbeats

**What to add:**
- Write timestamp every 5 seconds to show player is active
- Consider player offline if heartbeat > 10 seconds old
- More reliable than onDisconnect alone
- Show "Away" status if heartbeat stale but not disconnected

**Hints:**
- Use `setInterval()` to write timestamp: `set(heartbeatRef, Date.now())`
- Check heartbeat age: `Date.now() - player.lastHeartbeat > 10000`
- Show states: Online (< 10s), Away (10-30s), Offline (> 30s)
- Clear interval on disconnect

**Learning:** Presence patterns, heartbeat mechanisms, stale detection

---

## Creative Challenges

### 21. Custom Game Modes

**Challenge:** Add different game types (word game, math quiz, memory)

**What to add:**
- Game mode selection screen
- Different mechanics per mode:
  - **Word Race**: Type displayed word fastest
  - **Math Quiz**: Solve equations, correct answer = point
  - **Memory**: Match pairs of cards
  - **Simon Says**: Copy sequence of colors
- Store `gameMode` in session
- Switch logic based on mode

**Learning:** Game mode architecture, extensibility, polymorphism

---

### 22. Emoji Reactions

**Challenge:** Players send emoji reactions that appear on others' screens

**What to add:**
- Emoji picker buttons
- Write reaction to Firebase with timestamp
- Listen to reactions and animate on screen
- Fade out after 3 seconds

**Hints:**
- Path: `/sessions/{sessionId}/reactions/{reactionId}`
- Store: `{ emoji, playerId, timestamp }`
- Animate: Fly up from player avatar and fade out
- Clean up old reactions: Delete after 5 seconds

**Learning:** Event broadcasting, animations, temporary data

---

### 23. Voice Chat Integration

**Challenge:** Add voice chat using WebRTC

**What to add:**
- Peer-to-peer voice connection
- Mute/unmute button
- Show who's talking (audio level indicator)
- Use Firebase for WebRTC signaling

**Hints:**
- Use simple-peer library for WebRTC
- Store ICE candidates and offers in Firebase
- Audio level: Analyze audio with Web Audio API `AnalyserNode`
- This is complex - consider using a library like Daily.co or Agora

**Learning:** WebRTC, peer-to-peer connections, signaling, audio processing

---

### 24. Map-Based Game

**Challenge:** Players move on a 2D map, collect items

**What to add:**
- Canvas or HTML grid showing map
- Player positions as dots/avatars
- Items spawn at random locations
- Move to item to collect (increase score)

**Hints:**
- Store `{ x, y }` position in player data
- Update position on arrow keys or WASD
- Items: `/sessions/{sessionId}/items/{itemId}` with `{ x, y, value }`
- Collision: Check if player position === item position

**Learning:** 2D game logic, collision detection, spatial data

---

## Documentation Challenge

### 25. Write a Tutorial

**Challenge:** Document your game mechanics for other developers

**What to add:**
- Architecture diagram showing data flow
- Explanation of Firebase data structure
- Code walkthrough with comments
- Deployment guide to Firebase Hosting

**Hints:**
- Use Mermaid or draw.io for diagrams
- Explain key decisions (why last-write-wins vs transactions)
- Include screenshots of Firebase Emulator UI
- Write as if teaching a beginner

**Learning:** Technical writing, architecture documentation, knowledge sharing

---

## Combination Ideas

Mix extensions to create unique experiences:

- **Party Game**: Camera selfie + Emoji reactions + Round system + Sound effects
- **Competitive Esport**: Countdown timer + Combo system + Leaderboard + Rate limiting
- **Social Experience**: Team mode + Voice chat + Player avatars + Spectator mode
- **Creative Challenge**: Custom game modes + Power-ups + Map-based + Gesture controls

---

## Deployment Challenge

### 26. Deploy to Firebase Hosting

**Challenge:** Make your game accessible via public URL

**What to do:**
1. Initialize Firebase Hosting: `firebase init hosting`
2. Build your project (if using build tools)
3. Deploy: `firebase deploy --only hosting`
4. Share your URL: `https://your-project.firebaseapp.com`

**Bonus:**
- Set up custom domain
- Enable HTTPS (automatic with Firebase)
- Add analytics to track usage
- Create a landing page with game instructions

---

## Need More Ideas?

Think about what makes games fun:
- **Competition**: Leaderboards, rankings, rewards
- **Cooperation**: Team goals, shared objectives
- **Creativity**: Customization, user-generated content
- **Progression**: Levels, unlockables, achievements
- **Social**: Communication, reactions, presence
- **Challenge**: Time pressure, limited resources, skill tests

Pick one aspect and build a feature around it!

---

**Remember:** Start small, test frequently, and have fun! 🎮

The best learning happens when you're building something you're excited about.
