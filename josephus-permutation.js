// https://www.codewars.com/kata/josephus-permutation/train/javascript

// My solution

function josephus(items,k){
  let nextPick = 0;
  let eaten = [];

  while (items.length) {
    nextPick = ((nextPick + k-1) % items.length);
    eaten.push(...items.splice(nextPick, 1));
  }
  return eaten;
}

console.log(
  josephus(["C","o","d","e","W","a","r","s"],4), " <=> ['e', 's', 'W', 'o', 'C', 'd', 'r', 'a']"
);

// OFFICIAL SOLUTION

function josephus(items,k){
  var dest = [],
      i = 0;
  
  while (items.length > 0) {
    dest.push(items.splice(i = (i + k - 1) % items.length, 1)[0]);
  }
  
  return dest;
}

// Test cases

Test.describe("Basic tests",function(){
Test.assertSimilar(josephus([1,2,3,4,5,6,7,8,9,10],1),[1,2,3,4,5,6,7,8,9,10], "Should return the same exact list if k==1")
Test.assertSimilar(josephus([1,2,3,4,5,6,7,8,9,10],2),[2, 4, 6, 8, 10, 3, 7, 1, 9, 5])
Test.assertSimilar(josephus(["C","o","d","e","W","a","r","s"],4),['e', 's', 'W', 'o', 'C', 'd', 'r', 'a'],"Should work for values different from numbers too")
Test.assertSimilar(josephus(["C",0,"d",3,"W",4,"r",5],4),[3, 5, 'W', 0, 'C', 'd', 'r', 4],"Should work for values of different types too")
Test.assertSimilar(josephus([1,2,3,4,5,6,7],3),[3, 6, 2, 7, 5, 1, 4])
Test.assertSimilar(josephus([],3),[], "Should work for empty arrays too")
Test.assertSimilar(josephus([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],11),[11, 22, 33, 44, 5, 17, 29, 41, 3, 16, 30, 43, 7, 21, 36, 50, 15, 32, 48, 14, 34, 1, 20, 39, 9, 28, 2, 25, 47, 24, 49, 27, 8, 38, 19, 6, 42, 35, 26, 23, 31, 40, 4, 18, 12, 13, 46, 37, 45, 10], "Should work for larger arrays too")
Test.assertSimilar(josephus([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],40),[10, 7, 8, 13, 5, 4, 12, 11, 3, 15, 14, 9, 1, 6, 2], "Should work for larger ks too")
Test.assertSimilar(josephus([1],3),[1], "Should work for single-item arrays too")
Test.assertSimilar(josephus([true,false,true,false,true,false,true,false,true],9),[true, true, true, false, false, true, false, true, false],"Should work for values different from numbers too")
})

Test.describe("Random Tests",function(){
base=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

function randint(a,b){return Math.floor(Math.random()*(b-a+1)+a);}

function josephusol(items,k){
  var i=0, res=[];
  while (items.length>0){
    i=(i+k-1)%items.length;
    res.push(items[i]);
    items.splice(i,1);
  }
  return res;
}   

for (var i=0;i<40;i++){
    testitems=base.slice(0,randint(0,50))
    testk=randint(1,20)
    Test.it("Testing for josephus(["+testitems.join(", ")+"], "+testk.toString()+"]", function(){
    Test.assertSimilar(josephus([].concat(testitems),testk),josephusol(testitems,testk),"Should work for random inputs too")
    })
}
})
