const Gherkin = require('gherkin');
const parser = new Gherkin.Parser();
const NoConfigurableLinter = require('./linter/no-configurable-linter');
const ConfigurableLinter = require('./linter/configurable-linter');
const {Successes, Failures} = require('./successes-failures');
const sortByLine = (errors) => errors.sort((a, b) => {
  return a.line - b.line;
});

function Linter() {
}

Linter.prototype.lint = function(files, rules) {
  const output = [];
  const noConfigurableLinter = new NoConfigurableLinter(parser);
  const configurableLinter = new ConfigurableLinter(noConfigurableLinter);

  files.forEach(function(file) {
    const errors = configurableLinter.lint(file, rules);
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
