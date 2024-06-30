const numbers = [1,2,3,4,5,6,7,8,9,10];
const evenNumbers = [2,4,6,8,10];
const oddNumbers = [1,3,5,7,9];

//map function
const squareFun = (num:number) => num * num;

console.log(squareFun(5));

//filter function
const getEvenNumbers = numbers.filter(num => num % 2 === 0);
console.log(getEvenNumbers);

const getOddNumbers = numbers.filter(num => num % 2 != 0);
console.log(getOddNumbers);

//reduce function 
const sumNumbers = numbers.reduce((acc, num) => acc + num, 0);
console.log(sumNumbers);

const maxNumber = numbers.reduce((acc, num) => acc > num ? acc :num, 0);
console.log(maxNumber);

//some function
const anyEven =  evenNumbers.some(num => num % 2 ===0);
const anyEven2 = oddNumbers.some(num => num % 2 ===0);

console.log(anyEven);
console.log(anyEven2);

//every functinon
const allEven = evenNumbers.every(num => num % 2 === 0);
const allEven2 = oddNumbers.every(num => num % 2 === 0);

console.log(allEven);
console.log(allEven2);