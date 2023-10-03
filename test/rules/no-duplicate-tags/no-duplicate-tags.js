var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-duplicate-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Duplicate tags are not allowed: <%= tags %>');

describe('No Duplicate Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-duplicate-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-duplicate-tags/Violations.feature', {}, [{
      messageElements: {tags: '@featuretag'},
      line: 1,
      column: 13,
    },
    {
      messageElements: {tags: '@scenariotag'},
      line: 7,
      column: 14,
    },
    {
      messageElements: {tags: '@scenariooutlinetag'},
      line: 11,
      column: 21,
    },
    {
      messageElements: {tags: '@examplestag'},
      line: 14,
      column: 14,
    }]);
  });
});
