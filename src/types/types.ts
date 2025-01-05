export interface IDisplayManager {
  updateDisplay(text: string): void;
  getCursorPosition(): number;
  setCursorPosition(position: number): void;
}

export interface IInputHandler {
  handleButton(input: string): void;
  handleKeyDown(event: KeyboardEvent): void;
  handleKeyUp(event: KeyboardEvent): void;
}
