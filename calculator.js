const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let previousInput = '';
let operator = '';
let memory = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        switch (value) {
            case 'C':
                currentInput = '';
                previousInput = '';
                operator = '';
                result.value = '';
                break;
            case '=':
                if (currentInput && operator) {
                    try {
                        const resultValue = eval(`${previousInput} ${operator} ${currentInput}`);
                        result.value = parseFloat(resultValue);
                        previousInput = resultValue.toString();
                        currentInput = '';
                        operator = '';
                    } catch (error) {
                        result.value = 'Error: Invalid expression';
                        console.error(error);
                    }
                }
                break;
            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    result.value = currentInput;
                }
                break;
            case '%':
                if (currentInput) {
                    try {
                        const resultValue = eval(`${currentInput} / 100`);
                        currentInput = resultValue.toString();
                        result.value = parseFloat(resultValue);
                    } catch (error) {
                        result.value = 'Error: Invalid expression';
                        console.error(error);
                    }
                }
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1);
                result.value = currentInput;
                break;
            case 'M+':
                memory += parseFloat(currentInput);
                currentInput = '';
                break;
            case 'M-':
                memory -= parseFloat(currentInput);
                currentInput = '';
                break;
            case 'MR':
                currentInput = memory.toString();
                result.value = parseFloat(currentInput);
                break;
            case 'MC':
                memory = 0;
                break;
            case 'sin':
            case 'cos':
            case 'tan':
                try {
                    const resultValue = Math[value](parseFloat(currentInput));
                    currentInput = resultValue.toString();
                    result.value = parseFloat(resultValue);
                } catch (error) {
                    result.value = 'Error: Invalid argument';
                    console.error(error);
                }
                break;
            case '/':
            case '*':
            case '-':
            case '+':
                if (currentInput) {
                    operator = value;
                    previousInput = currentInput;
                    result.value = `${previousInput} ${operator}`;
                    currentInput = '';
                }
                break;
            default:
                currentInput += value;
                result.value = `${previousInput} ${operator} ${currentInput}`;
                break;
        }
    });
});
