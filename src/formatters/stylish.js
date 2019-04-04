/* eslint no-console: "off"*/
const {compose, intoArray} = require('../utils/generic');
const {filter, flatMap} = require('../utils/transducers');

const style = {
  gray: function(text) {
    return `\x1b[38;5;243m${text}\x1b[0m`;
  },

  underline: function(text) {
    return `\x1b[0;4m${text}\x1b[24m`;
  },

};

function stylizeError(error, maxErrorMsgLength, maxLineChars) {
  let str = '  '; // indent 2 spaces so it looks pretty
  const padding = '    '; // padding of 4 spaces, will be used between line numbers, error msgs and rule names

  console.log(error);
  let line = error.line ? error.line.toString() : '';
  console.log(line);

  // add spaces until the line string is as long as our longest line string
  while (line.length < maxLineChars) {
    line += ' ';
  }

  // print the line number as gray
  str += style.gray(line) + padding;
  console.log(str);

  let errorMsg = error.message;

  // add spaces until the message is as long as our longest error message
  while (errorMsg.length < maxErrorMsgLength) {
    errorMsg += ' ';
  }

  // print the error message in default color and add 2 spaces after it for readability
  str += errorMsg + padding;

  // print the rule name in gray
  str += style.gray(error.rule);
  console.log(str);
  // lastly, return our stylish-est string and pretend that this code was never written
  return str;
}

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function getMaxLengthOfField(results, field) {
  let length = 0;
  results.forEach(function(result) {
    result.errors
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


function format(results) {
  const maxErrorMsgLength = getMaxLengthOfField(results, 'message');
  const maxLineChars = getMaxLengthOfField(results, 'line');

  return intoArray(compose(
    filter((result) => result.errors.length > 0),
    flatMap((result) => [
      [stylizeFilePath(result.filePath)],
      result.errors.map((error) => stylizeError(error, maxErrorMsgLength, maxLineChars)),
      ['\n'],
    ]),
    flatMap((lines) => lines)
  ))(results);
}

module.exports = {
  format,
};
