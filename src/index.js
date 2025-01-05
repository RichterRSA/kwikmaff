var _a;
import CalculationExpression from "./math_engine/CalculationExpression.js";
import NumberExpression from "./math_engine/NumberExpression.js";
import ShuntingYard from "./math_engine/ShuntingYard.js";
import SYExpressionParser from "./math_engine/SYExpressionParser.js";
import AngleUnit from "./Units.js";
let cursorPosition = 1;
let isControlHeld = false;
let error = false;
const functionUnits = [
    "pow",
    "exp",
    "sqrt",
    "logxy",
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
];
function button(input) {
    const display = document.getElementById("text-content");
    const cursor = document.getElementById("cursor");
    if (display && cursor) {
        // Get the current text without the cursor
        const text = display.innerText.replace("|", "").trim();
        // Update the text based on the input
        let newText = text;
        if (error) {
            newText = "0";
            error = false;
        }
        if (input === "left") {
            cursorPosition = Math.max(0, cursorPosition - 1);
        }
        else if (input === "right") {
            cursorPosition = Math.min(text.length, cursorPosition + 1);
        }
        else if (input === "backspace") {
            if (cursorPosition > 0) {
                if (newText.length == 1) {
                    newText = "0";
                    cursorPosition = 1;
                }
                if (newText === text) {
                    if (cursorPosition >= text.length) {
                        cursorPosition = text.length;
                        newText = text.slice(0, cursorPosition - 1);
                        cursorPosition = newText.length;
                    }
                    else {
                        newText =
                            text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
                        cursorPosition -= 1;
                    }
                }
            }
        }
        else if (input === "delete") {
            if (cursorPosition < text.length) {
                // Check if the character after the cursor is part of a function unit
                for (const func of functionUnits) {
                    if (newText.slice(cursorPosition, cursorPosition + func.length) === func) {
                        newText =
                            newText.slice(0, cursorPosition) +
                                newText.slice(cursorPosition + func.length);
                        break;
                    }
                }
                if (newText === text) {
                    newText =
                        text.slice(0, cursorPosition) + text.slice(cursorPosition + 1);
                }
            }
        }
        else if (input === "equals") {
            // Calculate the result
            if (text.length > 0) {
                const processedText = preprocessExpression(text);
                const tokens = ShuntingYard.parse(processedText);
                let expression = null;
                try {
                    expression = SYExpressionParser.parseExpression(tokens);
                }
                catch (e) {
                    let err = e.message;
                    if (err.startsWith("UT")) {
                        newText = "Invalid Token: " + err.substring(2);
                    }
                    else if (err.startsWith("NEO")) {
                        newText = "Not enough operands for function";
                    }
                    else if (err.startsWith("IE")) {
                        newText = "Invalid expression";
                    }
                    else {
                        console.log("Error: ", e);
                    }
                    error = true;
                }
                if (expression instanceof CalculationExpression) {
                    const result = expression.calculate();
                    newText = result.toString();
                }
                else if (expression instanceof NumberExpression) {
                    newText = expression.getValue().toString();
                }
                newText = newText.trim();
                //move cursor
                cursorPosition = newText.trim().length;
            }
            else {
                newText = "0";
                cursorPosition = 1;
            }
        }
        else if (input === "AC") {
            newText = "0";
            cursorPosition = 1;
        }
        else if (input == "lb") {
            newText =
                text.slice(0, cursorPosition) + "(" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "rb") {
            newText =
                text.slice(0, cursorPosition) + ")" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "dot") {
            newText =
                text.slice(0, cursorPosition) + "." + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "plus") {
            newText =
                text.slice(0, cursorPosition) + "+" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "minus") {
            newText =
                text.slice(0, cursorPosition) + "-" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "multiply") {
            newText =
                text.slice(0, cursorPosition) + "*" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "divide") {
            newText =
                text.slice(0, cursorPosition) + "/" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else if (input == "pow") {
            newText =
                text.slice(0, cursorPosition) + "^" + text.slice(cursorPosition);
            cursorPosition += 1;
        }
        else {
            if (text != "0") {
                newText =
                    text.slice(0, cursorPosition) + input + text.slice(cursorPosition);
                cursorPosition += input.length;
            }
            else {
                newText = input;
                cursorPosition = input.length;
            }
        }
        updateDisplay(newText);
    }
}
function preprocessExpression(expression) {
    let result = "";
    let i = 0;
    const constantPattern = /[πeπphi]/;
    while (i < expression.length) {
        if (i > 0) {
            const before = expression[i - 1];
            const current = expression[i];
            if ((/\d/.test(before) && /[a-zA-Z(πe]/.test(current)) ||
                (before === ")" && /[\d(a-zA-ZπE]/.test(current)) ||
                (constantPattern.test(before) && /[\d(]/.test(current)) ||
                (constantPattern.test(before) && constantPattern.test(current))) {
                result += "*";
            }
        }
        result += expression[i];
        i++;
    }
    return result;
}
function unit(unit) {
    switch (unit) {
        case 0:
            AngleUnit.setDeg();
            setSelectedUnit(0);
            break;
        case 1:
            AngleUnit.setRad();
            setSelectedUnit(1);
            break;
        default:
            break;
    }
}
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
document.addEventListener("keydown", (e) => {
    if ((e.key === "Backspace" || e.key === "Delete") && isControlHeld) {
        e.preventDefault();
        button("AC");
        return;
    }
    handleKeydown(e);
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Control") {
        isControlHeld = true;
    }
});
document.addEventListener("keyup", (e) => {
    if (e.key === "Control") {
        isControlHeld = false;
    }
});
function handleKeydown(event) {
    switch (event.key) {
        case "ArrowLeft":
            button("left");
            break;
        case "ArrowRight":
            button("right");
            break;
        case "Backspace":
            button("backspace");
            break;
        case "Delete":
            button("delete");
            break;
        case "Enter":
            button("equals");
        default:
            if (event.key.length === 1) {
                button(event.key);
            }
            break;
    }
}
(_a = document
    .getElementById("display")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", setCursorPosition);
function setCursorPosition(event) {
    const display = document.getElementById("text-content");
    if (display) {
        const text = display.innerText.replace("|", "");
        const rect = display.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        let newPosition = text.length;
        let cumulativeWidth = 0;
        for (let i = 0; i < text.length; i++) {
            const charWidth = getTextWidth(text[i], display);
            console.log("Char width: ", charWidth);
            if (cumulativeWidth + charWidth / 2 >= clickX) {
                console.log("Success");
                newPosition = i;
                break;
            }
            cumulativeWidth += charWidth;
        }
        cursorPosition = newPosition;
        updateDisplay(text);
    }
}
function getTextWidth(text, element) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
        const style = window.getComputedStyle(element);
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text).width;
    }
    return 0;
}
function updateDisplay(text) {
    const display = document.getElementById("text-content");
    if (display) {
        display.innerHTML =
            text.slice(0, cursorPosition) +
                '<span id="cursor" class="cursor"></span>' +
                text.slice(cursorPosition);
    }
}
window.button = button;
window.unit = unit;
