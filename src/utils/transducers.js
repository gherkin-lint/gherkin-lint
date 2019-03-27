const filter = (p) => (step) => (acc, item) => p(item) ? step(acc, item) : acc;

const flatMap = (fn) => (step) => (acc, item) => fn(item).reduce(step, acc);

const map = (fn) => (step) => (acc, item) => step(acc, fn(item));

module.exports = {
  filter,
  flatMap,
  map,
};
