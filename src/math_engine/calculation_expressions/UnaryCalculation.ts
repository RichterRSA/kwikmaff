import AbstractExpression from "../AbstractExpression";
import CalculationExpression from "../CalculationExpression";

abstract class UnaryCalculation extends CalculationExpression {
  protected value: AbstractExpression;

  constructor(value: AbstractExpression) {
    super();
    this.value = value;
  }
}

export default UnaryCalculation;
