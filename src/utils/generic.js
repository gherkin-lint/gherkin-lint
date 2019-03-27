const T = require('./transducers');

const append = (result, item) => {
  result.push(item);
  return result;
};

const compose = (...fns) => (x) => fns.reduceRight((x, fn) => fn(x), x);

const reduce = (reducer, acc) => (input) => {
  if (Array.isArray(input)) {
    return input.reduce(reducer, acc);
  }
  for (const name in input) {
    if (({}).hasOwnProperty.call(input, name)) {
      acc = reducer(acc, input[name]);
    }
  }
  return acc;
};

const intoArray = (transducer) => reduce(transducer(append), []);

const flatMap = (fn) => (array) => intoArray(T.flatMap(fn))(array);

const applyOver = (fns) => (node) => flatMap((fn) => fn(node))(fns);

const applyWith = (selector) => (checkMap) => (node) => {
  const check = checkMap[selector(node)];
  return check ? check(node) : [];
};

const applyAfter = (appendedCheck) => (check) => applyOver([
  check,
  appendedCheck,
]);

const uniq = (array) => [...new Set(array)];

module.exports = {
  append,
  applyAfter,
  applyOver,
  applyWith,
  compose,
  flatMap,
  intoArray,
  reduce,
  uniq,
};
