const _ = require('lodash');
const logger = require('./../logger.js');
const rule = 'new-line-at-eof';
const stringRuleValidation = require('../config-validation/string-rule-validation');

const availableConfigs = [
  'yes',
  'no',
];

function newLineAtEOF(unused, file, configuration) {
  if (_.indexOf(availableConfigs, configuration) === -1) {
    logger.boldError(`${rule } requires an extra configuration value.\nAvailable configurations: ${ availableConfigs.join(', ') }\nFor syntax please look at the documentation.`);
    process.exit(1);
  }

  const hasNewLineAtEOF = _.last(file.lines) === '';
  let errormsg = '';
  if (hasNewLineAtEOF && configuration === 'no') {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === 'yes') {
    errormsg = 'New line at EOF(end of file) is required';
  }

  if (errormsg !== '') {
    return {message: errormsg,
      rule: rule,
      line: file.lines.length};
  }
}

module.exports = {
  name: rule,
  run: newLineAtEOF,
  isValidConfig: stringRuleValidation(availableConfigs),
};
