var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/use-and.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Step "<%= keyword %><%= text %>" should use And instead of <%= keyword %>');

describe('Use And Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('use-and/NoViolations.feature', {}, []);
  });

  it('raises erros when there are violations', function() {
    return runTest('use-and/Violations.feature', {}, [
      {
        messageElements: { keyword: 'Given ', text: 'step5'},
        line: 5,
        column: 3,
      },
      {
        messageElements: { keyword: 'When ', text: 'step8'},
        line: 8,
        column: 3,
      },
      {
        messageElements: { keyword: 'Then ', text: 'step11'},
        line: 11,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given ', text: 'step16'},
        line: 16,
        column: 3,
      },
      {
        messageElements: { keyword: 'When ', text: 'step19'},
        line: 19,
        column: 3,
      },
      {
        messageElements: { keyword: 'Then ', text: 'step22'},
        line: 22,
        column: 3,
      },
      {
        messageElements: { keyword: 'Given ', text: 'step27'},
        line: 27,
        column: 3
      },
      {
        messageElements: { keyword: 'When ', text: 'step30'},
        line: 30,
        column: 3,
      },
      {
        messageElements: { keyword: 'Then ', text: 'step33'},
        line: 33,
        column: 3,
      }
    ]);
  });
});
