var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-scenario-names.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Scenario name is already used in: <%= location %>');

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate scenario names in a single file', function() {
    return runTest('no-dupe-scenario-names/UniqueScenarioNames.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no duplicate scenario names multiple files', function() {
    return runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles1.feature', {}, [])
      .then(() => {
        return runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles2.feature', {}, []);
      });
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in a single file', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNames.feature', {}, [{
      line: 9,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:6'}
    }]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in multiple files', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', {}, [])
      .then(() => {
        return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', {}, [
          {
            line: 6,
            messageElements: {
              location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:6'
            }
          },
          {
            line: 9,
            messageElements: {
              location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:9'
            }
          }
        ]);
      });
  });

  it('doesn\'t raise errors when there are duplicate scenario names in different files', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', 'in-feature', [])
      .then(() => {
        return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', 'in-feature', []);
      });
  });
});
