var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-feature-names.js');
var runTest = ruleTestBase.createRuleTest(rule, '<%= message %>');

describe('No Duplicate feature names Rule', function() {
  it('detects no duplicate feature name', function() {
    rule.reset();
    runTest([
      'no-dupe-feature-names/FirstFeature.feature',
      'no-dupe-feature-names/SecondFeature.feature'], {}, []);
  });
  it('detects errors for duplicate feature names', function() {
    rule.reset();
    runTest([
      'no-dupe-feature-names/FirstFeature.feature',
      'no-dupe-feature-names/SecondFeature.feature',
      'no-dupe-feature-names/DuplicateFeatureName.feature'], {}, [{
      line: 1,
      messageElements: {message:'Feature name is already used in: no-dupe-feature-names/SecondFeature.feature'}
    }]);
  });

});
