// https://www.codewars.com/kata/bingo/train/javascript

// My solution

function bingo(card, numbers) {
  let draw = [0]; numbers.forEach(number => draw.push(parseInt(number.slice(1))||0)); // eliminate letters in drawn numbers and taransform free space into zero
  let horizontal = card.slice(1); // eliminate first row of letters
  let vertical = horizontal[0].map((_, c) => horizontal.map(r => r[c])); // add horizontal arrays by concatenanting its transpose
  let diagonal1 = [horizontal.map((row,index) => row[index])]; // extract diagonal from horizontal arrays
  let diagonal2 = [horizontal.map((row,index) => row[horizontal.length-1-index])]; // extract diagonal from horizontal arrays
  let hand = [].concat(horizontal, vertical, diagonal1, diagonal2); // concatenates in one large array for testing wining match
  hand = hand.map(row => row.map(number => number == "FREE SPACE" ? 0 : number)); // taransform free space into zero
  let result = hand.map(row => row.every(tile => draw.indexOf(tile) > -1)).reduce((result, test) => result || test, false);

  return result;
  }
  
  // OFFICIAL SOLUTION
  
var bingo=(card,numbers)=>!numbers[3]?false:/X{10}|(XX.{9}){4}XX|(XX.{11}){4}XX|(XX.{7}){4}XX/.test(card.slice(1).map(a=>a.map((a,i)=>'A'+(a[1]?'XX':('0'+a).slice(-2))).join``).join`B`.replace(RegExp(numbers.map(a=>'A'+('0'+a.slice(1)).slice(-2)).join`|`,'g'),'AXX').replace(/A/g,''))

function bingo(card, numbers) {

  let strategies = [
    0b1111100000000000000000000,
    0b0000011111000000000000000,
    0b0000000000110110000000000,
    0b0000000000000001111100000,
    0b0000000000000000000011111,
    0b1000010000100001000010000,
    0b0100001000010000100001000,
    0b0010000100000000010000100,
    0b0001000010000100001000010,
    0b0000100001000010000100001,
    0b1000001000000000001000001,
    0b0000100010000000100010000
  ];

  let flat = [].concat(...card.slice(1)).map((n, i) => 'BINGO'[i % 5] + n);

  let state = numbers.reduce((a, b) => { 
    let pos = flat.indexOf(b);
    return a | 2 ** pos * (pos !== -1);
  }, 0);

  return strategies.some(strategy => (state & strategy) === strategy);
  
}

const bingo = (s, n) =>
      s.slice(1)
       .concat(s.slice(1).map((_,i)=> s.map((_,j)=> s[j][i])))
       .concat([s[0].map((_,i)=> s[i+1][i])])
       .concat([s[0].map((_,i)=> s[i+1][ s[0].length-i-1])])
       .map(r=> r.filter(Number))
       .some(e=> e.length <= n.length && 
                 e.every(x=> n.map(m=> +m.slice(1)).includes( x )) );
                 

// Test cases

