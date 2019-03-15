const _ = require('lodash');
const rule = 'another-custom';

function custom() {
  return [
    {
      message: 'Another custom error',
      rule: rule,
      line: 456,
    },
  ];
}

module.exports = {
  name: rule,
  run: custom,
  isValidConfig: _.stubTrue,
};
