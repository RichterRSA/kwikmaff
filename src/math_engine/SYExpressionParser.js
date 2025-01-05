import { Constants } from "./Constants.js";
import NumberExpression from "./NumberExpression.js";
import MinMaxCalculation from "./calculation_expressions/binary_calculations/MinMaxCalculation.js";
import PrimitiveCalculation from "./calculation_expressions/binary_calculations/PrimitiveCalculation.js";
import TrigFunctionCalculation from "./calculation_expressions/unary_calculations/TrigFunctionCalculation.js";
class SYExpressionParser {
    static isNumber(token) {
        return !isNaN(Number(token));
    }
    static parseExpression(tokens) {
        const stack = [];
        for (const token of tokens) {
            if (this.isNumber(token)) {
                stack.push(new NumberExpression(Number(token)));
                continue;
            }
            if (Constants.isConstant(token)) {
                stack.push(new NumberExpression(Constants.getValue(token)));
                continue;
            }
            if (this.OPERATORS.includes(token)) {
                if (stack.length < 2) {
                    throw new Error(`Not enough operands for operator ${token}`);
                }
                const rhs = stack.pop();
                const lhs = stack.pop();
                stack.push(new PrimitiveCalculation(lhs, rhs, token));
                continue;
            }
            if (this.TRIG_FUNCTIONS.includes(token)) {
                if (stack.length < 1) {
                    throw new Error(`NEO`); // Not enough operands for function
                }
                const arg = stack.pop();
                stack.push(new TrigFunctionCalculation(arg, token));
                continue;
            }
            if (this.MIN_MAX_FUNCTIONS.includes(token)) {
                if (stack.length < 2) {
                    throw new Error("NEO"); // Not enough operands for function
                }
                const rhs = stack.pop();
                const lhs = stack.pop();
                stack.push(new MinMaxCalculation(lhs, rhs, token));
                continue;
            }
            throw new Error(`UT${token}`);
        }
        if (stack.length !== 1) {
            throw new Error("IE"); // Invalid expression
        }
        return stack[0];
    }
}
SYExpressionParser.OPERATORS = ["+", "-", "*", "/", "^"];
SYExpressionParser.TRIG_FUNCTIONS = [
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
];
SYExpressionParser.MIN_MAX_FUNCTIONS = ["min", "max"];
export default SYExpressionParser;
