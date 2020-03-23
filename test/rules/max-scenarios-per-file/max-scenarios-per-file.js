var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/max-scenarios-per-file.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Number of scenarios exceeds maximum: <%= variable %>/10');

describe('Max Scenarios per File rule', function () {
  it('doesn\'t raise errors when the default configuration is used and there are correct number of scenarios', function () {
    return runTest('max-scenarios-per-file/CorrectNumber.feature', { maxScenarios: 10 }, [])
      .then(() => {
        return runTest('max-scenarios-per-file/CorrectNumberExamples.feature', { maxScenarios: 10 }, []);
      })
      .then(() => {
        return runTest('max-scenarios-per-file/CorrectNumberMixed.feature', { maxScenarios: 10 }, []);
      });
  });

  it('detects errors for when a feature file has too many scenarios', function () {
    return runTest('max-scenarios-per-file/TooManyScenarios.feature', { maxScenarios: 10 }, [{ messageElements: { variable: 11 }, line: 0 }])
      .then(() => {
        return  runTest('max-scenarios-per-file/TooManyExamples.feature', { maxScenarios: 10 }, [{ messageElements: { variable: 11 }, line: 0 }]);
      });
  });
});
