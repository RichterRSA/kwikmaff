import AbstractExpression from "../../AbstractExpression.js";
import NumberExpression from "../../NumberExpression.js";
import CalculationExpression from "../../CalculationExpression.js";

export default class MinMaxCalculation extends CalculationExpression {
  private lhs: AbstractExpression;
  private rhs: AbstractExpression;
  private operator: string;

  constructor(
    lhs: AbstractExpression,
    rhs: AbstractExpression,
    operator: string
  ) {
    super();
    if (operator !== "min" && operator !== "max") {
      throw new Error(`Invalid operator ${operator} for MinMaxCalculation`);
    }
    this.lhs = lhs;
    this.rhs = rhs;
    this.operator = operator;
  }

  calculate(): number {
    var lhsValue: number = NaN; // = this.lhs.evaluate();
    var rhsValue: number = NaN; // = this.rhs.evaluate();

    if (this.lhs instanceof NumberExpression) {
      lhsValue = this.lhs.getValue();
    } else if (this.lhs instanceof CalculationExpression) {
      lhsValue = (this.lhs as CalculationExpression).calculate();
    }

    if (this.rhs instanceof NumberExpression) {
      rhsValue = this.rhs.getValue();
    } else if (this.rhs instanceof CalculationExpression) {
      rhsValue = (this.rhs as CalculationExpression).calculate();
    }

    if (this.operator === "min") {
      return Math.min(lhsValue, rhsValue);
    } else {
      return Math.max(lhsValue, rhsValue);
    }
  }

  evaluate(): AbstractExpression {
    return new NumberExpression(this.calculate());
  }

  toString(): string {
    return `${this.operator}(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }
}
