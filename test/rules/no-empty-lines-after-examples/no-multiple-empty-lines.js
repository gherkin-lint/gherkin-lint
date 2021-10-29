var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-empty-lines-after-examples.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Empty lines after Examples are not allowed');

describe('Empty lines after Examples are not allowed', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-empty-lines-after-examples/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-empty-lines-after-examples/Violations.feature', {}, [
      { messageElements: {}, line: 15 }
    ]);
  });
});
