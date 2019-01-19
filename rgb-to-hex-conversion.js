// https://www.codewars.com/kata/rgb-to-hex-conversion/train/javascript

// My solution

function rgb(r, g, b){
  const rgb = [...arguments].map(color => (Math.min(255, Math.max(0, color))))
  const hex = rgb.map(color => ("0" + parseInt(color,10).toString(16)).slice(-2)).join("").toUpperCase()
  return hex
}


console.log(rgb(0, 0, 0), '000000')
console.log(rgb(0, 0, -20), '000000')
console.log(rgb(300,255,255), 'FFFFFF')
console.log(rgb(173,255,47), 'ADFF2F')


// OFFICIAL SOLUTION

function rgb(r, g, b){
  return [r,g,b].map(function(x) {
    return ('0'+Math.max(0, Math.min(255, x)).toString(16)).slice(-2);
  }).join('').toUpperCase();
}

// Test cases

Test.assertEquals(rgb(0, 0, 0), '000000')
Test.assertEquals(rgb(0, 0, -20), '000000')
Test.assertEquals(rgb(300,255,255), 'FFFFFF')
Test.assertEquals(rgb(173,255,47), 'ADFF2F')

function rgbReference(r, g, b){
  function hex(n){
    n = parseInt(n, 10)
    if (isNaN(n)) return "00"
    n = Math.max(0, Math.min(n, 255))
    var chars = "0123456789ABCDEF"
    return chars.charAt((n - n % 16) / 16) + chars.charAt(n % 16)
  }  
  
  return hex(r) + hex(g) + hex(b)
}

function elevatorReference(left, right, call){
   return (Math.abs(right-call)<=Math.abs(left-call))? 'right' : 'left';
}


function generator() {
  var a = randInt(-5,300)
  var b = randInt(-5,300)
  var c = randInt(-5,300)
  return [a,b,c]
}

function randInt(a, b) { return Math.random() * (b - a + 1) + a | 0 }

function randomAssertSimilar(generator, userSolution, referenceSolution, tests){
	tests = tests || 100;
	var user, reference, values;
	while( tests --> 0){
		values = generator();
		reference = referenceSolution.apply(this, values);
		user      = userSolution.apply(this,      values);
		Test.assertEquals(user, reference, "didn't work on the following argument array: " + values);
	}
}

describe("Random tests", function () {  
  randomAssertSimilar(generator, rgb, rgbReference);
});
