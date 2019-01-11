// https://www.codewars.com/kata/bouncing-balls/train/javascript

// My solution

function bouncingBall(h,  bounce,  window) {
  if ( h <= 0 || (bounce <= 0 || bounce >= 1) || window >= h) {
  return -1;
  }
  mother_sees = 1;
  function bouncing ( h,  bounce,  window) {
    if ((h*bounce) > window){
      mother_sees += 2;
      return bouncing ( (h*bounce),  bounce,  window)
    } else {
    return;
    }
  }
  bouncing (h,  bounce,  window);
  return mother_sees;
}

console.log(
  bouncingBall(30.0, 0.66, 1.5), " <=> 15"
);

// OFFICIAL SOLUTION

function bouncingBall(h,  bounce,  window) {
  var rebounds = -1;
  if (bounce > 0 && bounce < 1) while (h > window) rebounds+=2, h *= bounce;
  return rebounds;
}

// Test cases

describe("Simple tests", function(){
    it ("", function(){
      Test.assertEquals(bouncingBall(3.0, 0.66, 1.5) , 3);
      
      Test.assertEquals(bouncingBall(30.0, 0.66, 1.5), 15);
      
      Test.assertEquals(bouncingBall(30, 0.75, 1.5), 21);
      
      Test.assertEquals(bouncingBall(30, 0.4, 10), 3);
      
      Test.assertEquals(bouncingBall(40, 0.4, 10), 3);
      
      Test.assertEquals(bouncingBall(10, 0.6, 10), -1);
      
      Test.assertEquals(bouncingBall(40, 1, 10), -1);
      
      Test.assertEquals(bouncingBall(-5, 0.66, 1.5), -1);
      
      Test.assertEquals(bouncingBall(5, -1, 1.5), -1);
    });
});

describe("Random tests", function(){
  function bouncingBallTest(h, bounce, window) {
  		if ((h <= 0) || (window >= h) || (bounce <= 0) || (bounce >= 1))
  			return -1;
  		var seen = -1;
  		while (h > window) {
  	        seen += 2;
  	        h = h * bounce;
  		}
  	  return seen;
  }
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max );
  }
  
  it ("random selected 10 tests", function(){
  		var someheights = [12, 10.5, 144, 233, 15.25, 61, 98, 15.9, 25.8, 41.8, 67,
  		                      	109, 17, 28, 46, 7.5, 12.20, 19, 3, 5,
  		                      	83, 13, 21, 35.5, 57, 92, 14,
  		                      	24, 39, 6.5];
  		var someBounces = [0.6, 0.6, 0.6, 0.6, 0.6, 1.1, 9, 1, 0.6, 0.6, 0.6,
  	                   			0.75, 0.75, 0.75, 0.75, 0.75, 12.20, 0.75, 0.75,
  	                   			0.83, 0.13, 0.21, 0.35, 0.57, 0.9, 0.14,
  	                   			0.24, 0.39, 0.65, 0.65];
  		var somewin     = [1.5, 1.5, 1.44, 2.33, 1, 6.1, 9.8, 1.9, 2.8, 4.8, 3,
  	                   			1.09, 1.7, 2.8, 46, 7.5, 12.20, 1.9, 3, 5,
  	                   			0.83, 1.3, 2.1, 3.5, 0.57, 0.92, 1.4,
  	                   			2.4, 3.9, 6.5];
  	                		   
  		for (var k = 0; k < 10; k++) {
  			var rn = getRandomInt(29);
        
  			var f1 = someheights[rn]; 
  			var f2 = someBounces[rn];
  			var f3 = somewin[rn];
  	    console.log("Random test %s", k);
  			
        Test.assertEquals(bouncingBall(f1, f2, f3), bouncingBallTest(f1, f2, f3));
  		}
   });
});
