import { Calculator } from "../calculator/Calculator.js";
export class InputHandler {
    constructor(displayManager) {
        this.isControlHeld = false;
        this.error = false;
        this.displayManager = displayManager;
    }
    handleButton(input) {
        var _a;
        const currentPosition = this.displayManager.getCursorPosition();
        const currentText = ((_a = document
            .getElementById("text-content")) === null || _a === void 0 ? void 0 : _a.innerText.replace("|", "").trim()) || "";
        let newText = currentText;
        let newPosition = currentPosition;
        if (this.error) {
            newText = "0";
            this.error = false;
            this.displayManager.updateDisplay(newText);
        }
        // Handle navigation and editing
        switch (input) {
            case "left":
                newPosition = Math.max(0, currentPosition - 1);
                break;
            case "right":
                newPosition = Math.min(currentText.length, currentPosition + 1);
                break;
            case "backspace":
                if (newPosition > 0) {
                    if (newText.length == 1) {
                        newText = "0";
                        newPosition = 1;
                    }
                    if (newText === newText) {
                        if (newPosition >= newText.length) {
                            newPosition = newText.length;
                            newText = newText.slice(0, newPosition - 1);
                            newPosition = newText.length;
                        }
                        else {
                            newText =
                                newText.slice(0, newPosition - 1) + newText.slice(newPosition);
                            newPosition -= 1;
                        }
                    }
                }
                break;
            case "lb":
                newText = this.handleTextInput("(", currentText, currentPosition);
                newPosition = currentPosition + 1;
                break;
            case "rb":
                newText = this.handleTextInput(")", currentText, currentPosition);
                newPosition = currentPosition + 1;
                break;
            case "AC":
                newText = "0";
                newPosition = 1;
                break;
            case "delete":
                newText = this.handleBackspace(currentText, currentPosition + 1);
                break;
            case "equals":
                try {
                    newText = Calculator.evaluate(currentText);
                }
                catch (e) {
                    switch (e.message) {
                        case "UE":
                            newText = "Unknown Error";
                            break;
                        case "PE":
                            newText = "Parse Error";
                            break;
                        case "DE":
                            newText = "Divide by Zero";
                            break;
                        default:
                            newText = "Error";
                    }
                    this.error = true;
                }
                newPosition = newText.length;
                break;
            default:
                newText = this.handleTextInput(input, currentText, currentPosition);
                newPosition = currentPosition + input.length;
        }
        this.displayManager.setCursorPosition(newPosition);
        this.displayManager.updateDisplay(newText);
    }
    handleKeyDown(event) {
        if (this.error) {
            this.error = false;
            this.displayManager.updateDisplay("0");
        }
        if (event.key === "Control") {
            this.isControlHeld = true;
        }
        switch (event.key) {
            case "ArrowLeft":
                this.handleButton("left");
                break;
            case "ArrowRight":
                this.handleButton("right");
                break;
            case "Backspace":
                if (this.isControlHeld)
                    this.handleButton("AC");
                else
                    this.handleButton("backspace");
                break;
            case "Delete":
                if (this.isControlHeld)
                    this.handleButton("AC");
                else
                    this.handleButton("delete");
                break;
            case "Enter":
                this.handleButton("equals");
            default:
                if (event.key.length === 1) {
                    this.handleButton(event.key);
                }
                break;
        }
    }
    handleKeyUp(event) {
        if (event.key === "Control") {
            this.isControlHeld = false;
        }
    }
    handleBackspace(text, position) {
        if (text.length === 1)
            return "0";
        return text.slice(0, position - 1) + text.slice(position);
    }
    handleTextInput(input, text, position) {
        if (text === "0" && !/[.()]/.test(input)) {
            return input;
        }
        return text.slice(0, position) + input + text.slice(position);
    }
}
