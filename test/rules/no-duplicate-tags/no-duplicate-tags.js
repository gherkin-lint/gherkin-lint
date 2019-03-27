const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-duplicate-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, ({tags}) =>
  `Duplicate tags are not allowed: ${tags}`);

describe('No Duplicate Tags Rule', function() {
  it('doesn\'t raise errors when there are no tags', function() {
    runTest('no-duplicate-tags/NoTags.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no tags violations', function() {
    runTest('no-duplicate-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    runTest('no-duplicate-tags/Violations.feature', {}, [{
      messageElements: {tags: '@featuretag'},
      line: 1,
    },
    {
      messageElements: {tags: '@scenariotag'},
      line: 7,
    },
    {
      messageElements: {tags: '@scenariotag'},
      line: 11,
    }]);
  });
});
