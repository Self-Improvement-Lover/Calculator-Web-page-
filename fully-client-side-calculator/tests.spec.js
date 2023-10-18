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

  it("9/2 should print 4.5", async () => {
    calculator.number9.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.divide.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("4.5");
  });

    it("3/0 =  should print ERROR", async () => {
      calculator.number3.press();
      expect(calculator.screen.value).toEqual("3");
      calculator.divide.press();
      expect(calculator.screen.value).toEqual("3");
      calculator.number0.press();
      expect(calculator.screen.value).toEqual("0");
      calculator.equals.press();
      expect(calculator.screen.value).toEqual("ERROR");
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

  it("3^3 =  should print 27", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.power.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("27");
  });

  it("3^3 =  should print 27^ 2 should print 729 ", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.power.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("27");
    calculator.power.press();
    expect(calculator.screen.value).toEqual("27");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("729");
  });

  it("3 * 3 * 3 = should print 27", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.multiply.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.multiply.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("27");
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

  it("0.7 + 23 = should print 23.7", async () => {
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number7.press();
    expect(calculator.screen.value).toEqual("0.7");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("0.7");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("2");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("23");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("23.7");
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

  it("0.3 + 0.0.0.0.0.0.0.4 = should print 0.3000004", async () => {
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
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0.0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.0");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0.00");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.00");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.00");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0.000");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.000");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.000");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0.0000");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.0000");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0.00000");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.00000");
    calculator.number4.press();
    expect(calculator.screen.value).toEqual("0.000004");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("0.300004");
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

  it("9 + 0.1 should work, then after pressing another number it should be concatenated to the 0.1", async () => {
    calculator.number9.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("9");
    calculator.number0.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number1.press();
    expect(calculator.screen.value).toEqual("0.1");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("0.12");
  });

  it("3 + . should have screen value as 0., then adding it together should print 3", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("3");
  });

  it("3 + . 2 = 3.2", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.decimal.press();
    expect(calculator.screen.value).toEqual("0.");
    calculator.number2.press();
    expect(calculator.screen.value).toEqual("0.2");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("3.2");
  });

  it("3 ++++ 8 = should print 11", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    calculator.plus.press();
    calculator.plus.press();
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number8.press();
    expect(calculator.screen.value).toEqual("8");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("11");
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
    expect(calculator.screen.value).toEqual("2");
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

  it("3 + 3 = should print 6, then pressing clears button should show 0", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
    calculator.clear.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it(" pressing 3 should show 3, then pressing equals button should make screen.value reset to 0", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.clear.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it(" pressing clearButton should show 0", async () => {
    calculator.clear.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it(" pressing equalsButton should show 0", async () => {
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it(" pressing clearButton should show 0, then pressing equalsButton should make value be 0 still ", async () => {
    calculator.clear.press();
    expect(calculator.screen.value).toEqual("0");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("0");
  });

  it(" when a first value is given, then operandButton was clicked, then equalsButton is clicked,  then screen.value should still be the first inputted value ", async () => {
    calculator.number5.press();
    expect(calculator.screen.value).toEqual("5");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("5");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("5");
  });

  it("3*3 =  should print 6, when 3 is pressed screen value should be 3 meaning that when an answer is given you cant override that answer, rather new operation starts", async () => {
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.plus.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
    calculator.equals.press();
    expect(calculator.screen.value).toEqual("6");
    calculator.number3.press();
    expect(calculator.screen.value).toEqual("3");
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
  get number4() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[3]
    );
  }

  get number5() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[4]
    );
  }
  get number6() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[5]
    );
  }
  get number7() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[6]
    );
  }

  get number8() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".numbers-to-press")[7]
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
  get power() {
    return new ButtonPageObject(
      this.element.querySelectorAll(".operation-buttons")[4]
    );
  }

  get decimal() {
    return new ButtonPageObject(this.element.querySelector("#decimalButton"));
  }

  get clear() {
    return new ButtonPageObject(this.element.querySelector("#clearButton"));
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
