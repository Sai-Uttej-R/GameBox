const board = document.getElementById('board');
const turnIndicator = document.getElementById('turn');
const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const playAgainBtn = document.getElementById('playAgainBtn');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

// Display initial scores
updateScoreDisplay();

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.index;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinnerCells(combo);
            updateScores(gameBoard[a]);
            showWinnerModal(`${gameBoard[a]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        showWinnerModal("It's a draw!");
    }
}

function highlightWinnerCells(cells) {
    cells.forEach(index => {
        const cell = board.children[index];
        cell.classList.add('winner-cell');
    });
}

function showWinnerModal(message) {
    winnerText.textContent = message;
    winnerModal.style.display = 'block';
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Remove highlighting from winner cells
    const winnerCells = document.querySelectorAll('.winner-cell');
    winnerCells.forEach(cell => cell.classList.remove('winner-cell'));

    // Clear board and update turn indicator
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    updateTurnIndicator();
    updateScoreDisplay();

    // Hide modal
    winnerModal.style.display = 'none';
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
    turnIndicator.style.color = currentPlayer === 'X' ? '#007bff' : '#28a745';
}

function updateScores(winner) {
    if (winner === 'X') {
        playerXScore++;
    } else if (winner === 'O') {
        playerOScore++;
    }

    // Update local storage
    localStorage.setItem('playerXScore', playerXScore);
    localStorage.setItem('playerOScore', playerOScore);

    // Update score display
    updateScoreDisplay();
}

function updateScoreDisplay() {
    playerXScoreDisplay.textContent = `Player X: ${playerXScore}`;
    playerOScoreDisplay.textContent = `Player O: ${playerOScore}`;
}

// Play Again button
playAgainBtn.addEventListener('click', resetGame);
