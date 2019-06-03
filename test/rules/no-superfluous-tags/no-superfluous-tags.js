var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-superfluous-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Tag duplication between <%= childType %> and its corresponding <%=parentType %>: <%= tags %>');

describe('No Superfluous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-superfluous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-superfluous-tags/Violations.feature', {}, [
      {
        line: 7,
        messageElements: {
          childType: 'Scenario',
          parentType: 'Feature',
          tags: '@superfluoustag1'
        }
      },
      {
        line: 11,
        messageElements: {
          childType: 'ScenarioOutline',
          parentType: 'Feature',
          tags: '@superfluoustag1'
        }
      },
      {
        line: 11,
        messageElements: {
          childType: 'ScenarioOutline',
          parentType: 'Feature',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        messageElements: {
          childType: 'Examples',
          parentType: 'Feature',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        messageElements: {
          childType: 'Examples',
          parentType: 'ScenarioOutline',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        messageElements: {
          childType: 'Examples',
          parentType: 'ScenarioOutline',
          tags: '@scenariotag3'
        }
      },

    ]);
  });
});
