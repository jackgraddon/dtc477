// Define the game
const game = {
  // Game variables
  title: "Tic Tac Toe", // The title of the game
  turn: " ", // The current turn
  win: " ", // The winner of the current game
  gameboardArray: [], // A 2D Array of the gameboard to track player movement

  // DOM elements
  header: document.querySelector("h1#game-title"), // The DOM header
  status: document.querySelector("h2#game-status"), // The DOM subtitle
  gameboard: document.querySelector("table#gameboard"), // The DOM gameboard
  squares: Array.from(document.querySelectorAll("td")), // The DOM squares

  // Setup the game
  setup() {
    // Add click events to all the squares
    this.squares.forEach((square) => {
      square.addEventListener("click", this.handleTurn);
    });

    // Set the initial turn (randomly x or o)
    this.turn = Math.random() > 0.5 ? "o" : "x";

    // Clear the winner
    this.win = " ";

    // Clear the gameboardArray
    this.gameboardArray = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    // Update the UI
    this.onTurnChange();
    this.updateUI();

    // Update the UI with the game title
    this.header.textContent = this.title;
  },

  // Game logic to handle a turn
  handleTurn(e) {
    // If the game is over, return early
    if (game.win != " ") return;

    // Get the row and column of the clicked square
    let row = e.target.parentElement.rowIndex;
    let col = e.target.cellIndex;

    // Access the gameboardArray and update the value
    if (game.gameboardArray[row][col] == " ") {
      game.gameboardArray[row][col] = game.turn;
    } else {
      // If the square is already taken, return early
      return;
    }

    // Log the gameboard
    console.log(game.gameboardArray.join("\n---------\n").replace(/,/g, " | "));

    // Keep the UI in sync with the gameboardArray
    game.updateUI();

    // Check if a player has won
    switch ((game.win = game.checkWin())) {
      case "x": // If x wins
        game.status.textContent = "❌ wins!";
        break;
      case "o": // If o wins
        game.status.textContent = "⭕ wins!";
        break;
      case "d": // If it's a draw
        game.gameboard.classList.remove("x-turn", "o-turn");
        game.status.textContent = "It's a draw!";
        break;
      default: // If the game is still ongoing
        game.nextTurn();
        break;
    }
  },

  // Swap the turn
  nextTurn() {
    this.turn = this.turn === "x" ? "o" : "x";
    this.onTurnChange();
  },

  // Check if a player has won
  checkWin() {
    // Check if either x or o has won in a row
    for (let i = 0; i < game.gameboardArray.length; i++) {
      if (game.gameboardArray[i].every((val) => val === "x")) {
        return "x";
      } else if (game.gameboardArray[i].every((val) => val === "o")) {
        return "o";
      }
    }

    // Check columns
    for (let i = 0; i < this.gameboardArray.length; i++) {
      if (
        game.gameboardArray[0][i] === "x" &&
        this.gameboardArray[1][i] === "x" &&
        this.gameboardArray[2][i] === "x"
      ) {
        return "x";
      } else if (
        this.gameboardArray[0][i] === "o" &&
        this.gameboardArray[1][i] === "o" &&
        this.gameboardArray[2][i] === "o"
      ) {
        return "o";
      }
    }

    // Check diagonals
    if (
      (this.gameboardArray[0][0] === "x" &&
        this.gameboardArray[1][1] === "x" &&
        this.gameboardArray[2][2] === "x") ||
      (this.gameboardArray[0][2] === "x" &&
        this.gameboardArray[1][1] === "x" &&
        this.gameboardArray[2][0] === "x")
    ) {
      return "x";
    } else if (
      (this.gameboardArray[0][0] === "o" &&
        this.gameboardArray[1][1] === "o" &&
        this.gameboardArray[2][2] === "o") ||
      (this.gameboardArray[0][2] === "o" &&
        this.gameboardArray[1][1] === "o" &&
        this.gameboardArray[2][0] === "o")
    ) {
      return "o";
    }

    // Check for draw
    if ([].concat(...this.gameboardArray).every((val) => val !== " ")) {
      return "d";
    }

    // If none of the above conditions are met, the game is still ongoing
    return " ";
  },

  // Handles the turn change, and updates the UI
  onTurnChange() {
    // Update the UI with the current turn
    switch (this.turn) {
      case "x":
        this.status.textContent = `It's ❌'s turn!`;
        break;
      case "o":
        this.status.textContent = `It's ⭕'s turn!`;
        break;
    }

    // Change the hover effect on the gameboard to show the current turn
    this.gameboard.classList.remove("x-turn", "o-turn");
    this.gameboard.classList.add(`${this.turn}-turn`);
  },

  // Update the UI with the gameboardArray
  updateUI() {
    // Loop through the gameboardArray and update the gameboard
    for (let i = 0; i < game.gameboardArray.length; i++) {
      for (let j = 0; j < game.gameboardArray[i].length; j++) {
        // Update the gameboard with the value from the gameboardArray
        switch (
          game.gameboardArray[i][j] // Convert simple x or o to emoji!
        ) {
          case "x":
            game.gameboard.rows[i].cells[j].innerText = "❌";
            break;
          case "o":
            game.gameboard.rows[i].cells[j].innerText = "⭕";
            break;
          case " ":
            game.gameboard.rows[i].cells[j].innerText = " ";
            break;
        }
      }
    }
  },
};

game.setup();
