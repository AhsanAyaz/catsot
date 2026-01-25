// ============================================
// FIREBASE MULTIPLAYER - COMPLETE
// ============================================
// This file handles Firebase Realtime Database connection,
// player presence, and real-time state synchronization.

// Import Firebase modules from global scope
const { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp, push, update } = window.firebaseDatabase;

// Firebase configuration for local emulator
const firebaseConfig = {
  databaseURL: "http://127.0.0.1:9000?ns=workshop-demo"
};

// Initialize Firebase
const app = window.firebaseApp(firebaseConfig);
const db = getDatabase(app);

let currentSessionCode = null;
let currentPlayerId = null;

/**
 * Join a multiplayer game session
 * @param {string} sessionCode - The session/game code from QR
 * @param {string} playerId - Unique player identifier
 * @param {string} playerName - Player's display name
 * @param {Function} onPlayersUpdate - Callback when players change
 */
export async function joinSession(sessionCode, playerId, playerName, onPlayersUpdate) {
  currentSessionCode = sessionCode;
  currentPlayerId = playerId;

  // Create player reference
  const playerRef = ref(db, `sessions/${sessionCode}/players/${playerId}`);

  // Set initial player data
  await set(playerRef, {
    name: playerName,
    score: 0,
    online: true,
    joinedAt: serverTimestamp()
  });

  // Setup presence detection - mark offline when disconnected
  onDisconnect(playerRef).update({
    online: false,
    leftAt: serverTimestamp()
  });

  // Listen to all players in the session
  const playersRef = ref(db, `sessions/${sessionCode}/players`);
  onValue(playersRef, (snapshot) => {
    const players = snapshot.val();
    onPlayersUpdate(players);
  });

  // Monitor connection status
  const connectedRef = ref(db, '.info/connected');
  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      console.log('Connected to Firebase');
    } else {
      console.log('Disconnected from Firebase');
    }
  });

  console.log(`Joined session: ${sessionCode} as ${playerName}`);
}

/**
 * Update player's score
 * @param {string} sessionCode - The session code
 * @param {string} playerId - The player's ID
 * @param {number} newScore - The new score value
 */
export function updatePlayerScore(sessionCode, playerId, newScore) {
  const scoreRef = ref(db, `sessions/${sessionCode}/players/${playerId}/score`);
  set(scoreRef, newScore);
}

/**
 * Update game state (shared game data)
 * @param {string} sessionCode - The session code
 * @param {Object} data - Game state data to update
 */
export function updateGameState(sessionCode, data) {
  const gameDataRef = ref(db, `sessions/${sessionCode}/gameData`);
  update(gameDataRef, data);
}

/**
 * Get current session info
 */
export function getCurrentSession() {
  return {
    sessionCode: currentSessionCode,
    playerId: currentPlayerId
  };
}

// COMPLETE - Firebase multiplayer infrastructure ready
