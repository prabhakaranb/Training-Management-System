const fs = require('fs');
// Check the number of available CPU.
const numCPUs = require('os').cpus().length;

console.log(numCPUs);
/**
 * x Output: 0
 * y-z Output: {p:10}
 * a-b-c Output: Invalid Input
 * b-d-e Output: {f:22}
 * b-d-e-f Output: 22
 * @param {*} arg
 * @returns
 */
const test = (arg) => {
  const json = {
    x: 0,
    y: {
      z: {
        p: 10,
      },
    },
    a: 100,
    b: {
      c: 22,
      d: {
        e: {
          f: 22,
        },
      },
    },
  };

  const keys = arg.includes('-') && arg.split('-');
  try {
    if (!keys) {
      const output = json[arg];
      return output;
    } if (keys.length === 2) {
      return json[keys[0]][keys[1]];
    } if (keys.length === 3) {
      return json[keys[0]][keys[1]][keys[2]];
    } if (keys.length === 4) {
      return json[keys[0]][keys[1]][keys[2]][keys[3]];
    }
  } catch (error) {
    return 'Invalid Input';
  }
};

/* const answer = test('a');
console.log(answer); */

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

/* const answer1 = add(10)(20)(30);
console.log(answer1); */

/** *
 * implementation of readFileSync
 */
function readFileSync() {
  const data = fs.readFileSync('input.txt');
  console.log(data.toString());
  console.log('Program Ended');
}
/** *
 * implementation of readFile
 */

function readFile() {
  fs.readFile('input.txt', (err, data) => {
    if (err) return console.error(err);
    console.log(data.toString());
  });

  console.log('Program Ended');
}

function loop() {
  const obj = {
    h4354desdfqw: {
      name: 'Computer',
      os: 'Window',
    },
    hjsado24334: {
      name: 'Software',
      type: 'Adobe',
    },
    qwsak032142: {
      name: 'hardware',
      type: 'hardisk',
    },
  };

  const result = Object.values(obj).map((o) => o.name);
  const keys = Object.keys(obj);
  return { keys, result };
}
const result = loop();
console.log(result);
