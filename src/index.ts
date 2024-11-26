let cursorPosition = 0;

function button(input: string) {
  const display = document.getElementById("text-content");
  const cursor = document.getElementById("cursor");
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

  if (display && cursor) {
    // Get the current text without the cursor
    const text = display.innerText.replace("|", "");

    // Update the text based on the input
    let newText = text;
    if (input === "left") {
      cursorPosition = Math.max(0, cursorPosition - 1);
      // Skip over function units
      for (const func of functionUnits) {
        if (
          newText.slice(cursorPosition - func.length, cursorPosition) === func
        ) {
          cursorPosition -= func.length;
          break;
        }
      }
    } else if (input === "right") {
      cursorPosition = Math.min(text.length, cursorPosition + 1);
      // Skip over function units
      for (const func of functionUnits) {
        if (
          newText.slice(cursorPosition, cursorPosition + func.length) === func
        ) {
          cursorPosition += func.length;
          break;
        }
      }
    } else if (input === "backspace") {
      if (cursorPosition > 0) {
        // Check if the character before the cursor is part of a function unit
        for (const func of functionUnits) {
          if (
            newText.slice(cursorPosition - func.length, cursorPosition) === func
          ) {
            newText =
              newText.slice(0, cursorPosition - func.length) +
              newText.slice(cursorPosition);
            cursorPosition -= func.length;
            break;
          }
        }
        if (newText === text) {
          newText =
            text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
          cursorPosition -= 1;
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
    } else if (input === "AC") {
      newText = "0";
      cursorPosition = 1;
    } else {
      if (text != "0") {
        newText =
          text.slice(0, cursorPosition) + input + text.slice(cursorPosition);
        cursorPosition += input.length;
      } else {
        newText = input;
        cursorPosition = input.length;
      }
    }

    // Update the display text with the cursor at the new position
    updateDisplay(newText);
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
