// Rock, Paper, Scissors game logic

const choices = ['rock', 'paper', 'scissors'];

let playerChoice = '';
let computerChoice = '';
let wins = 0;
let losses = 0;
let draws = 0;

const playerChoiceButtons = document.querySelectorAll('[data-choice]');
const computerMoveDisplay = document.getElementById('computer-move');
const resultDisplay = document.getElementById('result');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');

// Add click event listeners to player choice buttons
playerChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        playerChoice = button.dataset.choice;
        computerChoice = generateComputerChoice();
        displayChoices();
        determineResult();
        updateScoreboard();
    });
});

// Function to generate a random computer choice
function generateComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to display player and computer choices
function displayChoices() {
    computerMoveDisplay.textContent = computerChoice;
}

// Function to determine the result of the game
function determineResult() {
    if (playerChoice === computerChoice) {
        resultDisplay.textContent = 'It\'s a draw!';
        draws++;
    } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
               (playerChoice === 'paper' && computerChoice === 'rock') ||
               (playerChoice === 'scissors' && computerChoice === 'paper')) {
        resultDisplay.textContent = 'You win!';
        wins++;
    } else {
        resultDisplay.textContent = 'You lose!';
        losses++;
    }
}

// Function to update the scoreboard
function updateScoreboard() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    drawsDisplay.textContent = draws;
}
