// Add this to your script.js
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedPairs = 0;

document.addEventListener('DOMContentLoaded', createBoard);

function createBoard() {
    const memoryGame = document.querySelector('.memory-game');

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.dataset.index = index;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = card;

        const back = document.createElement('div');
        back.classList.add('back');

        cardElement.appendChild(front);
        cardElement.appendChild(back);

        cardElement.addEventListener('click', flipCard);

        memoryGame.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && flippedCards.indexOf(this) === -1) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        card1.classList.add('matched');
        card2.classList.add('matched');

        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            setTimeout(() => {
                alert('Congratulations! You matched all pairs.');
                resetGame();
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function resetGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    matchedPairs = 0;
    setTimeout(() => {
        createBoard();
    }, 300);
}
