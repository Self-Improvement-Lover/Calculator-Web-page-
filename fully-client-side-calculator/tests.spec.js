describe("Fully Client Side Calculator", () => {
  let calculator;

  beforeEach(async () => {
    initialiseCalculator(Calculator, document); // where is this calculator from
    calculator = new CalculatorPageObject(document.querySelector("div"));
  });

  afterEach(async () => {
    const ui = document.querySelector("div");
    if (ui) {
      ui.remove();
    }
  });

  it("Should begin with 0", async () => {
    expect(calculator.screen.value).toEqual("0");
  });

  it("3 + 3 = should print 6", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
  });

  it("3 + 6 should say 6", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number6.press();
    expect(calculator.screen.value).toEqual("6");
  });

  it("9/3 should print 3", async () => {
    calculator.number9.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.divide.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("3");
  });

  it("3*3 =  should print 9", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.multiply.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("9");
  });

  it("9 - 3 = should print 6", async () => {
    calculator.number9.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.minus.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
  });

  it("0.1 + 23 = should print 23", async () => {
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number1.press();
    expect(calculator.screen.value).toEqual("0.1");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("0.1");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("23");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("23.1");
  });

  it("0.3 + 0.3 = should print 0.6", async () => {
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("0.3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("0.3");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("0.3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("0.6");
  });

  it("3. * 3 = should print 9", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("3.");
    calculator.multiply.press();
    expect(calculator.screen.value).toEqual("3.");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("9");
  });

  it("3 ++++ 3 = should print 6", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    calculator.plus.press();
    calculator.plus.press();
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
  });

  it("3 +- 3 = should print 0", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    calculator.minus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it("2 + 2 +, should then print 4, then 4 + 2 = should print 6 ", async () => {
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("4");
    calculator.number2.press();
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
  });

  it("3.1 =  should print 3.1", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("3.");
    calculator.number1.press();
    expect(calculator.screen.value).toEqual("3.1");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("3.1");
  });

  it("3 + 3 = should print 6, then pressing equals button should print 9", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("9");
  });
});

class CalculatorPageObject {
  constructor(element) {
    this.element = element;
  }
  get number0() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[9]
    );
  }

  get number1() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[0]
    );
  }

  get number2() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[1]
    );
  }

  get number3() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[2]
    );
  }

  get number6() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[5]
    );
  }

  get number9() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[8]
    );
  }

  get plus() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[2]
    );
  }

  get minus() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[3]
    );
  }

  get divide() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[0]
    );
  }

  get multiply() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[1]
    );
  }

  get decimal() {
    return new ButtonPageObject(this.element.querySelector("#decimalButton"));
  }

  get equals() {
    return new ButtonPageObject(this.element.querySelector("#equalsButton"));
  }

  get screen() {
    return new InputPageObject(this.element.querySelector("#screen"));
  }
}

class ButtonPageObject {
  constructor(element) {
    this.element = element;
  }

  press() {
    this.element.click(); // where is this click method from?
  }
}

class InputPageObject {
  constructor(element) {
    this.element = element;
  }

  get value() {
    return this.element.value;
  }
}
