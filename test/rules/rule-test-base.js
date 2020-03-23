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
    return linter.readAndParseFile('test/rules/' + featureFile, 'utf8')
      .then(({feature, fileName}) => {
        assert.sameDeepMembers(rule.run(feature, fileName, configuration), expectedErrors);
      });
  };
}

module.exports = {
  createRuleTest: createRuleTest
};
