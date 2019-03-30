const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/max-scenarios-per-file.js');
const runTest = ruleTestBase.createRuleTest(rule, ({variable}) =>
  `Number of scenarios exceeds maximum: ${variable}/10`);

describe('Max Scenarios per File rule', function() {
  it('detects an error when property is not "maxScenarios"', function() {
    runTest('max-scenarios-per-file/CorrectNumber.feature', {
      'foobar': 20,
    }, [{
      type: 'config',
      message: 'The rule does not have the specified configuration option "foobar"',
    }]);
  });

  it('doesn\'t raise errors when the default configuration is used and there are correct number of scenarios', function() {
    runTest('max-scenarios-per-file/CorrectNumber.feature', {maxScenarios: 10}, []);
    runTest('max-scenarios-per-file/CorrectNumberExamples.feature', {maxScenarios: 10}, []);
    runTest('max-scenarios-per-file/CorrectNumberMixed.feature', {maxScenarios: 10}, []);
  });

  context('Too many scenarios', () => {
    it('detects errors when a feature file has too many scenarios', function() {
      runTest('max-scenarios-per-file/TooManyScenarios.feature', {
        maxScenarios: 10,
      }, [{
        messageElements: {
          variable: 11,
        },
        line: 0,
      }]);
    });
  });

  context('Too many examples on Scenario Outline', () => {
    it('detects errors when a feature file has too many scenarios', function() {
      runTest('max-scenarios-per-file/TooManyExamples.feature', {
        maxScenarios: 10,
      }, [{
        messageElements: {
          variable: 11,
        },
        line: 0,
      }]);
    });
  });
});
