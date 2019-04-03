const assert = require('chai').assert;
const Gherkin = require('gherkin');
const fs = require('fs');
const RulesParser = require('../../src/rules-parser');
const NoConfigurableLinter = require('../../src/linter/no-configurable-linter');
const ConfigurableLinter = require('../../src/linter/configurable-linter');
require('mocha-sinon');

const lintFile = (rule, config, file) => {
  const parser = new Gherkin.Parser();
  const noConfigurableLinter = new NoConfigurableLinter(parser);
  const ruleName = rule.name;
  const rawRules = {};
  const configSet = {};
  rawRules[ruleName] = rule;
  configSet[ruleName] = ['on', config];
  const result = new RulesParser(rawRules, configSet).parse();
  if (result.isSuccess()) {
    const rules = result.getSuccesses();
    return new ConfigurableLinter(noConfigurableLinter, rules).lint(file);
  }
  return result.getFailures();
};

const createFile = (fileName) => {
  const path = `test/rules/${fileName}`;
  const content = fs.readFileSync(path, 'utf-8');
  return {
    name: path,
    content,
    lines: content.split(/\r\n|\r|\n/),
  };
};

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    const expectedErrors = expected.map((error) => {
      return Object.assign({
        type: error.type || 'rule',
        rule: rule.name,
        message: error.message || messageTemplate(error.messageElements),
      }, error.line !== undefined ? {line: error.line} : {});
    });
    const file = createFile(featureFile);
    const errors = lintFile(rule, configuration, file);
    assert.sameDeepMembers(errors, expectedErrors);
  };
}

module.exports = {
  createRuleTest: createRuleTest,
};
