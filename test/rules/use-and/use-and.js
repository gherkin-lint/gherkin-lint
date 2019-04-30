var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/use-and.js');
var runTest = ruleTestBase.createRuleTest(rule, 
  'Step "<%= keyword %><%= text %>" should use And instead of <%= keyword %>');

describe('Use And Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('use-and/NoViolations.feature', {}, []);
  });

  it('doesn\'t raise errors when parsing an empty feature', function() {
    runTest('use-and/EmptyFeature.feature', {}, []);
  });

  it('raises erros when there are violations', function() {
    runTest('use-and/Violations.feature', {}, [
      {
        messageElements: { keyword: 'Given ', text: 'step5'},
        line: 5
      },
      {
        messageElements: { keyword: 'When ', text: 'step8'},
        line: 8
      },
      {
        messageElements: { keyword: 'Then ', text: 'step11'},
        line: 11
      },
      {
        messageElements: { keyword: 'Given ', text: 'step16'},
        line: 16
      },
      {
        messageElements: { keyword: 'When ', text: 'step19'},
        line: 19
      },
      {
        messageElements: { keyword: 'Then ', text: 'step22'},
        line: 22
      },
      {
        messageElements: { keyword: 'Given ', text: 'step27'},
        line: 27
      },
      {
        messageElements: { keyword: 'When ', text: 'step30'},
        line: 30
      },
      {
        messageElements: { keyword: 'Then ', text: 'step33'},
        line: 33
      }
    ]);
  });
});
