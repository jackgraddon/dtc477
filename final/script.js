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

  // Hide menu
  menu.classList.add('hidden');

  // Show game
  game.classList.remove('hidden');
});

// Handle game
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.style.backgroundColor = 'red';
  });
});