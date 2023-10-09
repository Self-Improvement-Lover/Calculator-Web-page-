function initialiseCalculator(Calculator, document) {
  const ui = document.createElement("div");
  ui.innerHTML = `<div>
  <input type="text" id="screen" value="0" disabled />
</div>

<button id="clearButton">AC</button>
<button class="operation-buttons">/</button>

<br />
<button class="numbers-to-press">1</button>
<button class="numbers-to-press">2</button>
<button class="numbers-to-press">3</button>
<button class="operation-buttons">*</button>
<br />
<button class="numbers-to-press">4</button>
<button class="numbers-to-press">5</button>
<button class="numbers-to-press">6</button>
<button class="operation-buttons">+</button>
<br />
<button class="numbers-to-press">7</button>
<button class="numbers-to-press">8</button>
<button class="numbers-to-press">9</button>
<button class="operation-buttons">-</button>
<br />
<button class="numbers-to-press">0</button>
<button id="equalsButton">=</button>
<button id="decimalButton">.</button>
<button class="operation-buttons">^</button>`;
  document.body.appendChild(ui);

  const screen = document.getElementById("screen");
  const numbers = document.querySelectorAll(".numbers-to-press");
  const operandButtons = document.querySelectorAll(".operation-buttons");
  const equalsButton = document.getElementById("equalsButton");
  const clearButton = document.getElementById("clearButton");
  const decimalButton = document.getElementById("decimalButton");

  let secondValue = "";
  let operation = "";
  let currentValue = 0;
  let operandWasLastClicked = false;
  let timesOperandUsed = 0;
  let equalsButtonPurposelyPressed = false;

  const calculator = new Calculator();

  function clear() {
    screen.value = "0";
    secondValue = "";
    timesOperandUsed = 0;
    operandWasLastClicked = false;
    equalsButtonPurposelyPressed = false;
  }
  function returnValueOfOperation() {
    if (screen.value === "") {
      return;
    }
    currentValue = parseFloat(secondValue);

    switch (operation) {
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
    clear();
    calculator.clear();
  });

  numbers.forEach(button => {
    button.addEventListener("click", () => {
      if (screen.value === "0" && operandWasLastClicked === false) {
        screen.value = "";
      }
      // After you purposely press equals button, you get an answer but then you can change that answer
      if (equalsButtonPurposelyPressed) {
        screen.value = "";
        secondValue = "";
      }

      // if when second number entered is at 0., then number button is pressed, we don't want screen value to be reset,
      //  we want the number button pressed to be concatenated to the 0.
      if (operandWasLastClicked && screen.value === "0.") {
        operandWasLastClicked = false;
      } else if (operandWasLastClicked) {
        screen.value = "";
        operandWasLastClicked = false;
      }
      screen.value += button.innerText;
      secondValue += button.innerText; // secondValue was already reset when an operation button was clicked
    });
  });

  operandButtons.forEach(button => {
    button.addEventListener("click", () => {
      nothingHappened = false;
      // if an operand is pressed twice or more times in a row
      if (operandWasLastClicked) {
        operation = button.innerText;
        return;
      }

      timesOperandUsed++;
      operandWasLastClicked = true;
      if (timesOperandUsed > 1) {
        returnValueOfOperation();
      }

      calculator.total = parseFloat(screen.value.toString());

      operation = button.innerText;

      secondValue = "";
    });
  });

  decimalButton.addEventListener("click", () => {
    if (operandWasLastClicked) {
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
    if (operandWasLastClicked === true && secondValue === "") {
      return;
    }

    equalsButtonPurposelyPressed = true;
    timesOperandUsed = 0;
    operandWasLastClicked = false;
    nothingHappened = false;

    returnValueOfOperation();
  });
}
