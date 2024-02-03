// Hangman game logic

const words = ['hangman', 'javascript', 'developer', 'simple', 'coding', 'challenge', 'victory', 'quicksand'];

let selectedWord = '';
let guessedLetters = [];
let hangmanDisplay = '';
let wins = 0;
let losses = 0;

const hangmanContainer = document.getElementById('hangman');
const wordDisplay = document.getElementById('word-display');
const alphabetContainer = document.getElementById('alphabet');
const hintBtn = document.getElementById('hint-btn');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');

// Set up hint button click event
hintBtn.addEventListener('click', () => {
    provideHint();
});

// Function to pick a random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Function to initialize the game
function initGame() {
    selectedWord = getRandomWord();
    guessedLetters = [];
    hangmanDisplay = '_'.repeat(selectedWord.length);

    updateHangmanDisplay();
    updateWordDisplay();
    updateAlphabet();
    updateWins();
    updateLosses();
}

// Function to update the hangman display
function updateHangmanDisplay() {
    hangmanContainer.textContent = hangmanDisplay;
}

// Function to update the word display
function updateWordDisplay() {
    const displayText = selectedWord
        .split('')
        .map((char, index) => (char === ' ' ? ' ' : hangmanDisplay[index]))
        .join(' ');

    wordDisplay.textContent = displayText;
}

// Function to update the alphabet container
function updateAlphabet() {
    alphabetContainer.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (const letter of alphabet) {
        const letterBtn = document.createElement('div');
        letterBtn.classList.add('alphabet-letter');
        letterBtn.textContent = letter;
        letterBtn.addEventListener('click', () => handleLetterClick(letter));
        alphabetContainer.appendChild(letterBtn);
    }
}

// Function to handle letter clicks
function handleLetterClick(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        checkGuess(letter);
    }
}

// Function to check if the guessed letter is in the word
function checkGuess(letter) {
    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            hangmanDisplay = replaceAt(hangmanDisplay, i, selectedWord[i]);
            correctGuess = true;
        }
    }

    updateHangmanDisplay();
    updateWordDisplay();

    if (!hangmanDisplay.includes('_')) {
        handleWin();
    }

    if (!correctGuess) {
        handleIncorrectGuess();
    }
}

// Function to replace a character at a specific index in a string
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + 1);
}

// Function to handle incorrect guesses
function handleIncorrectGuess() {
    const incorrectGuesses = guessedLetters.filter(letter => !selectedWord.includes(letter));

    if (incorrectGuesses.length >= 6) {
        handleLoss();
    }
}

// Update handleWin function in script.js
function handleWin() {
    wins++;
    updateWins();
    showWinModal();
    // Comment out or remove the resetGame() call so the modal stays open until the player decides to start a new game
    // resetGame();
}

// Function to show the win modal
function showWinModal() {
    const modal = document.getElementById('win-modal');
    const newGameBtn = document.getElementById('new-game-btn');
    modal.style.display = 'flex';

    // Close the modal when the close button is clicked
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal and start a new game when the New Game button is clicked
    newGameBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetGame();
    });
}

// Function to handle a loss
function handleLoss() {
    losses++;
    updateLosses();
    resetGame();
}

// Function to provide a hint by revealing a letter in the word
function provideHint() {
    let unrevealedIndexes = [];
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] !== ' ' && !guessedLetters.includes(selectedWord[i])) {
            unrevealedIndexes.push(i);
        }
    }

    if (unrevealedIndexes.length > 0) {
        const randomIndex = unrevealedIndexes[Math.floor(Math.random() * unrevealedIndexes.length)];
        hangmanDisplay = replaceAt(hangmanDisplay, randomIndex, selectedWord[randomIndex]);
        updateHangmanDisplay();
        updateWordDisplay();
    }
}

// Function to reset the game
function resetGame() {
    initGame();
}

// Function to update the wins display
function updateWins() {
    winsDisplay.textContent = wins;
}

// Function to update the losses display
function updateLosses() {
    lossesDisplay.textContent = losses;
}

// Initialize the game
initGame();