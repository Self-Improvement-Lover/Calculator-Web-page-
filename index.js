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

function Calculator() {
  this.total = 0;
  this.totalArr = [];
  this.arr = [];

  this.add = (value) => {
    this.total = this.total + value;
    this.arr.push(`ADD ${value}`);
    this.totalArr.push(this.total);
  };

  this.subtract = (value) => {
    this.total -= value;
    this.arr.push(`SUBTRACT ${value}`);
    this.totalArr.push(this.total);
  };

  this.multiply = (value) => {
    this.total *= value;
    this.arr.push(`MULTIPLY ${value}`);
    this.totalArr.push(this.total);
  };

  this.divide = (value) => {
    if (value === 0) {
      this.arr.push(`DIVIDE ${0}`);
      this.total = "ERROR";
      this.totalArr.push(this.total);
    } else {
      this.total /= value;
      this.arr.push(`DIVIDE ${value}`);
      this.totalArr.push(this.total);
    }
  };

  this.power = (value) => {
    this.total = Math.pow(this.total, value);
    this.arr.push(`POWER ${value}`);
    this.totalArr.push(this.total);
  };

  this.getTotal = () => {
    if (isNaN(this.total)) {
      return "ERROR";
    } else {
      this.arr.push(`GETTOTAL ${this.total}`);
      return this.total;
    }
  };

  this.clear = () => {
    this.total = 0;
    this.arr = [];
    this.totalArr = [];
  };

  this.getHistory = () => {
    return this.arr;
  };

  this.undo = () => {
    if (this.arr.length === 1 || this.arr.length === 0) {
      this.total = 0;
      this.arr.pop();
      this.totalArr.pop(); // problem maybe
    } else {
      this.total = this.totalArr[this.totalArr.length - 2];
      this.arr.pop();
      this.totalArr.pop();
    }
  };
}

const screen = document.getElementById("screen");
const numbers = document.querySelectorAll("[numbersToPress]");
const operationButtons = document.querySelectorAll("#operationButtons");
const equalsButton = document.querySelector("#equalsButton");
const clearButton = document.querySelector("#clearButton");
const previousAnsButton = document.querySelector("#previousAnswerButton");
const historyButton = document.querySelector("#getHistory");
let secondValue = "";
let operant = "";
let histroyShowing = true;
let currentValue = 0;
let operantCounter = 0

const calcualtor = new Calculator();

function returnValueOfOpperation(){

  if (screen.value === "" || screen.value === ".") return;


  if (secondValue.includes(".")) {
    currentValue = parseFloat(secondValue);
  } else {
    currentValue = parseInt(secondValue);
  }

  switch (operant) {
    case "+":
      calcualtor.add(currentValue);
      screen.value = calcualtor.getTotal();
      break;
    case "-":
      calcualtor.subtract(currentValue);
      screen.value = calcualtor.getTotal();
      break;
    case "*":
      calcualtor.multiply(currentValue);
      screen.value = calcualtor.getTotal();
      break;
    case "/":
      calcualtor.divide(currentValue);
      screen.value = calcualtor.getTotal();
      break;
    case "^":
      calcualtor.power(currentValue);
      screen.value = calcualtor.getTotal();
      break;
    default:
      return currentValue;
  }  
}


clearButton.addEventListener("click", () => {
  document.getElementById("screen").value = "";
  secondValue = "";
  operationClicked = false;
  histroyShowing = false;
  operantCounter = 0
  calcualtor.clear();
});

previousAnsButton.addEventListener("click", () => {
  calcualtor.undo();
  const previousTotal = calcualtor.totalArr[calcualtor.totalArr.length - 1];
  if (previousTotal === undefined) {
    screen.value = "";
  } else {
    screen.value = previousTotal;
  }
});

historyButton.addEventListener("click", () => {
  screen.value = calcualtor.getHistory();
  histroyShowing = true;
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (screen.value === "" && button.innerText === ".") {
      screen.value = "0.";
    }
    if (button.innerText === "." && screen.value.includes(".")) return;

    if (histroyShowing) {
      screen.value = "";
      histroyShowing = false;

    }
    
    screen.value = screen.value + button.innerText;
    secondValue += button.innerText;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
  
    if (screen.value === "") return;
    if (histroyShowing) return
    
    if (Array.isArray(screen.value)) return;
    

    if (
      screen.value.toString()[screen.value.length - 1] === "*" ||
      screen.value.toString()[screen.value.length - 1] === "+" ||
      screen.value.toString()[screen.value.length - 1] === "-" ||
      screen.value.toString()[screen.value.length - 1] === "^" ||
      screen.value.toString()[screen.value.length - 1] === "/"
    ) {
      return;
    } else if (operantCounter >= 1){
     returnValueOfOpperation()
     screen.value = screen.value + button.innerText
     operant = button.innerText
     secondValue = ""
    }  else {
      operantCounter++
      calcualtor.total = parseFloat(screen.value.toString());
      screen.value = screen.value + button.innerText;
      operant = button.innerText
      secondValue = "";
    }



  });
});

equalsButton.addEventListener("click", () => {
operantCounter = 0
returnValueOfOpperation()
});

