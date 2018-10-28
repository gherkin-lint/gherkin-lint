var assert = require('chai').assert;
var Gherkin = require('gherkin');
var fs = require('fs');
var _ = require('lodash');
require('mocha-sinon');

var parser = new Gherkin.Parser();

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
        var parsedFile = parser.parse(fs.readFileSync('test/rules/' + element, 'utf8')).feature;
        accumulatedErrors = accumulatedErrors.concat(rule.run(parsedFile, {name: element}, configuration));
      });
      assert.sameDeepMembers(accumulatedErrors, expectedErrors);
    } else {
      var parsedFile = parser.parse(fs.readFileSync('test/rules/' + featureFile, 'utf8')).feature;
      assert.sameDeepMembers(rule.run(parsedFile, {name: featureFile}, configuration), expectedErrors);
    }
  };
}

module.exports = {
  createRuleTest: createRuleTest
};
