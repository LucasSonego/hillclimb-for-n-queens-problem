const conflictCount = require("./conflictCounter");
const copyArray = array => array.map(line => [...line]);

const LINE = 0;
const COLUMN = 1;

function move(state, from, to) {
  let newState = copyArray(state);

  newState[to[LINE]][to[COLUMN]] = state[from[LINE]][from[COLUMN]];
  newState[from[LINE]][from[COLUMN]] = 0;

  return copyArray(newState);
}

function findBestMove(state) {
  let best = {
    state: [],
    conflicts: Infinity,
  };

  let tableSize = state.length - 1;
  for (let column = 0; column <= tableSize; column++) {
    let queenPosition = [];

    for (let line = tableSize; line >= 0; line--) {
      if (state[line][column] !== 0) {
        queenPosition = line;
      }
    }
    for (let line = tableSize; line >= 0; line--) {
      if (line !== queenPosition) {
        let newState = move(
          copyArray(state),
          [queenPosition, column],
          [line, column]
        );
        let conflicts = conflictCount(newState);
        if (conflicts < best.conflicts) {
          best = {
            state: newState,
            conflicts,
          };
        }
      }
    }
  }

  return best.state;
}

module.exports = problem => {
  let currentState = [...problem];
  let currentStateConflicts = conflictCount(currentState);
  currentState.map(line => console.log(JSON.stringify(line)));
  console.log(`${currentStateConflicts} conflicts\n`);

  while (true) {
    let bestMove = findBestMove(copyArray(currentState));
    let bestMoveConflicts = conflictCount(bestMove);

    if (bestMoveConflicts < currentStateConflicts) {
      if (bestMoveConflicts === 0) {
        bestMove.map(line => console.log(JSON.stringify(line)));
        console.log(`${bestMoveConflicts} conflicts\n`);
        return copyArray(bestMove);
      }
      currentState = copyArray(bestMove);
      currentStateConflicts = bestMoveConflicts;
      currentState.map(line => console.log(JSON.stringify(line)));
      console.log(`${bestMoveConflicts} conflicts\n`);
    } else {
      return currentState;
    }
  }
};
