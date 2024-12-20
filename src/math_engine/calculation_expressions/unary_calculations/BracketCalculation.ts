import AbstractExpression from "../../AbstractExpression";
import CalculationExpression from "../../CalculationExpression";
import NumberExpression from "../../NumberExpression";
import UnaryCalculation from "../UnaryCalculation";

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
