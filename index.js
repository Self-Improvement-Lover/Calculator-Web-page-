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
const screen = document.getElementById("screen");
const numbers = document.querySelectorAll(".numbers-to-press");
const operationButtons = document.querySelectorAll(".operation-buttons");
const equalsButton = document.getElementById("equalsButton");
const clearButton = document.getElementById("clearButton");
const decimalButton = document.getElementById("decimalButton");
let secondValue = "";
let operand = "";
let currentValue = 0;
let operandPressed = false;
let timesOperandUsed = 0;
let equalsButtonPurposelyPressed = false 
const calculator = new Calculator();

function returnValueOfOperation() {
  if (screen.value === "" || screen.value === ".") return;
  currentValue = parseFloat(secondValue);

  switch (operand) {
    case "+":
      calculator.add(currentValue);
      break;
    case "-":
      calculator.subtract(currentValue);
      break;
    case "*":
      calculator.multiply(currentValue);
      break;
    case "/":
      calculator.divide(currentValue);
      break;
    case "^":
      calculator.power(currentValue);
      break;
  }

  screen.value = calculator.getTotal();
}

clearButton.addEventListener("click", () => {
  screen.value = "0";
  secondValue = "";
  timesOperandUsed = 0;
  operandPressed = false;
  equalsButtonPurposelyPressed = false 
  calculator.clear();
});
// After you prposly  press equalls button, you get an answer but then you can change that answer  
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "0" && (operandPressed === false)) {
      screen.value = "";
    } 
    if (button.innerText === "0" && screen.value === "0") return;

   if (equalsButtonPurposelyPressed) {
    screen.value = ""
    secondValue = ""
   }

    if (operandPressed && screen.value === "0.") {
      operandPressed = false;
    } else if (operandPressed) {
      screen.value = "";
      operandPressed = false;
    }
    screen.value += button.innerText;
    secondValue += button.innerText;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
     // if an operand is pressed twice or more times in a row
    if (operandPressed) return (operand = button.innerText);
    if (screen.value === "0") return; 
   
  
    timesOperandUsed++
    operandPressed = true;
    if (timesOperandUsed > 1) {
      returnValueOfOperation();
    }

    calculator.total = parseFloat(screen.value.toString());
    operand = button.innerText;
    if (!(secondValue === "0.")) {
      secondValue = "";
    }
  });
});

decimalButton.addEventListener("click", () => {
  if (operandPressed) {
    secondValue = "0.";
    screen.value = "0.";
    return;
  }

  if (screen.value.includes(".")) return;
 
    screen.value = screen.value + decimalButton.innerText;
  
});

equalsButton.addEventListener("click", () => {

 if ((operandPressed === true) && secondValue === "") return 
 equalsButtonPurposelyPressed = true 
  timesOperandUsed = 0;
  operandPressed = false;
  returnValueOfOperation();
});
