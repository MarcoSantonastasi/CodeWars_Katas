// https://www.codewars.com/kata/vigenere-cipher-helper/train/javascript

// My solution

function VigenèreCipher(key, abc) {
  this.abc = [...abc]
  this.key = [...key].map(char => abc.indexOf(char))

  this.encode = function (str) {
    let cypherText = ""
    let cursor = 0
    for (let c of str) {
      let index = this.abc.indexOf(c)
      let shift = this.key[cursor % this.key.length]
      if (index >= 0) {
        let charPos = (index + shift) % this.abc.length
        cypherText += this.abc.slice(charPos, charPos + 1)
      } else {
        cypherText += c
      }
      cursor += 1
    }
    return cypherText
  }
  this.decode = function (str) {

    let clearText = ""
    let cursor = 0
    for (let c of str) {
      let index = this.abc.indexOf(c)
      let shift = this.key[cursor % this.key.length]
      if (index >= 0) {
        let charPos = (index - shift) % this.abc.length
        clearText += this.abc.slice(charPos, charPos + 1)
      } else {
        clearText += c
      }
      cursor += 1
    }
    return clearText
  }
}

// OFFICIAL SOLUTION

function VigenèreCipher(key, abc) {
  
  this.compute = function(str, dir) {
    var i = 0;
    var result = '';
    var kl = key.length;
    var al = abc.length;
    
    while(str[i]) {
      result += -1 === abc.indexOf(str[i]) ? str[i] : (abc[ (abc.indexOf(str[i]) + dir * abc.indexOf(key[i%kl]) + al) % al ]);
      i++;
    }
            
    return result;
    
  },

  this.encode = function (str) {
    return this.compute(str, 1);
  };
  this.decode = function (str) {
    return this.compute(str, -1);
  };
}

// Alternative solution

function VigenèreCipher(key, abc) {
  this.encode = function(str) {
    return str.split('').map(function(v, i) {
      if(abc.indexOf(v) == -1) {return v;}
      return abc[(abc.indexOf(v) + abc.indexOf(key[i % key.length])) % abc.length];
    }).join('');
  };
  this.decode = function(str) {
    return str.split('').map(function(v, i) {
      if(abc.indexOf(v) == -1) {return v;}
      var ind = abc.indexOf(v) - abc.indexOf(key[i % key.length]);
      return abc[ind < 0 ? ind + abc.length : ind];
    }).join('');
  };
}

// Idiomatic solution

class VigenèreCipher {
  constructor (key, abc) {
    this.key = key;
    this.abc = abc;
  }
  
  encode (s) {
    const {key, abc} = this;
    let result = ''
    for (let i in s) {
      const c = s[i];
      const k = key[i % key.length];
      if (abc.indexOf(c) >= 0) 
        result += abc[(abc.indexOf(c) + abc.indexOf(k)) % abc.length];
      else result += c;
    }
    return result;
  }
  
  decode (s) {
    const {key, abc} = this;
    let result = '';
    for (let i in s) {
      const c = s[i];
      const k = key[i % key.length];
      if (abc.indexOf(c) >= 0) 
        result += abc[(abc.indexOf(c) + abc.length - abc.indexOf(k)) % abc.length];
      else result += c;
    }
    return result;
  }
}

// Test cases

var desc = "Testing with lowercase latin alphabet";
Test.describe(desc, function () {
  var abc = 'abcdefghijklmnopqrstuvwxyz';

  Test.it("Password of 'password'", function () {
    var c = new VigenèreCipher('password', abc);
  
    Test.assertEquals(c.encode('codewars'), 'rovwsoiv');
    Test.assertEquals(c.decode('rovwsoiv'), 'codewars');
    Test.assertEquals(c.encode('waffles'), 'laxxhsj');
    Test.assertEquals(c.decode('laxxhsj'), 'waffles');
    Test.assertEquals(c.encode("it's a shift cipher!"), "xt'k o vwixl qzswej!");
    Test.assertEquals(c.decode("xt'k o vwixl qzswej!"), "it's a shift cipher!");
  });
  Test.it("Password of 'pizza'", function () {
    var c = new VigenèreCipher('pizza', abc);
  
    Test.assertEquals(c.encode('asodavwt'), 'pancakes');
    Test.assertEquals(c.decode('pancakes'), 'asodavwt');
    Test.assertEquals(c.encode('javascript'), 'yiuzsrzhot');
    Test.assertEquals(c.decode('yiuzsrzhot'), 'javascript');

  });
  Test.it("Password of 'attackatdawn', random tokens", function () {
    var c = new VigenèreCipher('attackatdawn', abc);
    var i, token;
    for(i = 0; i < 5; i++) {
      token = Test.randomToken();
      Test.assertEquals(c.decode(c.encode(token)), token);
    }    
  });
});

desc = "Testing with katakana alphabet"
Test.describe(desc, function () {
  var abc = 'アイウエオァィゥェォカキクケコサシスセソタチツッテトナニヌネノハヒフヘホマミムメモヤャユュヨョラリルレロワヲンー';
  Test.it("Password of 'カタカナ'", function () {
    var c = new VigenèreCipher('カタカナ', abc);
  
    Test.assertEquals(c.encode('カタカナ'), 'タモタワ');
    Test.assertEquals(c.decode('タモタワ'), 'カタカナ');
    Test.assertEquals(c.encode('javascript'), 'javascript');
    Test.assertEquals(c.decode('javascript'), 'javascript');
    Test.assertEquals(c.encode('ドモアリガトゴザイマス'),'ドオカセガヨゴザキアニ');
    Test.assertEquals(c.decode('ドオカセガヨゴザキアニ'),'ドモアリガトゴザイマス');
  });
});
