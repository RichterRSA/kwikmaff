import ShuntingYard from "../math_engine/ShuntingYard.js";
import SYExpressionParser from "../math_engine/SYExpressionParser.js";
import CalculationExpression from "../math_engine/CalculationExpression.js";
import NumberExpression from "../math_engine/NumberExpression.js";

export class Calculator {
  static evaluate(expression: string): string {
    const processedText = Calculator.preprocessExpression(expression);
    console.log("Processed Text: ", processedText);
    const tokens = ShuntingYard.parse(processedText);
    console.log("Tokens: ", tokens);

    const result = SYExpressionParser.parseExpression(tokens);
    if (result instanceof CalculationExpression) {
      return result.calculate().toString();
    } else if (result instanceof NumberExpression) {
      return result.getValue().toString();
    }

    throw new Error("UE"); // Unknown Error
  }

  static preprocessExpression(expression: string): string {
    let result = "";
    let i = 0;
    const constantPattern = /[πeπphi]/;

    if (
      expression.startsWith("+") ||
      expression.startsWith("-") ||
      expression.startsWith("*") ||
      expression.startsWith("/")
    ) {
      expression = "0" + expression;
    }

    while (i < expression.length) {
      if (i > 0) {
        const before = expression[i - 1];
        const current = expression[i];

        if (
          (/\d/.test(before) && /[a-zA-Z(πe]/.test(current)) ||
          (before === ")" && /[\d(a-zA-ZπE]/.test(current)) ||
          (constantPattern.test(before) && /[\d(]/.test(current)) ||
          (constantPattern.test(before) && constantPattern.test(current))
        ) {
          result += "*";
        }
      }
      result += expression[i];
      i++;
    }
    return result;
  }
}
