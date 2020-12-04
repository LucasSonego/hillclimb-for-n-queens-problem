const hillClimb = require("./hillClimb");

function generateInitialState(size) {
  let state = [];

  for (let line = 0; line < size; line++) {
    let currentLine = [];
    for (let column = 0; column < size; column++) {
      if (line < size - 1) {
        currentLine.push(0);
      } else {
        currentLine.push(1);
      }
    }
    state.push(currentLine);
  }
  return state;
}

const size = 4;
const initialState = generateInitialState(size);
hillClimb(initialState);
