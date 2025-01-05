import { DisplayManager } from "./ui/DisplayManager.js";
import { InputHandler } from "./ui/InputHandler.js";
import AngleUnit from "./Units.js";
const displayManager = new DisplayManager();
const inputHandler = new InputHandler(displayManager);
// Event listeners
document.addEventListener("keydown", (e) => inputHandler.handleKeyDown(e));
document.addEventListener("keyup", (e) => inputHandler.handleKeyUp(e));
// Export for global access from HTML
window.button = inputHandler.handleButton.bind(inputHandler);
window.unit = (unit) => {
    switch (unit) {
        case 0:
            AngleUnit.setDeg();
            setSelectedUnit(0);
            break;
        case 1:
            AngleUnit.setRad();
            setSelectedUnit(1);
            break;
    }
};
function setSelectedUnit(index) {
    const unitButtons = document.getElementsByClassName("unit");
    for (let i = 0; i < unitButtons.length; i++) {
        const button = unitButtons[i];
        if (i === index) {
            button.classList.add("unit-selected");
        }
        else {
            button.classList.remove("unit-selected");
        }
    }
}
