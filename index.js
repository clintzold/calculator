    //Calculator 


//FUNCTIONS

function add(number1, number2) {
    result = number1 + number2;
    roundNumber();
    displayScreen.textContent = result;
    num1 = result; //If operator is repeatedly clicked, value accumulates
    num2 = null;    //Allows for updating this value in assignValue function when operations are chained in sequence
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

function percent(number1, number2) {
    result = (number1 / 100) * number2;
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
            if (num2 === 0) {
                alert("Cannot divide by ZERO!")
                break;
            } else {
                divide(num1, num2);
            break;
            };
        case '%':
            percent(num1, num2);
    }

    if (equals) {

        num1 = null;
        num2 = null;
        operator = null;
        secondEntry = false;

    };
};

//Prevents excessively long decimal number results
function roundNumber() {
    
    if (!Number.isSafeInteger(result)) {

        result = parseFloat(result.toFixed(3));

    };
    
};

function display(string) {
    //Stops numbers from being added to result of previous calculation(causing confusion with operand value assignment)
    if (equals) {

        displayScreen.textContent = null;
        equals = false;

    }

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
        reset();

    };
    
}

function reset() {
    num1 = null;
    num2 = null;
    operator = null;
    displayScreen.textContent = "0";
    secondEntry = false;
}

function remove() {
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    if (!displayScreen.textContent) displayScreen.textContent = "0";
}

//checks if number is negative or if the '-' operator is being used
function negativePositionEnd() {
    if (displayScreen.textContent.at(-1) == "-") return true;
}

function assignValue() {
    const value = displayScreen.textContent;
    
    if (!num1) {

        num1 = parseFloat(value);

    } else if (num1 && !num2 && secondEntry) {
    
        num2 = parseFloat(value);
        secondEntry = false;//allows display() to clear screen when chaining equations
        calculate();
    };
};

function addOperator() {
    displayScreen.textContent = displayScreen.textContent + ` ${operator}`;
}

function operateButtons(value) {

    const includesAny = operatorTypes.some(op => displayScreen.textContent.includes(op));//Stops multiple operators from appearing on screen

    switch (value) {

        case "clear":
            reset();
            break;

        case "delete":
            //Allows operator to be removed and first operand to be changed before second operand is added
            if (includesAny || negativePositionEnd()) {
                remove();
                operator = null;
                num1 = null;
                }
            remove();
            break;

        case "decimal":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            displayScreen.textContent += ".";
            equals = false;
            break;

        case "plusMinus":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            displayScreen.textContent = parseFloat(displayScreen.textContent) * -1;
            break;

        case "modulo":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            assignValue();
            operator = "%";
            displayScreen.textContent += " %";
            break;

        case "add":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            assignValue();
            operator = "+";
            addOperator();
            break;

        case "subtract":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            assignValue();
            operator = "-";
            addOperator();
            break;

        case "multiply":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            assignValue();
            operator = "x";
            addOperator();
            break;

        case "divide":

            if (includesAny) { break;
                } else if (negativePositionEnd()) {
                    break;
                };
            assignValue();
            operator = "÷";
            addOperator();
            break;

        case "equals":

            equals = true;
            console.log("clicked");
            assignValue();
            break;
        
    };
};

//GLOBAL VARIABLES

const operatorTypes = ["+", "x", "%", "÷"];

let num1;
let num2;
let operator;
let equals;//Boolean used to reset values during calculation if Equals button is pressed
let secondEntry;//Boolean used for proper display and variable assigning
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