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

const screen = document.querySelector("#screen");
const numbers = document.querySelectorAll("[numbersToPress]");
const operationButtons = document.querySelectorAll(".operationButtons");
const equalsButton = document.querySelector("#equalsButton");
const clearButton = document.querySelector("#clearButton");
const historyButton = document.querySelector("#getHistory");
const decimalButton = document.querySelector("#decimalButton");
let secondValue = "";
let operant = "";
let currentValue = 0;
let operantPressed = 0;

const calculator = new Calculator();

function returnValueOfOperation() {
  if (screen.value === "" || screen.value === ".") return;

  if (secondValue.includes(".")) {
    currentValue = parseFloat(secondValue);
  } else {
    currentValue = parseInt(secondValue);
  }

  switch (operant) {
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
  operationClicked = false;
  operantPressed = 0;
  calculator.clear();
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (operantPressed) {
      secondValue += button.innerText;
      screen.value = button.innerText;
      operantPressed--;
    } else {
      screen.value = screen.value + button.innerText;
      secondValue += button.innerText;
    }
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "") return;
    operantPressed = true;
    calculator.total = parseFloat(screen.value.toString());
    operant = button.innerText;
    secondValue = "";
  });
});

decimalButton.addEventListener("click", () => {
  if (decimalButton.innerText === "." && screen.value.includes(".")) return;
  if (screen.value === "" && decimalButton.innerText === ".") {
    screen.value = "0.";
  } else {
    screen.value = screen.value + decimalButton.innerText;
  }
});

equalsButton.addEventListener("click", () => {
  operantPressed = 0;
  returnValueOfOperation();
});
