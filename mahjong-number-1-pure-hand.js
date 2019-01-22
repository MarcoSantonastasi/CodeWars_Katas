// https://www.codewars.com/kata/mahjong-number-1-pure-hand/train/javascript

// My solution

function solution (hand){
  let rs = ''
  for (let r = 1; r <= 9; r++) {
    const ys = hand
      .concat(r)
      .split('')
      .sort()
      .join('')
    if (ys.match(/(\d)\1{4}/)) continue
    for (const y of ys.match(/(\d)\1/g)) {
      let zs = ys.replace(y, '')
      while (zs.length) {
        const z = zs.charAt()
        if (zs.match(z + z + z)) {
          zs = zs.replace(z + z + z, '')
          continue
        }
        if (zs.match(z) && zs.match(+z + 1) && zs.match(+z + 2)) {
          zs = zs
            .replace(z, '')
            .replace(+z + 1, '')
            .replace(+z + 2, '')
          continue
        }
        break
      }
      if (zs.length) continue
      rs += r
      break
    }
  }
  return rs
}

console.log(solution("1113335557779"), " => 89"

// OFFICIAL SOLUTION

let melds = '111|222|333|444|555|666|777|888|999|123|234|345|456|567|678|789'.split`|`.map(m=>[...m])

let pure = T => T.length==2 ? T[0]==T[1] :
  melds.some((meld,_,__,hand=[...T]) => meld.every((m,i) => (i = hand.indexOf(m))>=0 && hand.splice(i,1)) && pure(hand) )

let solution = T => [...'123456789'].filter(x => !T.includes(x.repeat(4)) && pure(T+x)).join``

// Test cases

var wrongAnswer = false;
Test.describe("Some sample tests...", () => {
  let fixed_cases = [
    ["1111223346788", "58"],
    ["1112233445689", "7"],
    ["1113335557779", "89"],
    ["1223334455678", "258"],
    ["1335556677789", ""],
    ["1233334578999", "69"],
    ["1112345678999", "123456789"],
    ["2344445667899", "179"],
    ["5556666777789", "4589"],
    ["2223333444456", "12567"],
    ["3445556677788", "478"],
    ["2334555777899", ""],
    ["1335556789999", ""],
    ["1223344556788", "36"],
    ["1112356777789", "14"],
  ];

  for (let [hand, expected] of fixed_cases) {
    let actual = solution(hand);
    wrongAnswer = (actual !== expected);
    Test.it(hand, () => {
      Test.expect(!wrongAnswer, `[Answer] "${expected}"\n[Actual] "${actual}"`, {successMsg: `"${actual}"`});
    });
    if (wrongAnswer) return;
  }
});

if (wrongAnswer) return;



Test.describe("Randomized tests... (with expected value hidden)", () => {
  (_ => {
    const __slt = tiles => {
      const deck = new Set('123456789');
      const next = (x, i) => String.fromCharCode(x.charCodeAt(0) + i);
      const count = (r, s) => r.split('').reduce((a, b) => a + (b == s), 0);
      const group = (t, s, p = null) => {
        if (t.length == 1)
          return [t];

        if (t.length == 2) {
          if (t[0] == t[1])
            return [p, t[0]];
          else {
            let a = t.charCodeAt(0);
            let b = t.charCodeAt(1);
            if (a < b) [a, b] = [b, a];
            if (a - b == 1) {
              let r = [];
              let aa = String.fromCharCode(a + 1);
              let bb = String.fromCharCode(b - 1);
              if (deck.has(aa)) r.push(aa);
              if (deck.has(bb)) r.push(bb);
              return r;
            }
            else if (a - b == 2)
              return [String.fromCharCode(a - 1)];
          }
          return [];
        }

        let t_set = new Set(t);
        let ret = [];
        for (let tile of t_set) {
          if (tile < s) continue;

          if (p === null && count(t, tile) > 1) {
            let tmp = t.replace(tile, '').replace(tile, '');
            ret.push(...group(tmp, tile, tile));
          }
          if (count(t, tile) > 2) {
            let tmp = t.replace(tile, '').replace(tile, '').replace(tile, '');
            ret.push(...group(tmp, tile, p));
          }
          let a = next(tile, 1);
          let b = next(tile, 2);
          if (t_set.has(a) && t_set.has(b)) {
            let tmp = t.replace(tile, '').replace(a, '').replace(b, '');
            ret.push(...group(tmp, tile, p));
          }
        }
        return ret;
      }

      let g = new Set(group(tiles, tiles[0]));
      return [...g].filter(x => count(tiles, x) < 4).sort().join('');
    }


    let deck = '123456789123456789123456789123456789'.split('');
    const pickup = (c, num) => {
      let ret = [];
      for (let i = 0; i < num; i++) {
        let rnd = Math.floor(Math.random() * c.length);
        ret.push(c[rnd]);
        c = c.slice(0, rnd).concat(c.slice(rnd + 1));
      }
      return ret.sort().join("");
    }
    while (_--) {
      let hand = pickup(deck, 13);
      let [actual, expected] = [solution(hand), __slt(hand)];
      wrongAnswer = actual !== expected;
      Test.it(hand, () => {
        Test.expect(actual === expected, `Wrong answer:\n[Actual] "${actual}"`, {successMsg: `"${actual}"`});
      });
      if (wrongAnswer) return;
    }
  })(400);
});
