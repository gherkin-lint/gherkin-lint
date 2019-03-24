const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-empty-background.js');
const runTest = ruleTestBase.createRuleTest(rule,
  'Empty backgrounds are not allowed.');

describe('No empty Backgrounds Rule', function() {
  it('doesn\'t raise errors when there are no background', function() {
    runTest('no-empty-background/NoBackground.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-empty-background/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-empty-background/Violations.feature', {}, [{
      line: 4,
      messageElements: {},
    }]);
  });
});
