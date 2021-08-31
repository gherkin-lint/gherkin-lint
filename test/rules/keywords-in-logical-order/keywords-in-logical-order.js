var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/keywords-in-logical-order.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Step "<%= keyword %> <%= text %>" should not appear after step using keyword <%= priorKeyword %>');

describe('Keywords in logical order', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('keywords-in-logical-order/NoViolations.feature', {}, []);
  });

  it('raises errors when there are violations', function() {
    return runTest('keywords-in-logical-order/Violations.feature', {}, [
      {
        messageElements: { keyword: 'When', text: 'step2', priorKeyword: 'then'},
        line: 5,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given', text: 'step3', priorKeyword: 'then'},
        line: 6,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given', text: 'step12', priorKeyword: 'when'},
        line: 10,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given', text: 'step22', priorKeyword: 'then'},
        line: 14,
        column: 3,
      },
      {
        messageElements: { keyword: 'When', text: 'step32', priorKeyword: 'then'},
        line: 18,
        column: 3,
      },
      {
        messageElements: { keyword: 'When', text: 'step54', priorKeyword: 'then'},
        line: 24,
        column: 3,
      },
      {
        messageElements: { keyword: 'When', text: 'step42', priorKeyword: 'then'},
        line: 28,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given', text: 'step43', priorKeyword: 'then'},
        line: 29,
        column: 3,
      },
    ]);
  });
});
