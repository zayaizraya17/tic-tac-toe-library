# Tic-Tac-Toe AI Library

A JavaScript library for calculating optimal moves in Tic-Tac-Toe game.

## Installation

```bash
npm install tic-tac-toe-ai-library
Usage
javascript
const { getOptimalTurn, checkWinner } = require('tic-tac-toe-ai-library');

// Example: Find optimal move for player "o" (0)
const field = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
const optimalMove = getOptimalTurn(field, 0); // Returns 4 (center)

// Check for winner
const winningField = [1, 1, 1, -1, -1, -1, -1, -1, -1];
const winner = checkWinner(winningField); // Returns 1 (player "x")
API
getOptimalTurn(gameField, player)
Returns the optimal move index (0-8) for the given player.

checkWinner(field)
Checks if there's a winner on the field.

License
MIT

text

### **Шаг 5: Попробуйте опубликовать снова**

```bash
# Сначала убедитесь, что вы вошли в систему
npm whoami

# Если не вошли:
npm login
# Введите ваш username, password и email

# Затем опубликуйте
npm publish