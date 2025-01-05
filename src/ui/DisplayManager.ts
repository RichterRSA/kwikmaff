import { IDisplayManager } from "../types/types.js";

export class DisplayManager implements IDisplayManager {
  private cursorPosition: number = 1;
  private display: HTMLElement | null;

  constructor() {
    this.display = document.getElementById("text-content");
  }

  updateDisplay(text: string): void {
    if (this.display) {
      this.display.innerHTML =
        text.slice(0, this.cursorPosition) +
        '<span id="cursor" class="cursor"></span>' +
        text.slice(this.cursorPosition);
    }
  }

  setCursorPosition(position: number): void {
    this.cursorPosition = position;
  }

  getCursorPosition(): number {
    return this.cursorPosition;
  }
}
