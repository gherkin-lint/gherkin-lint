const rule = 'no-trailing-spaces';

const createError = ([, lineNo]) => ({
  message: 'Trailing spaces are not allowed',
  rule: rule,
  line: lineNo,
});

const noTrailingSpaces = (unused, file) => {
  return file.lines.map((line, index) => [line, index + 1])
    .filter(([line, lineNo]) => /[\t ]+$/.test(line))
    .map(createError);
};

module.exports = {
  name: rule,
  run: noTrailingSpaces,
  isValidConfig: () => true,
};
