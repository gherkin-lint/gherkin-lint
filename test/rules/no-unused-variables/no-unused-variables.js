var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-unused-variables.js');

describe('No Unused Variables Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    var runTest = ruleTestBase.createRuleTest(rule, '');
    return runTest('no-unused-variables/NoViolations.feature', {}, []);
  });

  it('detects unused scenario variables', function() {
    var runTest = ruleTestBase.createRuleTest(rule,
      'Step variable "<%= variable %>" does not exist in the examples table');

    return runTest('no-unused-variables/UnusedStepVariables.feature', {}, [{
      line: 5,
      messageElements: {variable: 'b'}
    },
    {
      line: 11,
      messageElements: {variable: 'b'}
    },
    {
      line: 23,
      messageElements: {variable: 'b'}
    },
    {
      line: 34,
      messageElements: {variable: 'b'}
    }]);
  });

  it('detects unused variables in the examples table', function() {
    var runTest = ruleTestBase.createRuleTest(rule,
      'Examples table variable "<%= variable %>" is not used in any step');

    return runTest('no-unused-variables/UnusedExampleVariables.feature', {}, [{
      line: 7,
      messageElements: {variable: 'b'}
    }, {
      line: 19,
      messageElements: {variable: 'b'}
    },
    {
      line: 28,
      messageElements: {variable: 'b'}
    },
    {
      line: 42,
      messageElements: {variable: 'b'}
    },
    {
      line: 54,
      messageElements: {variable: 'b'}
    }]);
  });
});
