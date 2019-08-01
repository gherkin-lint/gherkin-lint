/*eslint no-console: "off"*/

var style = {
  gray: function(text) {
    return '\x1b[38;5;243m' + text + '\x1b[0m';
  },

  underline: function(text) {
    return '\x1b[0;4m' + text + '\x1b[24m';
  }

};

function stylizeError(error, maxErrorMsgLength, maxLineChars, consoleWidth) {
  var str = '  '; // indent 2 spaces so it looks pretty
  var padding = '    '; //padding of 4 spaces, will be used between line numbers, error msgs and rule names

  var line = error.line.toString();
  // add spaces until the line string is as long as our longest line string
  while (line.length < maxLineChars) {
    line += ' ';
  }

  // print the line number as gray
  // print the error message in default color and add at least 2 spaces after it for readability
  str += style.gray(line) + padding + error.message + padding;

  var extraSpaces = Math.min(maxErrorMsgLength - error.message.length, consoleWidth - str.length - error.rule.length);
  if (extraSpaces > 0) {
    str +=  ' '.repeat(extraSpaces);
  }

  // print the rule name in gray
  str += style.gray(error.rule);

  return str; // lastly, return our stylish-est string and pretend that this code was never written
}

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function getMaxLengthOfField(result, field) {
  var length = 0;
  result.errors.forEach(function(error) {
    var errorStr = error[field].toString();
    if (errorStr.length > length) {
      length = errorStr.length;
    }
  });
  return length;
}


function printResults(results) {
  // If the console is tty, get its width and use it to ensure we don't try to write messages longer 
  // than the console width when possible
  var consoleWidth = Infinity;
  if (process.stdout.isTTY) {
    consoleWidth = process.stdout.columns;
  }

  results.forEach(function(result) {
    if (result.errors.length > 0) {
      var maxErrorMsgLength = getMaxLengthOfField(result, 'message');
      var maxLineChars = getMaxLengthOfField(result, 'line');
      console.error(stylizeFilePath(result.filePath));

      result.errors.forEach(function(error) {
        console.error(stylizeError(error, maxErrorMsgLength, maxLineChars, consoleWidth));
      });
      console.error('\n');
    }
  });
}

module.exports = {
  printResults: printResults
};
