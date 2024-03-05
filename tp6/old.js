// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["x", "x", "o"];
let rowB = ["o", "o", "x"];
let rowC = ["x", "o", "x"];

// checkGameboard:
//   First, logs the gameboard to the console.
//   Then, checks three ararys (rowA, rowB, rowC) to see if they contain winning patterns for both x and o.
//   If either x or o has a winning pattern, the function returns a win result ('x' or 'o', depending on winner).
//   If neither are detected, a 'd' for draw or a '-' for ongoing will be returned.
function checkGameboard(rowA, rowB, rowC) {
  // Log the gameboard to the console
  console.log((rowA + "\n" + rowB + "\n" + rowC).replaceAll(",", " "));

  // Check rows
  if (
    rowA.every((val) => val === "x") ||
    rowB.every((val) => val === "x") ||
    rowC.every((val) => val === "x")
  ) {
    console.log("X wins with a row!");
    return "x";
  }
  if (
    rowA.every((val) => val === "o") ||
    rowB.every((val) => val === "o") ||
    rowC.every((val) => val === "o")
  ) {
    console.log("O wins with a row!");
    return "o";
  }

  Console.log("No one wins with a row...");

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (rowA[i] === "x" && rowB[i] === "x" && rowC[i] === "x") {
      console.log("X wins with a column!");
      return "x";
    }
    if (rowA[i] === "o" && rowB[i] === "o" && rowC[i] === "o") {
      console.log("O wins with a column!");
      return "o";
    }
  }

  Console.log("No one wins with a column...");

  // Check diagonals
  if (
    (rowA[0] === "x" && rowB[1] === "x" && rowC[2] === "x") ||
    (rowA[2] === "x" && rowB[1] === "x" && rowC[0] === "x")
  ) {
    console.log("X wins with a diagonal!");
    return "x";
  }
  if (
    (rowA[0] === "o" && rowB[1] === "o" && rowC[2] === "o") ||
    (rowA[2] === "o" && rowB[1] === "o" && rowC[0] === "o")
  ) {
    console.log("O wins with a diagonal!");
    return "o";
  }

  Console.log("No one wins with a diagonal...");

  // Check for draw
  if (rowA.concat(rowB, rowC).every((val) => val != "-")) {
    console.log("It was a draw!");
    return "d";
  }

  // If none of the above conditions are met, the game is still ongoing
  console.log("Game is ongoing, or something broke...");
  return "-";
}

// **********************************************
// ***** DO NOT EDIT THE CODE BELOW THIS LINE
// **********************************************

// get a handle on the DOM element to be updated with the outcome
let gameOutputMsg = document.querySelector("#gameResult span");

// call your function checkGameboard() with the 3 rows
let winState = checkGameboard(rowA, rowB, rowC);

// test the returned value of the function
if (winState == "x") {
  gameOutputMsg.innerHTML = "X wins";
} else if (winState == "o") {
  gameOutputMsg.innerHTML = "O wins";
} else if (winState == "d") {
  gameOutputMsg.innerHTML = "draw";
} else {
  gameOutputMsg.innerHTML = "unknown";
}
