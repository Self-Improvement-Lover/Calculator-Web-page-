// First, make sure to make all buttons for caclautor,
// meaning numbers, getTotal(),getHistory(), clear, undo,operants
// replace cuurent js code with previous js code
// Make a current operant and previous operant attribute  on screen, both equal to ""
// for each number click, concatnate the value string of that number to the current operant
// maybe use .innerHtml or something reaserch what you can use
// then when an operant is clicked, cuurent operasant is now previous operant and
// then modfiy current operant to be "". also save the operant that was clicked on a varaible
// then when numbers are clicked, it should be concatnated to currentOperant.
// then when equalSButton  is clicked, we done a switch staement to check which operant is used and
// use corresponding function on calcualtor to calculate previousopprant, currentOperant with the operant
// then call .getTotal()


// if operand is clicked more than once, calcualte the calculaotr.total for previous operation 
// save operand, the numbers pressed afterwards is second vsalue and if equals is pressed return calculator.total + second value 
// else if another operation, just get that calculator total as well and just put button pressed and repeat cycle 
// when equals button is pressed, operantcounter is set back to 0
const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".numbers-to-press");
const operationButtons = document.querySelectorAll(".operation-buttons");
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector("#clear-button");
const historyButton = document.querySelector("#getHistory");
const decimalButton = document.querySelector("#decimal-button");
let secondValue = "";
let operand = "";
let currentValue = 0;
let operandPressed = false; // changed opeant pressed from 0 to false, 1 to true
let timesOperandUsed = 0
const calculator = new Calculator();

function returnValueOfOperation() {
  if (screen.value === "" || screen.value === ".") return;

  if (secondValue.includes(".")) {
    currentValue = parseFloat(secondValue);
  } else {
    currentValue = parseInt(secondValue);
  }

  switch (operand) {
    case "+":
      calculator.add(currentValue);
      screen.value = calculator.getTotal();
      break;
    case "-":
      calculator.subtract(currentValue);
      screen.value = calculator.getTotal();
      break;
    case "*":
      calculator.multiply(currentValue);
      screen.value = calculator.getTotal();
      break;
    case "/":
      calculator.divide(currentValue);
      screen.value = calculator.getTotal();
      break;
    case "^":
      calculator.power(currentValue);
      screen.value = calculator.getTotal();
      break;
    default:
      return currentValue;
  }
}

clearButton.addEventListener("click", () => {
  screen.value = "";
  secondValue = "";
  timesOperandUsed = 0
  operandPressed = false;
  calculator.clear();
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (operandPressed) {
      secondValue += button.innerText;
      screen.value = button.innerText;
      operandPressed = false;
    } else {
      screen.value += button.innerText;
      secondValue += button.innerText;
    }
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "") return; 
    timesOperandUsed++
    operandPressed = true; 
    if (timesOperandUsed > 1){
      returnValueOfOperation()
    } 

      calculator.total = parseFloat(screen.value.toString());
      operand = button.innerText;
      secondValue = "";
    

   
  });
});

decimalButton.addEventListener("click", () => {
  if (decimalButton.innerText === "." && screen.value.includes(".")) return;
  if (screen.value === "") {
    screen.value = "0.";
  } else {
    screen.value = screen.value + decimalButton.innerText;
  }
});

equalsButton.addEventListener("click", () => {
  timesOperandUsed = 0
  operandPressed = false
  returnValueOfOperation();
});
