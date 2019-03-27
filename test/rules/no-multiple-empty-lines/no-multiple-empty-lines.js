const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-multiple-empty-lines');
const runTest = ruleTestBase.createRuleTest(rule,
  () => 'Multiple empty lines are not allowed');

describe('No multiple empty lines', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-multiple-empty-lines/NoViolations.feature', {}, []);
  });

  it('detects errors there are multiple empty lines', function() {
    runTest('no-multiple-empty-lines/Violations.feature', {}, [{
      line: 2,
      messageElements: {},
    }, {
      line: 9,
      messageElements: {},
    }, {
      line: 10,
      messageElements: {},
    }, {
      line: 22,
      messageElements: {},
    }]);
  });
});
