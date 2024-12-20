class ShuntingYard {
  static parse(expression: string): string[] {
    var tokens: string[] =
      expression.match(/(sin|cos|tan|max|min|\d*\.?\d+|[\+\-\*\/\^\(\)])/g) ||
      [];

    console.log("Tokens: ", tokens);

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

    const isRightAssociative = (op: string) => op === "^";

    while (tokens.length > 0) {
      const token = tokens.shift();

      if (token === "") continue;

      if (Number.parseFloat(token!)) {
        output.push(token!);
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "("
        ) {
          output.push(operators.pop()!);
        }
        operators.pop();
      } else if (functions.includes(token!)) {
        operators.push(token!);
      } else {
        while (
          operators.length > 0 &&
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
