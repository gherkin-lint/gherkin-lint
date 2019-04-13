var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-scenario-names.js');
var runTest = ruleTestBase.createRuleTest(rule, '<%= message %>');

describe('No Duplicate scenario names Rule', function() {
  it('detects errors for scenarios and scenario outlines in multiple files', function() {
    rule.reset();
    runTest([
      'no-dupe-scenario-names/FirstFeature.feature',
      'no-dupe-scenario-names/SecondFeature.feature'], {}, [{
      line: 9,
      messageElements: {message:'Scenario name is already used in: no-dupe-scenario-names/FirstFeature.feature:6'}
    },
    { 
      line: 3,
      messageElements: {message:'Scenario name is already used in: no-dupe-scenario-names/FirstFeature.feature:3'}
    },
    {
      line: 6,
      messageElements: {message: 'Scenario name is already used in: no-dupe-scenario-names/FirstFeature.feature:6, no-dupe-scenario-names/FirstFeature.feature:9'}
    }]);
  });
  it('detects no errors for scenarios and scenario outlines in single file', function() {
    rule.reset();
    runTest('no-dupe-scenario-names/SecondFeature.feature', {}, []);
  });
  it('detects errors for scenarios and scenario outlines for individual files', function() {
    rule.reset();
    runTest([
      'no-dupe-scenario-names/FirstFeature.feature',
      'no-dupe-scenario-names/SecondFeature.feature'], 'in-feature', [{
      line: 9,
      messageElements: {message:'Scenario name is already used in: no-dupe-scenario-names/FirstFeature.feature:6'}
    }]);
  });
});
