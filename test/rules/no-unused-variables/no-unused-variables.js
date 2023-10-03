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

    return runTest('no-unused-variables/UnusedStepVariables.feature', {}, [
      {
        line: 5,
        column: 20,
        messageElements: {variable: 'b'}
      },
      {
        line: 12,
        column: 20,
        messageElements: {variable: 'b'}
      },
      {
        line: 18,
        column: 107,
        messageElements: {variable: 'b'}
      },
      {
        line: 30,
        column: 7,
        messageElements: {variable: 'b'}
      },
      {
        line: 42,
        column: 0,
        messageElements: {variable: 'b'}
      }
    ]);
  });

  it('detects unused variables in the examples table', function() {
    var runTest = ruleTestBase.createRuleTest(rule,
      'Examples table variable "<%= variable %>" is not used in any step');

    return runTest('no-unused-variables/UnusedExampleVariables.feature', {}, [
      {
        line: 7,
        column: 11,
        messageElements: {variable: 'b'}
      },
      {
        line: 14,
        column: 11,
        messageElements: {variable: 'b'}
      },
      {
        line: 26,
        column: 7,
        messageElements: {variable: 'b'}
      },
      {
        line: 35,
        column: 11,
        messageElements: {variable: 'b'}
      },
      {
        line: 49,
        column: 7,
        messageElements: {variable: 'b'}
      },
      {
        line: 61,
        column: 11,
        messageElements: {variable: 'b'}
      }
    ]);
  });
});
