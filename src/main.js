#!/usr/bin/env node
const program = require('commander');
const Linter = require('./linter.js');
const featureFinder = require('./feature-finder.js');
const ConfigProvider = require('./config-provider.js');
const getRules = require('./get-rules');
const RulesParser = require('./rules-parser');
const formatterFactory = require('./formatters/formatter-factory');
const NoConfigurableLinter = require('./linter/no-configurable-linter');
const ConfigurableLinter = require('./linter/configurable-linter');
const Gherkin = require('gherkin');
const parser = new Gherkin.Parser();

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
  .option('-i, --ignore <...>', `comma seperated list of files/glob patterns that the linter should ignore, overrides ${featureFinder.defaultIgnoreFileName} file`, list)
  .option('-c, --config [config]', `configuration file, defaults to ${ ConfigProvider.defaultConfigFileName}`)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

const formatter = formatterFactory(program.format);
const noConfigurableFileLinter = new NoConfigurableLinter(parser);
const configurableFileLinter = new ConfigurableLinter(noConfigurableFileLinter);
const linter = new Linter(configurableFileLinter);
const rawRules = getRules(program.rulesdir);
const rulesParser = new RulesParser(rawRules);
let results;
const result = new ConfigProvider(program.config).provide()
  .chain((config) => rulesParser.parse(config))
  .chain((rules) => {
    return featureFinder.getFeatureFiles(program.args, program.ignore)
      .chain((files) => linter.lint(files, rules));
  });
if (result.isSuccess()) {
  results = result.getSuccesses();
} else {
  results = result.getFailures();
}
const errorLines = formatter.format(results, program.format);
// eslint-disable-next-line no-console
errorLines.forEach((errorLine) => console.error(errorLine));
process.exit(getExitCode(results));

function getExitCode(results) {
  let exitCode = 0;
  results.forEach(({errors = []}) => {
    if (errors.length > 0) {
      exitCode = 1;
    }
  });
  return exitCode;
}
