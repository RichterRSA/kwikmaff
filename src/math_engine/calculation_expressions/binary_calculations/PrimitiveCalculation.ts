import AbstractExpression from "../../AbstractExpression";
import CalculationExpression from "../../CalculationExpression";
import NumberExpression from "../../NumberExpression";
import BinaryCalculation from "../BinaryCalculation";

class PrimitiveCalculation extends BinaryCalculation {
  protected operator: string;

  constructor(
    lhs: AbstractExpression,
    rhs: AbstractExpression,
    operator: string
  ) {
    super(lhs, rhs);
    this.operator = operator;
  }

  calculate(): number {
    var leftValue: number;
    var rightValue: number;

    if (this.lhs instanceof NumberExpression) {
      leftValue = this.lhs.getValue();
    } else if (this.lhs instanceof CalculationExpression) {
      leftValue = this.lhs.calculate();
    } else {
      throw new Error("Invalid left hand side of the expression");
    }

    if (this.rhs instanceof NumberExpression) {
      rightValue = this.rhs.getValue();
    } else if (this.rhs instanceof CalculationExpression) {
      rightValue = this.rhs.calculate();
    } else {
      throw new Error("Invalid right hand side of the expression");
    }

    switch (this.operator) {
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;
      case "*":
        return leftValue * rightValue;
      case "/":
        return leftValue / rightValue;
    }

    throw new Error(`Unknown operator: ${this.operator}`);
  }
  evaluate(): AbstractExpression {
    throw new Error("Method not implemented.");
  }
  toString(): string {
    throw new Error("Method not implemented.");
  }
}

export default PrimitiveCalculation;
