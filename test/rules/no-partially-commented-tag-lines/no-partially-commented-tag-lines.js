var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-partially-commented-tag-lines.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Partially commented tag lines not allowed');

describe('No Partially Commented Tag Lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-partially-commented-tag-lines/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-partially-commented-tag-lines/Violations.feature', {}, [
      { messageElements: {}, line: 1, column: 1 },
      { messageElements: {}, line: 7, column: 1 },
      { messageElements: {}, line: 12, column: 1 },
      { messageElements: {}, line: 15, column: 3 },
    ]);
  });
});
