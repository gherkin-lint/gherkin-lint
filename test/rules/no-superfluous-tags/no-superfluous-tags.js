var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-superfluous-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Tag duplication between <%= childType %> and its corresponding <%=parentType %>: <%= tags %>');

describe('No Superfluous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-superfluous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    return runTest('no-superfluous-tags/Violations.feature', {}, [
      {
        line: 7,
        column: 1,
        messageElements: {
          childType: 'Scenario',
          parentType: 'Feature',
          tags: '@superfluoustag1'
        }
      },
      {
        line: 11,
        column: 1,
        messageElements: {
          childType: 'Scenario Outline',
          parentType: 'Feature',
          tags: '@superfluoustag1'
        }
      },
      {
        line: 11,
        column: 18,
        messageElements: {
          childType: 'Scenario Outline',
          parentType: 'Feature',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        column: 1,
        messageElements: {
          childType: 'Examples',
          parentType: 'Feature',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        column: 1,
        messageElements: {
          childType: 'Examples',
          parentType: 'Scenario Outline',
          tags: '@superfluoustag2'
        }
      },
      {
        line: 14,
        column: 32,
        messageElements: {
          childType: 'Examples',
          parentType: 'Scenario Outline',
          tags: '@scenariotag3'
        }
      },

    ]);
  });
});
