// const fns = [];
// const fns1 = [];

// for (let i = 0; i < 5; i++) {
//   const c = i * 2;
//   fns.push((_) => console.log(c));

//   var c1 = i * 2;
//   fns1.push((_) => console.log(c1));
// }

// // console.log(fns.length);

// fns.forEach((f) => f());
// fns1.forEach((f) => f());

let theThing = null;
const replaceThing = function () {
  const originalThing = theThing;
  const unused = function () {
    if (originalThing) { console.log('hi'); }
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod() {
      console.log(someMessage);
    },
  };
};
setInterval(replaceThing, 1000);
