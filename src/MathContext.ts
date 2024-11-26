import { BasicExpression } from "./BasicExpression.js";
import { NumberExpression } from "./NumberExpression.js";

export class MathContext {
  static stringContext: string = "";

  static setContext(context: string) {
    this.stringContext = context;

    console.log("Context: ", context);
  }

  static parse() {
    if (NumberExpression.canParse(this.stringContext)) {
      console.log("Can parse as number");
      var ex = new NumberExpression();
      ex.parse(this.stringContext);
      console.log("Parsed value: ", ex.evaluate());
    } else {
      console.log("Cannot parse as number");
    }

    if (BasicExpression.canParse(this.stringContext)) {
      console.log("Can parse as basic expression");
      var ex2 = new BasicExpression();
      ex2.parse(this.stringContext);
      console.log("Parsed value: ", ex2.evaluate());
    } else {
      console.log("Cannot parse as basic expression");
    }
  }
}
