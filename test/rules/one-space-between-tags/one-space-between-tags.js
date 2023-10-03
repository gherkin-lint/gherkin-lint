var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/one-space-between-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'There is more than one space between the tags <%= left %> and <%= right %>');

describe('One Space Between Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('one-space-between-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for tags on features, scenarios, and scenario outlines', function() {
    return runTest('one-space-between-tags/Violations.feature', {}, [
      {
        line: 1,
        column: 1,
        messageElements: {left: '@featuretag1', right: '@featuretag2'}
      },
      {
        line: 9,
        column: 1,
        messageElements: {left: '@scenariotag3', right: '@scenariotag4'}
      },
      {
        line: 9,
        column: 17,
        messageElements: {left: '@scenariotag4', right: '@scenariotag5'}
      },
      {
        line: 13,
        column: 1,
        messageElements: {left: '@scenariotag5', right: '@scenariotag6'}
      },
      {
        line: 16,
        column: 1,
        messageElements: {left: '@examplestag1', right: '@examplestag2'}
      }
    ]);
  });
});
