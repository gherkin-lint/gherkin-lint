const {Successes, Failures} = require('../successes-failures');
const sortByLine = (errors) => errors.sort((a, b) => {
  return a.line - b.line;
});

const lintFiles = (files, rules, fileLinter) => {
  const output = [];

  files.forEach((file) => {
    const errors = fileLinter.lint(file, rules);
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

class Linter {
  constructor(configProvider, rulesParser, featureFinder, fileLinter) {
    this.configProvider = configProvider;
    this.rulesParser = rulesParser;
    this.featureFinder = featureFinder;
    this.fileLinter = fileLinter;
  }

  lint() {
    const result = this.configProvider.provide()
      .chain((config) => this.rulesParser.parse(config))
      .chain((rules) => {
        return this.featureFinder.provide()
          .chain((files) => lintFiles(files, rules, this.fileLinter));
      });
    return result;
  }
}

module.exports = Linter;
