const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

const getUserNumInput = () =>
    parseInt(userInput.value);

function calcResult(operator) {
    const enteredNumber = getUserNumInput();
    const initialResult = currentResult;

    if (operator === '+') {
        currentResult += enteredNumber;
    } else if (operator === '-') {
        currentResult -= enteredNumber;
    } else if (operator === '*') {
        currentResult *= enteredNumber;
    } else if (operator === '/') {
        if (enteredNumber) {
            currentResult /= enteredNumber;
        }
    }

    createAndWriteOutput(operator, initialResult, enteredNumber);
    createLogEntry(operator, initialResult, enteredNumber);
}

/**
 * Generate output
 * @param operator - math operator
 * @param resultBefore - result before calc
 * @param calcNum - number to operate
 */
function createAndWriteOutput(operator, resultBefore, calcNum) {
    const calcDescr = `${resultBefore} ${operator} ${calcNum}`;
    outputResult(currentResult, calcDescr);
}

/**
 * Create new log entry
 * @param operator - math operator
 * @param resultBefore - result before calculation
 * @param calcNum - number to use to calculation
 * @returns {[]} - modified log entries
 */
function createLogEntry(operator, resultBefore, calcNum) {
    const logEntry = {
        operation: operator,
        prevResult: resultBefore,
        number: calcNum
    };

    logEntries.push(logEntry)
    console.log(logEntries)

    return logEntries
}

addBtn.addEventListener('click', calcResult.bind(this, '+'));
subtractBtn.addEventListener('click', calcResult.bind(this, '-'));
multiplyBtn.addEventListener('click', calcResult.bind(this, '*'));
divideBtn.addEventListener('click', calcResult.bind(this, '/'));