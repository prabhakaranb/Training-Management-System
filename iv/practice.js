/* const reverseEveryWord = (stringToReverse, separator = '') => {
  const strArray = [];
  for (let i = stringToReverse.split(separator).length; i >= 0; i -= 1) {
    strArray.push(stringToReverse.split('')[i]);
  }

  return strArray.join(separator);

  return stringToReverse.split(separator).reverse().join(separator);
};

let result = reverseEveryWord('Welcome to this Javascript Guide!');
console.log(result);
result = reverseEveryWord(result, ' ');
console.log(result);

const isValidArray = (objectToCheck) => (typeof objectToCheck === 'object'
    && Array.isArray(objectToCheck)
    && objectToCheck.length >= 0);

result = isValidArray([]);
console.log(`Valid array - ${result}`);

const emptyTheArray = (arrayList) => {
  const anotherArrayList = arrayList;
  // method 1 -> arrayList = [];
  // method 2 -> array.length = 0;
  method 3
  while (arrayList.length) {
    arrayList.pop();
  }
  return arrayList;

  arrayList.push(5);
  console.log(arrayList);
  let elementRemoved = arrayList.pop();
  console.log(elementRemoved);
  elementRemoved = arrayList.pop();
  console.log(elementRemoved);

  arrayList = arrayList.concat(arrayList);
  console.log(arrayList);

  // method 4
  return arrayList.splice(0, 0);
};

let result = emptyTheArray([1, 2, 3, 4]);
console.log(result);
// console.log(`Empty array - ${result}`);

const isInt = (number) => number % 1 === 0;

result = isInt(10.0);
console.log(result);
*/

function createBase(x) {
  return function (y) {
    return x + y;
  };
}

const addSix = createBase(6);
console.log(addSix(10)); // returns 16
console.log(addSix(21)); // returns 27

const isAnagram = (firstWord, secondWord) => {
  firstWord = firstWord.toLowerCase().split('').sort().join('');
  secondWord = secondWord.toLowerCase().split('').sort().join('');

  return firstWord === secondWord;
};

console.log(isAnagram('Army', 'Mary1'));

let y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y);

let y1 = 1;
function f1() {}
if (y1) {
  y1 += typeof f1;
}
console.log(y1);

const Employee = {
  company: 'xyz',
};
const emp1 = Object.create(Employee);
// delete Employee.company;
// console.log(Employee.company);
delete emp1.company;
console.log(emp1.company);

console.log(emp1.hasOwnProperty('company'));

/* const sdd = () => {
  for (let i = 0; i <= 100; i += 1) {
    const multiplyBy3 = i % 3 === 0;
    const multiplyBy5 = i % 5 === 0;

    console.log(multiplyBy3 ? (multiplyBy5
      ? 'FizzBuzz'
      : 'Fizz')
      : multiplyBy5
        ? 'Buzz'
        : i);

    if (i % 3 === 0) console.log(` ${i} - fizz`);
    if (i % 5 === 0) console.log(` ${i} - buzz`);
    if (i % 3 === 0 && i % 5 === 0) console.log(` ${i} - fizzbuzz`);
  }
};

sdd(); */
