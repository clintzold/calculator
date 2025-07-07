    //Calculator 


//FUNCTIONS

function add(number1, number2) {
    result = number1 + number2;
    roundNumber();
    console.log(result)
}

function subtract(number1, number2) {
    result = number1 - number2;
    roundNumber();
    console.log(result)
}

function multiply(number1, number2) {
    result = number1 * number2;
    roundNumber();
    console.log(result)
}

function divide(number1, number2) {
    result = number1 / number2;
    roundNumber();
    console.log(result)
}

function calculate(op, number1, number2) {
    switch (op) {
        case '+':
            add(number1, number2);
            break;
        case '-':
            subtract(number1, number2);
            break;
        case '*':
            multiply(number1, number2);
            break;
        case '/':
            divide(number1, number2);
            break;
    }

}

//Prevents excessively long decimal numbers
function roundNumber() {
    
    if (!Number.isSafeInteger(result)) {
        result = result.toFixed(2)
    }
    
}

function display(string) {
    if (displayScreen.textContent === "0") {
        displayScreen.textContent = null;
        displayScreen.textContent += string;
    } else if (displayScreen.textContent.length < 15) {
        displayScreen.textContent += string;
    } else {
        alert("Cannot exceed 15 characters!");
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

function operateButtons(value) {
    switch (value) {
        case "clear":
            reset();
            break;
        case "delete":
            remove();
            break;
            
    }
}

//GLOBAL VARIABLES
let num1;
let num2;
let operator;
let result;
let displayString;
const displayScreen = document.getElementById("display");
const numberButtons = document.querySelectorAll(".button.number");
const topButtons = document.querySelectorAll(".button.misc");

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