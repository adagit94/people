import { COLS } from "./constants.js";

window.LINE_DIAGONAL_SCALE_NUM = 1.5; //1.41;

let grid = document.querySelector("#grid");

const { width: tabWidth, height: tabHeight } = grid.getBoundingClientRect();

const LINE_DIAGONAL_SCALE =
  (window.LINE_DIAGONAL_SCALE = `scaleX(${window.LINE_DIAGONAL_SCALE_NUM})`);
export const SQUARE_DIMENSIONS = (window.SQUARE_DIMENSIONS = Math.round(
  tabWidth / COLS
));
export const POINT_DIMENSIONS = (window.POINT_DIMENSIONS = Math.round(
  (SQUARE_DIMENSIONS / 100) * 25
));
export const LINE_HEIGHT = 10; // %
export const LINE_Y_TRANSLATE = `calc(${POINT_DIMENSIONS / 2}px - ${
  LINE_HEIGHT / 2
}%)`;
export const LINE_WIDTH = SQUARE_DIMENSIONS;
export const BLACK = "rgb(0, 0, 0)";
export const WHITE = "rgb(255, 255, 255)";

let rows = Math.ceil(tabHeight / SQUARE_DIMENSIONS);

if (rows % 2 === 0) {
  rows -= 1;
}

for (let y = 0; y < rows; y++) {
  const isEvenRow = y % 2 === 0;

  let rowEl = document.createElement("div");

  rowEl.style.display = "flex";

  for (let x = 0; x < COLS; x++) {
    const isEvenCol = x % 2 === 0;

    const squareColor = isEvenRow
      ? isEvenCol
        ? BLACK
        : WHITE
      : isEvenCol
      ? WHITE
      : BLACK;

    const invertedColor = squareColor === BLACK ? WHITE : BLACK;

    let pointEl = document.createElement("div");
    let emptyAnimPointEl = document.createElement("div");
    let line1El = document.createElement("div");
    let line2El = document.createElement("div");
    let squareEl = document.createElement("div");

    pointEl.style.position = "absolute";
    pointEl.style.borderRadius = "100%";
    pointEl.style.width = `${POINT_DIMENSIONS}px`;
    pointEl.style.height = `${POINT_DIMENSIONS}px`;
    pointEl.style.backgroundColor = squareColor;
    emptyAnimPointEl.style.position = "absolute";
    emptyAnimPointEl.style.borderRadius = "100%";
    emptyAnimPointEl.style.width = `${POINT_DIMENSIONS}px`;
    emptyAnimPointEl.style.height = `${POINT_DIMENSIONS}px`;
    emptyAnimPointEl.style.backgroundColor = invertedColor;

    line1El.style.position = "absolute";
    line2El.style.position = "absolute";
    line1El.style.transform = `translate(${
      -SQUARE_DIMENSIONS / 2 + POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) ${LINE_DIAGONAL_SCALE}`;
    line2El.style.transform = `translate(${
      -SQUARE_DIMENSIONS / 2 + POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) ${LINE_DIAGONAL_SCALE}`;
    line1El.style.transformOrigin = "center";
    line2El.style.transformOrigin = "center";
    line1El.style.height = `${LINE_HEIGHT}%`;
    line2El.style.height = `${LINE_HEIGHT}%`;
    line1El.style.width = `${LINE_WIDTH}px`;
    line2El.style.width = `${LINE_WIDTH}px`;
    line1El.style.backgroundColor = invertedColor;
    line2El.style.backgroundColor = invertedColor;

    squareEl.style.position = "relative";
    squareEl.style.display = "flex";
    squareEl.style.justifyContent = "center";
    squareEl.style.alignItems = "center";
    squareEl.style.width = `${SQUARE_DIMENSIONS}px`;
    squareEl.style.height = `${SQUARE_DIMENSIONS}px`;
    squareEl.style.backgroundColor = squareColor;

    pointEl.appendChild(line1El);
    pointEl.appendChild(line2El);
    squareEl.appendChild(pointEl);
    squareEl.appendChild(emptyAnimPointEl);

    rowEl.appendChild(squareEl);
  }

  grid.appendChild(rowEl);
}
