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


describe('isValidRow function', () => {  
  it('isValidRow(0, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(0, sudokuToResolve1)).to.be.false;
  });
  it('isValidRow(1, sudokuToResolve1 )should return false', () => {
    expect(ssf.isValidRow(1, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(2, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(2, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(3, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(3, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(4, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(4, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(5, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(5, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(6, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(6, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(7, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(7, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(8, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidRow(8, sudokuToResolve1)).to.be.false;
  });

  it('isValidRow(0, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(0, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(1, sudokuSolved1 )should return true', () => {
    expect(ssf.isValidRow(1, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(2, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(2, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(3, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(3, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(4, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(4, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(5, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(5, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(6, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(6, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(7, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(7, sudokuSolved1)).to.be.true;
  });

  it('isValidRow(8, sudokuSolved1) should return true', () => {
    expect(ssf.isValidRow(8, sudokuSolved1)).to.be.true;
  });
});

describe('isValidCol function', () => {  
  it('isValidCol(0, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(0, sudokuToResolve1)).to.be.false;
  });
  it('isValidCol(1, sudokuToResolve1 )should return false', () => {
    expect(ssf.isValidCol(1, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(2, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(2, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(3, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(3, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(4, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(4, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(5, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(5, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(6, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(6, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(7, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(7, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(8, sudokuToResolve1) should return false', () => {
    expect(ssf.isValidCol(8, sudokuToResolve1)).to.be.false;
  });

  it('isValidCol(0, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(0, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(1, sudokuSolved1 )should return true', () => {
    expect(ssf.isValidCol(1, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(2, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(2, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(3, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(3, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(4, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(4, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(5, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(5, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(6, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(6, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(7, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(7, sudokuSolved1)).to.be.true;
  });

  it('isValidCol(8, sudokuSolved1) should return true', () => {
    expect(ssf.isValidCol(8, sudokuSolved1)).to.be.true;
  });
});

describe('getQuadrant function', () => {
  const matrix = [
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

  const text = 'getQuadrant';

  it(`${text} (0,0) should return [[1, 1, 1], [1, 1, 1], [1, 1, 1]])`, () => {
    const solution1 = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    expect(ssf.getQuadrant(matrix, 0, 0)).to.deep.equal(solution1);
  });
  it(`${text} (3,0) should return [[2, 2, 2], [2, 2, 2], [2, 2, 2]])`, () => {
    const solution2 = [
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ];
    expect(ssf.getQuadrant(matrix, 3, 0)).to.deep.equal(solution2);
  });
  it(`${text} (6,0) should return [[3, 3, 3], [3, 3, 3], [3, 3, 3]])`, () => {
    const solution3 = [
      [3, 3, 3],
      [3, 3, 3],
      [3, 3, 3],
    ];
    expect(ssf.getQuadrant(matrix, 6, 0)).to.deep.equal(solution3);
  });
  it(`${text} (0,3) should return [[4, 4, 4], [4, 4, 4], [4, 4, 4]])`, () => {
    const solution4 = [
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
    ];
    expect(ssf.getQuadrant(matrix, 0, 3)).to.deep.equal(solution4);
  });
  it(`${text} (3,3) should return [[5, 5, 5], [5, 5, 5], [5, 5, 5]])`, () => {
    const solution5 = [
      [5, 5, 5],
      [5, 5, 5],
      [5, 5, 5],
    ];
    expect(ssf.getQuadrant(matrix, 3, 3)).to.deep.equal(solution5);
  });
  it(`${text} (6,3) should return [[6, 6, 6], [6, 6, 6], [6, 6, 6]])`, () => {
    const solution6 = [
      [6, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ];
    expect(ssf.getQuadrant(matrix, 6, 3)).to.deep.equal(solution6);
  });
  it(`${text} (0,6) should return [[7, 7, 7], [7, 7, 7], [7, 7, 7]])`, () => {
    const solution7 = [
      [7, 7, 7],
      [7, 7, 7],
      [7, 7, 7],
    ];
    expect(ssf.getQuadrant(matrix, 0, 6)).to.deep.equal(solution7);
  });
  it(`${text} (3,6) should return [[8, 8, 8], [8, 8, 8], [8, 8, 8]])`, () => {
    const solution8 = [
      [8, 8, 8],
      [8, 8, 8],
      [8, 8, 8],
    ];
    expect(ssf.getQuadrant(matrix, 3, 6)).to.deep.equal(solution8);
  });
  it(`${text} (6,6) should return [[9, 9, 9], [9, 9, 9], [9, 9, 9]])`, () => {
    const solution9 = [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ];
    expect(ssf.getQuadrant(matrix, 6, 6)).to.deep.equal(solution9);
  });
});

describe('getQuadrantNumber function', () => {
  it('getQuadrantNumber(0, 0) should return 1', () => {
    expect(ssf.getQuadrantNumber(0, 0)).to.equal(1);
  });

  it('getQuadrantNumber(0, 1) should return 1', () => {
    expect(ssf.getQuadrantNumber(0, 1)).to.equal(1);
  });

  it('getQuadrantNumber(0, 2) should return 1', () => {
    expect(ssf.getQuadrantNumber(0, 2)).to.equal(1);
  });

  it('getQuadrantNumber(0, 3) should return 2', () => {
    expect(ssf.getQuadrantNumber(0, 3)).to.equal(2);
  });

  it('getQuadrantNumber(0, 4) should return 2', () => {
    expect(ssf.getQuadrantNumber(0, 4)).to.equal(2);
  });

  it('getQuadrantNumber(0, 5) should return 2', () => {
    expect(ssf.getQuadrantNumber(0, 5)).to.equal(2);
  });

  it('getQuadrantNumber(0, 6) should return 3', () => {
    expect(ssf.getQuadrantNumber(0, 6)).to.equal(3);
  });
  it('getQuadrantNumber(0, 7) should return 3', () => {
    expect(ssf.getQuadrantNumber(0, 7)).to.equal(3);
  });

  it('getQuadrantNumber(0, 8) should return 3', () => {
    expect(ssf.getQuadrantNumber(0, 8)).to.equal(3);
  });

  it('getQuadrantNumber(1, 0) should return 1', () => {
    expect(ssf.getQuadrantNumber(0, 0)).to.equal(1);
  });

  it('getQuadrantNumber(1, 1) should return 1', () => {
    expect(ssf.getQuadrantNumber(1, 1)).to.equal(1);
  });

  it('getQuadrantNumber(1, 2) should return 1', () => {
    expect(ssf.getQuadrantNumber(1, 2)).to.equal(1);
  });

  it('getQuadrantNumber(1, 3) should return 2', () => {
    expect(ssf.getQuadrantNumber(1, 3)).to.equal(2);
  });

  it('getQuadrantNumber(1, 4) should return 2', () => {
    expect(ssf.getQuadrantNumber(1, 4)).to.equal(2);
  });

  it('getQuadrantNumber(1, 5) should return 2', () => {
    expect(ssf.getQuadrantNumber(1, 5)).to.equal(2);
  });

  it('getQuadrantNumber(1, 6) should return 3', () => {
    expect(ssf.getQuadrantNumber(1, 6)).to.equal(3);
  });
  it('getQuadrantNumber(1, 7) should return 3', () => {
    expect(ssf.getQuadrantNumber(1, 7)).to.equal(3);
  });

  it('getQuadrantNumber(1, 8) should return 3', () => {
    expect(ssf.getQuadrantNumber(1, 8)).to.equal(3);
  });

  it('getQuadrantNumber(2, 0) should return 1', () => {
    expect(ssf.getQuadrantNumber(2, 0)).to.equal(1);
  });

  it('getQuadrantNumber(2, 1) should return 1', () => {
    expect(ssf.getQuadrantNumber(2, 1)).to.equal(1);
  });

  it('getQuadrantNumber(2, 2) should return 1', () => {
    expect(ssf.getQuadrantNumber(2, 2)).to.equal(1);
  });

  it('getQuadrantNumber(2, 3) should return 2', () => {
    expect(ssf.getQuadrantNumber(2, 3)).to.equal(2);
  });

  it('getQuadrantNumber(2, 4) should return 2', () => {
    expect(ssf.getQuadrantNumber(2, 4)).to.equal(2);
  });

  it('getQuadrantNumber(2, 5) should return 2', () => {
    expect(ssf.getQuadrantNumber(2, 5)).to.equal(2);
  });

  it('getQuadrantNumber(2, 6) should return 3', () => {
    expect(ssf.getQuadrantNumber(2, 6)).to.equal(3);
  });
  it('getQuadrantNumber(2, 7) should return 3', () => {
    expect(ssf.getQuadrantNumber(2, 7)).to.equal(3);
  });

  it('getQuadrantNumber(2, 8) should return 3', () => {
    expect(ssf.getQuadrantNumber(2, 8)).to.equal(3);
  });

  it('getQuadrantNumber(3, 0) should return 4', () => {
    expect(ssf.getQuadrantNumber(3, 0)).to.equal(4);
  });

  it('getQuadrantNumber(3, 1) should return 4', () => {
    expect(ssf.getQuadrantNumber(3, 1)).to.equal(4);
  });

  it('getQuadrantNumber(3, 2) should return 4', () => {
    expect(ssf.getQuadrantNumber(3, 2)).to.equal(4);
  });

  it('getQuadrantNumber(3, 3) should return 5', () => {
    expect(ssf.getQuadrantNumber(3, 3)).to.equal(5);
  });

  it('getQuadrantNumber(3, 4) should return 6', () => {
    expect(ssf.getQuadrantNumber(3, 4)).to.equal(5);
  });

  it('getQuadrantNumber(3, 5) should return 6', () => {
    expect(ssf.getQuadrantNumber(3, 5)).to.equal(5);
  });

  it('getQuadrantNumber(3, 6) should return 7', () => {
    expect(ssf.getQuadrantNumber(3, 6)).to.equal(6);
  });
  it('getQuadrantNumber(3, 7) should return 7', () => {
    expect(ssf.getQuadrantNumber(3, 7)).to.equal(6);
  });

  it('getQuadrantNumber(3, 8) should return 7', () => {
    expect(ssf.getQuadrantNumber(3, 8)).to.equal(6);
  });

  it('getQuadrantNumber(4, 0) should return 4', () => {
    expect(ssf.getQuadrantNumber(4, 0)).to.equal(4);
  });

  it('getQuadrantNumber(4, 1) should return 4', () => {
    expect(ssf.getQuadrantNumber(4, 1)).to.equal(4);
  });

  it('getQuadrantNumber(4, 2) should return 4', () => {
    expect(ssf.getQuadrantNumber(4, 2)).to.equal(4);
  });

  it('getQuadrantNumber(4, 3) should return 5', () => {
    expect(ssf.getQuadrantNumber(4, 3)).to.equal(5);
  });

  it('getQuadrantNumber(4, 4) should return 6', () => {
    expect(ssf.getQuadrantNumber(4, 4)).to.equal(5);
  });

  it('getQuadrantNumber(4, 5) should return 6', () => {
    expect(ssf.getQuadrantNumber(4, 5)).to.equal(5);
  });

  it('getQuadrantNumber(4, 6) should return 7', () => {
    expect(ssf.getQuadrantNumber(4, 6)).to.equal(6);
  });
  it('getQuadrantNumber(4, 7) should return 7', () => {
    expect(ssf.getQuadrantNumber(4, 7)).to.equal(6);
  });

  it('getQuadrantNumber(4, 8) should return 7', () => {
    expect(ssf.getQuadrantNumber(4, 8)).to.equal(6);
  });

  it('getQuadrantNumber(5, 0) should return 4', () => {
    expect(ssf.getQuadrantNumber(5, 0)).to.equal(4);
  });

  it('getQuadrantNumber(5, 1) should return 4', () => {
    expect(ssf.getQuadrantNumber(5, 1)).to.equal(4);
  });

  it('getQuadrantNumber(5, 2) should return 4', () => {
    expect(ssf.getQuadrantNumber(5, 2)).to.equal(4);
  });

  it('getQuadrantNumber(5, 3) should return 5', () => {
    expect(ssf.getQuadrantNumber(5, 3)).to.equal(5);
  });

  it('getQuadrantNumber(5, 4) should return 6', () => {
    expect(ssf.getQuadrantNumber(5, 4)).to.equal(5);
  });

  it('getQuadrantNumber(5, 5) should return 6', () => {
    expect(ssf.getQuadrantNumber(5, 5)).to.equal(5);
  });

  it('getQuadrantNumber(5, 6) should return 7', () => {
    expect(ssf.getQuadrantNumber(5, 6)).to.equal(6);
  });
  it('getQuadrantNumber(5, 7) should return 7', () => {
    expect(ssf.getQuadrantNumber(5, 7)).to.equal(6);
  });

  it('getQuadrantNumber(5, 8) should return 7', () => {
    expect(ssf.getQuadrantNumber(5, 8)).to.equal(6);
  });

  it('getQuadrantNumber(6, 0) should return 7', () => {
    expect(ssf.getQuadrantNumber(6, 0)).to.equal(7);
  });

  it('getQuadrantNumber(6, 1) should return 7', () => {
    expect(ssf.getQuadrantNumber(6, 1)).to.equal(7);
  });

  it('getQuadrantNumber(6, 2) should return 7', () => {
    expect(ssf.getQuadrantNumber(6, 2)).to.equal(7);
  });

  it('getQuadrantNumber(6, 3) should return 8', () => {
    expect(ssf.getQuadrantNumber(6, 3)).to.equal(8);
  });

  it('getQuadrantNumber(6, 4) should return 8', () => {
    expect(ssf.getQuadrantNumber(6, 4)).to.equal(8);
  });

  it('getQuadrantNumber(6, 5) should return 8', () => {
    expect(ssf.getQuadrantNumber(6, 5)).to.equal(8);
  });

  it('getQuadrantNumber(6, 6) should return 9', () => {
    expect(ssf.getQuadrantNumber(6, 6)).to.equal(9);
  });
  it('getQuadrantNumber(6, 7) should return 9', () => {
    expect(ssf.getQuadrantNumber(6, 7)).to.equal(9);
  });

  it('getQuadrantNumber(6, 8) should return 9', () => {
    expect(ssf.getQuadrantNumber(6, 8)).to.equal(9);
  });

  it('getQuadrantNumber(7, 0) should return 7', () => {
    expect(ssf.getQuadrantNumber(7, 0)).to.equal(7);
  });

  it('getQuadrantNumber(7, 1) should return 7', () => {
    expect(ssf.getQuadrantNumber(7, 1)).to.equal(7);
  });

  it('getQuadrantNumber(7, 2) should return 7', () => {
    expect(ssf.getQuadrantNumber(7, 2)).to.equal(7);
  });

  it('getQuadrantNumber(7, 3) should return 8', () => {
    expect(ssf.getQuadrantNumber(7, 3)).to.equal(8);
  });

  it('getQuadrantNumber(7, 4) should return 8', () => {
    expect(ssf.getQuadrantNumber(7, 4)).to.equal(8);
  });

  it('getQuadrantNumber(7, 5) should return 8', () => {
    expect(ssf.getQuadrantNumber(7, 5)).to.equal(8);
  });

  it('getQuadrantNumber(7, 6) should return 9', () => {
    expect(ssf.getQuadrantNumber(7, 6)).to.equal(9);
  });
  it('getQuadrantNumber(7, 7) should return 9', () => {
    expect(ssf.getQuadrantNumber(7, 7)).to.equal(9);
  });

  it('getQuadrantNumber(7, 8) should return 9', () => {
    expect(ssf.getQuadrantNumber(7, 8)).to.equal(9);
  });

  it('getQuadrantNumber(8, 0) should return 7', () => {
    expect(ssf.getQuadrantNumber(8, 0)).to.equal(7);
  });

  it('getQuadrantNumber(8, 1) should return 7', () => {
    expect(ssf.getQuadrantNumber(8, 1)).to.equal(7);
  });

  it('getQuadrantNumber(8, 2) should return 7', () => {
    expect(ssf.getQuadrantNumber(8, 2)).to.equal(7);
  });

  it('getQuadrantNumber(8, 3) should return 8', () => {
    expect(ssf.getQuadrantNumber(8, 3)).to.equal(8);
  });

  it('getQuadrantNumber(8, 4) should return 8', () => {
    expect(ssf.getQuadrantNumber(8, 4)).to.equal(8);
  });

  it('getQuadrantNumber(8, 5) should return 8', () => {
    expect(ssf.getQuadrantNumber(8, 5)).to.equal(8);
  });

  it('getQuadrantNumber(8, 6) should return 9', () => {
    expect(ssf.getQuadrantNumber(8, 6)).to.equal(9);
  });
  it('getQuadrantNumber(8, 7) should return 9', () => {
    expect(ssf.getQuadrantNumber(8, 7)).to.equal(9);
  });

  it('getQuadrantNumber(8, 8) should return 9', () => {
    expect(ssf.getQuadrantNumber(8, 8)).to.equal(9);
  });
});

