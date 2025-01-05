import PrimitiveCalculation from "../math_engine/calculation_expressions/binary_calculations/PrimitiveCalculation";
import NumberExpression from "../math_engine/NumberExpression";
describe("PrimitiveCalculation", () => {
    test("both sides are NumberExpressions", () => {
        const lhs = new NumberExpression(5);
        const rhs = new NumberExpression(3);
        const addition = new PrimitiveCalculation(lhs, rhs, "+");
        expect(addition.calculate()).toBe(8);
        const subtraction = new PrimitiveCalculation(lhs, rhs, "-");
        expect(subtraction.calculate()).toBe(2);
        const multiplication = new PrimitiveCalculation(lhs, rhs, "*");
        expect(multiplication.calculate()).toBe(15);
        const division = new PrimitiveCalculation(lhs, rhs, "/");
        expect(division.calculate()).toBe(5 / 3);
    });
    test("both sides are PrimitiveCalculations", () => {
        const lhs1 = new NumberExpression(5);
        const rhs1 = new NumberExpression(3);
        const lhs2 = new NumberExpression(2);
        const rhs2 = new NumberExpression(4);
        const innerCalculation1 = new PrimitiveCalculation(lhs1, rhs1, "+");
        const innerCalculation2 = new PrimitiveCalculation(lhs2, rhs2, "*");
        const addition = new PrimitiveCalculation(innerCalculation1, innerCalculation2, "+");
        expect(addition.calculate()).toBe(8 + 8);
        const subtraction = new PrimitiveCalculation(innerCalculation1, innerCalculation2, "-");
        expect(subtraction.calculate()).toBe(8 - 8);
        const multiplication = new PrimitiveCalculation(innerCalculation1, innerCalculation2, "*");
        expect(multiplication.calculate()).toBe(8 * 8);
        const division = new PrimitiveCalculation(innerCalculation1, innerCalculation2, "/");
        expect(division.calculate()).toBe(8 / 8);
    });
    test("one side is NumberExpression and the other is PrimitiveCalculation", () => {
        const lhs = new NumberExpression(5);
        const rhs1 = new NumberExpression(3);
        const rhs2 = new NumberExpression(2);
        const innerCalculation = new PrimitiveCalculation(rhs1, rhs2, "+");
        const addition = new PrimitiveCalculation(lhs, innerCalculation, "+");
        expect(addition.calculate()).toBe(5 + 5);
        const subtraction = new PrimitiveCalculation(lhs, innerCalculation, "-");
        expect(subtraction.calculate()).toBe(5 - 5);
        const multiplication = new PrimitiveCalculation(lhs, innerCalculation, "*");
        expect(multiplication.calculate()).toBe(5 * 5);
        const division = new PrimitiveCalculation(lhs, innerCalculation, "/");
        expect(division.calculate()).toBe(5 / 5);
    });
});
