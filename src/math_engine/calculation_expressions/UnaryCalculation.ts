import AbstractExpression from "../AbstractExpression.js";
import CalculationExpression from "../CalculationExpression.js";

abstract class UnaryCalculation extends CalculationExpression {
  protected value: AbstractExpression;

  constructor(value: AbstractExpression) {
    super();
    this.value = value;
  }
}

export default UnaryCalculation;
