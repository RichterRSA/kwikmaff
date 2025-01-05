import AbstractExpression from "./AbstractExpression.js";
import { Constants } from "./Constants.js";
import NumberExpression from "./NumberExpression.js";
import MinMaxCalculation from "./calculation_expressions/binary_calculations/MinMaxCalculation.js";
import PrimitiveCalculation from "./calculation_expressions/binary_calculations/PrimitiveCalculation.js";
import LogarithmicCalculation from "./calculation_expressions/unary_calculations/LogarithmicCalculation.js";
import TrigFunctionCalculation from "./calculation_expressions/unary_calculations/TrigFunctionCalculation.js";

export default class SYExpressionParser {
  private static readonly OPERATORS = ["+", "-", "*", "/", "^"];
  private static readonly TRIG_FUNCTIONS = [
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
  ];
  private static readonly LOG_FUNCTIONS = ["ln", "log"];
  private static readonly MIN_MAX_FUNCTIONS = ["min", "max"];

  private static isNumber(token: string): boolean {
    return !isNaN(Number(token));
  }

  static parseExpression(tokens: string[]): AbstractExpression {
    const stack: AbstractExpression[] = [];
    for (const token of tokens) {
      if (this.isNumber(token)) {
        stack.push(new NumberExpression(Number(token)));
        continue;
      }

      if (Constants.isConstant(token)) {
        stack.push(new NumberExpression(Constants.getValue(token) as number));
        continue;
      }

      if (this.OPERATORS.includes(token)) {
        if (stack.length < 2) {
          throw new Error("NEO");
        }
        const rhs = stack.pop()!;
        const lhs = stack.pop()!;
        stack.push(new PrimitiveCalculation(lhs, rhs, token));
        continue;
      }

      if (this.TRIG_FUNCTIONS.includes(token)) {
        if (stack.length < 1) {
          throw new Error(`NEO`); // Not enough operands for function
        }
        const arg = stack.pop()!;
        stack.push(new TrigFunctionCalculation(arg, token));
        continue;
      }

      if (this.LOG_FUNCTIONS.includes(token)) {
        if (stack.length < 1) {
          throw new Error(`NEO`); // Not enough operands for function
        }
        const arg = stack.pop()!;
        stack.push(new LogarithmicCalculation(arg, token));
        continue;
      }

      if (this.MIN_MAX_FUNCTIONS.includes(token)) {
        if (stack.length < 2) {
          throw new Error("NEO"); // Not enough operands for function
        }
        const rhs = stack.pop()!;
        const lhs = stack.pop()!;
        stack.push(new MinMaxCalculation(lhs, rhs, token));
        continue;
      }

      throw new Error(`UT`);
    }

    if (stack.length !== 1) {
      throw new Error("IE"); // Invalid expression
    }

    return stack[0];
  }
}
