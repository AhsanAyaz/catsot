# Camera-Based Multiplayer Game

A real-time multiplayer game using QR codes for matchmaking and Firebase for state synchronization.

## What You'll Build

A multiplayer game where players:
1. Scan a QR code to join a game session
2. See all players in real-time
3. Compete to reach a target score first
4. Watch scores update live across all devices

## Learning Objectives

- **QR Code Scanning**: Use camera to scan codes for session joining
- **Firebase Realtime Database**: Sync game state across multiple players
- **Multiplayer State Management**: Handle concurrent player actions
- **Presence Detection**: Track when players join/leave
- **Real-time Updates**: Listen to database changes and update UI

## Setup Instructions

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Start Firebase Emulator

The emulator runs a local Firebase database (no internet required):

```bash
# Run this command in the project directory
firebase emulators:start --only database
```

You should see:
```
✔  database: Emulator started at http://127.0.0.1:9000
✔  Emulator UI running at http://127.0.0.1:4000
```

**Keep this terminal open** while developing.

### 3. Open the Game

Open `index.html` in your web browser (Chrome or Firefox recommended).

### 4. Generate a QR Code

Create a QR code for your game session:

1. Go to https://www.qr-code-generator.com
2. Select "Text" type
3. Enter a session code like: `game-123` or `workshop-test`
4. Generate and download the QR code

### 5. Join the Game

1. Click "Allow" when browser asks for camera permission
2. Point your camera at the QR code (or hold QR code up to webcam)
3. Enter your name when prompted
4. You're in the game!

### 6. Test Multiplayer

Open the same `index.html` in multiple browser tabs or on different devices:
- Same computer: Open multiple tabs, scan same QR code
- Multiple devices: Make sure all devices can access `http://127.0.0.1:9000` (or use your computer's local IP address like `http://192.168.1.100:9000`)

Watch the player list update in real-time!

## Your Tasks

### TODO 1: Implement Game Action (20 minutes)

In `src/gameLogic.js`, implement the `onActionButtonClick()` function.

**What to do:**
- Define what happens when the player clicks the action button
- Update the player's score
- Sync the score to Firebase (so other players see it)
- Check if the player won

**Ideas for game mechanics:**
- **Simple clicker**: Each click = +1 point, first to 10 wins
- **Rapid clicker**: Click as fast as you can in 30 seconds
- **Timed challenge**: Click when a timer hits exactly 5.0 seconds
- **Pattern game**: Click in a specific rhythm or sequence

**Hints:**
- Use `currentScore++` to increment
- Call `updatePlayerScore(sessionCode, playerId, currentScore)` to sync
- Check `if (currentScore >= gameState.targetScore)` for win
- Update UI: `document.getElementById('score').textContent = 'Score: ' + currentScore`

### TODO 2: Implement Win Condition (10 minutes)

In `src/gameLogic.js`, implement the `checkWinCondition(players)` function.

**What to do:**
- Loop through all players
- Find if any player reached the target score
- Return the winner object or null

**Hints:**
- Use `for (const [playerId, player] of Object.entries(players))`
- Check `player.score >= gameState.targetScore`
- Make sure player is `online` (not disconnected)
- Return `{ playerId, name: player.name, score: player.score }`

## Project Structure

```
camera-game/starter/
├── index.html                  # Main HTML with UI
├── README.md                   # This file
└── src/
    ├── main.js                 # App initialization (COMPLETE)
    ├── qrScanner.js           # QR scanning logic (COMPLETE)
    ├── multiplayer.js         # Firebase connection (COMPLETE)
    └── gameLogic.js           # Game mechanics (TODO - your work!)
```

## Testing Your Implementation

1. **Test locally**: Click the button and verify score updates
2. **Test multiplayer**: Open 2 browser tabs, scan same QR, verify both see each other
3. **Test presence**: Close one tab, verify it shows as offline
4. **Test winning**: Reach target score, verify game ends correctly

## Firebase Emulator UI

While the emulator is running, open http://127.0.0.1:4000 to see:
- Real-time database viewer
- Current session data
- Player scores and presence status

This is useful for debugging!

## Common Issues

### Camera Permission Denied
- Reload page and click "Allow" when prompted
- Check browser settings: Settings → Privacy → Camera

### QR Scanner Not Working
- Make sure there's good lighting
- Hold QR code steady and clear
- Try generating a new QR code with simpler text

### Firebase Connection Error
- Make sure emulator is running (`firebase emulators:start --only database`)
- Check console for error messages
- Verify URL is `http://127.0.0.1:9000`

### Players Not Syncing
- Verify both tabs/devices scanned the SAME QR code
- Check Firebase Emulator UI to see if data is being written
- Look for errors in browser console (F12)

## Extension Challenges

Once you've completed the basic implementation, try these challenges:

- Add a countdown timer (60 seconds to reach target)
- Let players choose a color or emoji avatar
- Add sound effects when scores update
- Implement rounds with score reset
- Create a leaderboard that persists across sessions
- Add power-ups or special abilities

See `EXTENSIONS.md` for detailed challenge descriptions!

## Time Estimate

- Setup: 5-10 minutes
- TODO 1 (Game Action): 20 minutes
- TODO 2 (Win Condition): 10 minutes
- Testing: 10-15 minutes
- **Total: 60-75 minutes**

## What You'll Learn

By the end of this project, you'll understand:
- How real-time multiplayer games synchronize state
- How QR codes enable simple matchmaking
- How presence detection works in Firebase
- How to handle concurrent updates from multiple users
- Last-write-wins vs transactional updates

Have fun building your multiplayer game! 🎮
