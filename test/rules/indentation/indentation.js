var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/indentation.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'Wrong indentation for "<%= element %>", expected indentation level of <%= expected %>, but got <%= actual %>');

var wrongIndenatationErrors = [{
  messageElements: {element: 'Feature', expected: 0, actual: 1},
  line: 2,
  column: 2,
},{
  messageElements: {element: 'feature tag', expected: 0, actual: 1},
  line: 1,
  column: 2,
},{
  messageElements: {element: 'Background', expected: 0, actual: 4},
  line: 4,
  column: 5,
},{
  messageElements: {element: 'Step', expected: 2, actual: 0},
  line: 5,
  column: 1,
},{
  messageElements: {element: 'Scenario', expected: 0, actual: 1},
  line: 9,
  column: 2,
},{
  messageElements: {element: 'scenario tag', expected: 0, actual: 1},
  line: 7,
  column: 2,
},{
  messageElements: {element: 'scenario tag', expected: 0, actual: 1},
  line: 8,
  column: 2,
},{
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 10,
  column: 4,
},{
  messageElements: {element: 'Scenario', expected: 0, actual: 3},
  line: 14,
  column: 4,
},{
  messageElements: {element: 'scenario tag', expected: 0, actual: 3},
  line: 12,
  column: 4,
},{
  messageElements: {element: 'scenario tag', expected: 0, actual: 4},
  line: 13,
  column: 5,
},{
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 15,
  column: 4,
},{
  messageElements: {element: 'Examples', expected: 0, actual: 2},
  line: 16,
  column: 3,
},{
  messageElements: {element: 'example', expected: 2, actual: 4},
  line: 17,
  column: 5,
},{
  messageElements: {element: 'example', expected: 2, actual: 4},
  line: 18,
  column: 5,
}];

describe('Indentation rule', function() {
  it('doesn\'t raise errors when the default conifguration is used and there are no indentation violations (spaces)', function() {
    return runTest('indentation/CorrectIndentationSpaces.feature', {}, []);
  });

  it('doesn\'t raise errors when the default conifguration is used are and there no indentation violations (tabs)', function() {
    return runTest('indentation/CorrectIndentationTabs.feature', {}, []);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (spaces)', function() {
    return runTest('indentation/WrongIndentationSpaces.feature', {}, wrongIndenatationErrors);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (tabs)', function() {
    return runTest('indentation/WrongIndentationTabs.feature', {}, wrongIndenatationErrors);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps in other languages', function() {
    return runTest('indentation/WrongIndentationDifferentLanguage.feature', {}, [{
      messageElements: {element: 'Feature', expected: 0, actual: 4},
      line: 3,
      column: 5,
    },{
      messageElements: {element: 'feature tag', expected: 0, actual: 4},
      line: 2,
      column: 5,
    },{
      messageElements: {element: 'Background', expected: 0, actual: 4},
      line: 5,
      column: 5,
    },{
      messageElements: {element: 'Step', expected: 2, actual: 0},
      line: 6,
      column: 1,
    },{
      messageElements: {element: 'Scenario', expected: 0, actual: 4},
      line: 10,
      column: 5,
    },{
      messageElements: {element: 'scenario tag', expected: 0, actual: 4},
      line: 8,
      column: 5,
    },{
      messageElements: {element: 'scenario tag', expected: 0, actual: 1},
      line: 9,
      column: 2,
    },{
      messageElements: {element: 'Step', expected: 2, actual: 12},
      line: 11,
      column: 13,
    },{
      messageElements: {element: 'Scenario', expected: 0, actual: 12},
      line: 15,
      column: 13,
    },{
      messageElements: {element: 'scenario tag', expected: 0, actual: 4},
      line: 13,
      column: 5,
    },{
      messageElements: {element: 'scenario tag', expected: 0, actual: 1},
      line: 14,
      column: 2,
    },{
      messageElements: {element: 'Step', expected: 2, actual: 11},
      line: 16,
      column: 12,
    },{
      messageElements: {element: 'Examples', expected: 0, actual: 7},
      line: 17,
      column: 8,
    },{
      messageElements: {element: 'example', expected: 2, actual: 15},
      line: 18,
      column: 16,
    },{
      messageElements: {element: 'example', expected: 2, actual: 15},
      line: 19,
      column: 16,
    }]);
  });

  it('defaults the tag indentation settings when they are not set', function() {
    return runTest('indentation/CorrectIndentationWithFeatureAndScenarioOverrides.feature', {
      'Feature': 1,
      'Scenario': 3
    }, []);
  });

  it('observe tag indentation settings when they are overriden', function() {
    return runTest('indentation/CorrectIndentationWithScenarioTagOverrides.feature', {
      'scenario tag': 3
    }, []);
  });

  // TODO: add tests for partial configurations and fallbacks (eg rule for Step is used for Given, Then etc is rule for Given, Then, etc has not been specified)
});
