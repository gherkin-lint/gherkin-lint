const _ = require('lodash');
const rule = 'no-empty-file';

function run(feature) {
  let errors = [];
  if (_.isEmpty(feature)) {
    errors.push({
      message: 'Empty feature files are disallowed',
      rule   : rule,
      line   : 1,
      column: 0
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: run
};
