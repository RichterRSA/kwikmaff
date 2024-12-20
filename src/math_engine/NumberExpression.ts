import AbstractExpression from "./AbstractExpression";

class NumberExpression extends AbstractExpression {
  protected value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  evaluate(): NumberExpression {
    return this;
  }

  toString(): string {
    return this.value.toString();
  }

  public getValue(): number {
    return this.value;
  }
}

export default NumberExpression;
