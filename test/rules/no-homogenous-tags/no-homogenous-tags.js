var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-homogenous-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  '<%= intro %> have the same tag(s), they should be defined on the <%= nodeType %> instead: <%= tags %>');

describe('No Homogenous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-homogenous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-homogenous-tags/Violations.feature', {}, [ 
      {
        line: 1,
        messageElements: {
          intro: 'All Scenarios on this Feature',
          tags: '@tag1, @tag2',
          nodeType: 'Feature'
        }
      },
      {
        line: 11,
        messageElements: {
          intro: 'All Examples of a Scenario Outline',
          tags: '@tag5',
          nodeType: 'Scenario Outline'
        }
      }
    ]);
  });
});
