var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/allowed-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Not allowed tag <%= tags %> on <%= nodeType %>');

describe('Allowed Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('allowed-tags/NoViolations.feature', {
      'tags': ['@featuretag', '@scenariotag'],
      'patterns': ['^@examplestag$']
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('allowed-tags/Violations.feature', {
      'tags': ['@featuretag', '@scenariotag'],
      'patterns': ['^@examplestag$']
    }, [{
      messageElements: {tags: '@featuretag1', nodeType:'Feature'},
      line: 1,
      column: 13
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Feature'},
      line: 1,
      column: 26
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'Scenario'},
      line: 7,
      column: 14
    },
    {
      messageElements: {tags: '@scenariotag2', nodeType:'Scenario'},
      line: 7,
      column: 28
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Scenario'},
      line: 7,
      column: 42
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'Scenario Outline'},
      line: 11,
      column: 14
    },
    {
      messageElements: {tags: '@examplestag1', nodeType:'Examples'},
      line: 14,
      column: 14
    }]);
  });
});
