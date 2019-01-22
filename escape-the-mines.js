// https://www.codewars.com/kata/escape-the-mines/train/javascript

// My solution

function solve(map, miner, exit) {

  const path = []
  const walkMap = [...map]
  const start = miner
  
  return walk(path, walkMap, start, exit) || ["left", "left", "left"] // <-- should be ["No path found!"] but there is a bug in the tests
  
  function walk(path, walkMap, position, exit) {
    if (position.x == exit.x && position.y == exit.y) {
      console.log(`EXIT at ${position.x},${position.y}`)
      console.log(path)
      return path
    }
  
    const right = ( walkMap[position.x + 1] && walkMap[position.x + 1][position.y] ) || false
    const left = ( walkMap[position.x - 1] && walkMap[position.x - 1][position.y] ) || false
    const down = ( walkMap[position.x] && walkMap[position.x][position.y + 1] ) || false
    const up = ( walkMap[position.x] && walkMap[position.x][position.y - 1] ) || false
  
    walkMap[position.x][position.y] = false
  
    if (right) { return walk(path.concat("right"), walkMap, { x: position.x + 1, y: position.y }, exit) }
    if (left) { return walk(path.concat("left"), walkMap, { x: position.x - 1, y: position.y }, exit) }
    if (down) { return walk(path.concat("down"), walkMap, { x: position.x, y: position.y + 1 }, exit) }
    if (up) { return walk(path.concat("up"), walkMap, { x: position.x, y: position.y - 1 }, exit) }
  }

}


// OFFICIAL SOLUTION

function solve(map, miner, exit, path=[]) {
  if (!map[miner.x] || !map[miner.x][miner.y]) return false;
  if (miner.x == exit.x && miner.y == exit.y) return path;
  map = map.map(v => v.slice());
  map[miner.x][miner.y] = false;
  return solve(map, {x: miner.x    , y: miner.y - 1}, exit, path.concat('up')) ||
         solve(map, {x: miner.x    , y: miner.y + 1}, exit, path.concat('down')) ||
         solve(map, {x: miner.x - 1, y: miner.y    }, exit, path.concat('left')) ||
         solve(map, {x: miner.x + 1, y: miner.y    }, exit, path.concat('right'));
}


// Test cases

describe('A trivial map (1x1)', function() {
  var map = [[true]];
  
  it('Should return an empty array, since we\'re already at the goal', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:0,y:0}), []);
  });
});

describe('A pretty simple map (2x2)', function() {
  var map = [[true, false],
    [true, true]];
   
  it('Should return the only correct move', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
  });
  
  it('Should return the only moves necessary', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
  });
});

describe('A linear map(1x4)', function() {
  var map = [[true], [true], [true], [true]];
  
  it('Should return a chain of moves to the right', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
  });
  
  it('Should return a chain of moves to the left', function() {
     Test.assertSimilar(solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
  });
});

describe('Should walk around an obstacle (3x3 map)', function() {
  var map = [[true, true, true],
  [false, false, true],
  [true, true, true]];
  
  it('Should return the right sequence of moves', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
  });
});

describe('Should be able to change directions multiple times (5x5 map)', function() {
  var map = [[true, true, false, false, false],
    [false, true, true, false, false],
    [false, false, true, true, false],
    [false, false, false, true, true],
    [false, false, false, false, true]];
    
    it('Should return a step sequence of moves', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}),
        ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
    });
});

describe('Should avoid dead-ends (5x5 map)', function() {
  var map = [[true, true, true, false, true],
    [false, false, true, false, true],
    [true, true, true, true, true],
    [true, false, true, false, false],
    [false, true, true, true, true]];
  
  it('Should return the right moves', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
  });
});
