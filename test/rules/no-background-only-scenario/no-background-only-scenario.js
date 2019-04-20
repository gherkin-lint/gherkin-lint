const ruleName = 'no-background-only-scenario';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-background-only-scenario.js');
const runTest = ruleTestBase.createRuleTest(rule,
  () => 'Backgrounds are not allowed when there is just one scenario.');

describe('No Background Only Scenario Rule', function() {
  it('doesn\'t raise errors when there are no background', function() {
    runTest('no-background-only-scenario/NoBackground.feature', {}, []);
  });

  it('doesn\'t raise errors when there are more than one scenario', function() {
    runTest('no-background-only-scenario/NoViolationsTwoScenarios.feature', {}, []);
  });

  it('doesn\'t raise errors when there are zero scenarios', function() {
    runTest('no-background-only-scenario/NoViolationsZeroScenarios.feature', {}, []);
  });

  it('detects errors when there are violations with Scenario', function() {
    runTest('no-background-only-scenario/ViolationsScenario.feature', {}, [{
      line: 4,
      rule: ruleName,
      messageElements: {},
    }]);
  });

  it('detects errors when there are violations with Scenario Outline', function() {
    runTest('no-background-only-scenario/ViolationsOutline.feature', {}, [{
      line: 3,
      rule: ruleName,
      messageElements: {},
    }]);
  });
});
