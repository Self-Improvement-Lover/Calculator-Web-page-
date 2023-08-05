/*
const addition = (req,res) => {
    const num1 = parseFloat(req.params.num1)
    const num2 = parseFloat(req.params.num2)
    res.status(200).json({answer: num1 + num2})
}

const subtraction = (req,res) => {
    const num1 = parseFloat(req.params.num1)
    const num2 = parseFloat(req.params.num2)
    res.status(200).json({answer: num1 - num2})
}

const multiplication = (req,res) => {
    const num1 = parseFloat(req.params.num1)
    const num2 = parseFloat(req.params.num2)
    res.status(200).json({answer: num1 * num2})  
}

const division = (req,res) => {
    const num1 = parseFloat(req.params.num1)
    const num2 = parseFloat(req.params.num2)
    res.status(200).json({answer: num1 / num2})    
}

const power = (req,res) => {
    const num1 = parseFloat(req.params.num1)
    const num2 = parseFloat(req.params.num2)
    res.status(200).json({answer:  Math.pow(num1, num2)})    
}

*/ 

const answer = (req,res) => {
    console.log(req.body)
const {operand1, operand2, operation} = req.body
const operand1Num = Number(operand1)
const operand2Num = Number(operand2)
let answer;

if (operand2Num === 0 && operation === '/'){
    res.status(400).json({error: 'Cannot divide by Zero'})
} 
switch(operation){
    case "+":
       answer =  operand1Num + operand2Num
       break;
    case '-':
        answer = operand1Num - operand2Num
        break;
    case '*':
        answer = operand1Num * operand2Num 
        break;
    case '/':
        answer = operand1Num / operand2Num
        break;
    case "^":
        answer = operand1Num ** operand2Num       
}
res.status(200).json({result:answer})
}
/*
{
    “operand1”: 1;
    “operand2”: 24;
    “operation”: “add”;
}
*/
module.exports = {
 answer
}