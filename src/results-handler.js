const logger = require('./logger.js');
const { countErrors } = require('./count-errors.js');

function handleResults(results, options) {
  printResults(results, options.format);
  process.exit(getExitCode(results, options.maxErrors));
}

function getExitCode(results, maxErrors) {
  let exitCode = 0;
  const numberOfErrors = countErrors(results);

  if (numberOfErrors > maxErrors) {
    exitCode = 1;
  }
  return exitCode;
}

function printResults(results, format) {
  let formatter;
  if (format === 'json') {
    formatter = require('./formatters/json.js');
  } else if (format === 'xunit') {
    formatter = require('./formatters/xunit.js');
  } else if (!format || format === 'stylish') {
    formatter = require('./formatters/stylish.js');
  } else {
    logger.boldError('Unsupported format. The supported formats are json, xunit and stylish.');
    process.exit(1);
  }
  formatter.printResults(results);
}


module.exports = { handleResults };
