// https://www.codewars.com/kata/sum-strings-as-numbers/train/javascript

// My solution

function sumStrings(a,b) {
    let sum = "";
    let str1 = a;
    let str2 = b;

    // we'll need these in the program many times.
    let str1Length = str1.length;
    let str2Length = str2.length;

    // if s2 is longer than s1, swap them.
    if(str2Length > str1Length ){
        let temp = str2;
        str2 = str1;
        str1 = temp;
    }

    let carry = 0;  // number that is carried to next decimal place, initially zero.
    let temp;
    let digitSum;
    for (let i = 0; i < str1.length; i++) {
        a = parseInt(str1.charAt(str1.length - 1 - i));      // get ith digit of str1 from right, we store it in a
        b = parseInt(str2.charAt(str2.length - 1 - i));      // get ith digit of str2 from right, we store it in b
        b = (b) ? b : 0;                                    // make sure b is a number, (this is useful in case, str2 is shorter than str1
        temp = (carry + a + b).toString();                  // add a and b along with carry, store it in a temp string.
        digitSum = temp.charAt(temp.length - 1);            //
        carry = parseInt(temp.substr(0, temp.length - 1));  // split the string into carry and digitSum ( least significant digit of abSum.
        carry = (carry) ? carry : 0;                        // if carry is not number, make it zero.

        sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;  // append digitSum to 'sum'. If we reach leftmost digit, append abSum which includes carry too.

    }
    
    sum = sum.replace(/^0*/, "")

    return sum;
}

console.log(sumStrings('123','456'),' <=> 579')

// OFFICIAL SOLUTION

function sumStrings(a, b) {
  var res = '', c = 0;
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop();
    res = c % 10 + res;
    c = c > 9;
  }
  return res.replace(/^0+/, '');
}

// Test cases

function msg(a,b) {
  if(typeof returned !== 'string') {
    return 'Function must return a string value'
  } else {
    return "sumStrings('" + a + "', '" + b + "')"
  }
}
function t(a,b,ans) {
  returned = sumStrings(a,b)
  Test.assertEquals(returned,ans, msg(a,b, returned))
}
t('123', '456', '579')

t('8797', '45', '8842')
t('800', '9567', '10367')
t('99','1','100') 
t('00103', '08567', '8670')
t('','5','5')
t('712569312664357328695151392',
       '8100824045303269669937',
  '712577413488402631964821329')
t('50095301248058391139327916261',
  '81055900096023504197206408605',
  '131151201344081895336534324866')
  
