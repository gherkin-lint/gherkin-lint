const ruleName = 'no-restricted-tags';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-restricted-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, ({tags, nodeType}) =>
  `Forbidden tag ${tags} on ${nodeType}`);

describe('No Restricted Tags Rule', function() {
  it('detects an error when property is not "tags"', function() {
    runTest('no-restricted-tags/NoViolations.feature', {
      'foobar': ['@featuretag', '@scenariotag'],
    }, [{
      type: 'config-error',
      message: 'Error(s) in configuration file:',
      errors: [{
        type: 'config-rule-error',
        rule: 'no-restricted-tags',
        message: 'The rule does not have the specified configuration option "foobar"',
      }],
    }]);
  });

  it('doesn\'t raise errors when there are no forbidden tags', function() {
    runTest('no-restricted-tags/NoViolations.feature', {
      'tags': ['@featuretag1', '@scenariotag1'],
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines when there are forbidden tags', function() {
    runTest('no-restricted-tags/Violations.feature', {
      'tags': ['@featuretag1', '@anothertag', '@scenariotag1', '@scenariotag2'],
    }, [{
      messageElements: {tags: '@featuretag1', nodeType: 'Feature'},
      rule: ruleName,
      line: 1,
    },
    {
      messageElements: {tags: '@anothertag', nodeType: 'Feature'},
      rule: ruleName,
      line: 1,
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType: 'Scenario'},
      rule: ruleName,
      line: 7,
    },
    {
      messageElements: {tags: '@scenariotag2', nodeType: 'Scenario'},
      rule: ruleName,
      line: 7,
    },
    {
      messageElements: {tags: '@anothertag', nodeType: 'Scenario'},
      rule: ruleName,
      line: 7,
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType: 'ScenarioOutline'},
      rule: ruleName,
      line: 11,
    }]);
  });
});
