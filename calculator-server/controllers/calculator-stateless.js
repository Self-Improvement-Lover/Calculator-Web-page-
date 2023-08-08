const Calculator = require("../../core/calculator");

/*
{
    “operand1”: 1;
    “operand2”: 24;
    “operation”: “add”;
}
*/
const answer = (req, res) => {
  console.log(req.body);
  const { operand1, operand2, operation } = req.body;

  const calculator = new Calculator();
  calculator.add(operand1);

if (operation === undefined){
  res.status(400).json({ error: "An operation is needed" });
}

if ((typeof operand1 !== 'number' )|| (typeof operand2 !== 'number' ) ){
  res.status(400).json({ error: "Please enter numbers as the operands" });
}

if (!(operand1 && operand2)){
  res.status(400).json({ error: "Please enter 2 operands" });
}
switch (operation) {
  case "add":
    calculator.add(operand2);
    break;
  case "subtract":
    calculator.subtract(operand2);
    break;
  case "multiply":
    calculator.multiply(operand2)
    break;
  case "divide":
    calculator.divide(operand2)
    break;
  case "power":
    calculator.power(operand2)
    break;
  default: 
  res.status(400).json({ error: "Not an accepted operation/ not an operation" });
}

const total = calculator.getTotal();

if (total === "ERROR") {
  res.status(400).json({ error: "Cannot divide by Zero" });
} else {
  res.status(200).json({ result: total });
}
}

module.exports = {
  answer,
};

/* 
1) Finish the switch statement -- DONE
2) Deal with a request where the operation is not one of the 5 accepted ones -- DONE
3) Deal with a request where the operation is missing -- DONE 
4) Deal with a request where either operand is not a number -- DONE
5) Deal with a request where either operand is missing -- DONE
*/
