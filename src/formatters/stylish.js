var style = {
  red: function(text) {
    return "\033[0;31m" + text + "\033[0m";
  },

  gray: function(text) {
    return "\033[0;33m" + text + "\033[0m";
  },

  underline: function(text) {
    return "\033[0;4m" + text + "\033[24m";
  }

};

function stylizeError(error) {
  var str = "  "; // indent 2 spaces so it looks pretty

  // now print the line number as gray
  str += style.gray(error.line);

  // now append spaces until the string is 20 characters long
  while (str.length < 20) {
    str += ' ';
  }

  // now print the error message in default color and add 2 spaces for readability
  str += error.message + '  ';

  // now add spaces until we have 92 characters which is an arbitrary number I thought sounded reasonable
  while (str.length < 92) {
    str += ' ';
  }

  // now print the rule name in gray
  str += style.gray(error.rule);

  return str; // lastly, return our stylish-est string and pretend that this code was never written
}

function stylizeFilePath(filePath) {
  return style.underline(filePath);
}

function printResults(results) {
  results.forEach(function(result) {
    if (result.errors.length > 0) {
      console.log(stylizeFilePath(result.filePath));

      result.errors.forEach(function(error) {
        console.log(stylizeError(error));
      });
    }
  });
}

module.exports = {
  printResults: printResults
};
