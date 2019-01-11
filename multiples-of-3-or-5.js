// https://www.codewars.com/kata/multiples-of-3-or-5/train/javascript

function solution(number){
  if (Number.isInteger(number) && number > 0) {
      const baseArray = [...Array(number).keys()];
      const reducer = (accumulator, currentValue) => (currentValue % 3 == 0 || currentValue % 5 == 0)  ? accumulator + currentValue: accumulator;
      return baseArray.reduce(reducer, 0);
  } else {
    return 0;
  }
}

console.log(
  solution(10,23)
);
