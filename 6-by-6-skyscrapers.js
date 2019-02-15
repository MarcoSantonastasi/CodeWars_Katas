// https://www.codewars.com/kata/6-by-6-skyscrapers/train/javascript

// My solution

const buildingsSet = [1, 2, 3, 4, 5, 6]

// Build all possible permutations of buidings in a skyline
function skylinePermutaions(buildingsSet) {
    const permutations = []
    if (buildingsSet.length == 1) return permutations.concat(buildingsSet)
    buildingsSet.forEach((building, position, buildingsSet) => {
        const first = buildingsSet.slice(position, position + 1)
        const rest = buildingsSet.slice(0, position).concat(buildingsSet.slice(position + 1))
        const inner = skylinePermutaions(rest)
        inner.forEach((perm, _, inner) => permutations.push(first.concat(perm)))
    })
    return permutations
}

// Calculate right side "hash" i.e. how many buildings are visible from the right
function hashRightSkyline(skyline) {
    let rightHash = 1
    let max = 0
    let i = 0
    while (skyline[i] != 6) {
        if (skyline[i + 1] > skyline[max]) {
            max = i + 1
            rightHash += 1
        }
        i += 1
    }
    return rightHash
}


// Calculate left side "hash" i.e. how many buildings are visible from the left
function hashLeftSkyline(skyline) {
    let leftHash = 1
    let max = skyline.length - 1
    let i = skyline.length - 1
    while (skyline[i] != 6) {
        if (skyline[i - 1] > skyline[max]) {
            max = i - 1
            leftHash += 1
        }
        i -= 1
    }
    return leftHash
}

// Populate a hash table where the hash index value is (right+left) visible buildings
const skylinesHashTable = []
skylinePermutaions(buildingsSet)
    .forEach(skyline => {
        const hash = hashRightSkyline(skyline) * 10 + hashLeftSkyline(skyline)
        if (!skylinesHashTable[hash]) skylinesHashTable[hash] = []
        skylinesHashTable[hash].push(skyline)
    })

// Estract hashes values in a convenient linear vector
const skylinesHashesList = []
for (const hash in skylinesHashTable) skylinesHashesList.push(parseInt(hash))

// MAIN FUNCTION
function solvePuzzle(clues) {

    // Calculate hashes from clues, for the rows
    const rowsHashes =
        [0, 1, 2, 3, 4, 5]
            .map(i => clues[23 - i] * 10 + clues[6 + i])
            .map(clue => {
                if (clue == 0) return [...skylinesHashesList]
                if (!(clue % 10)) return skylinesHashesList.filter(hash => clue / 10 == Math.floor(hash / 10))
                if (clue < 11) return skylinesHashesList.filter(hash => hash % 10 == clue)
                else return Array.of(clue)
            });

    // Calculate hashes from clues, for the columns
    const columnsHashes =
        [0, 1, 2, 3, 4, 5]
            .map(i => clues[i] * 10 + clues[17 - i])
            .map(clue => {
                if (clue == 0) return skylinesHashesList
                if (!(clue % 10)) return skylinesHashesList.filter(hash => Math.floor(hash / 10) == clue / 10)
                if (clue < 11) return skylinesHashesList.filter(hash => hash % 10 == clue)
                else return Array.of(clue)
            })

    // Populate each row with the sets that correspond to the hash of that row
    const rowsSets = []
    rowsHashes.forEach((hashes, index) => {
        hashes.forEach(hash => {
            if (!rowsSets[index]) rowsSets[index] = []
            rowsSets[index].push(...skylinesHashTable[hash])
        })
    })

    // Populate each column with the sets that correspond to the hash of that column
    const columnsSets = []
    columnsHashes.forEach((hashes, index) => {
        hashes.forEach(hash => {
            if (!columnsSets[index]) columnsSets[index] = []
            columnsSets[index].push(...skylinesHashTable[hash])
        })

    })

    // Call the backtracking subroutine and returns the solutions (can be many)
    const city = []
    backtrack(rowsSets, columnsSets, city)
    return city

    // Backtracking subroutine
    function backtrack(rowsSets, columnsSets, city) {

        if (rowsSets.some(row => row.length == 0) || columnsSets.some(col => col.length == 0)) {
            // Exit from a dead recursion branch. Return statement is only for esthetics
            return
        } else if (rowsSets.every(row => row.length == 1) || columnsSets.every(col => col.length == 1)) {
            // Execute the successful condition and pushe the solution onto the array of solutions.  Return statement is only for esthetics
            city.push(rowsSets.map(el => el[0]))
            return
        } else {
            // Execute the backtrack (i.e. "continue" ) condition by recursively calling backtrack on the smallest set

            // Pick out the smallest set among rows and columns to minimize the number of recursions
            const rowOfSmallestSet =
                rowsSets
                    .reduce((smallest, rowSkylines, rowIndex, rowsSets) => {
                        return (rowSkylines.length < rowsSets[smallest].length && rowSkylines.length > 1) ? rowIndex : smallest
                    }, rowsSets.findIndex(row => row.length > 1))

            const columnOfSmallestSet =
                columnsSets
                    .reduce((smallest, columnSkylines, columnIndex, columnsSets) => {
                        return (columnSkylines.length < columnsSets[smallest].length && columnSkylines.length > 1) ? columnIndex : smallest
                    }, columnsSets.findIndex(col => col.length > 1))

            //Just for clarity, flip the city grid so that the smallest set is always "across"
            const workingAxis = rowsSets[rowOfSmallestSet].length < columnsSets[columnOfSmallestSet].length ? 1 : 0
            const acrossSets = workingAxis ? rowsSets : columnsSets
            const downSets = workingAxis ? columnsSets : rowsSets
            const rootRow = workingAxis ? rowOfSmallestSet : columnOfSmallestSet

            // For each skyline combination in the smallest set, do this subroutine:
            acrossSets[rootRow].some(skylineAcross => {
                // Make a copy of the main sets before they are sent to filtering
                const across = [...acrossSets]
                const down = [...downSets]
                // Set the rootRow to the single combination being forEach()'ed over
                across[rootRow] = [skylineAcross]

                // Clean up the orthogonal direction of uncompatible skylines, modifying the copied sets
                down
                    .forEach((columnSkylines, columnIndex, down) => {
                        down[columnIndex] = columnSkylines.filter(skylineDown =>
                            skylineDown[rootRow] == skylineAcross[columnIndex])
                    })

                // Reset main axis orientation and start recursion by passing the newly cleaned sets to the function
                workingAxis ? backtrack(across, down, city) : backtrack(down, across, city)
            })
        }
    }
}


