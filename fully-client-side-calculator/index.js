const screen = document.getElementById("screen");
const numbers = document.querySelectorAll(".numbers-to-press");
const operandButtons = document.querySelectorAll(".operation-buttons");
const equalsButton = document.getElementById("equalsButton");
const clearButton = document.getElementById("clearButton");
const decimalButton = document.getElementById("decimalButton");
let secondValue = "";
let operand = "";
let currentValue = 0;
let operandPressed = false;
let timesOperandUsed = 0;
let equalsButtonPurposelyPressed = false;
let nothingHappened = true;
const calculator = new Calculator();

function returnValueOfOperation() {
  if (screen.value === "") {
    return;
  }
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
  equalsButtonPurposelyPressed = false;
  nothingHappened = true;
  calculator.clear();
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    // if first number entered is 0. something,then an operandButton is pressed,then number, then we need to make screen.value reset to ''
    if (screen.value[0] === "0" && screen.value[1] === ".") {
      screen.value = "";
      screen.value += button.innerText;
      secondValue += button.innerText;
      return;
    }

    if (screen.value === "0" && operandPressed === false) {
      screen.value = "";
    }
    // After you purposly press equalls button, you get an answer but then you can change that answer
    if (equalsButtonPurposelyPressed) {
      screen.value = "";
      secondValue = "";
    }

    // if when second number entered is at 0., then number button is pressed, we dont want screen value to be reset,
    //  we want the number button pressed to be concatnated to the 0.
    if (operandPressed && screen.value === "0.") {
      operandPressed = false;
    } else if (operandPressed) {
      screen.value = "";
      operandPressed = false;
    }
    screen.value += button.innerText;
    secondValue += button.innerText; // secondValue was already reset when an operation button was clicked
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // if an operand is pressed twice or more times in a row
    nothingHappened = false;
    if (operandPressed) {
      operand = button.innerText;
      return;
    }

    timesOperandUsed++;
    operandPressed = true;
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
  if (operandPressed) {
    secondValue = "0.";
    screen.value = "0.";
    return;
  }

  if (screen.value.includes(".")) {
    return;
  }

  screen.value = screen.value + decimalButton.innerText;
  secondValue = secondValue + decimalButton.innerText;
});

equalsButton.addEventListener("click", () => {
  // the point of second value is to be able to check that screen.value should be reset on next button clicked
  if (nothingHappened === true) {
    return;
  }

  if (operandPressed === true && secondValue === "") {
    return;
  }

  equalsButtonPurposelyPressed = true;
  timesOperandUsed = 0;
  operandPressed = false;
  nothingHappened = false;

  returnValueOfOperation();
});
