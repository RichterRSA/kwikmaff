// src/calculator/Calculator.ts
import ShuntingYard from "../math_engine/ShuntingYard.js";
import SYExpressionParser from "../math_engine/SYExpressionParser.js";
import CalculationExpression from "../math_engine/CalculationExpression.js";
import NumberExpression from "../math_engine/NumberExpression.js";
export class Calculator {
    static evaluate(expression) {
        const processedText = Calculator.preprocessExpression(expression);
        const tokens = ShuntingYard.parse(processedText);
        try {
            const result = SYExpressionParser.parseExpression(tokens);
            if (result instanceof CalculationExpression) {
                return result.calculate().toString();
            }
            else if (result instanceof NumberExpression) {
                return result.getValue().toString();
            }
            return "Error";
        }
        catch (e) {
            const err = e.message;
            if (err.startsWith("UT")) {
                return "Invalid Token: " + err.substring(2);
            }
            else if (err.startsWith("NEO")) {
                return "Not enough operands for function";
            }
            return "Invalid expression";
        }
    }
    static preprocessExpression(expression) {
        // Move your existing preprocessExpression here
    }
}
