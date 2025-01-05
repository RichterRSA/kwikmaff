import CalculationExpression from "../../CalculationExpression.js";
import NumberExpression from "../../NumberExpression.js";
import BinaryCalculation from "../BinaryCalculation.js";
class PrimitiveCalculation extends BinaryCalculation {
    constructor(lhs, rhs, operator) {
        super(lhs, rhs);
        this.operator = operator;
    }
    calculate() {
        var leftValue;
        var rightValue;
        if (this.lhs instanceof NumberExpression) {
            leftValue = this.lhs.getValue();
        }
        else if (this.lhs instanceof CalculationExpression) {
            leftValue = this.lhs.calculate();
        }
        else {
            throw new Error("Invalid left hand side of the expression: " + this.lhs.toString());
        }
        if (this.rhs instanceof NumberExpression) {
            rightValue = this.rhs.getValue();
        }
        else if (this.rhs instanceof CalculationExpression) {
            rightValue = this.rhs.calculate();
        }
        else {
            throw new Error("Invalid right hand side of the expression");
        }
        switch (this.operator) {
            case "+":
                return leftValue + rightValue;
            case "-":
                return leftValue - rightValue;
            case "*":
                return leftValue * rightValue;
            case "/":
                return leftValue / rightValue;
            case "^":
                return leftValue ** rightValue;
        }
        throw new Error(`Unknown operator: ${this.operator}`);
    }
    evaluate() {
        return new NumberExpression(this.calculate());
    }
    toString() {
        return `${this.lhs.toString()} ${this.operator} ${this.rhs.toString()}`;
    }
}
export default PrimitiveCalculation;
