var ruleTestBase = require('../rule-test-base');
var rule = require('../../../src/rules/no-unused-variables.js');



describe('No unused variables rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    var runTest = ruleTestBase.createRuleTest(rule, '');
    runTest('no-unused-variables/NoViolations.feature', {}, []);
  });

  it('detects unused scenario variables', function() {
    var runTest = ruleTestBase.createRuleTest(rule,
      'Step variable "<%= variable %>" does not exist the in examples table');

    runTest('no-unused-variables/UnusedStepVariables.feature', {}, [{
      line: 5,
      messageElements: {variable: 'b'}
    }]);
  });

  it('detects unused variables in the examples table', function() {
    var runTest = ruleTestBase.createRuleTest(rule,
      'Examples table variable "<%= variable %>" is not used in any step');

    runTest('no-unused-variables/UnusedExampleVariables.feature', {}, [{
      line: 7,
      messageElements: {variable: 'b'}
    }, {
      line: 19,
      messageElements: {variable: 'b'}
    }]);
  });
});
