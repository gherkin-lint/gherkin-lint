const _ = require('lodash');
const rule = 'no-empty-file';
const suppressOtherRules = true;

function noEmptyFiles(feature) {
  if (_.isEmpty(feature)) {
    return {
      message: 'Empty feature files are disallowed',
      rule: rule,
      line: 1,
    };
  }
}

module.exports = {
  name: rule,
  run: noEmptyFiles,
  isValidConfig: _.stubTrue,
  suppressOtherRules: suppressOtherRules,
};
