class ShuntingYard {
  static parse(expression: string): string[] {
    var tokens: string[] =
      expression.match(
        /(sin|cos|tan|max|min|pi|π|e|\d*\.?\d+|[\+\-\*\/\^\(\),])/g
      ) || [];

    var output: string[] = [];
    var operators: string[] = [];
    const ops: { [key: string]: number } = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3,
    };

    const functions = ["sin", "cos", "tan", "max", "min"];
    const constants = ["pi", "π", "e"];

    const isRightAssociative = (op: string) => op === "^";

    while (tokens.length > 0) {
      const token = tokens.shift();

      if (token === "") continue;

      if (Number.parseFloat(token!)) {
        output.push(token!);
      } else if (constants.includes(token!)) {
        output.push(token!);
      } else if (functions.includes(token!)) {
        operators.push(token!);
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "("
        ) {
          output.push(operators.pop()!);
        }
        operators.pop(); // Remove "("
        if (
          operators.length > 0 &&
          functions.includes(operators[operators.length - 1])
        ) {
          output.push(operators.pop()!);
        }
      } else if (token === ",") {
        continue;
      } else {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "(" &&
          ops[operators[operators.length - 1]] >= ops[token!] &&
          !isRightAssociative(token!)
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token!);
      }
    }

    while (operators.length > 0) {
      output.push(operators.pop()!);
    }

    return output;
  }
}

export default ShuntingYard;
