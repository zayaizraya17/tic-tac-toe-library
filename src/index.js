/**
 * Returns the optimal move for the given player in the provided game field.
 */
function getOptimalTurn(gameField, player) {
  if (!Array.isArray(gameField) || gameField.length !== 9) {
    throw new Error("gameField must be an array of 9 numbers");
  }
  if (player !== 0 && player !== 1) {
    throw new Error("player must be 0 (for \\"o\\") or 1 (for \\"x\\")");
  }

  const opponent = player === 0 ? 1 : 0;
  
  // 1. Try to win
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = player;
      if (checkWinner(simulatedField) === player) {
        return i;
      }
    }
  }
  
  // 2. Block opponent
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = opponent;
      if (checkWinner(simulatedField) === opponent) {
        return i;
      }
    }
  }
  
  // 3. Simple strategy
  const movePriority = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const move of movePriority) {
    if (gameField[move] === -1) {
      return move;
    }
  }
  
  return -1;
}

/**
 * Checks if there"s a winner on the field.
 */
function checkWinner(field) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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
