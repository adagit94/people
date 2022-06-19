import {
  POINT_DIMENSIONS,
  SQUARE_DIMENSIONS,
  LINE_HEIGHT,
  LINE_WIDTH,
} from "./init.js";

export default class Animator {
  constructor(rows) {
    this.#rows = rows;
    this.#createSquares(rows);
  }

  #squares;
  #rows;

  #createSquares = rows => {
    this.#squares = [];

    for (const row of rows) {
      const squares = row.childNodes;
      let squaresInstances = [];

      for (const square of squares) {
        const squareInstance = new Square(square);

        squaresInstances.push(squareInstance);
      }

      this.#squares.push(squaresInstances);
    }
  };

  performSquareAnimation = (animFunc, filterIndices) => {
    this.#squares.forEach((row, rowI) => {
      if (filterIndices) {
        row = row.filter((_, i) =>
          filterIndices.exclude
            ? !filterIndices.arr.includes(i)
            : filterIndices.arr.includes(i)
        );
      }

      row.forEach((square, squareI) => {
        animFunc(square.square, rowI, squareI);
      });
    });
  };

  addSquares = (squareI, squareInit) => {
    this.#squares.forEach((row, rowI) => {
      const squareInstance = new Square();

      squareInstance.styleSquare(squareInit);

      const beforeSquarePart = row.slice(0, squareI);
      const afterSquarePart = row.slice(squareI, row.length);

      this.#squares[rowI] = [
        ...beforeSquarePart,
        squareInstance,
        ...afterSquarePart,
      ];

      this.#rows[rowI].insertBefore(
        squareInstance.square,
        afterSquarePart[0].square
      );
    });
  };
}

export class Square {
  constructor(square) {
    if (!square) {
      square = this.#initSquare();
    }

    this.square = square;

    const points = square.childNodes;
    const lines = points[0].childNodes;

    this.points = {
      joint: points[0],
      color: points[1],
    };

    this.lines = {
      first: lines[0],
      second: lines[1],
    };
  }

  points;
  lines;
  square;

  #initSquare = () => {
    let pointEl = document.createElement("div");
    let emptyAnimPointEl = document.createElement("div");
    let line1El = document.createElement("div");
    let line2El = document.createElement("div");
    let squareEl = document.createElement("div");

    pointEl.style.position = "absolute";
    pointEl.style.borderRadius = "100%";
    pointEl.style.width = `${POINT_DIMENSIONS}px`;
    pointEl.style.height = `${POINT_DIMENSIONS}px`;
    pointEl.style.backgroundColor = `transparent`;
    emptyAnimPointEl.style.position = "absolute";
    emptyAnimPointEl.style.backgroundColor = `transparent`;
    emptyAnimPointEl.style.borderRadius = "100%";
    emptyAnimPointEl.style.width = `${POINT_DIMENSIONS}px`;
    emptyAnimPointEl.style.height = `${POINT_DIMENSIONS}px`;

    line1El.style.position = "absolute";
    line2El.style.position = "absolute";
    line1El.style.transformOrigin = "center";
    line2El.style.transformOrigin = "center";
    line1El.style.height = `${LINE_HEIGHT}%`;
    line2El.style.height = `${LINE_HEIGHT}%`;
    line1El.style.width = `${LINE_WIDTH}px`;
    line2El.style.width = `${LINE_WIDTH}px`;

    squareEl.style.position = "relative";
    squareEl.style.display = "flex";
    squareEl.style.justifyContent = "center";
    squareEl.style.alignItems = "center";
    squareEl.style.width = `${SQUARE_DIMENSIONS}px`;
    squareEl.style.height = `${SQUARE_DIMENSIONS}px`;

    pointEl.appendChild(line1El);
    pointEl.appendChild(line2El);
    squareEl.appendChild(pointEl);
    squareEl.appendChild(emptyAnimPointEl);

    return squareEl;
  };

  addInternalEls = (...els) => {
    for (const el of els) {
      this.square.appendChild(el);
    }
  };

  styleSquare = stylingFunc => {
    stylingFunc(this);
  };
}

// const row = this.rows[squareI];
// const inTopHalf = squareI < Math.ceil(rows.length / 2);
// const isEvenRow = squareI % 2 === 0;
// const isFirstRow = squareI === 0;
// const isSecondRow = squareI === 1;
// const isLastRow = squareI === rows.length - 1;
// const isNextToLastRow = squareI === rows.length - 2;
// const isMiddleRow = squareI === Math.ceil(rows.length / 2) - 1;
// const squares = row.childNodes;
