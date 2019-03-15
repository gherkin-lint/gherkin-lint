const assert = require('chai').assert;
const Gherkin = require('gherkin');
const fs = require('fs');
const _ = require('lodash');
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

const runRule = function(result, parsedFile) {
  const rule = result.rules[0];
  return rule.run(parsedFile, undefined, rule.config);
};

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    const expectedErrors = _.map(expected, function(error) {
      if (typeof error === 'string') {
        return error;
      }
      return {
        rule: rule.name,
        message: _.template(messageTemplate)(error.messageElements),
        line: error.line,
      };
    });
    const result = parseRule(rule, configuration);
    const parsedFile = parser.parse(fs.readFileSync(`test/rules/${ featureFile}`, 'utf8')).feature;
    const errors = result.errors.length > 0
      ? result.errors
      : runRule(result, parsedFile);
    assert.sameDeepMembers(errors, expectedErrors);
  };
}

module.exports = {
  createRuleTest: createRuleTest,
};
