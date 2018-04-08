#!/usr/bin/env node

var program = require('commander');
var linter = require('./linter.js');
var featureFinder = require('./feature-finder.js');
var configParser = require('./config-parser.js');
var logger = require('./logger.js');

function list(val) {
  return val.split(',');
}

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .usage('[options] <feature-files>')
  .option('-f, --format [format]', 'output format. Possible values: json, stylish. Defaults to stylish')
  .option('-i, --ignore <...>', 'comma seperated list of files/glob patterns that the linter should ignore, overrides ' + featureFinder.defaultIgnoreFileName + ' file', list)
  .option('-c, --config [config]', 'configuration file, defaults to ' + configParser.defaultConfigFileName)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

var additionalRulesDirs = program.rulesdir;
var files = featureFinder.getFeatureFiles(program.args, program.ignore);
var config = configParser.getConfiguration(program.config, additionalRulesDirs);
var results = linter.lint(files, config, additionalRulesDirs);
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
    logger.boldError('Unsupported format. The supported formats are json and stylish.');
    process.exit(1);
  }
  formatter.printResults(results);
}
