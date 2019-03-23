const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/name-length.js');
const runTest = ruleTestBase.createRuleTest(rule,
  '<%= element %> name is too long. Length of <%= length %> is longer than the maximum allowed: 70');

describe('Name length rule', function() {
  it('detects an error when property is not "Feature", "Step" or "Scenario"', function() {
    runTest('name-length/CorrectLength.feature', {
      'foobar': 60,
    }, [
      'Invalid rule configuration for "name-length" -  The rule does not have the specified configuration option "foobar"',
    ]);
  });

  it('doesn\'t raise errors when the default configuration is used and there are no length violations', function() {
    runTest('name-length/CorrectLength.feature', {}, []);
  });

  it('detects errors for features, scenarios, scenario outlines and steps', function() {
    runTest('name-length/WrongLength.feature', {}, [{
      messageElements: {element: 'Feature', length: 89},
      line: 1,
    }, {
      messageElements: {element: 'Step', length: 94},
      line: 4,
    }, {
      messageElements: {element: 'Scenario', length: 90},
      line: 6,
    }, {
      messageElements: {element: 'Step', length: 101},
      line: 7,
    }, {
      messageElements: {element: 'Scenario', length: 98},
      line: 9,
    }, {
      messageElements: {element: 'Step', length: 108},
      line: 10,
    }]);
  });
});
