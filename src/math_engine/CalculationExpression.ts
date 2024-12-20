import AbstractExpression from "./AbstractExpression";

abstract class CalculationExpression extends AbstractExpression {
  abstract calculate(): number;
}

export default CalculationExpression;
