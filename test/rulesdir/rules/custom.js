var _ = require('lodash');
var rule = 'custom';

function custom() {
  return [
    {
      message: 'Custom error',
      rule   : rule,
      line   : 123
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  isValidConfig: _.stubTrue
};
