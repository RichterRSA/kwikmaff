import AbstractExpression from "./AbstractExpression.js";

abstract class CalculationExpression extends AbstractExpression {
  abstract calculate(): number;
}

export default CalculationExpression;
