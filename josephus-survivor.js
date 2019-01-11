// https://www.codewars.com/kata/josephus-survivor/train/javascript

// My solution

function josephusSurvivor(n,k){
  let days = new Array(n).fill(0).map((_,i)=> i + 1);
  let nextPick = 0;
  let eaten = [];

  while (eaten.length < n) {
    nextPick = ((nextPick + k-1) % days.length);
    eaten.push(...days.splice(nextPick, 1));
  }

  return eaten[eaten.length-1];
  
}

console.log(
  josephusSurvivor(14,2), " <=> 13"
);

// OFFICIAL SOLUTION

function josephusSurvivor(n, k){
  return n < 1 ? 1 : (josephusSurvivor(n - 1, k) + --k) % n + 1;
}

// Test cases

Test.describe("Basic tests",function(){
Test.assertEquals(josephusSurvivor(7,3),4)
Test.assertEquals(josephusSurvivor(11,19),10)
Test.assertEquals(josephusSurvivor(40,3),28)
Test.assertEquals(josephusSurvivor(14,2),13)
Test.assertEquals(josephusSurvivor(100,1),100)
Test.assertEquals(josephusSurvivor(1,300),1)
Test.assertEquals(josephusSurvivor(2,300),1)
Test.assertEquals(josephusSurvivor(5,300),1)
Test.assertEquals(josephusSurvivor(7,300),7)
Test.assertEquals(josephusSurvivor(300,300),265)
})

Test.describe("Random tests",function(){
function randint(a,b){return Math.floor(Math.random()*(b-a+1)+a);}

function josephusSol(n,k){
  res=1;
  for (var i=1;i<=n;i++) res=(res+k-1)%i+1;
  return res;
}

for (var i=0;i<40;i++){
    n=randint(1,5000)
    k=randint(1,5000)
    Test.it("Testing for josephus_survivor("+n.toString()+","+k.toString()+")",function(){
    Test.assertSimilar(josephusSurvivor(n,k),josephusSol(n,k))
    })
}
})
