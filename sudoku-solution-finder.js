const sudokuToResolve1 = [
  [0, 9, 0, 0, 0, 0, 0, 0, 6],
  [0, 0, 0, 9, 6, 0, 4, 8, 5],
  [0, 0, 0, 5, 8, 1, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 0, 0, 0],
  [5, 1, 7, 2, 0, 0, 9, 0, 0],
  [6, 0, 2, 0, 0, 0, 3, 7, 0],
  [1, 0, 0, 8, 0, 4, 0, 2, 0],
  [7, 0, 6, 0, 0, 0, 8, 1, 0],
  [3, 0, 0, 0, 9, 0, 0, 0, 0],
];

const getEmptyPositions = (board) => {
  const emptyPositions = [];
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  return emptyPositions;
};

const isValidRow = (board, row, value) => {
  for (let i = 0; i < board[row].length; i += 1) {
    if (board[row][i] === value) {
      return false;
    }
  }
  return true;
};

const isValidColm = (board, column, value) => {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][column] === value) {
      return false;
    }
  }
  return true;
};

const isValid3x3Square = (board, column, row, value) => {
  let columnCorner = 0;
  let rowCorner = 0;
  const squareSize = 3;

  while (column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }
  while (row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  for (let i = rowCorner; i < rowCorner + squareSize; i += 1) {
    for (let j = columnCorner; j < columnCorner + squareSize; j += 1) {
      if (board[i][j] === value) {
        return false;
      }
    }
  }
  return true;
};

const isValidValue = (board, column, row, value) => {
  if (isValidRow(board, row, value) &&
    isValidColm(board, column, value) &&
    isValid3x3Square(board, column, row, value)) {
    return true;
  }
  return false;
};

const solvePuzzle = (board, emptyPositions) => {
  const limit = 9;
  let row;
  let column;
  let value;
  let found;

  for (let i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    value = board[row][column] + 1;
    found = false;
    while (!found && value <= limit) {
      if (isValidValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i += 1;
      } else {
        value += 1;
      }
    }
    if (!found) {
      board[row][column] = 0;
      i -= 1;
    }
  }
  return board;
};

const solveSudoku = (board) => {
  const emptyPositions = getEmptyPositions(board);
  return solvePuzzle(board, emptyPositions);
};

const solution = solveSudoku(sudokuToResolve1);
console.log(solution);
