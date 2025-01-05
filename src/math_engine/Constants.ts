export class Constants {
  private static readonly constants: Map<string, number> = new Map([
    ["pi", Math.PI],
    ["π", Math.PI],
    ["e", Math.E],
    ["phi", (1 + Math.sqrt(5)) / 2],
  ]);

  static isConstant(name: string): boolean {
    return this.constants.has(name.toLowerCase());
  }

  static getValue(name: string): number | undefined {
    return this.constants.get(name.toLowerCase());
  }
}
