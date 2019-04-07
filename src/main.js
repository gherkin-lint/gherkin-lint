#!/usr/bin/env node
const program = require('commander');
const Linter = require('./linter/');
const FeaturesProvider = require('./features-provider.js');
const ConfigProvider = require('./config-provider.js');
const RulesProvider = require('./rules-provider');
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

const defaultIgnoreFileName = '.gherkin-lintignore';

program
  .usage('[options] <feature-files>')
  .option('-f, --format [format]', 'output format. Possible values: json, stylish. Defaults to stylish')
  .option('-i, --ignore <...>', `comma seperated list of files/glob patterns that the linter should ignore, overrides ${defaultIgnoreFileName} file`, list)
  .option('-c, --config [config]', `configuration file, defaults to ${ConfigProvider.defaultConfigFileName}`)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

const formatter = formatterFactory(program.format);
const noConfigurableFileLinter = new NoConfigurableLinter(parser);
const configurableFileLinter = new ConfigurableLinter(noConfigurableFileLinter);
const rulesProvider = new RulesProvider(program.rulesdir);
const rulesParser = new RulesParser(rulesProvider.provide());
const featuresProvider = new FeaturesProvider(
  program.args,
  program.ignore || defaultIgnoreFileName
);
const configProvider = new ConfigProvider(program.config);
const linter = new Linter(
  configProvider,
  rulesParser,
  featuresProvider,
  configurableFileLinter
);

const results = linter.lint();
const errorLines = formatter.format(results, program.format);
// eslint-disable-next-line no-console
errorLines.forEach((errorLine) => console.error(errorLine));
process.exit(results.length > 0 ? 1 : 0);
