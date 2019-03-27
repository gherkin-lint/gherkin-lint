const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-homogenous-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, ({tags}) =>
  'All Scenarios on this Feature have the same tag(s), ' +
  `they should be defined on the Feature instead: ${tags}`);

describe('No Homogenous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-homogenous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-homogenous-tags/Violations.feature', {}, [{
      line: 1,
      messageElements: {tags: '@tag1, @tag2'},
    }]);
  });
});
