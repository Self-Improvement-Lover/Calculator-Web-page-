
const screen = document.getElementById("screen");
const numbers = document.querySelectorAll(".numbers-to-press");
const operationButtons = document.querySelectorAll(".operation-buttons");
const equalsButton = document.getElementById("equalsButton");
const clearButton = document.getElementById("clearButton");
const decimalButton = document.getElementById("decimalButton");
let secondValue = "";
let operand = "";
let currentValue = 0;
let operantPressed = false;
let timesOperandUsed = 0;
let equalsButtonPurposelyPressed = false;
let nothingHappened = true;
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
  operantPressed = false;
  equalsButtonPurposelyPressed = false;
  nothingHappened = true;
  calculator.clear();
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "0" && operantPressed === false) {
      screen.value = "";
    }
 // After you purposly press equalls button, you get an answer but then you can change that answer
    if (equalsButtonPurposelyPressed) {
      screen.value = "";
      secondValue = "";
    }

    // if when second number entered is at 0., then number button is pressed, we dont want screen value to be reset,
    //  we want the number button pressed to be concatnated to the 0.
    if (operantPressed && screen.value === "0.") {
      operantPressed = false;
    } else if (operantPressed) {
      screen.value = "";
      operantPressed = false;
    }
    screen.value += button.innerText;
    secondValue += button.innerText; // secondValue was already reset when an operation button was clicked
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // if an operand is pressed twice or more times in a row
    nothingHappened = false;
    if (operantPressed) {
      operand = button.innerText;
      return;
    }

    // if first number entered is 0. something, then we need to make screen.value reset to ''
    timesOperandUsed++;
    operantPressed = true;
    if (timesOperandUsed > 1) {
      returnValueOfOperation();
    }
    // if its already 0 on screen, then you choose to enter an operant, then number

    calculator.total = parseFloat(screen.value.toString());

    operand = button.innerText;

    secondValue = "";
  });
});

decimalButton.addEventListener("click", () => {
  if (operantPressed) {
    secondValue = "0.";
    screen.value = "0.";
    return;
  }

  if (screen.value.includes(".")) return;

  screen.value = screen.value + decimalButton.innerText;
  secondValue = secondValue + decimalButton.innerText;
});

equalsButton.addEventListener("click", () => {
  // the point of second value is to be able to check that screen.value should be reset on next button clicked
  if (nothingHappened === true) return;
  if (operantPressed === true && secondValue === "") return;

  equalsButtonPurposelyPressed = true;
  timesOperandUsed = 0;
  operantPressed = false;
  nothingHappened = false;

  returnValueOfOperation();
});
