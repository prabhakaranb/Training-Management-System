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

const answer = test('a');
console.log(answer);

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

const answer1 = add(10)(20)(30);
console.log(answer1);
