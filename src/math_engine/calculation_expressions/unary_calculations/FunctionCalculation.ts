import AbstractExpression from "../../AbstractExpression.js";
import CalculationExpression from "../../CalculationExpression.js";
import NumberExpression from "../../NumberExpression.js";
import UnaryCalculation from "../UnaryCalculation.js";

export default class FunctionCalculation extends UnaryCalculation {
  private readonly functionName: string;

  constructor(expression: AbstractExpression, functionName: string) {
    super(expression);
    this.functionName = functionName;
  }

  calculate(): number {
    if (this.value instanceof NumberExpression) {
      return this.value.getValue();
    } else if (this.value instanceof CalculationExpression) {
      const value = this.value.calculate();

      switch (this.functionName) {
        case "sin":
          return Math.sin(value);
        case "cos":
          return Math.cos(value);
        case "tan":
          return Math.tan(value);
        case "max":
          return Math.max(value);
        case "min":
          return Math.min(value);
        default:
          throw new Error(`Unknown function: ${this.functionName}`);
      }
    }
    throw new Error("Invalid expression inside the brackets");
  }

  evaluate(): AbstractExpression {
    return new NumberExpression(this.calculate());
  }

  toString(): string {
    return `${this.functionName}(${this.value.toString()})`;
  }
}
