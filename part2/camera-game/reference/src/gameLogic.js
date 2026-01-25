// ============================================
// GAME LOGIC - REFERENCE IMPLEMENTATION
// ============================================
// This is the complete reference implementation of a
// "Speed Clicker" multiplayer game.
//
// GAME MECHANICS:
// - Players click action button to increment score
// - First player to reach target score (10) wins
// - All scores sync in real-time across all players
// - Winner announcement when target reached

import { updatePlayerScore, updateGameState, getCurrentSession } from './multiplayer.js';

// ============================================
// GAME STATE
// ============================================
const gameState = {
  currentRound: 1,
  targetScore: 10,
  gameActive: true,
  roundStartTime: null
};

let currentScore = 0;

// ============================================
// INITIALIZATION - COMPLETE
// ============================================
/**
 * Initialize game for the current player
 * @param {string} sessionCode - The session code
 * @param {string} playerId - The player's ID
 */
export function initializeGame(sessionCode, playerId) {
  console.log('Initializing game...');

  // Set initial game state in Firebase
  updateGameState(sessionCode, {
    targetScore: gameState.targetScore,
    roundStartTime: Date.now(),
    currentRound: gameState.currentRound
  });

  gameState.roundStartTime = Date.now();
  gameState.gameActive = true;
  currentScore = 0;

  console.log('Game initialized! Target score:', gameState.targetScore);
}

// ============================================
// GAME ACTIONS - COMPLETE
// ============================================

/**
 * Handle action button click (core game mechanic)
 *
 * IMPLEMENTATION: Simple speed clicker
 * - Each click increments score by 1
 * - Score syncs to Firebase (triggers update for all players)
 * - Checks win condition after each click
 */
export function onActionButtonClick() {
  if (!gameState.gameActive) {
    console.log('Game is not active');
    return;
  }

  // Increment local score
  currentScore++;
  console.log('Score increased to:', currentScore);

  // Get current session info
  const { sessionCode, playerId } = getCurrentSession();

  // Update Firebase - this triggers real-time sync to all players
  // Using last-write-wins pattern (no transaction needed for simple score)
  updatePlayerScore(sessionCode, playerId, currentScore);

  // Update local UI immediately (optimistic update)
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = `Score: ${currentScore}`;
  }

  // Check if player reached target score
  if (currentScore >= gameState.targetScore) {
    const timeElapsed = Date.now() - gameState.roundStartTime;
    const timeInSeconds = (timeElapsed / 1000).toFixed(1);
    endGame(`You won! 🎉 (${timeInSeconds}s)`);
  }
}

/**
 * Check if any player has won the game
 *
 * @param {Object} players - All players in the session
 * @returns {Object|null} Winner object or null if no winner yet
 *
 * PATTERN: Last-write-wins for score updates
 * We don't need transactions because:
 * 1. Each player only updates their own score
 * 2. Race conditions don't matter (both players can "win")
 * 3. Simplifies implementation for workshop timeframe
 */
export function checkWinCondition(players) {
  if (!players) return null;

  // Find first player who reached target score
  for (const [playerId, player] of Object.entries(players)) {
    // Check if player reached target and is still online
    if (player.score >= gameState.targetScore && player.online) {
      return {
        playerId,
        name: player.name,
        score: player.score,
        timeElapsed: Date.now() - gameState.roundStartTime
      };
    }
  }

  return null; // No winner yet
}

// ============================================
// GAME STATE MANAGEMENT - COMPLETE
// ============================================

/**
 * End the game with a message
 * @param {string} message - Message to display
 */
function endGame(message) {
  gameState.gameActive = false;

  // Update action button
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.disabled = true;
    actionBtn.textContent = message;
    actionBtn.style.background = '#4CAF50';
  }

  // Update status
  const status = document.getElementById('status');
  if (status) {
    status.textContent = message;
  }

  console.log('Game ended:', message);

  // Show play again option after 3 seconds
  setTimeout(() => {
    if (actionBtn) {
      actionBtn.textContent = 'Play Again?';
      actionBtn.disabled = false;
      actionBtn.onclick = () => resetGame();
    }
  }, 3000);
}

