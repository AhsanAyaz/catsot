// ============================================
// GAME LOGIC
// ============================================
// This file contains the core game mechanics.
// Some functions are complete, others need your implementation.

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
    roundStartTime: Date.now()
  });

  gameState.roundStartTime = Date.now();
  gameState.gameActive = true;
  currentScore = 0;

  console.log('Game initialized!');
}

// ============================================
// TODO: YOUR IMPLEMENTATION
// ============================================

/**
 * TODO 1: Implement game action (20 minutes)
 *
 * This function is called when the player clicks the action button.
 * Define what happens during each button click.
 *
 * HINT: This is where you define your game mechanics!
 *
 * Example ideas:
 * - Simple clicker: Increment score by 1 each click
 * - Timer-based: Start/stop a countdown timer
 * - Pattern matching: Click in rhythm or sequence
 * - Photo challenge: Capture camera photo on click
 *
 * REQUIREMENTS:
 * 1. Update currentScore variable
 * 2. Call updatePlayerScore() to sync with Firebase
 * 3. Update the UI (score display)
 * 4. Check if player won (reached targetScore)
 *
 * EXAMPLE IMPLEMENTATION (simple clicker):
 *
 * export function onActionButtonClick() {
 *   if (!gameState.gameActive) return;
 *
 *   // Increment score
 *   currentScore++;
 *
 *   // Sync to Firebase (updates all players' screens)
 *   const { sessionCode, playerId } = getCurrentSession();
 *   updatePlayerScore(sessionCode, playerId, currentScore);
 *
 *   // Update local UI
 *   document.getElementById('score').textContent = `Score: ${currentScore}`;
 *
 *   // Check win condition
 *   if (currentScore >= gameState.targetScore) {
 *     endGame('You won! 🎉');
 *   }
 * }
 */
export function onActionButtonClick() {
  // TODO: Implement your game action here

  console.log('Action button clicked!');

  // Replace this with your implementation
}

/**
 * TODO 2: Implement win condition check (10 minutes)
 *
 * This function checks if any player has won the game.
 * Called whenever player scores update.
 *
 * HINT: Loop through all players and check their scores
 * HINT: Return winner object or null
 *
 * @param {Object} players - All players in the session
 * @returns {Object|null} Winner object with { playerId, name, score, timeElapsed } or null
 *
 * EXAMPLE IMPLEMENTATION:
 *
 * export function checkWinCondition(players) {
 *   if (!players) return null;
 *
 *   // Find player who reached target score
 *   for (const [playerId, player] of Object.entries(players)) {
 *     if (player.score >= gameState.targetScore && player.online) {
 *       return {
 *         playerId,
 *         name: player.name,
 *         score: player.score,
 *         timeElapsed: Date.now() - gameState.roundStartTime
 *       };
 *     }
 *   }
 *
 *   return null;
 * }
 */
export function checkWinCondition(players) {
  // TODO: Implement win condition logic

  return null; // Replace with your logic
}

// ============================================
// HELPER FUNCTIONS - COMPLETE
// ============================================

/**
 * End the game with a message
 * @param {string} message - Message to display
 */
function endGame(message) {
  gameState.gameActive = false;

  // Update UI
  const actionBtn = document.getElementById('action-btn');
  actionBtn.disabled = true;
  actionBtn.textContent = message;

  // Show status
  const status = document.getElementById('status');
  status.textContent = message;

  console.log('Game ended:', message);
}

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

  const playerScores = Object.entries(players)
    .filter(([id, player]) => player.online)
    .map(([id, player]) => ({ id, score: player.score || 0 }))
    .sort((a, b) => b.score - a.score);

  const rank = playerScores.findIndex(p => p.id === playerId);
  return rank === -1 ? 0 : rank + 1;
}

// ============================================
// TESTING HELPERS
// ============================================
// Uncomment these for testing your implementation

// export function testGameLogic() {
//   console.log('Testing game logic...');
//
//   // Simulate button clicks
//   onActionButtonClick();
//   onActionButtonClick();
//   onActionButtonClick();
//
//   // Test win condition
//   const mockPlayers = {
//     'player-1': { name: 'Alice', score: 5, online: true },
//     'player-2': { name: 'Bob', score: 12, online: true }
//   };
//
//   const winner = checkWinCondition(mockPlayers);
//   console.log('Winner:', winner);
// }
