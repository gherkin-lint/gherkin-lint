var rule = 'no-multiple-empty-lines';

function noMulitpleEmptyLines(unused, file) {
  var errors = [];
  for (var i = 0; i < file.lines.length - 1; i++) {
    if (file.lines[i].trim() === '' && file.lines[i + 1].trim() == '') {
      errors.push({message: 'Multiple empty lines are not allowed',
        rule   : rule,
        line   : i + 2});
    }
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noMulitpleEmptyLines
};
