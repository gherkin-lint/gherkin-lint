const gherkinUtils = require('./utils/gherkin.js');
const rule = 'no-empty-lines-after-examples';

function run(unused, file) {
  let errors = [];

  for (let i = 0; i < file.lines.length - 1; i++) {
    const exampleKeyword = gherkinUtils.getInsitiveKeyword('examples', unused.language);

    if (file.lines[i].includes(exampleKeyword) && file.lines[i + 1].trim() === '') {
      errors.push({
        message: 'Empty lines after Examples are not allowed',
        rule: rule,
        line: i + 1
      });
    }
  }
  return errors;
}

module.exports = {
  name: rule,
  run: run
};
