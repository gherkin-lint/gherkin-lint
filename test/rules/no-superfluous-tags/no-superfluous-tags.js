var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-superfluous-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Tag(s) duplicated on <%= parent %> and <%= child %>: <%= tags %>');

describe('No Superfluous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-superfluous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-superfluous-tags/Violations.feature', {}, [
      {
        line: 7,
        messageElements: {
          parent: 'Feature',
          child: 'Scenario',
          tags: '@superfluoustag1'
        }
      }, 
      {
        line: 11,
        messageElements: {
          parent: 'Feature',
          child: 'ScenarioOutline',
          tags: '@superfluoustag1, @superfluoustag2'
        }
      }, 
      {
        line: 14,
        messageElements: {
          parent: 'Feature',
          child: 'Examples',
          tags: '@superfluoustag1'
        }
      }, 
      {
        line: 14,
        messageElements: {
          parent: 'ScenarioOutline',
          child: 'Examples',
          tags: '@superfluoustag1'
        }
      }
    ]);
  });
});