describe("Fixed tests", function(){
  it("Card #1", function(){
    let card = [
      ['B', 'I', 'N', 'G', 'O'],
      [1, 16, 31, 46, 61],
      [3, 18, 33, 48, 63],
      [5, 20, 'FREE SPACE', 50, 65],
      [7, 22, 37, 52, 67],
      [9, 24, 39, 54, 69]
    ]
    
    let a = ['B1', 'I16', 'N31', 'G46', 'O61'];
    let b = ['B1', 'I16', 'N31', 'G46', 'O63'];
    let c = ['B1', 'I16', 'N31', 'G46'];
    let d = ['B1', 'I16', 'N31', 'G46', 'O63', 'O61'];
    
    Test.assertEquals(bingo(card, a), true);
    Test.assertEquals(bingo(card, b), false);
    Test.assertEquals(bingo(card, c), false);
    Test.assertEquals(bingo(card, d), true);
    
    
    // true row
    let row1 = ['B1', 'I16', 'N31', 'G46', 'O61'];
    let row2 = ['B3', 'I18', 'N33', 'G48', 'O63'];
    let row3 = ['B5', 'I20', 'FREE SPACE', 'G50', 'O65'];
    let row4 = ['B7', 'I22', 'N37', 'G52', 'O67'];
    let row5 = ['B9', 'I24', 'N39', 'G54', 'O69'];
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice()), true);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort()), true);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort().reverse()), true);

    
    // true column
    let column1 = ['B1', 'B3', 'B5', 'B7', 'B9'];
    let column2 = ['I16', 'I18', 'I20', 'I22', 'I24'];
    let column3 = ['N31', 'N33', 'N37', 'N39'];
    let column4 = ['G46', 'G48', 'G50', 'G52', 'G54'];
    let column5 = ['O61', 'O63', 'O65', 'O67', 'O69'];
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice()), true);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort()), true);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort().reverse()), true);
    
    
    // true diagonal
    let diagonal1 = ['B1', 'I18', 'G52', 'O69'];
    let diagonal2 = ['B9', 'I22','G48', 'O61'];
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice()), true);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort()), true);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort().reverse()), true);
  
    
    // false row
    row1 = ['B2', 'I21', 'N32', 'G47', 'O62'];
    row2 = ['B4', 'I17', 'N34', 'G49', 'O64'];
    row3 = ['B6', 'I19', 'G51', 'O66'];
    row4 = ['B8', 'I20', 'N36', 'G53', 'O68'];
    row5 = ['B10', 'I29', 'N38', 'G55', 'O70'];
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice()), false);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort()), false);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort().reverse()), false);
    
    
    // false column
    column1 = ['B2', 'B4', 'B6', 'B8', 'B10'];
    column2 = ['I17', 'I19', 'I21', 'I23', 'I25'];
    column3 = ['N32', 'N34', 'N38', 'N40'];
    column4 = ['G47', 'G49', 'G51', 'G53', 'G55'];
    column5 = ['O62', 'O64', 'O66', 'O68', 'O70'];
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice()), false);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort()), false);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort().reverse()), false);
    
      
    // false diagonal
    diagonal1 = ['B15', 'I19', 'G48', '069'];
    diagonal2 = ['B7', 'I29', 'G49', 'O61'];
    let diagonal3 = ['B1'];
    let diagonal4 = ['B3', 'I16']
    let diagonal5 = ['B5', 'I18', 'N31'];
    let diagonal6 = ['B7', 'I20', 'N33', 'G46'];
    let diagonal7 = ['I24', 'N37', 'G50', 'O63'];
    let diagonal8 = ['N39', 'G52', '065'];
    let diagonal9 = ['G54', 'O67'];
    let diagonal10 = ['O69'];
    
    for (let diagonal of [diagonal1, diagonal2, diagonal3, diagonal4, diagonal5, diagonal6, diagonal7, diagonal8, diagonal9, diagonal10])
      Test.assertEquals(bingo(card, diagonal.slice()), false);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort()), false);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort().reverse()), false);
  });
  
  it("Card #2", function(){
    let card = [
      ['B', 'I', 'N', 'G', 'O'],
      [15, 25, 43, 47, 61],
      [13, 18, 35, 48, 67],
      [5, 19, 'FREE SPACE', 58, 75],
      [1, 29, 41, 49, 71],
      [8, 24, 45, 46, 69]
    ];
    
    // true row
    let row1 = ['B15', 'I25', 'N43', 'G47', 'O61'];
    let row2 = ['B13', 'I18', 'N35', 'G48', 'O67'];
    let row3 = ['B5', 'I19', 'G58', 'O75'];
    let row4 = ['B1', 'I29', 'N41', 'G49', 'O71'];
    let row5 = ['B8', 'I24', 'N45', 'G46', 'O69'];
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice()), true);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort()), true);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort().reverse()), true);
    
    
    // true column
    let column1 = ['B15', 'B13', 'B5', 'B1', 'B8'];
    let column2 = ['I25', 'I18', 'I19', 'I29', 'I24'];
    let column3 = ['N43', 'N35', 'N41', 'N45'];
    let column4 = ['G47', 'G48', 'G58', 'G49', 'G46'];
    let column5 = ['O61', 'O67', 'O75', 'O71', 'O69'];
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice()), true);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort()), true);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort().reverse()), true);
    
    
    // true diagonal
    let diagonal1 = ['B15', 'I18', 'G49', 'O69'];
    let diagonal2 = ['B8', 'I29', 'G48', 'O61'];
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice()), true);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort()), true);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort().reverse()), true);


    // false row
    row1 = ['B14', 'I26', 'N44', 'G50', 'O62'];
    row2 = ['B12', 'I20', 'N36', 'G51', 'O63'];
    row3 = ['B4', 'I21', 'G59', 'O74'];
    row4 = ['B2', 'I30', 'N42', 'G52', 'O72'];
    row5 = ['B7', 'I23', 'N46', 'G53', 'O70'];
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice()), false);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort()), false);
    
    for (let row of [row1, row2, row3, row4, row5])
      Test.assertEquals(bingo(card, row.slice().sort().reverse()), false);
    
    
    // false column
    column1 = ['B14', 'B12', 'B4', 'B2', 'B7'];
    column2 = ['26', 'I20', 'I21', 'I30', 'I23'];
    column3 = ['N44', 'N36', 'N42', 'N46'];
    column4 = ['GG50', 'G51', 'G59', 'G52', 'G53'];
    column5 = ['OO62', 'O63', 'O74', 'O72', 'O70'];
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice()), false);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort()), false);
    
    for (let column of [column1, column2, column3, column4, column5])
      Test.assertEquals(bingo(card, column.slice().sort().reverse()), false);
    
    
    // false diagonal
    diagonal1 = ['B15', 'I19', 'G48', '069'];
    diagonal2 = ['B7', 'I29', 'G49', 'O61'];
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice()), false);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort()), false);
    
    for (let diagonal of [diagonal1, diagonal2])
      Test.assertEquals(bingo(card, diagonal.slice().sort().reverse()), false);
  });
});

