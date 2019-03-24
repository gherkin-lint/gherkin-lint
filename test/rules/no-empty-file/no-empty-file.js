const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-empty-file.js');
const runTest = ruleTestBase.createRuleTest(rule,
  'Empty feature files are disallowed');

describe('No empty files Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-empty-file/NoViolations.feature', {}, []);
  });

  it('detects errors for empty file', function() {
    runTest('no-empty-file/BlankFile.feature', {}, [{
      line: 1,
      messageElements: {},
    }]);
  });

  it('detects errors for blank file', function() {
    runTest('no-empty-file/BlankFile.feature', {}, [{
      line: 1,
      messageElements: {},
    }]);
  });
});
