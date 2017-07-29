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

const getPlainArray = matrix => [].concat(...matrix[0]).concat(...matrix[1]).concat(...matrix[2]);
// 0 is unknown value
const getBooleanBoard = sudoku => sudoku.map(array => array.map(item => item !== 0));


function transposeArray(board) {
  if (board.length === 1 && typeof board[0] === 'number') return board;
  return board[0].map((col, i) => board.map(row => row[i]));
}

// function getQuadrantNumber(row, col) {
//   let x;
//   let y;

//   if (col < 3) x = 0;
//   else if (col > 6) x = 2;
//   else x = 1;

//   if (row < 3) y = 0;
//   else if (row > 6) y = 2;
//   else y = 1;

//   switch (x) {
//     case 0:
//       return y;
//     case 1:
//       return 3 + y;
//     case 2:
//       return 6 + y;
//     default:
//       return 'Error';
//   }
// }
function getQuadrant(board, firstCoordX, firstCoordY) {
  const arr = [];
  for (let i = 0; i < 3; i += 1) {
    arr.push([]);
    for (let j = 0; j < 3; j += 1) {
      const value = board[firstCoordY + j][firstCoordX + i];
      arr[i].push(value);
    }
  }
  return arr;
}

function selectQuadrant(row, col, board) {
  for (let i = 0; i <= 6; i += 3) {
    for (let j = 0; j <= 6; j += 3) {
      if (i === row && j === col) return getQuadrant(board, i, j)
    }
  }
  return arrayOfArrays;
}


const isValidRow = (row, board) => {
  const line = board[row];
  for (let i = line.length - 1; i >= 0; i -= 1) {
    if (line.indexOf(line[i]) !== i) {
      return false;
    }
  }
  return true;
};

const isValidQuadrant = (row, col, board) => {
  const quadrant = selectQuadrant(row, col, board);
  return isValidRow(getPlainArray(quadrant));
};

const isValidCol = (col, board) => isValidRow(col, transposeArray(board));

const isValidNumber = (row, col, board) =>
  isValidRow(row, board) && isValidCol(col, board) && isValidQuadrant(row, col, board);

function sudokuBacktracking(row, col, board, booleanBoard, solutions) {
  console.log('row', row);
  console.log('col', col);
  console.log('booleanBoard', booleanBoard);
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
}

function initializeSudokuSolutionFinder(sudoku) {
  let row = 0;
  let col = 0;
  const booleanBoard = getBooleanBoard(sudoku);
  let board = [];
  let solutions = [];
  const allSolutions = sudokuBacktracking(row, col, board, booleanBoard, solutions);
  return allSolutions;
}

 initializeSudokuSolutionFinder(sudokuToResolve1);
// console.log(x);

module.exports = {
  initializeSudokuSolutionFinder,
};
