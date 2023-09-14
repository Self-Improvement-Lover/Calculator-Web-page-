describe("Fully Client Side Calculator", () => {
  let calculator;

  beforeEach(async () => {
    initialiseCalculator(Calculator, document);
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
});

class CalculatorPageObject {
  constructor(element) {
    this.element = element;
  }

  get number1() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[0]
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

  get plus() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[2]
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
    this.element.click();
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
