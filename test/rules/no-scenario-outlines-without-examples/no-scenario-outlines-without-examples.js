const ruleName = 'no-scenario-outlines-without-examples';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-scenario-outlines-without-examples.js');
const runTest = ruleTestBase.createRuleTest(rule,
  () => 'Scenario Outline does not have any Examples');

describe('No Scenario Outline Without Examples Rule', function() {
  it('doesn\'t raise errors when there are no forbidden tags', function() {
    runTest('no-scenario-outlines-without-examples/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines when there are forbidden tags', function() {
    runTest('no-scenario-outlines-without-examples/Violations.feature', {}, [{
      messageElements: {},
      rule: ruleName,
      line: 9,
    }]);
  });
});
