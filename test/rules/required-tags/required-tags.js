var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/required-tags.js');
var runTest = ruleTestBase.createRuleTest(rule, 'No tag found matching <%= tags %> for <%= nodeType %>');

describe('Required Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('required-tags/NoViolations.feature', {
      'tags': ['@requiredscenariotag', '@required-scenario-tag', '@required-scenario-tag-\\d+']
    }, []);
  });
  it('detects errors for scenarios and scenario outlines', () => {
    return runTest('required-tags/Violations.feature', {
      'tags': ['@requiredscenariotag', '@requiredScenarioTag', '@required-scenario-tag-\\d+']
    }, [{
      messageElements: {tags: '@requiredScenarioTag', nodeType: 'Scenario'},
      line: '7'
    }, {
      messageElements: {tags: '@requiredScenarioTag', nodeType: 'ScenarioOutline'},
      line: '11,12'
    }, {
      messageElements: {tags: '@required-scenario-tag-\\d+', nodeType: 'Scenario'},
      line: '7'
    }, {
      messageElements: {tags: '@required-scenario-tag-\\d+', nodeType: 'ScenarioOutline'},
      line: '11,12'
    }]);
  });
});
