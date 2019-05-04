var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-restricted-patterns.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Restricted pattern "<%= steps %>" on <%= nodeType %>');

describe('No Allowed Steps Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-restricted-patterns/NoViolations.feature', {
      'Global': [
        '^.*disallowed.*$'
      ]}, []);
  });

  it('detects errors for features, scenarios, backgrounds, and scenario outlines', function() {
    runTest('no-restricted-patterns/Violations.feature', {
      'Feature': [
        'Bad feature text',
        '^.*disallowed.*$'
      ],
      'Background': [
        '^.*disallowed.*$'
      ],
      'Scenario': [
        '^an exact step to not allow$',
        'disallowed'
      ],
      'ScenarioOutline': [
        '^an exact step to not allow$',
        'disallowed'
      ],
      'Global': [
        '^a restricted global pattern$'
      ]
    }, [{
      messageElements: {steps: 'Bad feature text\n  A restricted global pattern', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {steps: 'Feature with disallowed patterns', nodeType:'Feature'},
      line: 1
    },
    {
      messageElements: {steps: 'disallowed background step', nodeType:'Background'},
      line: 6
    },
    {
      messageElements: {steps: 'a restricted global pattern', nodeType:'Background'},
      line: 7
    },
    {
      messageElements: {steps: 'disallowed scenario step', nodeType:'Scenario'},
      line: 10
    },
    {
      messageElements: {steps: 'an exact step to not allow', nodeType:'Scenario'},
      line: 11
    },
    {
      messageElements: {steps: 'disallowed scenario outline step', nodeType: 'ScenarioOutline'},
      line: 15
    },
    {
      messageElements: {steps: 'an exact step to not allow', nodeType: 'ScenarioOutline'},
      line: 16
    }]);
  });
});
