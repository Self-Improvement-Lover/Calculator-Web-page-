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
let operantPressed = false;
let timesOperandUsed = 0;
let equalsButtonPurposelyPressed = false;
let nothingHappened = true;
const objToSend = {};

async function sendRequest() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/calculator/", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objToSend),
    });
    const answer = await response.json();
    console.log(answer);
  } catch (error) {
    console.log(error);
  }
}

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
// After you prposly  press equalls button, you get an answer but then you can change that answer
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "0" && operantPressed === false) {
      screen.value = "";
    }
    // if (button.innerText === "0" && screen.value === "0") return;

    if (equalsButtonPurposelyPressed) {
      screen.value = "";
      secondValue = "";
    }

    // these 2 if staements are purely to be able to track when both operations are zero,
    // which have to be recorded and send to the server, so that it can return a response
    if (screen.value === "0" && operantPressed === false) {
      calculator.total = 0;
      objToSend.operand1 = 0;
    }

    if (screen.value === "0" && operantPressed === true) {
      objToSend.operand2 = 0;
    }
    // if when second number entered is at 0., then number button is pressed, we dont want secreen value to be reset,
    //  we want the number button pressed to be concatnated to the 0.
    if (operantPressed && screen.value === "0.") {
      operantPressed = false;
    } else if (operantPressed) {
      screen.value = "";
      operantPressed = false;
    }
    screen.value += button.innerText;
    secondValue += button.innerText; // secondValue was already reset on operation button was clicked
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // if an operand is pressed twice or more times in a row
    nothingHappened = false;
    if (operantPressed) {
      operand = button.innerText;
      objToSend.operation = button.innerText;
      return;
    }

    // if first number entered is 0. something, then we need to make screen.value rest to ''
    timesOperandUsed++;
    operantPressed = true;
    if (timesOperandUsed > 1) {
      objToSend.operand2 = screen.value;
      sendRequest();
      returnValueOfOperation();
    }
    // if its already 0 on screen, then you choose to enter an operant, then number

    calculator.total = parseFloat(screen.value.toString());
    objToSend.operand1 = parseFloat(screen.value.toString());
    operand = button.innerText;
    objToSend.operation = button.innerText;
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
  // the point of second value is to be able to check that screen.value should be rested on next button clicked
  if (nothingHappened === true) return;
  if (operantPressed === true && secondValue === "") return;
  objToSend.operand2 = screen.value;
  equalsButtonPurposelyPressed = true;
  timesOperandUsed = 0;
  operantPressed = false;
  nothingHappened = false;
  sendRequest();

  returnValueOfOperation();
});
