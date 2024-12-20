import PrimitiveCalculation from "../math_engine/calculation_expressions/binary_calculations/PrimitiveCalculation";
import BracketCalculation from "../math_engine/calculation_expressions/unary_calculations/BracketCalculation";
import NumberExpression from "../math_engine/NumberExpression";

describe("BracketCalculation", () => {
  test("expression is a NumberExpression", () => {
    const numberExpression = new NumberExpression(5);
    const bracketCalculation = new BracketCalculation(numberExpression);

    expect(bracketCalculation.calculate()).toBe(5);
    expect((bracketCalculation.evaluate() as NumberExpression).getValue()).toBe(
      5
    );
    expect(bracketCalculation.toString()).toBe("(5)");
  });

  test("expression is a PrimitiveCalculation", () => {
    const lhs = new NumberExpression(5);
    const rhs = new NumberExpression(3);
    const primitiveCalculation = new PrimitiveCalculation(lhs, rhs, "+");
    const bracketCalculation = new BracketCalculation(primitiveCalculation);

    expect(bracketCalculation.calculate()).toBe(8);
    expect((bracketCalculation.evaluate() as NumberExpression).getValue()).toBe(
      8
    );
    expect(bracketCalculation.toString()).toBe("(5 + 3)");
  });

  test("nested BracketCalculation", () => {
    const numberExpression = new NumberExpression(5);
    const innerBracketCalculation = new BracketCalculation(numberExpression);
    const outerBracketCalculation = new BracketCalculation(
      innerBracketCalculation
    );

    expect(outerBracketCalculation.calculate()).toBe(5);
    expect(
      (outerBracketCalculation.evaluate() as NumberExpression).getValue()
    ).toBe(5);
    expect(outerBracketCalculation.toString()).toBe("((5))");
  });

  test("invalid expression inside brackets", () => {
    const invalidExpression = {} as NumberExpression; // Simulate an invalid expression
    const bracketCalculation = new BracketCalculation(invalidExpression);

    expect(() => bracketCalculation.calculate()).toThrow(
      "Invalid expression inside the brackets"
    );
  });
});
