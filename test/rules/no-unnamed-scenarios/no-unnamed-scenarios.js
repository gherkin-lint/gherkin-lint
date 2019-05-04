var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-unnamed-scenarios.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Missing Scenario name');

describe('No Unnamed Scenarios Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-unnamed-scenarios/NoViolations.feature', {}, []);
  });
  
  it('doesn\'t raise errors for a feature with no scenarios', function() {
    runTest('no-unnamed-scenarios/FeatureWithNoScenarios.feature', {}, []);
  });

  it('detects errors for scenarios with no names', function() {
    // TODO: make rule detect issues in scenario outlines too
    runTest('no-unnamed-scenarios/Violations.feature', {}, [
      {
        messageElements: {},
        line: 3
      }
    ]);
  });
});
