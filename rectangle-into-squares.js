// https://www.codewars.com/kata/rectangle-into-squares/train/javascript

// My solution

function sqInRect(length, width){

  let a,b;
  let solution = [];
  if(length == width) return null;
  if(length > width) [a,b] = [length,width];
  if(length < width) [b,a] = [length,width];
  
  while (a > 1 && b > 1) {
    if(a == b) return solution.push(a);
    solution.push(b);
    a = a-b;
    while(a >= b) {
      a = a-b;
      solution.push(b);
    }
    [a,b] = [b,a]
  }
  if (a==1 || b==1) {
    for(i=Math.max(a,b); i>0; i--) solution.push(1);
  }
  return solution;
}

console.log(
  sqInRect(20, 14), " <=> [14, 6, 6, 2, 2, 2]"
);

// OFFICIAL SOLUTION

function sqInRect(lng, wdth){
  let arr = []
  if(lng === wdth) return null
  while(lng > 0 && wdth > 0){
    arr.push(lng > wdth ? wdth : lng)
    lng > wdth ? lng -= wdth : wdth -= lng
  }
  return arr
}

// Test Cases

Test.describe("Basic tests",function(){
Test.assertSimilar(sqInRect(5, 5), null)
Test.assertSimilar(sqInRect(5, 3), [3, 2, 1, 1])
Test.assertSimilar(sqInRect(3, 5), [3, 2, 1, 1])
Test.assertSimilar(sqInRect(20, 14), [14, 6, 6, 2, 2, 2])
Test.assertSimilar(sqInRect(14, 20), [14, 6, 6, 2, 2, 2])
Test.assertSimilar(sqInRect(240, 32), [32, 32, 32, 32, 32, 32, 32, 16, 16])
Test.assertSimilar(sqInRect(6250, 250), [250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250])
Test.assertSimilar(sqInRect(625, 230), [230, 230, 165, 65, 65, 35, 30, 5, 5, 5, 5, 5, 5])
Test.assertSimilar(sqInRect(731, 230), [230, 230, 230, 41, 41, 41, 41, 41, 25, 16, 9, 7, 2, 2, 2, 1, 1])
Test.assertSimilar(sqInRect(37, 14), [14, 14, 9, 5, 4, 1, 1, 1, 1])
})

Test.describe("Random tests",function(){
function randint(a,b){return Math.floor(Math.random()*(b-a+1)+a);}

function solIR(lng, wdth, recursive){
  recursive=recursive==undefined ? false : recursive;
  return lng==wdth && recursive==false ? null : lng==wdth ? [lng] : [Math.min(lng,wdth)].concat(solIR(Math.min(lng,wdth), Math.max(lng,wdth)-Math.min(lng,wdth), true));
}
for (var _=0;_<40;_++){
  randexp=randint(1,2);
  lng=randint(1,2*Math.pow(10,randexp));
  wdth=randint(1,2*Math.pow(10,randexp));
  Test.it("Testing for sqInRect("+lng+", "+wdth+")", function(){
    Test.assertSimilar(sqInRect(lng, wdth),solIR(lng, wdth),"It should work for random inputs too");
  })
}
})
