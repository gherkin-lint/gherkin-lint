const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/no-dupe-scenario-names');
const runTest = ruleTestBase.createRuleTest(
  rule, 'Scenario name is already used in: <%= files %>');
const PATH = 'test/rules/';
const NO_VIOLATIONS_FILE = 'no-dupe-scenario-names/NoViolations.feature';
const VIOLATIONS_FILE = 'no-dupe-scenario-names/Violations.feature';

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest(NO_VIOLATIONS_FILE, {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    runTest(VIOLATIONS_FILE, {}, [{
      messageElements: {
        files: [
          `${PATH}${VIOLATIONS_FILE}:7`,
        ].join(','),
      },
      line: 10,
    },
    {
      messageElements: {
        files: [
          `${PATH}${VIOLATIONS_FILE}:7`,
          `${PATH}${VIOLATIONS_FILE}:10`,
        ].join(', '),
      },
      line: 16,
    }, {
      messageElements: {
        files: [
          `${PATH}${VIOLATIONS_FILE}:7`,
          `${PATH}${VIOLATIONS_FILE}:10`,
          `${PATH}${VIOLATIONS_FILE}:16`,
        ].join(', '),
      },
      line: 19,
    }]);
  });
});
