class AngleUnit {
    static setDeg() {
        this.unit = "deg";
    }
    static setRad() {
        this.unit = "rad";
    }
    static get() {
        return this.unit;
    }
}
AngleUnit.unit = "deg";
export default AngleUnit;
