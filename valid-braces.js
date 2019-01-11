// https://www.codewars.com/kata/valid-braces/train/javascript

// My solution

function validBraces(braces){
  
  const strayBraces  = /\{[^\}]*$|\[[^\]]*$|\([^\)]*$|^[^\{]*\}|^[^\[]*\]|^[^\(]*\)/.exec(braces);
  const pairedBraces = /\([^\(]*?\)|\[[^\[]*?\]|\{[^\{]*?\}/.exec(braces);
  
  console.log(strayBraces);
  console.log(pairedBraces);

  if(strayBraces) return false;
  if(pairedBraces) return validBraces(pairedBraces[0].substring(1,pairedBraces[0].length-1));

  return true;
}

console.log(
  validBraces( "[(])" ), " <=> false"
);

// OFFICIAL SOLUTION

function validBraces(braces){
 while(/\(\)|\[\]|\{\}/g.test(braces)){braces = braces.replace(/\(\)|\[\]|\{\}/g,"")}
 return !braces.length;
}

// Test cases

Test.assertEquals(validBraces( "()" ), true);
Test.assertEquals(validBraces( "[]" ), true);
Test.assertEquals(validBraces( "{}" ), true);
Test.assertEquals(validBraces( "(){}[]" ), true);
Test.assertEquals(validBraces( "([{}])" ), true);
Test.assertEquals(validBraces( "(}" ), false);
Test.assertEquals(validBraces( "[(])" ), false);
Test.assertEquals(validBraces( "({})[({})]" ), true);
Test.assertEquals(validBraces( "(})" ), false);
Test.assertEquals(validBraces( "(({{[[]]}}))" ), true);
Test.assertEquals(validBraces( "{}({})[]" ), true);
Test.assertEquals(validBraces( ")(}{][" ), false);
Test.assertEquals(validBraces( "())({}}{()][][" ), false);
Test.assertEquals( validBraces( "(((({{" ), false);
Test.assertEquals( validBraces( "}}]]))}])" ), false);
