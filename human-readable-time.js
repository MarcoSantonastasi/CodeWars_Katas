// https://www.codewars.com/kata/human-readable-time/train/javascript

// My solution

function humanReadable(timeInSeconds) {
let hours = parseInt(timeInSeconds/3600).toLocaleString("en-EN",{minimumIntegerDigits:2,maximumIntegerDigits:2});
let minutes = parseInt((timeInSeconds%3600)/60).toLocaleString("en-EN",{minimumIntegerDigits:2,maximumIntegerDigits:2});
let seconds = parseInt(timeInSeconds%60).toLocaleString("en-EN",{minimumIntegerDigits:2,maximumIntegerDigits:2});
return (hours+":"+minutes+":"+seconds);
}

console.log(
  humanReadable(359999), " <=> 99:59:59"
);

// OFFICIAL SOLUTION

function humanReadable(seconds) {
  var pad = function(x) { return (x < 10) ? "0"+x : x; }
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}

// Test cases

describe('tests', function() {
  it('should format correctly', function() {
    Test.assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
    Test.assertEquals(humanReadable(59), '00:00:59', 'humanReadable(59)');
    Test.assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
    Test.assertEquals(humanReadable(90), '00:01:30', 'humanReadable(90)');
    Test.assertEquals(humanReadable(3599), '00:59:59', 'humanReadable(3599)');
    Test.assertEquals(humanReadable(3600), '01:00:00', 'humanReadable(3600)');
    Test.assertEquals(humanReadable(45296), '12:34:56', 'humanReadable(45296)');
    Test.assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
    Test.assertEquals(humanReadable(86400), '24:00:00', 'humanReadable(86400)');
    Test.assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');
  });
});
