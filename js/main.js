const colors = {
    '1': 'aqua',
    '-1': 'purple',
    'null': ''
}

const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/*----- Variables -----*/
let board, turn, winner;

/*----- Cached Element References -----*/
const cells = document.querySelectorAll('section div');
const msg = document.getElementById('msg');
const squares = document.querySelector('section');
const playAgainBtn = document.querySelector('button');

/*----- Event Listeners -----*/
squares.addEventListener('click', pickCell);
playAgainBtn.addEventListener('click', init);

/*----- Functions -----*/
 init();

 function init() {
     board = [null, null, null, null, null, null, null, null, null];
     turn = 1;
     winner = null;
     renderBoard();
 }

 function renderBoard() {
     board.forEach((cell, i) => {
         cells[i].style.background = colors[cell];
     });
     if (winner === 'tie') {
         msg.style.color = '#CC0D0F';
         msg.innerText = "It's a tie!";
     }
     else if (winner) {
         msg.style.color = colors[turn*-1];
         msg.innerText = colors[winner] + " wins!";
     }
     else {
         msg.style.color = colors[turn];
         msg.innerText = colors[turn] + "'s turn";
     }
 }

function pickCell(e) {
    const id = e.target.id;
    if (board[id] || winner) return;
    board[id] = turn;
    turn *= -1;
    winner = checkWinner();
    renderBoard()
}

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        if (board[winConditions[i][0]] === board[winConditions[i][1]] && 
            board[winConditions[i][1]] === board[winConditions[i][2]]) return board[winConditions[i][0]];
    }
    if (board.includes(null)) return null;
    return 'tie';
}