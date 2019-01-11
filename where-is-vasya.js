// https://www.codewars.com/kata/where-is-vasya/train/javascript

// My solution

function whereIsHe( p, bef, aft ){
let pos = [];
let i = p;
for (;i--;pos[i]=i+1);
pos = pos.slice(bef);
pos = pos.slice(0, aft+1);
return pos.length
}

console.log(
  whereIsHe(5, 2, 3), " <=> 3"
);

// OFFICIAL SOLUTION

function whereIsHe( p, bef, aft ){
  return Math.min(p-bef, aft+1)
}

// Test cases

Test.describe('Fixed tests', function(){
  Test.assertEquals(whereIsHe(3, 1, 1), 2);
  Test.assertEquals(whereIsHe(5, 2, 3), 3, "at least 2 people before Vasya");
  Test.assertEquals(whereIsHe(5, 4, 0), 1, "nobody's after Vasya");
  Test.assertEquals(whereIsHe(6, 5, 5), 1, "at least 5 people before Vasya");
  Test.assertEquals(whereIsHe(9, 4, 3), 4, "no more than 3 people after Vasya");
  Test.assertEquals(whereIsHe(11, 4, 6), 7);
  Test.assertEquals(whereIsHe(13, 8, 7), 5, "at least 8 people before Vasya");
  Test.assertEquals(whereIsHe(14, 5, 5), 6, "no more than 5 people after Vasya");
  Test.assertEquals(whereIsHe(41, 27, 11), 12, "no more than 11 people after Vasya");
  Test.assertEquals(whereIsHe(52, 29, 7), 8, "no more than 7 people after Vasya");
});

function tester328147(p, bef, aft) {
  var message = aft + 1 < p - bef ? 'No more than '+ aft +' people after Vasya' :
                                    'At least '+ bef +' people before Vasya';
  if (!aft) { message =             'There is nobody after Vasya'; }
  Test.it('Testing ' + p + ' people in line, no less than ' + bef + ' ahead, no more than ' + aft + ' behind.', function() {
    Test.assertEquals(whereIsHe(p, bef, aft), Math.min(p - bef, aft + 1), message);
  });
};

Test.describe('Random tests', function() {
  var a, b, p, results;
  for (var aiwo123213470 = 1; aiwo123213470 <= 32; aiwo123213470++) {
    p = Math.floor(100 * Math.random());
    b = Math.floor(p * Math.random());
    a = Math.floor(p * Math.random());
    tester328147(p, b, a);
  }
});
