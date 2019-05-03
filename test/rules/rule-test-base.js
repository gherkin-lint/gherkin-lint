var assert = require('chai').assert;
var _ = require('lodash');
var linter = require('../../dist/linter.js');
require('mocha-sinon');

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    var expectedErrors = _.map(expected, function(error) {
      return {
        rule: rule.name,
        message: _.template(messageTemplate)(error.messageElements),
        line: error.line
      };
    });
    if(Array.isArray(featureFile)) {
      let accumulatedErrors = [];
      featureFile.forEach(element => {
        const {feature, file} = linter.readAndParseFile('test/rules/' + element, 'utf8');
        accumulatedErrors = assert.sameDeepMembers(rule.run(feature, file, configuration), expectedErrors);
      });
      assert.sameDeepMembers(accumulatedErrors, expectedErrors);
    } else {
      const {feature, file} = linter.readAndParseFile('test/rules/' + featureFile, 'utf8');
      assert.sameDeepMembers(rule.run(feature, file, configuration), expectedErrors);
    }
  };
}

module.exports = {
  createRuleTest: createRuleTest
};
