// https://www.codewars.com/kata/snail/train/javascript

// My solution

function snail(array) {

  const chopArray = [...array]
  const trail = []

  let row = 0
  
  while ( !chopArray.every(el=>el[0]==null) ) {

  while (chopArray[row] && chopArray[row][0]) {
      // move right
      trail.push(chopArray[row].shift()) 
    }
    while (chopArray[row + 1] && chopArray[row + 1][0]) {
      // move down
      row += 1
      trail.push(chopArray[row].pop())
    }
    while (chopArray[row] && chopArray[row][0]) {
      // move left
      trail.push(chopArray[row].pop())
    }
    while (chopArray[row - 1] && chopArray[row - 1][0]) {
      // move up
      row -= 1
      trail.push(chopArray[row].shift())
    }

  }

  return trail
}

// OFFICIAL SOLUTION

function snail(array) {
  const chopArray = [...array]
  const trail = [];

  while (chopArray.length) {
    trail.push(...chopArray.shift());
    chopArray.map(row => trail.push(row.pop()));
    chopArray.reverse().map(row => row.reverse());
  }
  return trail;
}

// Test cases

var test = function(input, expected) {
  Test.assertSimilar(snail(input), expected, "snail(" + JSON.stringify(input) + ")") 
};

test([[]], []);

test([[1]], [1]);

test([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 3, 6, 9, 8, 7, 4, 5]);

test([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]], [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);

test([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
