const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife;
try {
    chosenMaxLife = getChosenMaxLife();
} catch (e) {
    chosenMaxLife = 100;
    alert(e.message)
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let logEntries = [];

function normalAttackHandler() {
    attackHandler(ATTACK_VALUE);
}

function getChosenMaxLife() {
    const input_val = prompt('Choose max life', '100');
    let max_life = parseInt(input_val);

    if (isNaN(max_life) || max_life <= 0) {
        throw {message: 'Invalid user input, not a number!'};
    }

    return max_life;
}

function healPlayer() {
    if (currentPlayerHealth < chosenMaxLife) {
        increasePlayerHealth(HEAL_VALUE)
        currentPlayerHealth += HEAL_VALUE;
        writeToLog('HEAL', HEAL_VALUE);

        dealDamageToPlayer(MONSTER_ATTACK_VALUE);

        let msg = checkConditions(currentPlayerHealth, currentMonsterHealth);

        if (msg) {
            alert(msg);
        }
    } else {
        alert(`You can't heal above max ${chosenMaxLife} health!`)
    }
}

function strongAttackHandler() {
    attackHandler(STRONG_ATTACK_VALUE);
}

function attackHandler(playerAttackValue) {
    dealDamageToPlayer(MONSTER_ATTACK_VALUE);
    dealDamageToMonster(playerAttackValue);

    let msg = checkConditions(currentPlayerHealth, currentMonsterHealth);

    if (msg) {
        alert(msg);
    }
}

function dealDamageToPlayer(monsterAttackValue) {
    const monsterDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -= monsterDamage;
    writeToLog('DAMAGE_TO_PLAYER', monsterDamage);
}

function dealDamageToMonster(playerAttackValue) {
    const playerDamage = dealMonsterDamage(playerAttackValue);
    currentMonsterHealth -= playerDamage;
    writeToLog('DAMAGE_TO_MONSTER', playerDamage);
}

function checkConditions(currentPlayerHealth, currentMonsterHealth) {
    let msg;

    if (checkWin(currentPlayerHealth, currentMonsterHealth)) {
        msg = "You've won!";
    } else if (checkLoose(currentPlayerHealth, currentMonsterHealth)) {
        msg = "You've lost!";
    } else if (checkDraw(currentPlayerHealth, currentMonsterHealth)) {
        msg = "It's a draw!";
    }

    if (msg) {
        reset();
    }

    return msg
}

function checkWin(playerHealth, monsterHealth) {
    return monsterHealth <= 0 && playerHealth > 0;
}

function checkLoose(playerHealth, monsterHealth) {
    return playerHealth <= 0 && monsterHealth > 0;
}

function checkDraw(playerHealth, monsterHealth) {
    return playerHealth <= 0 && monsterHealth <= 0;
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function writeToLog(event, value) {
    const logEntry = {
        event_name: event,
        event_value: value,
        playerHealth: currentPlayerHealth,
        monsterHealth: currentMonsterHealth
    }

    logEntries.push(logEntry);
}

function printLogHandler() {
    for (const logEntry of logEntries) {
        for (const key in logEntry) {
            console.log(`${key}: ${logEntry[key]}`);
        }
    }
}

adjustHealthBars(chosenMaxLife);

attackBtn.addEventListener('click', normalAttackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayer);
logBtn.addEventListener('click', printLogHandler);