solvePuzzle([ 3, 2, 1, 2, 2, 4, 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3 ])

// OFFICIAL SOLUTION

const SIZE = 6;

function solvePuzzle(clues) {
    let permutations = getPermutations(Array(SIZE).fill(0).map((_, i) => i + 1));
    let rows = [], rowsVert = [];
    for (let i = SIZE; i < SIZE * 2; i++) {
      rows.push(permutations.filter(row => isValid(row, i, clues) && isValid(row, SIZE * 5 - 1 - i, clues)));
    }
    for (let i = 0; i < SIZE; i++) {
      rowsVert.push(permutations.filter(row => isValid(row, i, clues) && isValid(row, SIZE * 3 - 1 - i, clues)));
    }
    do {
      removeConflicts(rows, rowsVert);
      removeConflicts(rowsVert, rows);
    } while (rows.reduce((acc, r) => acc + r.length, 0) !== SIZE);
    return rows.map(row => row[0]);
}

function removeConflicts(rows, rowsVert) {
  rows.forEach((r, i) => {
    transpose(r).forEach((values, j) => {
      rowsVert[j] = rowsVert[j].filter(row => values.includes(row[i]));
    });
  });
}

function isValid(row, i, clues) {
  if (clues[i] === 0) return true;
  reduceMethod = i >= SIZE && i < SIZE * 3 ? "reduceRight" : "reduce";
  return row[reduceMethod]((acc, i) => i > acc[1] ? [acc[0] + 1, i] : acc, [0, 0])[0] === clues[i];
}

function getPermutations(list) {
  if (list.length == 1) return [list];
  let result = [];
  for (let i = 0; i < list.length; i++) {
    sublist = list.slice(0);
    let head = sublist.splice(i, 1);
    getPermutations(sublist).forEach(permutation => {
      result.push(head.concat(permutation));
      return result;
    });
  }
  return result;
}

function transpose(matrix) {
  let result = [];
  let l = matrix.length;
  for (let i = 0; i < matrix[0].length; i++) {
    result.push([]);
    for (let j = 0; j < l; j++) result[i].push(matrix[j][i])
  }
  return result;
}


// Test cases

