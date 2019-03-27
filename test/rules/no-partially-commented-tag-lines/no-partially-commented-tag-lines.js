const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-partially-commented-tag-lines');
const runTest = ruleTestBase.createRuleTest(rule,
  () => 'Partially commented tag lines not allowed ');

describe('No partially commented tag lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-partially-commented-tag-lines/NoViolations.feature', {}, []);
  });

  it('detects errors there are multiple empty lines', function() {
    runTest('no-partially-commented-tag-lines/Violations.feature', {}, [{
      line: 6,
      messageElements: {},
    }, {
      line: 10,
      messageElements: {},
    }]);
  });
});
