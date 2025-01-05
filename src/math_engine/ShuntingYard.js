class ShuntingYard {
    static parse(expression) {
        var tokens = expression.match(/(sin|cos|tan|max|min|ln|log|pi|π|e|\d*\.?\d+|[\+\-\*\/\^\(\),])/g) || [];
        var output = [];
        var operators = [];
        const ops = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
            "^": 3,
        };
        const functions = ["sin", "cos", "tan", "max", "min", "ln", "log"];
        const constants = ["pi", "π", "e"];
        const isRightAssociative = (op) => op === "^";
        const isNumber = (token) => !isNaN(Number(token)) || token === "0";
        while (tokens.length > 0) {
            const token = tokens.shift();
            if (token === "")
                continue;
            if (isNumber(token)) {
                // Changed condition here
                output.push(token);
            }
            else if (constants.includes(token)) {
                output.push(token);
            }
            else if (functions.includes(token)) {
                operators.push(token);
            }
            else if (token === "(") {
                operators.push(token);
            }
            else if (token === ")") {
                while (operators.length > 0 &&
                    operators[operators.length - 1] !== "(") {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove "("
                if (operators.length > 0 &&
                    functions.includes(operators[operators.length - 1])) {
                    output.push(operators.pop());
                }
            }
            else if (token === ",") {
                continue;
            }
            else {
                while (operators.length > 0 &&
                    operators[operators.length - 1] !== "(" &&
                    ops[operators[operators.length - 1]] >= ops[token] &&
                    !isRightAssociative(token)) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }
        while (operators.length > 0) {
            output.push(operators.pop());
        }
        return output;
    }
}
export default ShuntingYard;
