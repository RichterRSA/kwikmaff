import AbstractExpression from "../../AbstractExpression.js";
import CalculationExpression from "../../CalculationExpression.js";
import NumberExpression from "../../NumberExpression.js";
import UnaryCalculation from "../UnaryCalculation.js";

class BracketCalculation extends UnaryCalculation {
  constructor(expression: AbstractExpression) {
    super(expression);
  }

  calculate(): number {
    if (this.value instanceof CalculationExpression) {
      return this.value.calculate();
    } else if (this.value instanceof NumberExpression) {
      return this.value.getValue();
    }
    throw new Error("Invalid expression inside the brackets");
  }

  evaluate(): AbstractExpression {
    return new NumberExpression(this.calculate());
  }

  toString(): string {
    return `(${this.value.toString()})`;
  }
}

export default BracketCalculation;
