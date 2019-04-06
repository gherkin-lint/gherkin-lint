const ruleName = 'no-trailing-spaces';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-trailing-spaces.js');
const runTest = ruleTestBase.createRuleTest(rule, () =>
  'Trailing spaces are not allowed');

describe('No Trailing Spaces Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-trailing-spaces/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-trailing-spaces/Violations.feature', {}, [{
      line: 3,
      rule: ruleName,
      messageElements: {},
    }, {
      line: 12,
      rule: ruleName,
      messageElements: {},
    }, {
      line: 14,
      rule: ruleName,
      messageElements: {},
    }]);
  });
});
