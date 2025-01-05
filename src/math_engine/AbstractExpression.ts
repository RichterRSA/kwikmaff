abstract class AbstractExpression {
  abstract evaluate(): AbstractExpression;
  abstract toString(): string;
}

export default AbstractExpression;
