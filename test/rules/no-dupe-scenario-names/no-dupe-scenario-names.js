var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-scenario-names.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Scenario name is already used in: <%= location %>');

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate scenario names in a single file', function() {
    runTest('no-dupe-scenario-names/UniqueScenarioNames.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no duplicate scenario names multiple files', function() {
    runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles1.feature', {}, []);
    runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles2.feature', {}, []);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in a single file', function() {
    runTest('no-dupe-scenario-names/DublicateScenarioNames.feature', {}, [{
      line: 9,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DublicateScenarioNames.feature:6'}
    }]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in multiple files', function() {
    runTest('no-dupe-scenario-names/DublicateScenarioNamesAcrossFiles1.feature', {}, []);
    runTest('no-dupe-scenario-names/DublicateScenarioNamesAcrossFiles2.feature', {}, [
      {
        line: 6,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DublicateScenarioNamesAcrossFiles1.feature:6'
        }
      },
      {
        line: 9,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DublicateScenarioNamesAcrossFiles1.feature:9'
        }
      }
    ]);
  });
});