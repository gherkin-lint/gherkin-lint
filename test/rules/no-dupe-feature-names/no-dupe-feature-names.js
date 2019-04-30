var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-feature-names.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Feature name is already used in: <%= location %>');

describe('No Duplicate Feature Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate feature names', function() {
    runTest('no-dupe-feature-names/NoViolations.feature', {}, []);
  });

  it('raises errors for every duplicate feature name', function() {
    runTest('no-dupe-feature-names/DuplicateNameFeature1.feature', {}, []);
    runTest('no-dupe-feature-names/DuplicateNameFeature2.feature', {}, [
      {
        line: 3,
        messageElements: {
          location: 'test/rules/no-dupe-feature-names/DuplicateNameFeature1.feature'
        }
      }
    ]);
    runTest('no-dupe-feature-names/DuplicateNameFeature3.feature', {}, [
      {
        line: 1,
        messageElements: {
          location: 'test/rules/no-dupe-feature-names/DuplicateNameFeature1.feature, test/rules/no-dupe-feature-names/DuplicateNameFeature2.feature'
        }
      }
    ]);
  });
});