const object = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  e: 1,
};
console.log(object);
const { a, b, ...rest } = object;
console.log(a, rest);

const object1 = {
  A: 1,
  B: 1,
};

const key = "A";

const { [key]: Anew } = object1;
console.log(Anew);

const object3 = {
  d: 1,
  e: 1,
};
const { d = 10, e = 10, f = 10 } = object3;
console.log(d, e, f);