function range(f, l) {
  let a = [];
  for (; f <= l; f++) a.push(f);
  return a;
}

function solution(card, numbers) {
  let newCard = [[".",".",".",".","."],[".",".",".",".","."],[".",".","X",".","."],[".",".",".",".","."],[".",".",".",".","."]];
  let d = "BINGO";
  for (let i = 0; i < 5; i++) {for (let j = 0; j < 5; j++)if (numbers.includes(d[j] + card[i+1][j].toString())) newCard[i][j] = "X";}
  for (let i = 0; i < 5; i++) {if (newCard[i].join("") === "XXXXX" || [0,1,2,3,4].map(x => newCard[x][i]).join("") === "XXXXX") return true;}
  if ([0,1,2,3,4].map(x => newCard[x][x]).join("") === "XXXXX" || [0,1,2,3,4].map(x => newCard[x][4-x]).join("") === "XXXXX") return true;
  return false;
}

describe("Random tests", function(){
  for (i = 0; i < 500; i++) {
    let d = {"B":range(1, 15), "I":range(16, 30), "N":range(31, 45), "G":range(46, 60), "O":range(61, 75)}
    let s = "BINGO";
    let card = [["B", "I", "N", "G", "O"],[],[],[],[],[]];
    let array = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {card[i+1][j] = "FREE SPACE"; continue}
        else {let n = ~~(Math.random() * d[s[j]].length); let p = d[s[j]].splice(n, 1); card[i+1][j] = p[0]; array.push(s[j] + p)}
      }
    }
    let x = ~~(Math.random() * 6) + 10;
    for (; x; x--) {
      let n = ~~(Math.random() * array.length);
      array.splice(n, 1);
    }
    Test.assertEquals(bingo(JSON.parse(JSON.stringify(card)), array.slice()), solution(card, array));
  }
});
