var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/allowed-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Not allowed tag <%= tags %> on <%= nodeType %>');

describe('No Allowed Tags Rule', function() {
  it('detects an error when property is not "tags"', function() {
    runTest('allowed-tags/NoViolations.feature', {
      'foobar': ['@featuretag', '@scenariotag']
    }, [
      'Invalid rule configuration for "allowed-tags" -  The rule does not have the specified configuration option "foobar"'
    ]);
  });

  it('doesn\'t raise errors when there are no violations', function() {
    runTest('allowed-tags/NoViolations.feature', {
      'tags': ['@featuretag', '@scenariotag']
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    runTest('allowed-tags/Violations.feature', {
      'tags': ['@featuretag', '@scenariotag']
    }, [{
      messageElements: {tags: '@featuretag1', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {tags: '@scenariotag2', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'ScenarioOutline'},
      line: 11
    }]);
  });
});
