const fs = require('fs');
const Gherkin = require('gherkin');
const parser = new Gherkin.Parser();
const NoConfigurableLinter = require('./linter/no-configurable-linter');
const ConfigurableLinter = require('./linter/configurable-linter');
const sortByLine = (errors) => errors.sort((a, b) => {
  return a.line - b.line;
});

function Linter(rules) {
  this.rules = rules;
}

Linter.prototype.lint = function(files) {
  const output = [];
  const noConfigurableLinter = new NoConfigurableLinter(parser);
  const configurableLinter = new ConfigurableLinter(noConfigurableLinter, this.rules);

  files.forEach(function(fileName) {
    const content = fs.readFileSync(fileName, 'utf-8');
    const file = {
      content,
      name: fileName,
      lines: content.split(/\r\n|\r|\n/),
    };

    const errors = configurableLinter.lint(file);
    if (errors.length > 0) {
      const fileBlob = {
        type: 'lint-failures',
        message: fs.realpathSync(fileName),
        errors: sortByLine(errors),
      };
      output.push(fileBlob);
    }
  });

  return output;
};

module.exports = Linter;
