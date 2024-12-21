import AngleUnit from "../../../Units.js";
import AbstractExpression from "../../AbstractExpression.js";
import CalculationExpression from "../../CalculationExpression.js";
import NumberExpression from "../../NumberExpression.js";
import UnaryCalculation from "../UnaryCalculation.js";

export default class TrigFunctionCalculation extends UnaryCalculation {
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

    if (AngleUnit.get() === "deg") {
      val = val * (Math.PI / 180);
    }

    switch (this.functionName) {
      case "sin":
        return Math.sin(val);
      case "cos":
        return Math.cos(val);
      case "tan":
        return Math.tan(val);
      case "asin":
        return Math.asin(val);
      case "acos":
        return Math.acos(val);
      case "atan":
        return Math.atan(val);
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
