// https://www.codewars.com/kata/regex-password-validation/train/javascript

// My solution

function validate(password) {
  return /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^0-9]*[0-9])^[0-9a-zA-Z]{6,}$/g.test(password);
}

console.log(
  validate('Password123'), " <=> Password123 - Expected true"
);

// OFFICIAL SOLUTION

function validate(password) {
  return  /^[A-Za-z0-9]{6,}$/.test(password) &&
          /[A-Z]+/           .test(password) &&
          /[a-z]+/           .test(password) &&
          /[0-9]+/           .test(password) ;
}

// Test cases

Test.expect(validate('fjd3IR9'), 'Expected true');
Test.expect(!validate('ghdfj32'), ' Expected false');
Test.expect(!validate('DSJKHD23'), 'Expected false');
Test.expect(!validate('dsF43'), 'Expected false');
Test.expect(validate('4fdg5Fj3'), 'Expected true');
Test.expect(!validate('DHSJdhjsU'), 'Expected false');
Test.expect(!validate('fjd3IR9.;'), 'Expected false');
Test.expect(!validate('fjd3  IR9'), 'Expected false');
Test.expect(validate('djI38D55'), 'Expected true');
Test.expect(!validate('a2.d412'), 'Expected false');
Test.expect(!validate('JHD5FJ53'), 'Expected false');
Test.expect(!validate('!fdjn345'), 'Expected false');
Test.expect(!validate('jfkdfj3j'), 'Expected false');
Test.expect(!validate('123'), 'Expected false');
Test.expect(!validate('abc'), 'Expected false');
Test.expect(validate('123abcABC'), 'Expected true');
Test.expect(validate('ABC123abc'), 'Expected true');
Test.expect(validate('Password123'), 'Expected true');
