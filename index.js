    //Calculator 


//FUNCTIONS

function add(number1, number2) {
    result = number1 + number2;
    roundNumber();
    displayScreen.textContent = result;
    num1 = result; //If operator is repeatedly clicked, value accumulates
    num2 = null;    //Allows for updating this value in assignValue function
}

function subtract(number1, number2) {
    result = number1 - number2;
    roundNumber();
    displayScreen.textContent = result;
    num1 = result;
    num2 = null; 
}

function multiply(number1, number2) {
    result = number1 * number2;
    roundNumber();
    displayScreen.textContent = result;
    num1 = result;
    num2 = null; 
}

function divide(number1, number2) {
    result = number1 / number2;
    roundNumber();
    displayScreen.textContent = result;
    num1 = result;
    num2 = null; 
}

function calculate() {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case 'x':
            multiply(num1, num2);
            break;
        case '÷':
            divide(num1, num2);
            break;
    }

    if (equals) {
        num2 = null;
        operator = null;
        equals = false;
    };
}

//Prevents excessively long decimal number results
function roundNumber() {
    
    if (!Number.isSafeInteger(result)) {
        result = result.toFixed(3)
    }
    
}

function display(string) {
    if (displayScreen.textContent === "0") {
        displayScreen.textContent = null;
        displayScreen.textContent += string;
    } else if (displayScreen.textContent.length < 13 && !operator) {
        displayScreen.textContent += string;
    } else if (displayScreen.textContent.length < 13 && operator && !secondEntry) {
        displayScreen.textContent = string;
        secondEntry = true;
    } else if (displayScreen.textContent.length < 13 && operator && secondEntry) {
        displayScreen.textContent += string;
    } else {
        alert("Cannot exceed 13 characters!");
    }
    
}

function reset() {
    num1 = null;
    num2 = null;
    operator = null;
    displayScreen.textContent = "0";
}

function remove() {
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    if (!displayScreen.textContent) displayScreen.textContent = "0";
}

function assignValue() {
    const value = displayScreen.textContent;
    if (!num1) {
        
        num1 = parseFloat(value);
    } else if (num1 && !num2) {
        console.log('triggered');
        num2 = parseFloat(value);
        secondEntry = false;//allows display() to clear screen when chaining equations
        calculate();
    };
};

function addOperator() {
    displayScreen.textContent = displayScreen.textContent + ` ${operator}`;
}

function operateButtons(value) {

    switch (value) {
        case "clear":
            reset();
            break;
        case "delete":
            remove();
            break;
        case "decimal":
            if (displayScreen.textContent.includes(".")) break;
            displayScreen.textContent += ".";
            break;
        case "plusMinus":
            displayScreen.textContent = parseInt(displayScreen.textContent) * -1;
            break;
        case "modulo":
            passValue = parseInt(displayScreen.textContent) / 100;
            assignValue();
            displayScreen.textContent += "%";
            break;
        case "add":
            if (displayScreen.textContent.includes("+")) break;
            assignValue();
            operator = "+";
            addOperator();
            break;
        case "subtract":
            if (displayScreen.textContent.includes("-")) break;
            assignValue();
            operator = "-";
            addOperator();
            break;
        case "multiply":
            if (displayScreen.textContent.includes("x")) break;
            assignValue();
            operator = "x";
            addOperator();
            break;
        case "divide":
            if (displayScreen.textContent.includes("÷")) break;
            assignValue();
            operator = "÷";
            addOperator();
            break;
        case "equals":
            equals = true;
            console.log("clicked");
            assignValue();
            break;
        
    }
}

//GLOBAL VARIABLES
let equals;//boolean toggle that resets values during calculation
let num1;
let num2;
let secondEntry;
let operator;
let result;
let displayString;
const displayScreen = document.getElementById("display");
const numberButtons = document.querySelectorAll(".button.number");
const topButtons = document.querySelectorAll(".button.misc");
const sideButtons = document.querySelectorAll(".button.operator");

//EVENT LISTENERS

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clicked = button.textContent;
        display(clicked);
    })
})

topButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clicked = button.id;
        operateButtons(clicked);
    })
})

sideButtons.forEach(button => {
    button.addEventListener("click", () => {
        const clicked = button.id;
        operateButtons(clicked);
    })
})