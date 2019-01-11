// https://www.codewars.com/kata/valid-parentheses/train/javascript

// My solution

function validParentheses(parens){
if ( parens == "" ) return true;
if ( parens.match(/^\)/) ) return false;
if ( parens.match(/\($/) ) return false;
if ( parens.match(/\(/g) == null ) return false;
if ( parens.match(/\)/g) == null ) return false;
return parens.match(/\(/g).length == parens.match(/\)/g).length;
}

console.log(
  validParentheses( "())" ), " <=> false"
);

// OFFICIAL SOLUTION

// I had something that was smaller and looked cooler, but
// this is how you'd want to write an actual parser.
function validParentheses(string){
   var tokenizer = /[()]/g, // ignores characters in between; parentheses are
       count = 0,           // pretty useless if they're not grouping *something*
       token;
   while(token = tokenizer.exec(string), token !== null){
      if(token == "(") {
         count++;
      } else if(token == ")") {
         count--;
         if(count < 0) {
            return false;
         }
      }
   }
   return count == 0;
}

// Test cases

Test.assertEquals(validParentheses( "()" ), true);
Test.assertEquals(validParentheses( "()()" ), true);
Test.assertEquals(validParentheses( "(())" ), true);
Test.assertEquals(validParentheses( ")" ), false);
Test.assertEquals(validParentheses( "" ), true);
Test.assertEquals(validParentheses( "())" ), false);
Test.assertEquals(validParentheses( "((((()))))" ), true);
Test.assertEquals(validParentheses( "()))" ), false);
Test.assertEquals(validParentheses( "()()()())" ), false);
Test.assertEquals(validParentheses( "(()()()())(())" ), true);
Test.assertEquals(validParentheses( "((((((((" ), false);
Test.assertEquals(validParentheses( "(())((()((()))))" ), true);
Test.assertEquals(validParentheses( "())(" ), false);
Test.assertEquals(validParentheses( ")()()()(" ), false);
Test.assertEquals(validParentheses( "(()()))(" ), false);
Test.assertEquals(validParentheses( ")()(" ), false);
