#!/usr/bin/env node

const program = require('commander');
const linter = require('./linter.js');
const featureFinder = require('./feature-finder.js');
const configParser = require('./config-parser.js');
const { handleResults } = require('./results-handler.js');

function list(val) {
  return val.split(',');
}

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .usage('[options] <feature-files>')
  .option('-f, --format [format]', 'output format. Possible values: json, stylish, xunit. Defaults to stylish')
  .option('-i, --ignore <...>', 'comma seperated list of files/glob patterns that the linter should ignore, overrides ' + featureFinder.defaultIgnoreFileName + ' file', list)
  .option('-c, --config [config]', 'configuration file, defaults to ' + configParser.defaultConfigFileName)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .option('-r, --max-errors [number]', 'maximum number of errors to pass. Defaults to 0', 0)
  .parse(process.argv);

const additionalRulesDirs = program.rulesdir;
const files = featureFinder.getFeatureFiles(program.args, program.ignore);
const config = configParser.getConfiguration(program.config, additionalRulesDirs);
linter.lint(files, config, additionalRulesDirs)
  .then((results) => {
    handleResults(results, program);
  });
