import CalculationExpression from "../CalculationExpression.js";
class BinaryCalculation extends CalculationExpression {
    constructor(lhs, rhs) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }
}
export default BinaryCalculation;
