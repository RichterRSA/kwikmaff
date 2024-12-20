import AbstractExpression from "./AbstractExpression.js";
import NumberExpression from "./NumberExpression.js";
import PrimitiveCalculation from "./calculation_expressions/binary_calculations/PrimitiveCalculation.js";
import FunctionCalculation from "./calculation_expressions/unary_calculations/FunctionCalculation.js";

export default class SYExpressionParser {
  private static readonly OPERATORS = ["+", "-", "*", "/", "^"];
  private static readonly FUNCTIONS = ["sin", "cos", "tan", "max", "min"];
  private static readonly SPECIAL_CONSTANTS = {
    π: Math.PI,
  };

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

      if (token in this.SPECIAL_CONSTANTS) {
        stack.push(
          new NumberExpression(
            this.SPECIAL_CONSTANTS[token as keyof typeof this.SPECIAL_CONSTANTS]
          )
        );
        continue;
      }

      if (this.OPERATORS.includes(token)) {
        if (stack.length < 2) {
          throw new Error(`Not enough operands for operator ${token}`);
        }
        const rhs = stack.pop()!;
        const lhs = stack.pop()!;
        stack.push(new PrimitiveCalculation(lhs, rhs, token));
        continue;
      }

      if (this.FUNCTIONS.includes(token)) {
        if (stack.length < 1) {
          throw new Error(`Not enough operands for function ${token}`);
        }
        const arg = stack.pop()!;
        stack.push(new FunctionCalculation(arg, token));
        continue;
      }

      throw new Error(`Unknown token: ${token}`);
    }

    if (stack.length !== 1) {
      throw new Error("Invalid expression: too many operands");
    }

    return stack[0];
  }
}
