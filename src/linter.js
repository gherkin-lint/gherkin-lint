const {Successes, Failures} = require('./successes-failures');
const sortByLine = (errors) => errors.sort((a, b) => {
  return a.line - b.line;
});

function Linter(fileLinter) {
  this.fileLinter = fileLinter;
}

Linter.prototype.lint = function(files, rules) {
  const output = [];

  files.forEach((file) => {
    const errors = this.fileLinter.lint(file, rules);
    if (errors.length > 0) {
      const fileBlob = {
        type: 'lint-failures',
        message: file.path,
        errors: sortByLine(errors),
      };
      output.push(fileBlob);
    }
  });

  return output.length > 0
    ? Failures.of(output)
    : Successes.of([]);
};

module.exports = Linter;
