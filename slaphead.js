// https://www.codewars.com/kata/slaphead/train/javascript

// My solution

function bald(x){

  let hair =0 ;
  let msg = "";
  
  for (let char of x) {
    char=="/" ? hair++ : hair;
  }
  switch (hair) {
    case 0:
    msg = "Clean!";
    break;
    case 1:
    msg = "Unicorn!";
    break;
    case 2:
    msg = "Homer!";
    break;
    case 3:
    case 4:
    case 5:
    msg = "Careless!";
    break;
    default:
    msg = "Hobo!";
  }
  let shaven = x.replace(/\//gi, "-");
  return [shaven, msg];
}

console.log(
  bald('--/--/---/-/---'), " <=> ['---------------', 'Careless!']"
);

// OFFICIAL SOLUTION

function bald(x) {
  const count = x.split('/').length - 1;
  let look;
  switch (count) {
    case 0: look = 'Clean'; break;
    case 1: look = 'Unicorn'; break;
    case 2: look = 'Homer'; break;
    case 3:
    case 4:
    case 5: look = 'Careless'; break;
    default: look = 'Hobo';
  }
  return [x.replace(/\//g, '-'), look + '!'];
}

// Test cases

Test.describe("Basic tests",_=>{
Test.assertSimilar(bald('/---------'), ['----------', 'Unicorn!']);
Test.assertSimilar(bald('/-----/-'), ['--------', 'Homer!']);
Test.assertSimilar(bald('--/--/---/-/---'), ['---------------', 'Careless!']);
});

Test.describe("Random tests",_=>{
const randint=(a,b)=>~~(Math.random()*(b-a+1))+a;
function mybald(x){
  var count = 0, state = '';
  x=x.split('');
  for (var i = 0; i < x.length; i++) {
    if (x[i] == '/') x[i]='-', count++;
  }
  
  if (count == 0) state = "Clean!";
  else if (count == 1) state = "Unicorn!";
  else if (count == 2) state = "Homer!";
  else if (count > 2 && count < 6) state = "Careless!";
  else if (count > 5) state = "Hobo!";

return [x.join(''), state];
}
var names=["-", "/", "-", "-", "-"];

for (var i=0;i<100;i++){
  var x=[],len=randint(1,20);
  for (var k=0;k<len;k++) {
    x.push(names[randint(0,names.length-1)]);
}
  x=x.join('');
  Test.it(`Testing for ${x}`,_=>{
  Test.assertSimilar(bald(x), mybald(x),"It should work for random inputs too");
  })
}
})
