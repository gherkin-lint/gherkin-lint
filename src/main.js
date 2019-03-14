#!/usr/bin/env node

var program = require('commander');
var Linter = require('./linter.js');
var featureFinder = require('./feature-finder.js');
var ConfigProvider = require('./config-provider.js');
var logger = require('./logger.js');
var getRules = require('./get-rules');
var RulesParser = require('./rules-parser');
var RulesManager = require('./rules-manager');

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
  .option('-c, --config [config]', 'configuration file, defaults to ' + ConfigProvider.defaultConfigFileName)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

var additionalRulesDirs = program.rulesdir;
var config = ConfigProvider(program.config).provide();
var rulesOrErrors = new RulesParser(getRules(additionalRulesDirs), config).parse();
var rulesManager = new RulesManager(rulesOrErrors);
var linter = new Linter(rulesManager);
var files = featureFinder.getFeatureFiles(program.args, program.ignore);
var results = linter.lint(files);
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
