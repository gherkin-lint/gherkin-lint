const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/allowed-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, 'Not allowed tag <%= tags %> on <%= nodeType %>');

describe('No Allowed Tags Rule', () => {
  it('detects an error when property is not "tags"', () => {
    runTest('allowed-tags/NoViolations.feature', {
      'foobar': ['@featuretag', '@scenariotag'],
    }, [
      'Invalid rule configuration for "allowed-tags" -  The rule does not have the specified configuration option "foobar"',
    ]);
  });

  it('doesn\'t raise errors when the file is empty', () => {
    runTest('Empty.feature', {
      'tags': ['@featuretag', '@scenariotag'],
    }, []);
  });

  it('doesn\'t raise errors when there are no violations', () => {
    runTest('allowed-tags/NoViolations.feature', {
      'tags': ['@featuretag', '@scenariotag'],
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', () => {
    runTest('allowed-tags/Violations.feature', {
      'tags': ['@featuretag', '@scenariotag'],
    }, [{
      messageElements: {tags: '@featuretag1', nodeType: 'Feature'},
      line: 1,
    },
    {
      messageElements: {tags: '@anothertag', nodeType: 'Feature'},
      line: 1,
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType: 'Scenario'},
      line: 7,
    },
    {
      messageElements: {tags: '@scenariotag2', nodeType: 'Scenario'},
      line: 7,
    },
    {
      messageElements: {tags: '@anothertag', nodeType: 'Scenario'},
      line: 7,
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType: 'ScenarioOutline'},
      line: 11,
    }]);
  });
});
