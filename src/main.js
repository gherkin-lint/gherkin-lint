#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const linterFactory = require('./linter/factory');
const defaults = require('./defaults');

const list = (val) => {
  return val.split(',');
};

const collect = (val, memo) => {
  memo.push(val);
  return memo;
};

const defaultRulesDir = 'rules';

program
  .usage('[options] <feature-files>')
  .option('-f, --format [format]', 'output format. Possible values: json, stylish. Defaults to stylish')
  .option('-i, --ignore <...>', `comma seperated list of files/glob patterns that the linter should ignore, overrides ${defaults.ignore} file`, list)
  .option('-c, --config [config]', `configuration file, defaults to ${defaults.config}`)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .parse(process.argv);

const linter = linterFactory({
  format: program.format,
  ignore: program.ignore,
  config: program.config,
  rulesDirs: [path.resolve(__dirname, defaultRulesDir)].concat(program.rulesdir || []),
  args: program.args,
});
const {
  logType,
  errorLines,
  exit,
} = linter.lint();

// eslint-disable-next-line no-console
errorLines.forEach((errorLine) => console[logType](errorLine));

process.exit(exit);
