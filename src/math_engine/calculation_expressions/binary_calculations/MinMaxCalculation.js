import NumberExpression from "../../NumberExpression.js";
import CalculationExpression from "../../CalculationExpression.js";
export default class MinMaxCalculation extends CalculationExpression {
    constructor(lhs, rhs, operator) {
        super();
        if (operator !== "min" && operator !== "max") {
            throw new Error(`Invalid operator ${operator} for MinMaxCalculation`);
        }
        this.lhs = lhs;
        this.rhs = rhs;
        this.operator = operator;
    }
    calculate() {
        var lhsValue = NaN; // = this.lhs.evaluate();
        var rhsValue = NaN; // = this.rhs.evaluate();
        if (this.lhs instanceof NumberExpression) {
            lhsValue = this.lhs.getValue();
        }
        else if (this.lhs instanceof CalculationExpression) {
            lhsValue = this.lhs.calculate();
        }
        if (this.rhs instanceof NumberExpression) {
            rhsValue = this.rhs.getValue();
        }
        else if (this.rhs instanceof CalculationExpression) {
            rhsValue = this.rhs.calculate();
        }
        if (this.operator === "min") {
            return Math.min(lhsValue, rhsValue);
        }
        else {
            return Math.max(lhsValue, rhsValue);
        }
    }
    evaluate() {
        return new NumberExpression(this.calculate());
    }
    toString() {
        return `${this.operator}(${this.lhs.toString()}, ${this.rhs.toString()})`;
    }
}
