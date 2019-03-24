const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-background-only-scenario.js');
const runTest = ruleTestBase.createRuleTest(rule,
  'Backgrounds are not allowed when there is just one scenario.');

describe('No empty Backgrounds Rule', function() {
  it('doesn\'t raise errors when there are no background', function() {
    runTest('no-background-only-scenario/NoBackground.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-background-only-scenario/NoViolations.feature', {}, []);
  });

  it('detects errors when there are violations with Scenario', function() {
    runTest('no-background-only-scenario/ViolationsScenario.feature', {}, [{
      line: 4,
      messageElements: {},
    }]);
  });

  it('detects errors when there are violations with Scenario Outline', function() {
    runTest('no-background-only-scenario/ViolationsOutline.feature', {}, [{
      line: 4,
      messageElements: {},
    }]);
  });
});
