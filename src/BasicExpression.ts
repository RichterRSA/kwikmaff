import { Expression } from "./Expression.js";
import { NumberExpression } from "./NumberExpression.js";

const operators = ["*", "/", "+", "-"];

export class BasicExpression extends Expression {
  lvalue: Number = NaN;
  rvalue: Number = NaN;
  operator: string = ".";

  constructor() {
    super();
  }

  static canParse(token: string): boolean {
    var containsOperator = false;
    var operatorPosition = -1;
    for (const operator of operators) {
      if (token.includes(operator)) {
        containsOperator = true;
        operatorPosition = token.indexOf(operator);
      }
    }

    if (!containsOperator) {
      return false;
    }

    let before = token.slice(0, operatorPosition);
    let after = token.slice(operatorPosition + 1);

    if (NumberExpression.canParse(before) && NumberExpression.canParse(after)) {
      return true;
    }

    return false;
  }

  parse(token: string): void {
    if (!BasicExpression.canParse(token)) {
      throw new Error("Cannot parse token: " + token);
    }

    var containsOperator = false;
    var operatorPosition = -1;
    for (const operator of operators) {
      if (token.includes(operator)) {
        containsOperator = true;
        operatorPosition = token.indexOf(operator);
      }
    }

    if (!containsOperator) {
      return;
    }

    let before = token.slice(0, operatorPosition);
    let after = token.slice(operatorPosition + 1);

    if (NumberExpression.canParse(before) && NumberExpression.canParse(after)) {
      var ex = new NumberExpression();
      ex.parse(before);
      this.lvalue = ex.evaluate();

      ex = new NumberExpression();
      ex.parse(after);
      this.rvalue = ex.evaluate();

      this.operator = token[operatorPosition];
    }
  }

  evaluate(): Number {
    if (Number.isNaN(this.lvalue)) {
      throw new Error("Left value is NaN");
    }
    if (Number.isNaN(this.rvalue)) {
      throw new Error("Right value is NaN");
    }

    var result = this.lvalue.valueOf();
    var rhand = this.rvalue.valueOf();

    if (this.operator === "*") {
      result *= rhand;
    } else if (this.operator === "/") {
      result /= rhand;
    } else if (this.operator === "+") {
      result += rhand;
    } else if (this.operator === "-") {
      result -= rhand;
    } else {
      return NaN;
    }

    return result;
  }
}
