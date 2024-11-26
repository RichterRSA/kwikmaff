import { Expression } from "./Expression.js";

export class NumberExpression extends Expression {
  value: Number = NaN;

  constructor(number: Number = 0) {
    super();
    this.value = number;
  }

  static canParse(token: string): boolean {
    return !isNaN(Number(token));
  }

  parse(token: string): void {
    if (!NumberExpression.canParse(token)) {
      throw new Error("Cannot parse token: " + token);
    }

    this.value = Number(token);
  }

  evaluate(): Number {
    return this.value;
  }
}
