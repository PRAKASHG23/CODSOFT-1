// State variables
let currentInput = '0';
let previousInput = '';
let currentOperator = null;
let shouldResetDisplay = false;

// DOM Elements mapped precisely
const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');

// DOM Manipulation dynamically modifying elements
function updateDisplay() {
    currentOperandDisplay.innerText = currentInput;
    if (currentOperator != null) {
        previousOperandDisplay.innerText = `${previousInput} ${currentOperator}`;
    } else {
        previousOperandDisplay.innerText = '';
    }
}

// Function managing numbers and strings conceptually
function appendNumber(number) {
    // Prevent multiple decimal points utilizing strict if constraints
    if (number === '.' && currentInput.includes('.')) return;
    
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        // Allows multiple digit appending mathematically
        currentInput += number;
    }
    
    updateDisplay();
}

// Method for registering states
function appendOperator(operator) {
    if (currentInput === 'Error') currentInput = '0';
    if (currentOperator !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    currentOperator = operator;
    shouldResetDisplay = true;
    updateDisplay();
}

// Method controlling UI sweeps
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Handles digit deletion via Backspace
function deleteNumber() {
    if (shouldResetDisplay || currentInput === 'Error') {
        clearDisplay();
        return;
    }
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '' || currentInput === '-') {
        currentInput = '0';
    }
    updateDisplay();
}

// Using complex conditional if-else statements per requirements
function calculate() {
    if (currentOperator === null || shouldResetDisplay || currentInput === 'Error') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    // Explicit use of if-else statements requested in Prompt
    if (currentOperator === '+') {
        result = prev + current;
    } else if (currentOperator === '-' || currentOperator === '−') {
        result = prev - current;
    } else if (currentOperator === '*' || currentOperator === '×') {
        result = prev * current;
    } else if (currentOperator === '/' || currentOperator === '÷') {
        if (current === 0) {
            result = 'Error';
        } else {
            result = prev / current;
        }
    } else {
        return;
    }
    
    if (result === 'Error') {
        currentInput = 'Error';
    } else {
        currentInput = (Math.round(result * 10000000) / 10000000).toString();
    }
    
    currentOperator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Implementing Event Listeners securely appended via Loops
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendOperator(button.innerText);
    });
});

// Resolving static UI element listeners
equalsButton.addEventListener('click', calculate);
clearButton.addEventListener('click', clearDisplay);

// Keyboard functionality map equivalent
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '=' || event.key === 'Enter') {
        event.preventDefault(); // Prevent accidental form submissions/scrolling
        calculate();
    }
    if (event.key === 'Escape') clearDisplay();
    if (event.key === 'Backspace') deleteNumber();
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('−');
    if (event.key === '*') appendOperator('×');
    if (event.key === '/') appendOperator('÷');
});

// Initializing the Default Value
updateDisplay();