describe("Skyscrapers", function () {
    it("can solve 6x6 puzzle 1", function () {
        var clues = dgsfgsfg(0);
        var expected = bbbbbbbbvfdg(0);
        var actual = solvePuzzle(clues);
        assert(expected, actual);
    });
    it("can solve 6x6 puzzle 2", function () {
        var clues = dgsfgsfg(1);
        var expected = bbbbbbbbvfdg(1);
        var actual = solvePuzzle(clues);
        assert(expected, actual);
    });
    it("can solve 6x6 puzzle 3", function () {
        var clues = dgsfgsfg(2);
        var expected = bbbbbbbbvfdg(2);
        var actual = solvePuzzle(clues);
        assert(expected, actual);
    });
    it("Randomized tests", function () {
        var tests = getRandomArray();
        tests.forEach(function (x) {
            var test = x % 4;
            var turn = Math.floor(x / 4);
            var clues = turnClues(turn, dgsfgsfg(test));
            var expected = turnExpected(turn, bbbbbbbbvfdg(test));
            var actual = solvePuzzle(clues);
            assert(expected, actual);
        });
    });
});

function getRandomArray() {
    var a = [];
    for (var i = 0; i < 4 * 4; i++) {
        a.push([Math.floor(Math.random() * 1000), i]);
    }
    return a.sort(function (a, b) { return a[0] - b[0] }).map(function (x) { return x[1] });
}

function turnClues(turn, clues) {
    var c = [];
    for (var i = 0; i < 24; i++) {
        if (i >= turn * 6) c.push(clues[i]);
    }
    for (var i = 0; i < 24; i++) {
        if (i < turn * 6) c.push(clues[i]);
    }
    return c;
}

function dgsfgsfg(test){
    if (test==0) return [ 3, 2, 2, 3, 2, 1,
                          1, 2, 3, 3, 2, 2,
                          5, 1, 2, 2, 4, 3,
                          3, 2, 1, 2, 2, 4 ];
    if (test==1) return [ 0, 0, 0, 2, 2, 0,
                          0, 0, 0, 6, 3, 0,
                          0, 4, 0, 0, 0, 0,
                          4, 4, 0, 3, 0, 0 ];
    if (test==2) return [ 0, 3, 0, 5, 3, 4, 
                          0, 0, 0, 0, 0, 1,
                          0, 3, 0, 3, 2, 3,
                          3, 2, 0, 3, 1, 0 ];
    return [ 4, 3, 2, 5, 1, 5, 
             2, 2, 2, 2, 3, 1,
             1, 3, 2, 3, 3, 3,
             5, 4, 1, 2, 3, 4 ];
}

function turnExpected(turn, expected) {
    var e = [];
    for (var i = 0; i < 6; i++) {
        var r = [];
        for (var j = 0; j < 6; j++) {
            if (turn == 0) r.push(expected[i][j]);
            if (turn == 1) r.push(expected[j][5 - i]);
            if (turn == 2) r.push(expected[5 - i][5 - j]);
            if (turn == 3) r.push(expected[5 - j][i]);
        }
        e.push(r);
    }
    return e;
}

function bbbbbbbbvfdg(test){
    if (test==0) return [[ 2, 1, 4, 3, 5, 6 ], 
                         [ 1, 6, 3, 2, 4, 5 ], 
                         [ 4, 3, 6, 5, 1, 2 ], 
                         [ 6, 5, 2, 1, 3, 4 ], 
                         [ 5, 4, 1, 6, 2, 3 ], 
                         [ 3, 2, 5, 4, 6, 1 ] ];            
    if (test==1) return [[ 5, 6, 1, 4, 3, 2 ], 
                         [ 4, 1, 3, 2, 6, 5 ], 
                         [ 2, 3, 6, 1, 5, 4 ], 
                         [ 6, 5, 4, 3, 2, 1 ], 
                         [ 1, 2, 5, 6, 4, 3 ], 
                         [ 3, 4, 2, 5, 1, 6 ] ];            
    if (test==2) return [[ 5, 2, 6, 1, 4, 3 ], 
                         [ 6, 4, 3, 2, 5, 1 ], 
                         [ 3, 1, 5, 4, 6, 2 ], 
                         [ 2, 6, 1, 5, 3, 4 ], 
                         [ 4, 3, 2, 6, 1, 5 ], 
                         [ 1, 5, 4, 3, 2, 6 ] ];
    return [[ 3, 4, 5, 1, 6, 2 ], 
            [ 4, 5, 6, 2, 1, 3 ], 
            [ 5, 6, 1, 3, 2, 4 ], 
            [ 6, 1, 2, 4, 3, 5 ], 
            [ 2, 3, 4, 6, 5, 1 ], 
            [ 1, 2, 3, 5, 4, 6 ] ];
}

function assert(expected, actual){
    Test.assertEquals(actual.length, 6);
    for (var i = 0; i < 6; i++) {
        Test.assertEquals(actual[i].toString(), expected[i].toString());
    }
}

