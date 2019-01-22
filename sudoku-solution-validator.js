// https://www.codewars.com/kata/sudoku-solution-validator/train/javascript

// My solution

function validSolution(sudoku){
  const validDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const horizontal = [...sudoku]
  const vertical = transposeSudoku(sudoku)
  const squares = squareSudoku(sudoku)

  return horizontal.every(row => validDigits.every(digit => row.includes(digit))) && vertical.every(row => validDigits.every(digit => row.includes(digit)))&& squares.every(row => validDigits.every(digit => row.includes(digit)))

  function transposeSudoku(sudoku) {
    const transposed = []
    for (let i = 0; i < sudoku.length; i++) {
      transposed[i] = []
      sudoku.forEach(row => transposed[i].push(...row.slice(i, i + 1)))
    }
    return transposed
  }

  function squareSudoku(sudoku) {
    const squares = new Array(9).fill([])
    for (let i = 0; i < sudoku.length; i += 1) {
      let j = parseInt(i / 3)
      squares[3 * j] = squares[3 * j].concat(sudoku[i].slice(0, 3))
      squares[3 * j + 1] = squares[3 * j + 1].concat(sudoku[i].slice(3, 6))
      squares[3 * j + 2] = squares[3 * j + 2].concat(sudoku[i].slice(6, 9))
    }
    return squares
  }
}

// OFFICIAL SOLUTION

function validSolution(board){
  var validSet = s => s.size == 9 && !s.has(0);
  var rowSet = i => board[i].reduce((s,v) => s.add(v), new Set());
  var columnSet = i => board.reduce((s,v) => s.add(v[i]), new Set());
  var boxSet = ([r,c]) => board.slice(r,r+3).reduce((s,v) => v.slice(c,c+3).reduce((s,v) => s.add(v), s), new Set());
  var boxCorner = i => [Math.floor(i / 3) * 3,(i % 3) * 3];
  for (var i = 0; i < 9; i++)
    if ( !validSet(rowSet(i)) || !validSet(columnSet(i)) || !validSet(boxSet(boxCorner(i))) )
      return false;
  return true;
}

// Alternative solution

function validSolution(bd){
  var o=[0,1,2,3,4,5,6,7,8] , p=[[0,1,2],[3,4,5],[6,7,8]],
  a = o.map(i=>bd[i].slice().sort().join("")),
  b = o.map(i=>o.map(j=>bd[j][i]).sort().join("")),
  c = p.map(x=>p.map(y=>y.reduce((m,n)=>m.concat(x.map(z=>bd[z][n])),[]))).reduce((m,n)=>m.concat(n.map(x=>x.sort().join(""))),[]);
  return a.concat(b,c).every(x=>x=="123456789");
}

// Test cases

Array.prototype.shuffle = function(){
  var ran1, ran2, tmp;
  for(var i=0; i<this.length*2; i++){
    ran1 = Math.floor(Math.random()*this.length);
    ran2 = Math.floor(Math.random()*this.length);
    
    tmp = this[ran1]
    this[ran1] = this[ran2];
    this[ran2] = tmp;
  }
  return this;
}
var tests = [
  [
    [[5, 3, 4, 6, 7, 8, 9, 1, 2], 
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]],
    true
  ],
  [
    [[5, 3, 4, 6, 7, 8, 9, 1, 2], 
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]], 
    false
  ],
  [                           
    [[1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    false
  ],
  [
    [[8, 2, 6, 3, 4, 7, 5, 9, 1],
    [7, 3, 5, 8, 1, 9, 6, 4, 2],
    [1, 9, 4, 2, 6, 5, 8, 7, 3],
    [3, 1, 7, 5, 8, 4, 2, 6, 9],
    [6, 5, 9, 1, 7, 2, 4, 3, 8],
    [4, 8, 2, 9, 3, 6, 7, 1, 5],
    [9, 4, 8, 7, 5, 1, 3, 2, 6],
    [5, 6, 1, 4, 2, 3, 9, 8, 7],
    [2, 7, 3, 6, 9, 8, 1, 5, 4]],
    true
  ],
  [
    [[1, 2, 6, 3, 4, 7, 5, 9, 8],
    [7, 3, 5, 8, 1, 9, 6, 4, 2],
    [1, 9, 4, 2, 7, 5, 8, 6, 3],
    [3, 1, 7, 5, 8, 4, 2, 6, 9],
    [7, 5, 9, 1, 6, 2, 4, 3, 8],
    [4, 8, 2, 9, 3, 6, 7, 1, 5],
    [1, 4, 8, 7, 5, 9, 3, 2, 6],
    [5, 6, 1, 4, 2, 3, 9, 8, 7],
    [2, 7, 3, 6, 9, 1, 8, 5, 4]],
    false
  ],
  [
  [[1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [2, 3, 1, 5, 6, 4, 8, 9, 7], 
  [3, 1, 2, 6, 4, 5, 9, 7, 8], 
  [4, 5, 6, 7, 8, 9, 1, 2, 3], 
  [5, 6, 4, 8, 9, 7, 2, 3, 1], 
  [6, 4, 5, 9, 7, 8, 3, 1, 2], 
  [7, 8, 9, 1, 2, 3, 4, 5, 6], 
  [8, 9, 7, 2, 3, 1, 5, 6, 4], 
  [9, 7, 8, 3, 1, 2, 6, 4, 5]],
    false
  ]
];
tests = tests.shuffle();
for(var i=0;  i<tests.length; i++){
  Test.assertEquals(validSolution(tests[i][0]), tests[i][1], 
    "Expected '"+tests[i][1]+"' on input of <pre>"+
    tests[i][0].map(function(e){return e.join(' ');}).join('\n')
    +"</pre>"); 
}
