/**
 * Returns the optimal move for the given player in the provided game field.
 * 
 * @param {Array<number>} gameField - Array of 9 numbers representing the field.
 *   - 0: "o" (player O)
 *   - 1: "x" (player X)
 *   - -1: empty cell
 * @param {number} player - The player to make a move for (0 for "o", 1 for "x").
 * @returns {number} The index of the optimal move (0-8), or -1 if no moves available.
 * 
 * @example
 * // Returns 5 (center-right cell)
 * getOptimalTurn([-1, -1, -1, 1, 1, -1, 0, 0, -1], 0);
 */
function getOptimalTurn(gameField, player) {
  // Validate input
  if (!Array.isArray(gameField) || gameField.length !== 9) {
    throw new Error('gameField must be an array of 9 numbers');
  }
  if (player !== 0 && player !== 1) {
    throw new Error('player must be 0 (for "o") or 1 (for "x")');
  }

  const opponent = player === 0 ? 1 : 0;
  
  // 1. Try to win: check if player has 2 in a row
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = player;
      if (checkWinner(simulatedField) === player) {
        return i;
      }
    }
  }
  
  // 2. Block opponent: check if opponent has 2 in a row
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = opponent;
      if (checkWinner(simulatedField) === opponent) {
        return i;
      }
    }
  }
  
  // 3. Simple strategy: take center, then corners, then edges
const movePriority = [4, 0, 2, 6, 5, 8, 1, 3, 7];
  for (const move of movePriority) {
    if (gameField[move] === -1) {
      return move;
    }
  }
  
  // 4. No moves available (should not happen in valid game state)
  return -1;
}

/**
 * Checks if there's a winner on the field.
 * @param {Array<number>} field - Game field array.
 * @returns {number|null} 0 for "o", 1 for "x", null for no winner.
 */
function checkWinner(field) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (field[a] !== -1 && field[a] === field[b] && field[a] === field[c]) {
      return field[a];
    }
  }
  
  return null;
}

module.exports = { getOptimalTurn, checkWinner };