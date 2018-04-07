var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-homogenous-tags.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'All Scenarios on this Feature have the same tag(s), they should be defined on the Feature instead: <%= tags %>');

describe('No Homogenous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-homogenous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-homogenous-tags/Violations.feature', {}, [ {
      line: 1,
      messageElements: {tags: '@tag1, @tag2'}
    }]);
  });
});
