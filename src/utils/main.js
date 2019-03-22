const append = (result, item) => {
  result.push(item);
  return result;
};

const compose = (...fns) => (x) => fns.reduceRight((x, fn) => fn(x), x);

const filter = (p) => (step) => (acc, item) => p(item) ? step(acc, item) : acc;

const flatMap = (fn) => (step) => (acc, item) => fn(item).reduce(step, acc);

const map = (fn) => (step) => (acc, item) => step(acc, fn(item));

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

module.exports = {
  append,
  compose,
  filter,
  flatMap,
  intoArray,
  map,
  reduce,
};
