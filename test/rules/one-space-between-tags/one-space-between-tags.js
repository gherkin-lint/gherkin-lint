const ruleName = 'one-space-between-tags';
const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/one-space-between-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, ({left, right}) =>
  `There is more than one space between the tags ${left} and ${right}`);

describe('One space between tags rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('one-space-between-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for tags on features, scenarios, and scenario outlines', function() {
    runTest('one-space-between-tags/Violations.feature', {}, [{
      line: 1,
      rule: ruleName,
      messageElements: {left: '@featuretag1', right: '@featuretag2'},
    }, {
      line: 9,
      rule: ruleName,
      messageElements: {left: '@scenariotag3', right: '@scenariotag4'},
    }, {
      line: 9,
      rule: ruleName,
      messageElements: {left: '@scenariotag4', right: '@scenariotag5'},
    }, {
      line: 13,
      rule: ruleName,
      messageElements: {left: '@scenariotag5', right: '@scenariotag6'},
    }]);
  });
});
