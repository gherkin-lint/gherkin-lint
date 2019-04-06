const ruleName = 'no-files-without-scenarios';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-files-without-scenarios.js');
const runTest = ruleTestBase.createRuleTest(rule,
  () => 'Feature file does not have any Scenarios');

describe('No files without scenarios Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-files-without-scenarios/NoViolations.feature', {}, []);
  });

  it('detects errors when there are not scenarios', function() {
    runTest('no-files-without-scenarios/Violations.feature', {}, [{
      line: 1,
      rule: ruleName,
      messageElements: {},
    }]);
  });
});