/**
 * Reset game for a new round
 */
function resetGame() {
  console.log('Resetting game...');

  const { sessionCode, playerId } = getCurrentSession();

  // Reset local state
  currentScore = 0;
  gameState.gameActive = true;
  gameState.currentRound++;
  gameState.roundStartTime = Date.now();

  // Reset score in Firebase
  updatePlayerScore(sessionCode, playerId, 0);

  // Update game state
  updateGameState(sessionCode, {
    currentRound: gameState.currentRound,
    roundStartTime: gameState.roundStartTime
  });

  // Reset UI
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = 'Score: 0';
  }

  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.textContent = 'Click Me!';
    actionBtn.disabled = false;
    actionBtn.style.background = '';
    actionBtn.onclick = onActionButtonClick;
  }

  const status = document.getElementById('status');
  if (status) {
    status.textContent = `Round ${gameState.currentRound} started!`;
  }

  console.log('New round started:', gameState.currentRound);
}

// ============================================
// HELPER FUNCTIONS - COMPLETE
// ============================================

/**
 * Get current player from players object
 * @param {Object} players - All players
 * @param {string} playerId - Player to find
 * @returns {Object|null} Player object or null
 */
export function getCurrentPlayer(players, playerId) {
  if (!players || !playerId) return null;
  return players[playerId] || null;
}

/**
 * Get player's rank (1st, 2nd, 3rd, etc.)
 * @param {Object} players - All players
 * @param {string} playerId - Player to rank
 * @returns {number} Rank position (1-based)
 */
export function getPlayerRank(players, playerId) {
  if (!players) return 0;

  // Get all online players with scores
  const playerScores = Object.entries(players)
    .filter(([id, player]) => player.online)
    .map(([id, player]) => ({
      id,
      score: player.score || 0
    }))
    .sort((a, b) => b.score - a.score); // Sort by score descending

  const rank = playerScores.findIndex(p => p.id === playerId);
  return rank === -1 ? 0 : rank + 1;
}

/**
 * Get ranked list of all players
 * @param {Object} players - All players
 * @returns {Array} Sorted array of players
 */
export function getRankedPlayers(players) {
  if (!players) return [];

  return Object.entries(players)
    .filter(([id, player]) => player.online)
    .map(([id, player]) => ({
      id,
      name: player.name,
      score: player.score || 0
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Format time in MM:SS format
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string
 */
export function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate time elapsed since round start
 * @returns {number} Time elapsed in milliseconds
 */
export function getElapsedTime() {
  if (!gameState.roundStartTime) return 0;
  return Date.now() - gameState.roundStartTime;
}

// ============================================
// KEY PATTERNS DEMONSTRATED
// ============================================

/*
PATTERN 1: Last-Write-Wins for Score Updates
- Each player updates only their own score path
- Firebase handles concurrent writes automatically
- No transactions needed (simplifies implementation)
- Trade-off: Two players could "win" simultaneously (acceptable for workshop)

PATTERN 2: Presence Detection via onDisconnect
- Set in multiplayer.js when joining session
- Automatically marks player offline when connection drops
- Browser close, network failure, tab close all trigger it
- Enables "who's still playing" functionality

PATTERN 3: Real-time Sync via onValue Listeners
- Set up in multiplayer.js for players path
- Triggers callback whenever ANY player's data changes
- Enables live scoreboard updates across all devices
- Callback receives entire players object each time

PATTERN 4: Game State Denormalization
- Store game data (targetScore, roundStartTime) at session level
- Store player data (name, score, online) at player level
- Avoids deep nesting (better performance)
- Makes queries simpler (no joins needed)

PATTERN 5: Optimistic UI Updates
- Update local UI immediately when button clicked
- Then sync to Firebase (which triggers network update)
- Feels instant to the user
- Firebase sync confirms or corrects if needed
*/
