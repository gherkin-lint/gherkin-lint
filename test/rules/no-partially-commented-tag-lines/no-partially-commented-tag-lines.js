var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-partially-commented-tag-lines.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Partially commented tag lines not allowed');

describe('No Partially Commented Tag Lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-partially-commented-tag-lines/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    runTest('no-partially-commented-tag-lines/Violations.feature', {}, [
      // TODO: fix features
      //{ messageElements: {}, line: 1 },
      { messageElements: {}, line: 7 },
      { messageElements: {}, line: 12 },
    ]);
  });
});
