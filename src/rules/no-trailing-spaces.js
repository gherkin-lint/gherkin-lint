var fs = require('fs');
var rule = 'no-trailing-spaces';

function noTrailingSpaces(parsedFile, fileName) {
  var errors = [];
  var lines = fs.readFileSync(fileName).toString().split('\n');
  var lineNo = 0;
  lines.forEach(function(line) {
    if (line.endsWith(' ')) {
      errors.push({message: 'Trailing spaces are not allowed',
                   rule   : rule,
                   line   : lineNo});
    }
    lineNo++;
  });
  return errors;
}

module.exports = {
  name: rule,
  run: noTrailingSpaces
};
