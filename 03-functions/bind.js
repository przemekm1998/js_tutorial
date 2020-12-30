const combine = (resultHandler, operation, ...numbers) => {
    const validateNumber = number =>
        isNaN(number) ? 0 : number;

    let sum = 0;

    for (const num of numbers) {
        if (operation === 'ADD') {
            sum += validateNumber(num);
        } else {
            sum -= validateNumber(num);
        }
    }

    resultHandler(sum);
}

const showResult = (messageText, result) =>
    alert(messageText + ' ' + result)

combine(showResult.bind(this, "Result after adding:"), "ADD", 1, 5);
combine(showResult.bind(this, "Result after subtracting:"), "SUBTRACT", 1, 9, 8);