import AbstractExpression from "../../AbstractExpression.js";
import CalculationExpression from "../../CalculationExpression.js";
import NumberExpression from "../../NumberExpression.js";
import UnaryCalculation from "../UnaryCalculation.js";

export default class LogarithmicCalculation extends UnaryCalculation {
  private readonly functionName: string;

  constructor(expression: AbstractExpression, functionName: string) {
    super(expression);
    this.functionName = functionName;
  }

  calculate(): number {
    var val: number = NaN;
    if (this.value instanceof NumberExpression) {
      val = this.value.getValue();
    } else if (this.value instanceof CalculationExpression) {
      val = this.value.calculate();
    }

    if (Number.isNaN(val)) {
      throw new Error(`Invalid value for function ${this.functionName}`);
    }

    switch (this.functionName) {
      case "ln":
        return Math.log(val);
      case "log":
        return Math.log10(val);
      default:
        throw new Error(`Unknown function: ${this.functionName}`);
    }
  }

  evaluate(): AbstractExpression {
    return new NumberExpression(this.calculate());
  }

  toString(): string {
    return `${this.functionName}(${this.value.toString()})`;
  }
}
