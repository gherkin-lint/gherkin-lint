const rule = 'new-line-at-eof';
const stringRuleValidation = require('../config-validation/string-rule-validation');

const availableConfigs = [
  'yes',
  'no',
];

const newLineAtEOF = (unused, file, configuration) => {
  const hasNewLineAtEOF = file.lines.slice(-1)[0] === '';
  let errormsg = '';
  if (hasNewLineAtEOF && configuration === 'no') {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === 'yes') {
    errormsg = 'New line at EOF(end of file) is required';
  }

  return errormsg !== '' ? [{
    message: errormsg,
    rule: rule,
    line: file.lines.length,
  }] : [];
};

module.exports = {
  name: rule,
  run: newLineAtEOF,
  isValidConfig: stringRuleValidation(availableConfigs),
};
