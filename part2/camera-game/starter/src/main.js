// ============================================
// MAIN APP - COMPLETE
// ============================================
// This file handles app initialization, QR scanning,
// and UI updates. Infrastructure is ready to use.

import { startScanning } from './qrScanner.js';
import { joinSession, updatePlayerScore } from './multiplayer.js';
import { initializeGame, onActionButtonClick } from './gameLogic.js';

// ============================================
// APP STATE
// ============================================
const appState = {
  sessionCode: null,
  playerId: null,
  playerName: null,
  gameState: 'scanning'  // scanning | playing | finished
};

// ============================================
// UI ELEMENTS
// ============================================
const elements = {
  status: document.getElementById('status'),
  qrContainer: document.getElementById('qr-container'),
  gameUI: document.getElementById('game-ui'),
  sessionCode: document.getElementById('session-code'),
  score: document.getElementById('score'),
  players: document.getElementById('players'),
  actionBtn: document.getElementById('action-btn')
};

// ============================================
// INITIALIZATION - COMPLETE
// ============================================
async function init() {
  updateStatus('Ready to scan QR code');

  // Start QR code scanner
  await startScanning(onSessionCodeScanned, onScanError);

  // Setup action button
  elements.actionBtn.addEventListener('click', () => {
    onActionButtonClick();
  });
}

// ============================================
// QR CODE CALLBACKS - COMPLETE
// ============================================
function onSessionCodeScanned(sessionCode) {
  console.log('QR code scanned:', sessionCode);
  updateStatus('Joining session...');

  // Generate unique player ID
  appState.playerId = generatePlayerId();

  // Prompt for player name
  const playerName = prompt('Enter your name:') || `Player ${Math.floor(Math.random() * 1000)}`;
  appState.playerName = playerName;
  appState.sessionCode = sessionCode;

  // Hide QR scanner, show game UI
  elements.qrContainer.style.display = 'none';
  elements.gameUI.classList.add('active');
  elements.sessionCode.textContent = sessionCode;

  // Join multiplayer session
  joinSession(
    sessionCode,
    appState.playerId,
    playerName,
    onPlayersUpdate
  );

  // Initialize game logic
  initializeGame(sessionCode, appState.playerId);

  appState.gameState = 'playing';
  updateStatus('Game started!');
}

function onScanError(error) {
  // Scan errors are frequent during scanning, don't show them
  // Only log for debugging
  console.debug('Scan error:', error);
}

// ============================================
// MULTIPLAYER CALLBACKS - COMPLETE
// ============================================
function onPlayersUpdate(players) {
  if (!players) {
    elements.players.innerHTML = '<h3>Players</h3><p>No players yet</p>';
    return;
  }

  // Clear current player list
  elements.players.innerHTML = '<h3>Players</h3>';

  // Add each player
  Object.entries(players).forEach(([playerId, player]) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = `player ${player.online ? 'online' : 'offline'}`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'player-name';
    nameSpan.textContent = player.name;

    // Highlight current player
    if (playerId === appState.playerId) {
      nameSpan.textContent += ' (You)';
    }

    const scoreSpan = document.createElement('span');
    scoreSpan.className = 'player-score';
    scoreSpan.textContent = player.score || 0;

    playerDiv.appendChild(nameSpan);
    playerDiv.appendChild(scoreSpan);
    elements.players.appendChild(playerDiv);

    // Update local score display if this is current player
    if (playerId === appState.playerId) {
      elements.score.textContent = `Score: ${player.score || 0}`;
    }
  });
}

// ============================================
// UTILITY FUNCTIONS - COMPLETE
// ============================================
function generatePlayerId() {
  // Use crypto.randomUUID if available, fallback to timestamp
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `player-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function updateStatus(message) {
  elements.status.textContent = message;
}

// Export state for use in other modules
export { appState };

// ============================================
// START APP
// ============================================
init();

// COMPLETE - App initialization and state management ready
