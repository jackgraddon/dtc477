// Get all the cards
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let turns = 0;

function incrementTurns() {
    turns++;
    document.getElementById('turns').innerHTML = turns;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.dataset.revealed = true;
    incrementTurns();

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();

    setTimeout(() => {
        if (document.querySelectorAll('.card[data-revealed="match"]').length === 16) {
            alert('You won!');
            location.reload();
        }
    }, 500);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.dataset.revealed = "match";
    secondCard.dataset.revealed = "match";

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.dataset.revealed = false;
        secondCard.dataset.revealed = false;

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));