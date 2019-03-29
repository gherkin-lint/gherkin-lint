const ruleTestBase = require('../rule-test-base');
const EXAMPLE_FILE = 'no-dupe-feature-names/Example.feature';
const OTHER_FILE = 'no-dupe-feature-names/Other.feature';
const rule = require('../../../src/rules/no-dupe-feature-names');
const ruleWithAnotherFile = Object.assign({}, rule, {
  init: () => ({
    features: {
      'Feature with a name': {
        files: [OTHER_FILE],
      },
    },
  }),
});
const errorMessage = ({files}) => `Feature name is already used in: ${files}`;


const noViolationTest = ruleTestBase.createRuleTest(rule, errorMessage);
const violationTest = ruleTestBase.createRuleTest(ruleWithAnotherFile, errorMessage);

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    noViolationTest(EXAMPLE_FILE, {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    violationTest(EXAMPLE_FILE, {}, [{
      messageElements: {
        files: OTHER_FILE,
      },
      line: 2,
    }]);
  });
});
