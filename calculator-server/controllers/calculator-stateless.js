const Calculator = require("../../core/calculator");

/*
{
    “operand1”: 1;
    “operand2”: 24;
    “operation”: “add”;
}
*/
const answer = (req, res) => {
  const { operand1, operand2, operation } = req.body;

  if (operation === undefined) {
    res.status(400).json({ error: "An operation is needed" });
    return;
  }

  if (operand1 === undefined || operand2 === undefined) {
    res.status(400).json({ error: "Please enter operands" });
    return;
  }

  if (typeof operand1 !== "number" || typeof operand2 !== "number") {
    res.status(400).json({ error: "Please enter numbers as the operands" });
    return;
  }

  const calculator = new Calculator();
  calculator.add(operand1);

  switch (operation) {
    case "add":
      calculator.add(operand2);
      break;
    case "subtract":
      calculator.subtract(operand2);
      break;
    case "multiply":
      calculator.multiply(operand2);
      break;
    case "divide":
      calculator.divide(operand2);
      break;
    case "power":
      calculator.power(operand2);
      break;
    default:
      res
        .status(400)
        .json({ error: "Not an accepted operation/ not an operation" });
      return;
  }

  const total = calculator.getTotal();

  if (total === "ERROR") {
    res.status(400).json({ error: "Cannot divide by Zero" });
    return;
  }
  res.status(200).json({ result: total });
};

module.exports = {
  answer,
};
