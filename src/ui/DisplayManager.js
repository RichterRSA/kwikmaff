export class DisplayManager {
    constructor() {
        this.cursorPosition = 1;
        this.display = document.getElementById("text-content");
    }
    updateDisplay(text) {
        if (this.display) {
            this.display.innerHTML =
                text.slice(0, this.cursorPosition) +
                    '<span id="cursor" class="cursor"></span>' +
                    text.slice(this.cursorPosition);
        }
    }
    setCursorPosition(position) {
        this.cursorPosition = position;
    }
    getCursorPosition() {
        return this.cursorPosition;
    }
}
