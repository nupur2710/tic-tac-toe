
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let occurredNumber = [];
let player1Numbers = [];
let player2Numbers = [];
let playGameInterval;

init();
function init() {
    console.log('game begins');
    occurredNumber = [];
    player1Numbers = [];
    player2Numbers = [];
    playGameInterval = setInterval(playGame, 100);
    let index = 0;
    while (index < 9) {
        document.getElementById(index).innerHTML = '';
        index++
    }
}

function playGame() {
    player1();
    player2();
}
function ifGameDone() {
    if (occurredNumber.length === 9) {
        gameDone();
    }
}

function gameDone() {
    clearInterval(playGameInterval);
    if (window.confirm('Would you like to restart?')) {
        init();
    }
}

function player1() {
    const draw = 'X';
    const no = turn();
    console.log('player 1 no', no);
    player1Numbers.push(no);
    document.getElementById(no).innerHTML = draw;
    const won = checkWinningCondition(player1Numbers);
    if (won || occurredNumber.length === 9) {
        if (won) {
            console.log('player 1 wins');
        }
        gameDone();
    }
}

function player2() {
    const draw = 'O';
    const no = turn();
    console.log('player 2 no', no);
    player2Numbers.push(no);
    document.getElementById(no).innerHTML = draw;
    const won = checkWinningCondition(player2Numbers);
    if (won || occurredNumber.length === 9) {
        if (won) {
            console.log('player 2 wins');
        }
        gameDone();
    }
}
function turn() {
    let currentNumber = generateRandomNumber();
    if (occurredNumber.includes(currentNumber)) {
        do {
            currentNumber = generateRandomNumber();
        }
        while (occurredNumber.includes(currentNumber));
    }
    occurredNumber.push(currentNumber);

    return currentNumber;
}

function generateRandomNumber() {
    return (Math.floor(Math.random() * 10) % 9);
}

function checkWinningCondition(playerNumbers) {
    for (const condition of winningConditions) {
        if (condition.every(no => playerNumbers.includes(no))) {
            return true;
        }
    }
    return false;
}




