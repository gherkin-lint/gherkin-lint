var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/disallowed-steps.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Disallowed step "<%= steps %>" on <%= nodeType %>');

describe('No Allowed Steps Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('disallowed-steps/NoViolations.feature', {
      'steps': [
        '^.*disallowed.*$'
      ]}, []);
  });

  it('detects errors for scenarios, backgrounds, and scenario outlines', function() {
    runTest('disallowed-steps/Violations.feature', {
      'steps': [
        '^an exact step to not allow$',
        'disallowed'
      ]
    }, [{
      messageElements: {steps: 'disallowed background step', nodeType:'Background'},
      line: 4
    },
    {
      messageElements: {steps: 'disallowed scenario step', nodeType:'Scenario'},
      line: 7
    },
    {
      messageElements: {steps: 'an exact step to not allow', nodeType:'Scenario'},
      line: 8
    },
    {
      messageElements: {steps: 'disallowed scenario outline step', nodeType: 'ScenarioOutline'},
      line: 12
    },
    {
      messageElements: {steps: 'an exact step to not allow', nodeType: 'ScenarioOutline'},
      line: 13
    }]);
  });
});
