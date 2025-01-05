import AbstractExpression from "./AbstractExpression.js";
class NumberExpression extends AbstractExpression {
    constructor(value) {
        super();
        this.value = value;
    }
    evaluate() {
        return this;
    }
    toString() {
        return this.value.toString();
    }
    getValue() {
        return this.value;
    }
}
export default NumberExpression;
