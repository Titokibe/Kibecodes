const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            result.value = '';
        } else if (value === '=') {
            if (currentInput && operator && previousInput) {
                try {
                    const resultValue = eval(`${previousInput} ${operator} ${currentInput}`);
                    result.value = resultValue;
                    previousInput = resultValue;
                    currentInput = '';
                    operator = '';
                } catch (error) {
                    result.value = 'Error';
                    console.error(error);
                }
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                operator = value;
                previousInput = currentInput;
                result.value = `${previousInput} ${operator}`;
                currentInput = ''; 
            }
        } else {
            currentInput += value;
            result.value = `${previousInput} ${operator} ${currentInput}`;
        }
    });
});
