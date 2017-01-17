var rule = 'no-trailing-spaces';

function noTrailingSpaces(unused, file) {
  var errors = [];
  var lineNo = 1;
  file.lines.forEach(function(line) {
    if (/[\t ]+$/.test(line)) {
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
