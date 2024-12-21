export default class AngleUnit {
  private static unit: string = "deg";

  public static setDeg() {
    this.unit = "deg";
  }

  public static setRad() {
    this.unit = "rad";
  }

  public static get(): string {
    return this.unit;
  }
}
