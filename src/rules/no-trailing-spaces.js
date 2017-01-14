var rule = 'no-trailing-spaces';

function noTrailingSpaces(parsedFile, file) {
  var errors = [];
  var lines = file.content.split('\n');
  var lineNo = 1;
  lines.forEach(function(line) {
    if (/[\t ]+[\n\r]*$/.test(line)) {
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
