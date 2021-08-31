var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-multiple-empty-lines.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Multiple empty lines are not allowed');

describe('No Multiple Empty Lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-multiple-empty-lines/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-multiple-empty-lines/Violations.feature', {}, [
      { messageElements: {}, line: 2, column: 0 },
      { messageElements: {}, line: 6, column: 0 },
      { messageElements: {}, line: 7, column: 0 },
      { messageElements: {}, line: 8, column: 0 },
      { messageElements: {}, line: 12, column: 0 },
      { messageElements: {}, line: 17, column: 0 },
      { messageElements: {}, line: 25, column: 0 },
    ]);
  });
});
