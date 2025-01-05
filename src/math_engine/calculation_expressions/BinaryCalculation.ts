import AbstractExpression from "../AbstractExpression.js";
import CalculationExpression from "../CalculationExpression.js";

abstract class BinaryCalculation extends CalculationExpression {
  protected lhs: AbstractExpression;
  protected rhs: AbstractExpression;

  constructor(lhs: AbstractExpression, rhs: AbstractExpression) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

export default BinaryCalculation;
