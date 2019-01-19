// https://www.codewars.com/kata/weight-for-weight/train/javascript

// My solution

function orderWeight(str) {
  return (str.match(/\S+/g) || []).sort((a, b) => {
    return [...a].reduce((sum, digit) => sum += parseInt(digit), 0) - [...b].reduce((sum, digit) => sum += parseInt(digit), 0)
    || ( a > b ? 1 : -1 )
  }
  ).join(" ")
}

console.log(orderWeight("103 123 4444 99 2000"), "2000 103 123 4444 99")

console.log(orderWeight("2000 10003 1234000 44444444 9999 11 11 22 123"), "11 11 2000 10003 22 123 1234000 44444444 9999")

// OFFICIAL SOLUTION

function orderWeight(s) {
  return s.split(' ').sort((a,b)=>a.split('').reduce((pv,cv)=>pv+ +cv,0)-b.split('').reduce((pv,cv)=>pv+ +cv,0)||(a>b?1:-1)).join(' ');
}

// Test cases

Test.describe("Order Weights",function() {
Test.it("Basic tests",function() {
    Test.assertEquals(orderWeight("103 123 4444 99 2000"), "2000 103 123 4444 99")
    Test.assertEquals(orderWeight("2000 10003 1234000 44444444 9999 11 11 22 123"), "11 11 2000 10003 22 123 1234000 44444444 9999")
    Test.assertEquals(orderWeight(""), "")
    Test.assertEquals(orderWeight("10003 1234000 44444444 9999 2000 123456789"), "2000 10003 1234000 44444444 9999 123456789")
    Test.assertEquals(orderWeight("3 16 9 38 95 1131268 49455 347464 59544965313 496636983114762 85246814996697"), 
        "3 16 9 38 95 1131268 49455 347464 59544965313 496636983114762 85246814996697")
    Test.assertEquals(orderWeight("71899703 200 6 91 425 4 67407 7 96488 6 4 2 7 31064 9 7920 1 34608557 27 72 18 81"), 
            "1 2 200 4 4 6 6 7 7 18 27 72 81 9 91 425 31064 7920 67407 96488 34608557 71899703")
    Test.assertEquals(orderWeight("387087 176 351832 100 430372 8 58052 54 175432 120 269974 147 309754 91 404858 67 271476 164 295747 111 40"), 
        "100 111 120 40 8 54 91 164 147 67 176 430372 58052 175432 351832 271476 309754 404858 387087 295747 269974")
})})

Test.describe("Random tests",function() {

    function randint(a,b) { 
        return Math.floor(Math.random() * (b - a + 1) + a); 
    }
    function weightStrNb1235(nb) {
        var n = 0, a = nb.split('');
        for(var i in a){ n += +a[i]; }
        return n;
    }
    function comp1235(a, b) {
        var r;
        var cp = weightStrNb1235(a) - weightStrNb1235(b);
        if (cp == 0) {
            if (a < b) r = -1; else r = 1;
        } else {
            r = cp;
        }
        return r;
    }
    function orderWeight1235(strng) {
        return strng.split(' ').sort(comp1235).join(" ")
    }
    function do_ex() {
        var i = 0;
        var res = "";
        while (i < 20) {
            if (i % 2 == 0) n = randint(1, 500000); else n = randint(1, 200);
            res += +n + " ";
            i += 1;
        }
        return res + randint(1, 100);
    }

    for (var _ = 0; _ < 50; _++){
        var a = do_ex();
        Test.it("Testing Order Weights: " + a, function() {
            Test.assertEquals(orderWeight(a), orderWeight1235(a) ,"It should work for random tests too")
        }
    )}
})
