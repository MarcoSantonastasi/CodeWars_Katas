// https://www.codewars.com/kata/human-readable-duration-format/train/javascript

// My solution
function formatDuration (duration) {
  if (duration == 0) return "now"
  let years; let readable = "";
  if ((years = duration / (365*24*60*60))<1) years=0; else years = parseInt(years)
  let days = parseInt( (duration % (365*24*60*60)) / (24*60*60) )
  let hours = parseInt( (duration % (24*60*60)) / (60*60) )
  let minutes = parseInt( (duration % (60*60)) / (60) )
  let seconds = (duration % (60))

  readable += years>0?`${years}${years>1?" years, ":" year, "}`:""
  readable += days>0?`${days}${days>1?" days, ":" day, "}`:""
  readable += hours>0?`${hours}${hours>1?" hours, ":" hour, "}`:""
  readable += minutes>0?`${minutes}${minutes>1?" minutes, ":" minute, "}`:""
  readable += seconds>0?`${seconds}${seconds>1?" seconds":" second"}`:""

  readable = readable.replace(/,\s$/, "")
  readable = readable.replace(/,([^,]+)$/, " and$1")
  return readable
}

console.log(formatDuration(6874645))

// OFFICIAL SOLUTION
// The solution I prupose is the same as the official

// Test cases

Test.assertEquals(formatDuration(0), "now");

Test.assertEquals(formatDuration(1), "1 second");
Test.assertEquals(formatDuration(62), "1 minute and 2 seconds");
Test.assertEquals(formatDuration(120), "2 minutes");
Test.assertEquals(formatDuration(3600), "1 hour");
Test.assertEquals(formatDuration(3662), "1 hour, 1 minute and 2 seconds");

Test.assertEquals(formatDuration(15731080), "182 days, 1 hour, 44 minutes and 40 seconds");
Test.assertEquals(formatDuration(132030240), "4 years, 68 days, 3 hours and 4 minutes");
Test.assertEquals(formatDuration(205851834), "6 years, 192 days, 13 hours, 3 minutes and 54 seconds");
Test.assertEquals(formatDuration(253374061), "8 years, 12 days, 13 hours, 41 minutes and 1 second");
Test.assertEquals(formatDuration(242062374), "7 years, 246 days, 15 hours, 32 minutes and 54 seconds");
Test.assertEquals(formatDuration(101956166), "3 years, 85 days, 1 hour, 9 minutes and 26 seconds");
Test.assertEquals(formatDuration(33243586), "1 year, 19 days, 18 hours, 19 minutes and 46 seconds");
