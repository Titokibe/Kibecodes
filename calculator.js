const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = '';
let memory = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            operator = '';
            result.value = '';
        } else if (value === '=') {
            if (currentInput && operator) {
                try {
                    const resultValue = eval(currentInput + operator + result.value);
                    currentInput = resultValue.toString();
                    operator = '';
                    result.value = resultValue;
                } catch (error) {
                    result.value = 'Error: Invalid expression';
                    console.error(error);
                }
            }
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += value;
                result.value = currentInput;
            }
        } else if (value === '%' && currentInput) {
            try {
                const resultValue = eval(currentInput + '/100');
                currentInput = resultValue.toString();
                result.value = resultValue;
            } catch (error) {
                result.value = 'Error: Invalid expression';
                console.error(error);
            }
        } else if (value === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            result.value = currentInput;
        } else if (value === 'M+') {
            memory += parseFloat(currentInput);
            currentInput = '';
        } else if (value === 'M-') {
            memory -= parseFloat(currentInput);
            currentInput = '';
        } else if (value === 'MR') {
            currentInput = memory.toString();
            result.value = currentInput;
        } else if (value === 'MC') {
            memory = 0;
        } else if (value === 'sin' || value === 'cos' || value === 'tan') {
            try {
                const resultValue = Math[value](parseFloat(currentInput));
                currentInput = resultValue.toString();
                result.value = resultValue;
            } catch (error) {
                result.value = 'Error: Invalid argument';
                console.error(error);
            }
        } else if (value === '/' || value === '*' || value === '-' || value === '+') {
            if (currentInput) {
                operator = value;
                result.value += ` ${operator} `;
            }
        } else {
            currentInput += value;
            result.value = currentInput;
        }
    });
});