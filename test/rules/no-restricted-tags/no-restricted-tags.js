var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-restricted-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Forbidden tag <%= tag %> on <%= nodeType %>');

describe('No Restricted Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-restricted-tags/NoViolations.feature', {
      'tags': ['@badTag']
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-restricted-tags/Violations.feature', {
      'tags': ['@badTag', '@anotherBadTag']
    }, [{
      messageElements: {tag: '@badTag', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {tag: '@anotherBadTag', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {tag: '@badTag', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {tag: '@anotherBadTag', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {tag: '@badTag', nodeType:'ScenarioOutline'},
      line: 11
    },
    {
      messageElements: {tag: '@anotherBadTag', nodeType:'ScenarioOutline'},
      line: 11
    },
    {
      messageElements: {tag: '@badTag', nodeType:'Examples'},
      line: 14
    },
    {
      messageElements: {tag: '@anotherBadTag', nodeType:'Examples'},
      line: 14
    },
    {
      messageElements: {tag: '@badTag', nodeType:'Examples'},
      line: 19
    },
    {
      messageElements: {tag: '@anotherBadTag', nodeType:'Examples'},
      line: 19
    }]);
  });
});
