#!/usr/bin/env node

const program = require('commander');
const Linter = require('./linter.js');
const featureFinder = require('./feature-finder.js');
const ConfigProvider = require('./config-provider.js');
const logger = require('./logger.js');
const getRules = require('./get-rules');
const RulesParser = require('./rules-parser');

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
  .option('-i, --ignore <...>', `comma seperated list of files/glob patterns that the linter should ignore, overrides ${ featureFinder.defaultIgnoreFileName } file`, list)
  .option('-c, --config [config]', `configuration file, defaults to ${ ConfigProvider.defaultConfigFileName}`)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

const additionalRulesDirs = program.rulesdir;
const config = new ConfigProvider(program.config).provide();
const result = new RulesParser(getRules(additionalRulesDirs), config).parse();
const files = featureFinder.getFeatureFiles(program.args, program.ignore);
let results;
if (result.isSuccess()) {
  const rules = result.getSuccesses();
  results = new Linter(rules).lint(files);
} else {
  results = result.getFailures();
}
printResults(results, program.format);
process.exit(getExitCode(results));

function getExitCode(results) {
  let exitCode = 0;
  results.forEach(function(result) {
    if (result.errors.length > 0) {
      exitCode = 1;
    }
  });
  return exitCode;
}

function printResults(results, format) {
  let formatter;
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
