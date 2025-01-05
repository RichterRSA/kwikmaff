export class Constants {
    static isConstant(name) {
        return this.constants.has(name.toLowerCase());
    }
    static getValue(name) {
        return this.constants.get(name.toLowerCase());
    }
}
Constants.constants = new Map([
    ["pi", Math.PI],
    ["π", Math.PI],
    ["e", Math.E],
    ["phi", (1 + Math.sqrt(5)) / 2],
]);
