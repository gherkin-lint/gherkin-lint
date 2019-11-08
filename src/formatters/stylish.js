/*eslint no-console: "off"*/
import 'core-js/stable/string';

var style = {
  gray: function(text) {
    return '\x1b[38;5;243m' + text + '\x1b[0m';
  },

  underline: function(text) {
    return '\x1b[0;4m' + text + '\x1b[24m';
  }

};

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function stylizeError(error, maxLineLength, maxMessageLength, addColors) {
  var indent = '  '; // indent 2 spaces so it looks pretty
  var padding = '    '; //padding of 4 spaces, will be used between line numbers, error msgs and rule names, for readability
  var errorLinePadded = error.line.toString().padEnd(maxLineLength);
  var errorLineStylized = addColors ? style.gray(errorLinePadded) : errorLinePadded;

  var errorRuleStylized = addColors ? style.gray(error.rule) : error.rule;
  return indent + errorLineStylized + padding + error.message.padEnd(maxMessageLength) + padding + errorRuleStylized;
}

function getMaxLineLength(result) {
  var length = 0;
  result.errors.forEach(function(error) {
    var errorStr = error.line.toString();
    if (errorStr.length > length) {
      length = errorStr.length;
    }
  });
  return length;
}

function getMaxMessageLength(result, maxLineLength, consoleWidth) {
  var length = 0;
  result.errors.forEach(function(error) {
    var errorStr = error.message.toString();

    // Get the length of the formatted error message when no extra padding is applied
    // If the formatted message is longer than the console width, we will ignore its length
    var expandedErrorStrLength = stylizeError(error, maxLineLength, 0, false).length;

    if (errorStr.length > length && expandedErrorStrLength < consoleWidth) {
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
      var maxLineLength = getMaxLineLength(result);
      var maxMessageLength = getMaxMessageLength(result, maxLineLength, consoleWidth);
      console.error(stylizeFilePath(result.filePath));

      result.errors.forEach(function(error) {
        console.error(stylizeError(error, maxLineLength, maxMessageLength, true));
      });
      console.error('\n');
    }
  });
}

module.exports = {
  printResults: printResults
};
