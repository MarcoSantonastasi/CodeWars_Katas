// https://www.codewars.com/kata/connect-four-1/train/javascript

// My solution

function whoIsWinner(piecesPositionList) {
   const board = [["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"],
                  ["e", "e", "e", "e", "e", "e"]
  ];
  const columns = ["A", "B", "C", "D", "E", "F", "G"];
  const players = { "R": "Red", "Y": "Yellow" };
  const moves = piecesPositionList;
  let result = "Draw";

  for (move of moves) {
    let col = columns.indexOf(move.charAt(0));    
    let row = board[col].indexOf("e");
    let piece = move.charAt(2);
    board[col][row] = piece;

    //check vertical
    let veritcalLine = board[col].join("");
    //check horizontal
    let horizontalLine = "";
    for (vert in board) horizontalLine += board[vert][row];
    //checks diagonals
    let diagonalLine = "";
    for (let i = 3; i >= -3; i--) {
      if (col + i <= 6 && col + i >= 0 && row + i <= 5 && row + i >= 0) {
        diagonalLine += board[col + i][row + i];
      }
    }
    diagonalLine += "*";
    for (let i = 3; i >= -3; i--) {
      if (col + i <= 6 && col + i >= 0 && row - i <= 5 && row - i >= 0) diagonalLine += board[col + i][row - i];
    }
    if (veritcalLine.includes(piece.repeat(4)) ||
        horizontalLine.includes(piece.repeat(4)) ||
        diagonalLine.includes(piece.repeat(4))) {
          result = players[piece];
          break;
    }
  }
    return result;
}

console.log(
  whoIsWinner(["A_Yellow",
                "B_Red",
                "B_Yellow",
                "C_Red",
                "G_Yellow",
                "C_Red",
                "C_Yellow",
                "D_Red",
                "G_Yellow",
                "D_Red",
                "G_Yellow",
                "D_Red",
                "F_Yellow",
                "E_Red",
                "D_Yellow"]),
                
                " <=> Red"
);

// OFFICIAL SOLUTION

function whoIsWinner(piecesPositionList){
 dict = {A: 35, B: 36, C: 37, D: 38, E: 39, F: 40, G:41};
  res = new Array(42).fill("-");
  for(s of piecesPositionList){
    res[dict[s[0]]] = s[2];
    dict[s[0]] -= 7;
    if(/((R.{6}){3}R)|(^((.{0,3}|.{7,10}|.{14,17}|.{21,24}|.{28,31}|.{35,38})R{4}))|(^((.{3,6}|.{10,13}|.{17,20})(R.{5}){3}R))|(^(.{0,3}|.{7,10}|.{14,17})(R.{7}){3}R)/.test(res.join(""))) return "Red";
    if(/((Y.{6}){3}Y)|(^((.{0,3}|.{7,10}|.{14,17}|.{21,24}|.{28,31}|.{35,38})Y{4}))|(^((.{3,6}|.{10,13}|.{17,20})(Y.{5}){3}Y))|(^(.{0,3}|.{7,10}|.{14,17})(Y.{7}){3}Y)/.test(res.join(""))) return "Yellow";
  }
  return "Draw";
}

// Test cases

