const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-unused-variables.js');

describe('No unused variables rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    const runTest = ruleTestBase.createRuleTest(rule, '');
    runTest('no-unused-variables/NoViolations.feature', {}, []);
  });

  it('detects unused scenario variables', function() {
    const runTest = ruleTestBase.createRuleTest(rule, ({variable}) =>
      `Step variable "${variable}" does not exist the in examples table`);

    runTest('no-unused-variables/UnusedStepVariables.feature', {}, [{
      line: 5,
      messageElements: {variable: 'b'},
    },
    {
      line: 11,
      messageElements: {variable: 'b'},
    },
    {
      line: 23,
      messageElements: {variable: 'b'},
    },
    {
      line: 34,
      messageElements: {variable: 'b'},
    }]);
  });

  it('detects unused variables in the examples table', function() {
    const runTest = ruleTestBase.createRuleTest(rule, ({variable}) =>
      `Examples table variable "${variable}" is not used in any step`);

    runTest('no-unused-variables/UnusedExampleVariables.feature', {}, [{
      line: 7,
      messageElements: {variable: 'b'},
    }, {
      line: 19,
      messageElements: {variable: 'b'},
    },
    {
      line: 28,
      messageElements: {variable: 'b'},
    },
    {
      line: 42,
      messageElements: {variable: 'b'},
    },
    {
      line: 54,
      messageElements: {variable: 'b'},
    }]);
  });
});
