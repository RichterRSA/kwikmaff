export class Expression {
  static canParse(token: string): boolean {
    console.error("NOT OVERRIDING BASE CANPARSE FUNCTION");
    return false;
  }

  parse(token: string): void {
    console.error("NOT OVERRIDING BASE PARSE FUNCTION");
  }

  evaluate(): Number {
    console.error("NOT OVERRIDING BASE EVALUATE FUNCTION");
    return NaN;
  }
}
