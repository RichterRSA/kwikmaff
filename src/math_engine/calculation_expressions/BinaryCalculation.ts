import AbstractExpression from "../AbstractExpression";
import CalculationExpression from "../CalculationExpression";

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
