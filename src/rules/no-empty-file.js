var _ = require('lodash');
var rule = 'no-empty-file';
var suppressOtherRules = true;

function noEmptyFiles(parsedFile) {
  if (_.isEmpty(parsedFile)) {
    return {message: 'Empty feature files are disallowed',
            rule   : rule,
            line   : 1};
  }
}

module.exports = {
  name: rule,
  run: noEmptyFiles,
  suppressOtherRules: suppressOtherRules
};
