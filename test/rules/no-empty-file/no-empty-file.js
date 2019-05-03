var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-empty-file.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Empty feature files are disallowed');

describe('No Empty Files Rule', function() {
  it('doesn\'t raise errors when a feature file isn\'t empty', function() {
    runTest('no-empty-file/NoViolations.feature', {}, []);
  });

  it('raises an error an error for feature files that are empty', function() {
    runTest('no-empty-file/EmptyFeature.feature', {}, [
      { messageElements: {}, line: 1 }
    ]);
  });

  it('raises an error an error for feature files that only contain whitespace', function() {
    runTest('no-empty-file/OnlyWhitespace.feature', {}, [
      { messageElements: {}, line: 1 }
    ]);
  });
});
