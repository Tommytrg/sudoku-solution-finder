
// 0 is unknown value
const getPermanentValues = sudoku => sudoku.map(array => array.map(item => item !== 0));

const findSudokuSolution = (sudoku) => {
  const permanentValues = getPermanentValues(sudoku);
};

module.exports = {
  getPermanentValues,
};
