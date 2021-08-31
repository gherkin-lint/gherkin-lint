var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-background-only-scenario.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Backgrounds are not allowed when there is just one scenario.');

describe('No empty Backgrounds Rule', function() {
  it('doesn\'t raise errors when there are no background', function() {
    return runTest('no-background-only-scenario/NoBackground.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-background-only-scenario/NoViolations.feature', {}, []);
  });

  it('detects errors when there are violations with Scenario', function() {
    return runTest('no-background-only-scenario/ViolationsScenario.feature', {}, [ {
      line: 4,
      column: 1,
      messageElements: {}
    }]);
  });

  it('detects errors when there are violations with Scenario Outline', function() {
    return runTest('no-background-only-scenario/ViolationsOutline.feature', {}, [ {
      line: 4,
      column: 1,
      messageElements: {}
    }]);
  });
});
