const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS'

let gameRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
    if (isPlayerChoiceInvalid(selection)) {
        alert('Invalid choice');
        return ROCK;
    } else {
        return selection;
    }
}

/**
 *
 * @param selection
 * @returns {boolean}
 */
const isPlayerChoiceInvalid = (selection) =>
    selection !== ROCK && selection !== PAPER && selection !== SCISSORS;


const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
}


startGameBtn.addEventListener('click', () => {
    if (gameRunning) {
        return;
    }
    gameRunning = true;
    console.log('The game is starting');
    const playerSelection = getPlayerChoice();
    const computerChoice = getComputerChoice();
});