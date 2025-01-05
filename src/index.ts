import CalculationExpression from "./math_engine/CalculationExpression.js";
import ShuntingYard from "./math_engine/ShuntingYard.js";
import SYExpressionParser from "./math_engine/SYExpressionParser.js";
import AngleUnit from "./Units.js";

let cursorPosition = 1;

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

function button(input: string) {
  const display = document.getElementById("text-content");
  const cursor = document.getElementById("cursor");

  if (display && cursor) {
    // Get the current text without the cursor
    const text = display.innerText.replace("|", "").trim();

    // Update the text based on the input
    let newText = text;
    if (input === "left") {
      console.log("Left");
      cursorPosition = Math.max(0, cursorPosition - 1);
      console.log("Cursor position: ", cursorPosition);
      // Skip over function units
      // for (const func of functionUnits) {
      //   if (
      //     newText.slice(cursorPosition - func.length, cursorPosition) === func
      //   ) {
      //     cursorPosition -= func.length;
      //     break;
      //   }
      // }
    } else if (input === "right") {
      console.log("Right");
      cursorPosition = Math.min(text.length, cursorPosition + 1);
      console.log("Cursor position: ", cursorPosition);

      // Skip over function units
      // for (const func of functionUnits) {
      //   if (
      //     newText.slice(cursorPosition, cursorPosition + func.length) === func
      //   ) {
      //     cursorPosition += func.length;
      //     break;
      //   }
      // }
    } else if (input === "backspace") {
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
          } else {
            newText =
              text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
            cursorPosition -= 1;
          }
        }
      }
    } else if (input === "delete") {
      if (cursorPosition < text.length) {
        // Check if the character after the cursor is part of a function unit
        for (const func of functionUnits) {
          if (
            newText.slice(cursorPosition, cursorPosition + func.length) === func
          ) {
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
    } else if (input === "equals") {
      // Calculate the result
      if (text.length > 0) {
        const tokens = ShuntingYard.parse(text);
        const expression = SYExpressionParser.parseExpression(tokens);

        if (expression instanceof CalculationExpression) {
          const result = (expression as CalculationExpression).calculate();
          newText = result.toString();
        }

        newText = newText.trim();
        //move cursor
        cursorPosition = newText.trim().length;
      } else {
        newText = "0";
        cursorPosition = 1;
      }
    } else if (input === "AC") {
      newText = "0";
      cursorPosition = 1;
    } else if (input == "lb") {
      newText =
        text.slice(0, cursorPosition) + "(" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "rb") {
      newText =
        text.slice(0, cursorPosition) + ")" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "dot") {
      newText =
        text.slice(0, cursorPosition) + "." + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "plus") {
      newText =
        text.slice(0, cursorPosition) + "+" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "minus") {
      newText =
        text.slice(0, cursorPosition) + "-" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "multiply") {
      newText =
        text.slice(0, cursorPosition) + "*" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else if (input == "divide") {
      newText =
        text.slice(0, cursorPosition) + "/" + text.slice(cursorPosition);
      cursorPosition += 1;
    } else {
      if (text != "0") {
        // Check if multiplication symbol needed
        if (needsMultiplicationSymbol(text.slice(0, cursorPosition), input)) {
          newText =
            text.slice(0, cursorPosition) +
            "*" +
            input +
            text.slice(cursorPosition);
          cursorPosition += input.length + 1;
        } else {
          newText =
            text.slice(0, cursorPosition) + input + text.slice(cursorPosition);
          cursorPosition += input.length;
        }
      } else {
        newText = input;
        cursorPosition = input.length;
      }
    }

    updateDisplay(newText);
  }
}

function needsMultiplicationSymbol(before: string, after: string): boolean {
  // Check if last char of before is number and first char of after is letter or (
  if (!before) return false;
  const lastChar = before[before.length - 1];
  const firstChar = after[0];

  return (
    (/\d/.test(lastChar) && /[a-zA-Z(]/.test(firstChar)) ||
    (lastChar === ")" && (/\d/.test(firstChar) || /[a-zA-Z(]/.test(firstChar)))
  );
}

function unit(unit: number) {
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

function setSelectedUnit(index: number) {
  const unitButtons = document.getElementsByClassName("unit");
  for (let i = 0; i < unitButtons.length; i++) {
    const button = unitButtons[i];
    if (i === index) {
      button.classList.add("unit-selected");
    } else {
      button.classList.remove("unit-selected");
    }
  }
}

document.addEventListener("keydown", handleKeydown);

function handleKeydown(event: KeyboardEvent) {
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

document
  .getElementById("display")
  ?.addEventListener("click", setCursorPosition);

function setCursorPosition(event: MouseEvent) {
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

function getTextWidth(text: string, element: HTMLElement): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    const style = window.getComputedStyle(element);
    context.font = `${style.fontSize} ${style.fontFamily}`;
    return context.measureText(text).width;
  }
  return 0;
}

function updateDisplay(text: string) {
  const display = document.getElementById("text-content");
  if (display) {
    display.innerHTML =
      text.slice(0, cursorPosition) +
      '<span id="cursor" class="cursor"></span>' +
      text.slice(cursorPosition);
  }
}

(window as any).button = button;
(window as any).unit = unit;
