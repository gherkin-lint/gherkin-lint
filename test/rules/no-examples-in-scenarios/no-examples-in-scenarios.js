var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-examples-in-scenarios.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead');

describe('No Examples in Scenarios', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-examples-in-scenarios/NoViolations.feature', {}, []);
  });

  it('detects errors when an scenario has examples', function() {
    return runTest('no-examples-in-scenarios/Violations.feature', {}, [{
      line: 6,
      column: 1,
    }]);
  });
});
