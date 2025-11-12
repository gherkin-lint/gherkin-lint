/*eslint no-console: "off"*/

function printResults(results) {
  results.forEach(result => {
    const rel = require('path').relative(process.cwd(), result.filePath);
    console.error(`::group::${rel}`);
    result.errors.forEach(error => {
      console.error(`::error file=${rel},line=${error.line},title=Gherkin syntax check::[${error.rule}] ${error.message}`);
    });
    console.error('::endgroup::');
  });
}

module.exports = {
  printResults: printResults
};
