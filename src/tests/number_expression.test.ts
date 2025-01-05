import { describe } from "node:test";
import NumberExpression from "../math_engine/NumberExpression";

describe("NumberExpression", () => {
  it("should evaluate to itself", () => {
    const number = new NumberExpression(5);
    expect(number.evaluate()).toBe(number);
  });

  it("should convert to a string", () => {
    const number = new NumberExpression(5);
    expect(number.toString()).toBe("5");
  });
});
