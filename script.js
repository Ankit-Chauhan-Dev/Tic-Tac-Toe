// Selecting DOM Elements
const cells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restart-btn');
const alertBox = document.querySelector('.alertBox');

// Game Variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

// Winning Conditions (Indexes of the grid)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Start Game Initialization
function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

// Handle Cell Click
function handleClick(e) {
    const cell = e.target;

    // Check if the cell is empty
    if (cell.textContent === '') {
        cell.textContent = playerTurn;

        // Check for Win
        if (checkWin()) {
            showAlert(`${playerTurn} is the Winner!`);
            disableCells();
        } 
        // Check for Tie
        else if (checkTie()) {
            showAlert("It's a Tie!");
            disableCells();
        } 
        // Change Turn
        else {
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn}`);
        }
    }
}

// Change Player Turn
function changePlayerTurn() {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    } else {
        playerTurn = currentPlayer;
    }
}

// Check Win Condition
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        // Check if all three cells match the current player and aren't empty
        if (cells[pos1].textContent !== '' &&
            cells[pos1].textContent === cells[pos2].textContent &&
            cells[pos2].textContent === cells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

// Check Tie Condition
function checkTie() {
    let emptyCellsCount = 0;
    cells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });

    // If no empty cells and no winner, it's a tie
    return emptyCellsCount === 0 && !checkWin();
}

// Disable Cells after game ends
function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

// Restart Game
function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    playerTurn = currentPlayer;
    startGame();
}

// Show Alert
function showAlert(message) {
    alertBox.style.display = 'block';
    alertBox.textContent = message;
    
    // Auto-dismiss alert after 3 seconds
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Event Listeners
restartBtn.addEventListener('click', restartGame);

// Initialize Game
startGame();