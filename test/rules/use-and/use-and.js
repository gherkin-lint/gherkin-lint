const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/use-and.js');
const runTest = ruleTestBase.createRuleTest(rule, 'Step "<%= keyword %> <%= text %>" should use And instead of <%= keyword %> ');

describe('No Unnamed Features Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('use-and/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('use-and/Violations.feature', {}, [{
      line: 9,
      messageElements: {keyword: 'Given', text: 'text3'},
    }, {
      line: 16,
      messageElements: {keyword: 'Then', text: 'text3'},
    }]);
  });
});
