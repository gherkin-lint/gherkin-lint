const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-unnamed-features.js');
const runTest = ruleTestBase.createRuleTest(rule, 'Missing Feature name');

describe('No Unnamed Features Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-unnamed-features/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-unnamed-features/Violations.feature', {}, [{
      line: 3,
      messageElements: {},
    }]);
  });
});
