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
  
  // 1. Try to win: check if player can win with one move
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = player;
      if (checkWinner(simulatedField) === player) {
        return i;
      }
    }
  }
  
  // 2. Block opponent: check if opponent can win with one move
  for (let i = 0; i < 9; i++) {
    if (gameField[i] === -1) {
      const simulatedField = [...gameField];
      simulatedField[i] = opponent;
      if (checkWinner(simulatedField) === opponent) {
        return i;
      }
    }
  }
  
  // 3. Try to create a fork (two winning opportunities)
  // Сначала проверяем углы, так как они дают больше возможностей
  const corners = [0, 2, 6, 8];
  for (const corner of corners) {
    if (gameField[corner] === -1) {
      const simulatedField = [...gameField];
      simulatedField[corner] = player;
      
      // Проверяем, создает ли этот ход несколько угроз
      let threats = 0;
      for (let j = 0; j < 9; j++) {
        if (simulatedField[j] === -1) {
          const futureField = [...simulatedField];
          futureField[j] = player;
          if (checkWinner(futureField) === player) {
            threats++;
            if (threats >= 2) {
              return corner;
            }
          }
        }
      }
    }
  }
  
  // 4. Take center if available
  if (gameField[4] === -1) {
    return 4;
  }
  
  // 5. Take opposite corner if opponent is in corner
  const oppositeCorners = [[0, 8], [2, 6], [6, 2], [8, 0]];
  for (const [opponentCorner, myCorner] of oppositeCorners) {
    if (gameField[opponentCorner] === opponent && gameField[myCorner] === -1) {
      return myCorner;
    }
  }
  
  // 6. Take any empty corner
  for (const corner of corners) {
    if (gameField[corner] === -1) {
      return corner;
    }
  }
  
  // 7. Take any empty side
  const sides = [1, 3, 5, 7];
  for (const side of sides) {
    if (gameField[side] === -1) {
      return side;
    }
  }
  
  // 8. No moves available (should not happen in valid game state)
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