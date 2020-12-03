function horizontalConflicts(state) {
  let conflicts = 0;
  for (let line = 0; line < [...state].length; line++) {
    let queens = 0;
    state[line].map(position => position !== 0 && queens++);
    if (queens > 1) {
      conflicts += queens - 1;
    }
  }
  return conflicts;
}

function verticalConflicts(state) {
  let conflicts = 0;
  for (let column = 0; column < [...state].length; column++) {
    let queens = 0;
    state.map(line => line[column] !== 0 && queens++);
    if (queens > 1) {
      conflicts += queens - 1;
    }
  }
  return conflicts;
}

function downwardsDiagonalConflicts(state) {
  let conflicts = 0;
  let queens = 0;

  maxSize = [...state].length - 1;

  let line = maxSize;
  let column = 0;

  let diagonalStartLine = line;
  let diagonalStartColumn = column;

  let loop = true;

  while (loop) {
    state[line][column] !== 0 && queens++;

    if (line + 1 <= maxSize && column + 1 <= maxSize) {
      line++;
      column++;
    } else {
      if (queens > 1) {
        conflicts += queens - 1;
      }
      queens = 0;

      if (diagonalStartLine > 0) {
        diagonalStartLine--;
        line = diagonalStartLine;
        column = 0;
      } else {
        line = 0;
        diagonalStartColumn++;
        column = diagonalStartColumn;

        if (column === maxSize) {
          loop = false;
        }
      }
    }
  }
  return conflicts;
}

function upwardsDiagonalConflicts(state) {
  let conflicts = 0;
  let queens = 0;

  maxSize = [...state].length - 1;

  let line = 0;
  let column = 0;

  let diagonalStartLine = line;
  let diagonalStartColumn = column;

  let diagonal = [];

  let loop = true;

  while (loop) {
    state[line][column] !== 0 && queens++;
    diagonal.push([line, column]);

    if (line - 1 >= 0 && column + 1 <= maxSize) {
      line--;
      column++;
    } else {
      if (queens > 1) {
        conflicts += queens - 1;
      }
      queens = 0;

      if (diagonalStartLine < maxSize) {
        diagonalStartLine++;
        line = diagonalStartLine;
        column = 0;
      } else {
        line = maxSize;
        diagonalStartColumn++;
        column = diagonalStartColumn;

        if (column === maxSize && line === maxSize) {
          loop = false;
        }
      }
    }
  }
  return conflicts;
}

module.exports = state => {
  let conflicts = 0;

  conflicts += horizontalConflicts(state);
  // console.log(`h: ${horizontalConflicts(state)}`);

  conflicts += verticalConflicts(state);
  // console.log(`v: ${verticalConflicts(state)}`);

  conflicts += downwardsDiagonalConflicts(state);
  // console.log(`d: ${downwardsDiagonalConflicts(state)}`);

  conflicts += upwardsDiagonalConflicts(state);
  // console.log(`u: ${upwardsDiagonalConflicts(state)}`);

  return conflicts;
  // console.log(`Total: ${conflicts}`);
};
