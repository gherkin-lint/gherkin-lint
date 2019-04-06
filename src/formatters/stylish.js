const {compose, intoArray} = require('../utils/generic');
const {flatMap} = require('../utils/transducers');
const style = require('./style');

const stylizeConfigError = ({errors = [], message}) => {
  return [
    [style.boldError(message)],
    errors.map(({rule, message, type}) => {
      const wrongConfigMessage = type === 'config-rule-error'
        ? `Invalid rule configuration for "${rule}" - `
        : '';
      return style.error(`- ${wrongConfigMessage}${message}`);
    }),
  ];
};

const stylizeRuleErrorWith = (maxErrorMsgLength, maxLineChars) => (error) => {
  let str = '  '; // indent 2 spaces so it looks pretty
  const padding = '    '; // padding of 4 spaces, will be used between line numbers, error msgs and rule names

  let line = error.line ? error.line.toString() : '';

  // add spaces until the line string is as long as our longest line string
  while (line.length < maxLineChars) {
    line += ' ';
  }

  // print the line number as gray
  str += style.gray(line) + padding;

  let errorMsg = error.message;

  // add spaces until the message is as long as our longest error message
  while (errorMsg.length < maxErrorMsgLength) {
    errorMsg += ' ';
  }

  // print the error message in default color and add 2 spaces after it for readability
  str += errorMsg + padding;

  // print the rule name in gray
  str += style.gray(error.rule);
  // lastly, return our stylish-est string and pretend that this code was never written
  return str;
};

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function getMaxLengthOfField(results, field) {
  let length = 0;
  results.forEach(function({errors = []}) {
    errors
      .filter((error) => error[field])
      .forEach(function(error) {
        const errorStr = error[field].toString();
        if (errorStr.length > length) {
          length = errorStr.length;
        }
      });
  });
  return length;
}

const stylizeResult = (result, stylizeRuleError) => {
  const {errors = []} = result;
  if (result.type === 'lint-failures') {
    return [
      [stylizeFilePath(result.message)],
      errors.map(stylizeRuleError),
      ['\n'],
    ];
  }
  return stylizeConfigError(result);
};

function format(results) {
  const maxErrorMsgLength = getMaxLengthOfField(results, 'message');
  const maxLineChars = getMaxLengthOfField(results, 'line');
  const stylizeRuleError = stylizeRuleErrorWith(maxErrorMsgLength, maxLineChars);

  return intoArray(compose(
    flatMap((result) => stylizeResult(result, stylizeRuleError)),
    flatMap((lines) => lines)
  ))(results);
}

module.exports = {
  format,
};
