#!/usr/bin/env node

var program = require('commander');
var linter = require('./linter.js');
var featureFinder = require('./feature-finder.js');
var configParser = require('./config-parser.js');

function list(val) {
  return val.split(',');
}

program
  .option('-f, --format [format]', 'output format. Defaults to stylish')
  .option('-i, --ignore <...>', 'comma seperated list of files/glob patterns that the linter should ignore, overrides ' + featureFinder.defaultIgnoreFileName + ' file', list)
  .option('-c, --config [config]', 'configuration file, defaults to ' + configParser.defaultConfigFileName)
  .parse(process.argv);

var files = featureFinder.getFeatureFiles(program.args, program.ignore);
var config = configParser.getConfiguration(program.config);
var results = linter.lint(files, config);
printResults(results, program.format);
process.exit(getExitCode(results));

function getExitCode(results) {
  var exitCode = 0;
  results.forEach(function(result) {
    if (result.errors.length > 0) {
      exitCode = 1;
    }
  });
  return exitCode;
}

function printResults(results, format) {
  var formatter;
  if (format === 'json') {
    formatter = require('./formatters/json.js');
  } else if (!format || format == 'stylish') {
    formatter = require('./formatters/stylish.js');
  } else {
    throw new Error('Unsupported format. The supported formats are json and stylish.');
  }
  formatter.printResults(results);
}
