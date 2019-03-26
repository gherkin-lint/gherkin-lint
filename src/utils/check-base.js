const {intoArray, flatMap} = require('./main.js');

const checksOverNode = (checks) => (node) => {
  return intoArray(flatMap((check) => check(node)))(checks);
};

const checkOverChild = (childSelector) => (check) => (node) => {
  return check(childSelector(node));
};

const checkOverChildren = (childrenSelector) => (check) => (node) => {
  return intoArray(flatMap(check))(childrenSelector(node));
};

const checkBasedOn = (selector) => (checkMap) => (node) => {
  const check = checkMap[selector(node)];
  return check ? check(node) : [];
};

const appendCheck = (appendedCheck) => (check) => checksOverNode([
  check,
  appendedCheck,
]);

module.exports = {
  appendCheck,
  checksOverNode,
  checkOverChild,
  checkOverChildren,
  checkBasedOn,
};
