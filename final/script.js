// Declare variables
const menu = document.querySelector('#menu');
const start = document.querySelector('#start');
let options = {
  'mode': '',
  'players': 0,
  'connection': ''
}
const game = document.querySelector('#game');
const cells = document.querySelectorAll('.cell');

// Handle menu
start.addEventListener('click', () => {
  // Get options
  const mode = document.querySelector('select[name="gamemode"]');
  const players = document.querySelector('select[name="players"]');
  const connection = document.querySelector('select[name="connection"]');

  // Switch the gamemode
  switch (mode.value) {
    case '1':
      options.mode = 'classic';
      break;
    case '2':
      options.mode = 'frantic';
      break;
  }
  // Set the players
  options.players = parseInt(players.value);
  // Switch the connection
  
  switch (mode.value) {
    case '1':
      options.connection = 'locally';
      break;
    case '2':
      options.connection = 'online';
      break;
  }

  // Log options
  console.log(options);
});

// Handle game
let board = [];
let currentPlayer = 1;
let won = false;

// Initialize the board (a 6x7 grid of 'none' values)
for (let i = 0; i < 6; i++) {
  board.push(new Array(7).fill(0));
}
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!won) {
      // Get the column index of the clicked cell
      const columnIndex = Array.from(cells).indexOf(cell) % 7;

      // Place the player's token in the clicked cell if empty
      if (cell.dataset.selected == "none") {
        // Find the last empty row in the clicked column
        const lastEmptyRow = findLastEmptyRow(columnIndex);

        // If the column is full, return
        if (lastEmptyRow === -1) {
          return;
        }

        // Place the token in the last empty row of the clicked column
        cells[columnIndex + lastEmptyRow * 7].dataset.selected = 'player' + currentPlayer;
        board[lastEmptyRow][columnIndex] = currentPlayer;

        // Check for a win condition
        if (checkWinCondition()) {
          won = currentPlayer;
          document.querySelector('#playersTurn').textContent = 'Player ' + currentPlayer + ' wins!';
        }

        // Switch the current player
        document.querySelector('section#game').dataset.turn = currentPlayer === 1 ? '2' : '1';
        document.querySelector('#playersTurn').textContent = currentPlayer === 1 ? 'Player 2' : 'Player 1';
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      } else {
        return;
      }
    }
  });
});

// Helper function to find the last empty row in a column
function findLastEmptyRow(columnIndex) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][columnIndex] === 0) {
      return row;
    }
  }
  return -1;
}

// Function to check for a win condition
function checkWinCondition() {
  // Check horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === currentPlayer &&
          board[row][col + 1] === currentPlayer &&
          board[row][col + 2] === currentPlayer &&
          board[row][col + 3] === currentPlayer) {
        return true;
      }
    }
  }

  // Check vertical
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === currentPlayer &&
          board[row + 1][col] === currentPlayer &&
          board[row + 2][col] === currentPlayer &&
          board[row + 3][col] === currentPlayer) {
        return true;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === currentPlayer &&
          board[row + 1][col + 1] === currentPlayer &&
          board[row + 2][col + 2] === currentPlayer &&
          board[row + 3][col + 3] === currentPlayer) {
        return true;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (board[row][col] === currentPlayer &&
          board[row + 1][col - 1] === currentPlayer &&
          board[row + 2][col - 2] === currentPlayer &&
          board[row + 3][col - 3] === currentPlayer) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to get the player of a cell
function getCellPlayer(row, col) {
  const cell = board[row, col];
  return cell ? cell : 0;
}