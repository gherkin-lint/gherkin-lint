var assert = require('chai').assert;
var Gherkin = require('gherkin');
var fs = require('fs');
var _ = require('lodash');
var RulesParser = require('../../src/rules-parser');
require('mocha-sinon');

var parser = new Gherkin.Parser();

var parseRule = function(rule, config) {
  var ruleName = rule.name;
  var rawRules = {};
  var configSet = {};
  rawRules[ruleName] = rule;
  configSet[ruleName] = ['on', config];
  return new RulesParser(rawRules, configSet).parse();
};

var runRule = function(result, parsedFile) {
  var rule = result.rules[0];
  return rule.run(parsedFile, undefined, rule.config);
};

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    var expectedErrors = _.map(expected, function(error) {
      if (typeof error === 'string') {
        return error;
      }
      return {
        rule: rule.name,
        message: _.template(messageTemplate)(error.messageElements),
        line: error.line
      };
    });
    var result = parseRule(rule, configuration);
    var parsedFile = parser.parse(fs.readFileSync('test/rules/' + featureFile, 'utf8')).feature;
    var errors = result.errors.length > 0
      ? result.errors
      : runRule(result, parsedFile);
    assert.sameDeepMembers(errors, expectedErrors);
  };
}

module.exports = {
  createRuleTest: createRuleTest
};
