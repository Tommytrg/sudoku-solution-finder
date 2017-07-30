const isValidSudoku = require('sudoku-validate');

const sudokuToResolve1 = [
  [0, 0, 1, 0, 0, 9, 0, 0, 4],
  [0, 4, 0, 2, 0, 0, 0, 9, 0],
  [0, 9, 0, 0, 6, 0, 0, 1, 0],
  [0, 0, 4, 0, 7, 5, 0, 0, 1],
  [1, 0, 7, 0, 0, 0, 3, 0, 9],
  [9, 0, 0, 3, 4, 0, 5, 0, 0],
  [0, 1, 0, 9, 0, 0, 0, 8, 0],
  [0, 2, 0, 0, 0, 7, 0, 5, 0],
  [8, 0, 0, 1, 0, 0, 9, 0, 0],
];

const matrix1 = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];
function getQuadrantNumber(row, col) {
  if (row < 3 && col < 3) return 1;
  if (row < 3 && col >= 3 && col < 6) return 2;
  if (row < 3 && col >= 6) return 3;

  if (row >= 3 && row < 6 && col < 3) return 4;
  if (row >= 3 && row < 6 && col >= 3 && col < 6) return 5;
  if (row >= 3 && row < 6 && col >= 6) return 6;

  if (row >= 6 && col < 3) return 7;
  if (row >= 6 && col >= 3 && col < 6) return 8;
  if (row >= 6 && col >= 6) return 9;
}

const getPlainArray = matrix => [].concat(...matrix[0]).concat(...matrix[1]).concat(...matrix[2]);

const getBooleanBoard = sudoku => sudoku.map(array => array.map(item => item === 0));

const transposeArray = (board) => {
  if (board.length === 1 && typeof board[0] === 'number') return board;
  return board[0].map((col, i) => board.map(row => row[i]));
};

const isValidRow = (row, board) => {
  const line = board[row];
  for (let i = line.length - 1; i >= 0; i -= 1) {
    if (line.indexOf(line[i]) !== i) {
      return false;
    }
  }
  return true;
};

const isValidCol = (col, board) => isValidRow(col, transposeArray(board));

const getQuadrant = (board, firstCoordX, firstCoordY) => {
  const arr = [];
  for (let i = 0; i < 3; i += 1) {
    arr.push([]);
    for (let j = 0; j < 3; j += 1) {
      const value = board[firstCoordY + j][firstCoordX + i];
      arr[i].push(value);
    }
  }
  return arr;
};

const selectQuadrant = (board, row, col) => {
  const quadrantNumber = getQuadrantNumber(row, col);

  switch (quadrantNumber) {
    case 1:
      return getQuadrant(board, 0, 0);
    case 2:
      return getQuadrant(board, 3, 0);
    case 3:
      return getQuadrant(board, 6, 0);
    case 4:
      return getQuadrant(board, 0, 3);
    case 5:
      return getQuadrant(board, 3, 3);
    case 6:
      return getQuadrant(board, 6, 3);
    case 7:
      return getQuadrant(board, 0, 6);
    case 8:
      return getQuadrant(board, 3, 6);
    case 9:
      return getQuadrant(board, 6, 6);
  }
};


const isValidQuadrant = (row, col, board) => {
  const quadrant = selectQuadrant(board, row, col);
  return isValidRow(getPlainArray(quadrant));
};


const isValidNumber = (row, col, board) => {
  return isValidRow(row, board) && isValidCol(col, board) && isValidQuadrant(row, col, board);
};


const sudokuBacktracking = (row, col, board, booleanBoard, solutions) => {
  if (row === 9) {
    return solutions;
  }
  for (let i = 0; i < 9; i += 1) {
    if (booleanBoard[row][col]) {
      if (isValidNumber(row, col, board)) {
        board[row][col] = i;
      }
    }
    if (row === 8 && col === 8 && isValidSudoku(board)) {
      solutions.push(board);
    }

    if (row === 8) {
      col += 1;
      row = 0;
    }
    sudokuBacktracking(row + 1, col, board, booleanBoard, solutions);
  }
};

const initializeSudokuSolutionFinder = (sudoku) => {
  let row = 0;
  let col = 0;
  const booleanBoard = getBooleanBoard(sudoku);
  let board = [];
  let solutions = [];
  const allSolutions = sudokuBacktracking(row, col, board, booleanBoard, solutions);
  return allSolutions;
};

// console.log(x);

module.exports = {
  getBooleanBoard,
  getPlainArray,
  getQuadrant,
  getQuadrantNumber,
  isValidCol,
  isValidRow,
  transposeArray,
};
