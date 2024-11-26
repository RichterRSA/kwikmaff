import { Expression } from "./Expression.js";
import { NumberExpression } from "./NumberExpression.js";

const operators = ["*", "/", "+", "-"];

export class BasicExpression extends Expression {
  numbers: NumberExpression[] = [];
  numOps: string[] = [];

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

    var array: string[] = token.split(/\*|\/|\+|\-/);

    for (const element of array) {
      if (!NumberExpression.canParse(element)) {
        return false;
      }
    }

    return true;
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

    var array: string[] = token.split(/\*|\/|\+|\-/);

    for (const element of array) {
      var ex = new NumberExpression();
      ex.parse(element);
      this.numbers.push(ex);
    }

    for (let i = 0; i < token.length; i++) {
      if (operators.includes(token[i])) {
        this.numOps.push(token[i]);
      }
    }
  }

  evaluate(): Number {
    // while (this.numOps.length > 0) {
    //do multiplication and division first
    for (let i = 0; i < this.numOps.length; i++) {
      if (this.numOps[i] === "*" || this.numOps[i] === "/") {
        if (this.numOps[i] === "*") {
          this.numbers[i].value =
            this.numbers[i].evaluate().valueOf() *
            this.numbers[i + 1].evaluate().valueOf();
        } else {
          this.numbers[i].value =
            this.numbers[i].evaluate().valueOf() *
            this.numbers[i + 1].evaluate().valueOf();
        }
        this.numbers.splice(i + 1, 1);
        this.numOps.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < this.numOps.length; i++) {
      if (this.numOps[i] === "+" || this.numOps[i] === "-") {
        if (this.numOps[i] === "+") {
          this.numbers[i].value =
            this.numbers[i].evaluate().valueOf() +
            this.numbers[i + 1].evaluate().valueOf();
        } else {
          this.numbers[i].value =
            this.numbers[i].evaluate().valueOf() -
            this.numbers[i + 1].evaluate().valueOf();
        }
        this.numbers.splice(i + 1, 1);
        this.numOps.splice(i, 1);
        i--;
      }
    }
    return this.numbers[0].value;
    // }
  }
}
