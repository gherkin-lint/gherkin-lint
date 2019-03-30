const assert = require('chai').assert;
const Gherkin = require('gherkin');
const fs = require('fs');
const RulesParser = require('../../src/rules-parser');
require('mocha-sinon');

const parser = new Gherkin.Parser();

const parseRule = function(rule, config) {
  const ruleName = rule.name;
  const rawRules = {};
  const configSet = {};
  rawRules[ruleName] = rule;
  configSet[ruleName] = ['on', config];
  return new RulesParser(rawRules, configSet).parse();
};

const runRule = function(result, parsedFile, file) {
  const rule = result.getSuccesses()[0];
  return rule.run(parsedFile, file, rule.config);
};

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    const expectedErrors = expected.map((error) => {
      if (typeof error === 'string') {
        return error;
      }
      return Object.assign({
        type: error.type || 'rule',
        rule: rule.name,
        message: error.message || messageTemplate(error.messageElements),
      }, error.line !== undefined ? {line: error.line} : {});
    });
    const result = parseRule(rule, configuration);
    const name = `test/rules/${featureFile}`;
    const content = fs.readFileSync(name, 'utf8');
    const lines = content.split(/\r\n|\r|\n/);
    const parsedFile = parser.parse(content).feature || {};
    const errors = result.isSuccess()
      ? runRule(result, parsedFile, {name, lines})
      : result.getFailures();
    assert.sameDeepMembers(errors, expectedErrors);
  };
}

module.exports = {
  createRuleTest: createRuleTest,
};
