var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-multiple-empty-lines.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Multiple empty lines are not allowed');

describe('No Multiple Empty Lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-multiple-empty-lines/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    runTest('no-multiple-empty-lines/Violations.feature', {}, [
      { messageElements: {}, line: 2 },
      { messageElements: {}, line: 6 },
      { messageElements: {}, line: 7 },
      { messageElements: {}, line: 8 },
      { messageElements: {}, line: 12 },
      { messageElements: {}, line: 17 },
      { messageElements: {}, line: 25 },
    ]);
  });
});
