var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-unnamed-features.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Missing Feature name');

describe('No Unnamed Features Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-unnamed-features/NoViolations.feature', {}, []);
  });

  it('raises an error when parsing an empty feature', function() {
    return runTest('no-unnamed-features/EmptyFeature.feature', {}, [
      {
        messageElements: {},
        line: 0
      }
    ]);
  });

  it('raises an error when a feature doesn\'t have a name', function() {
    return runTest('no-unnamed-features/UnnamedFeature.feature', {}, [
      {
        messageElements: {},
        line: 3
      }
    ]);
  });
});
