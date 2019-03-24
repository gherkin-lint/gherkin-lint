const rule = 'no-multiple-empty-lines';

const isEmptyLine = (line) => line !== undefined ? line.trim() === '' : false;
const isMultipleEmptyLines =
  ([lines, index]) => isEmptyLine(lines[index]) && isEmptyLine(lines[index + 1]);

const createError = ([lines, index]) => ({
  message: 'Multiple empty lines are not allowed',
  rule: rule,
  line: index + 2,
});

const noMulitpleEmptyLines = (unused, file) => {
  const {lines} = file;
  return lines.map((unused, index) => [lines, index])
    .filter(isMultipleEmptyLines)
    .map(createError);
};

module.exports = {
  name: rule,
  run: noMulitpleEmptyLines,
  isValidConfig: () => true,
};