describe("Basic tests", function(){
    Test.assertEquals(whoIsWinner(["C_Yellow",
          "E_Red",
          "G_Yellow",
          "B_Red",
          "D_Yellow",
          "B_Red",
          "B_Yellow",
          "G_Red",
          "C_Yellow",
          "C_Red",
          "D_Yellow",
          "F_Red",
          "E_Yellow",
          "A_Red",
          "A_Yellow",
          "G_Red",
          "A_Yellow",
          "F_Red",
          "F_Yellow",
          "D_Red",
          "B_Yellow",
          "E_Red",
          "D_Yellow",
          "A_Red",
          "G_Yellow",
          "D_Red",
          "D_Yellow",
          "C_Red"]), "Yellow");
      Test.assertEquals(whoIsWinner(["C_Yellow",
                "B_Red",
                "B_Yellow",
                "E_Red",
                "D_Yellow",
                "G_Red",
                "B_Yellow",
                "G_Red",
                "E_Yellow",
                "A_Red",
                "G_Yellow",
                "C_Red",
                "A_Yellow",
                "A_Red",
                "D_Yellow",
                "B_Red",
                "G_Yellow",
                "A_Red",
                "F_Yellow",
                "B_Red",
                "D_Yellow",
                "A_Red",
                "F_Yellow",
                "F_Red",
                "B_Yellow",
                "F_Red",
                "F_Yellow",
                "G_Red",
                "A_Yellow",
                "F_Red",
                "C_Yellow",
                "C_Red",
                "G_Yellow",
                "C_Red",
                "D_Yellow",
                "D_Red",
                "E_Yellow",
                "D_Red",
                "E_Yellow",
                "C_Red",
                "E_Yellow",
                "E_Red"]), "Yellow");
      Test.assertEquals(whoIsWinner(["F_Yellow",
                "G_Red",
                "D_Yellow",
                "C_Red",
                "A_Yellow",
                "A_Red",
                "E_Yellow",
                "D_Red",
                "D_Yellow",
                "F_Red",
                "B_Yellow",
                "E_Red",
                "C_Yellow",
                "D_Red",
                "F_Yellow",
                "D_Red",
                "D_Yellow",
                "F_Red",
                "G_Yellow",
                "C_Red",
                "F_Yellow",
                "E_Red",
                "A_Yellow",
                "A_Red",
                "C_Yellow",
                "B_Red",
                "E_Yellow",
                "C_Red",
                "E_Yellow",
                "G_Red",
                "A_Yellow",
                "A_Red",
                "G_Yellow",
                "C_Red",
                "B_Yellow",
                "E_Red",
                "F_Yellow",
                "G_Red",
                "G_Yellow",
                "B_Red",
                "B_Yellow",
                "B_Red"]), "Red");
      Test.assertEquals(whoIsWinner(["A_Yellow",
                "B_Red",
                "B_Yellow",
                "C_Red",
                "G_Yellow",
                "C_Red",
                "C_Yellow",
                "D_Red",
                "G_Yellow",
                "D_Red",
                "G_Yellow",
                "D_Red",
                "F_Yellow",
                "E_Red",
                "D_Yellow"]), "Red");
      Test.assertEquals(whoIsWinner([ "A_Red",
                "B_Yellow",
                "A_Red",
                "B_Yellow",
                "A_Red",
                "B_Yellow",
                "G_Red",
                "B_Yellow"]), "Yellow");
      Test.assertEquals(whoIsWinner([ "A_Red",
                "B_Yellow",
                "A_Red",
                "E_Yellow",
                "F_Red",
                "G_Yellow",
                "A_Red",
                "G_Yellow"]), "Draw");
});





describe("Random tests", function(){
  let whoIsWinnerABDEFGH123125 = function(piecesPositionList){
    dict = {A: 35, B: 36, C: 37, D: 38, E: 39, F: 40, G:41};
    res = new Array(42).fill("-");
    for(s of piecesPositionList){
      res[dict[s[0]]] = s[2];
      dict[s[0]] -= 7;
      if(/((R.{6}){3}R)|(^((.{0,3}|.{7,10}|.{14,17}|.{21,24}|.{28,31}|.{35,38})R{4}))|(^((.{3,6}|.{10,13}|.{17,20})(R.{5}){3}R))|(^(.{0,3}|.{7,10}|.{14,17})(R.{7}){3}R)/.test(res.join(""))) return "Red";
      if(/((Y.{6}){3}Y)|(^((.{0,3}|.{7,10}|.{14,17}|.{21,24}|.{28,31}|.{35,38})Y{4}))|(^((.{3,6}|.{10,13}|.{17,20})(Y.{5}){3}Y))|(^(.{0,3}|.{7,10}|.{14,17})(Y.{7}){3}Y)/.test(res.join(""))) return "Yellow";
    }
    return "Draw";
  }
  for(let rounds = 0; rounds<200; rounds++){
    arrs = require('lodash').zip(...[...Array(6).fill(["A","B","C","D","E","F","G"])]);
    let rint=l=>Math.random()*l>>0
    moves = [];
    i = 0;
    while(arrs.every(a=> a.length)){
      let r = rint(7);
      let r2 = rint(arrs[r].length);
      moves.push(arrs[r][r2] + (i%2==0?"_Red" : "_Yellow"))
      arrs[r].splice(r2,1);
      i++;
    }
    const ans = whoIsWinnerABDEFGH123125(moves)
    Test.assertEquals(whoIsWinner(moves), ans)
  }
});
