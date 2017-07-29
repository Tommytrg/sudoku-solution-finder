const expect = require('chai').expect;
const ssf = require('./sudoku-solution-finder.js');

const sudokuEmpty = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

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

const sudokuBoolean1 = [
  [true, true, false, true, true, false, true, true, false],
  [true, false, true, false, true, true, true, false, true],
  [true, false, true, true, false, true, true, false, true],
  [true, true, false, true, false, false, true, true, false],
  [false, true, false, true, true, true, false, true, false],
  [false, true, true, false, false, true, false, true, true],
  [true, false, true, false, true, true, true, false, true],
  [true, false, true, true, true, false, true, false, true],
  [false, true, true, false, true, true, false, true, true],
];

const sudokuSolved1 = [
  [6, 8, 1, 7, 5, 9, 2, 3, 4],
  [7, 4, 3, 2, 1, 8, 6, 9, 5],
  [5, 9, 2, 4, 6, 3, 7, 1, 8],
  [2, 3, 4, 9, 7, 5, 8, 6, 1],
  [1, 5, 7, 8, 2, 6, 3, 4, 9],
  [9, 6, 8, 3, 4, 1, 5, 7, 2],
  [3, 1, 6, 5, 9, 2, 4, 8, 7],
  [4, 2, 9, 6, 8, 7, 1, 5, 3],
  [8, 7, 5, 1, 3, 4, 9, 2, 6],
];

const sudoku2 = [
  [0, 8, 1, 7, 5, 9, 2, 3, 0],
  [7, 4, 3, 2, 1, 8, 6, 9, 5],
  [5, 9, 2, 4, 6, 3, 7, 1, 8],
  [2, 3, 4, 9, 7, 5, 8, 6, 1],
  [1, 5, 7, 8, 2, 6, 3, 4, 9],
  [9, 6, 8, 3, 4, 1, 5, 7, 2],
  [3, 1, 6, 5, 9, 2, 4, 8, 7],
  [4, 2, 9, 6, 8, 7, 1, 5, 3],
  [8, 7, 5, 1, 3, 4, 9, 2, 6],
];


describe('getPlainArray function', () => {
  const matrix = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  it(
    'getPlainArray([[1, 1, 1], [1, 1, 1], [1, 1, 1]]) should return [1, 1, 1, 1, 1, 1, 1, 1, 1]',
    () => {
      expect(ssf.getPlainArray(matrix)).to.deep.equal([1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });
});


describe('transposeArray function', () => {
  it('transposeArray([1]) should return [1]', () => {
    expect(ssf.transposeArray([1])).to.deep.equal([1]);
  });
  it('transposeArray([[1, 1], [1, 1]]) should return [[1, 1], [1, 1]]', () => {
    expect(ssf.transposeArray([
      [1, 1],
      [1, 1],
    ])).to.deep.equal([
      [1, 1],
      [1, 1],
    ]);
  });
  it('transposeArray([[1, 2],[1, 2]]) should return [[1, 1],[2, 2]]', () => {
    expect(ssf.transposeArray([
      [1, 2],
      [1, 2],
    ])).to.deep.equal([
      [1, 1],
      [2, 2],
    ]);
  });
  it(
    'transposeArray([[1, 2, 3], [1, 2, 3], [1, 2, 3]]) should return [[1, 1, 1], [2, 2, 2],[3, 3, 3]]',
    () => {
      expect(ssf.transposeArray([
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ])).to.deep.equal([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ]);
    });
  it(`transposeArray([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]]
    should return 
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3],
    [4, 4, 4, 4, 4, 4, 4, 4, 4],
    [5, 5, 5, 5, 5, 5, 5, 5, 5],
    [6, 6, 6, 6, 6, 6, 6, 6, 6],
    [7, 7, 7, 7, 7, 7, 7, 7, 7],
    [8, 8, 8, 8, 8, 8, 8, 8, 8],
    [9, 9, 9, 9, 9, 9, 9, 9, 9]`,
    () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const matrix = [arr, arr, arr, arr, arr, arr, arr, arr, arr]; // arr x 9
      const result = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [6, 6, 6, 6, 6, 6, 6, 6, 6],
        [7, 7, 7, 7, 7, 7, 7, 7, 7],
        [8, 8, 8, 8, 8, 8, 8, 8, 8],
        [9, 9, 9, 9, 9, 9, 9, 9, 9],
      ];
      expect(ssf.transposeArray(matrix)).to.deep.equal(result);
    });
});

describe('getBooleanBoard function', () => {
  it('should getBooleanBoard(matrix) should return true', () => {
    expect(ssf.getBooleanBoard(sudokuToResolve1)).to.deep.equal(sudokuBoolean1);
  });
});
