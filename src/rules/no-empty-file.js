var _ = require('lodash');
var rule = 'no-empty-file';

function noEmptyFiles(feature) {
  var errors = [];
  if (_.isEmpty(feature)) {
    errors.push({
      message: 'Empty feature files are disallowed',
      rule   : rule,
      line   : 1
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noEmptyFiles
};
