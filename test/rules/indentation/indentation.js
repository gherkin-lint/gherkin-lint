var runTest = require('../rule-test-base')(require('../../../src/rules/indentation.js'),
  'Wrong indentation for "<%= element %>", expected indentation level of <%= expected %>, but got <%= actual %>');

var wrongIndenatationErrors = [{
  messageElements: {element: 'Feature', expected: 0, actual: 1},
  line: 1
},{
  messageElements: {element: 'Background', expected: 0, actual: 4},
  line: 3
},{
  messageElements: {element: 'Step', expected: 2, actual: 0},
  line: 4
},{
  messageElements: {element: 'Scenario', expected: 0, actual: 1},
  line: 6
},{
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 7
},{
  messageElements: {element: 'Scenario', expected: 0, actual: 3},
  line: 9
},{
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 10
}];

describe('Indentation rule', function() {
  it('doesn\'t raise errors when the default conifguration is used and there are no indentation violations (spaces)', function() {
    runTest('indentation/CorrectIndentationSpaces.feature', {}, []);
  });

  it('doesn\'t raise errors when the default conifguration is used are and there no indentation violations (tabs)', function() {
    runTest('indentation/CorrectIndentationTabs.feature', {}, []);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (spaces)', function() {
    runTest('indentation/WrongIndentationSpaces.feature', {}, wrongIndenatationErrors);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps (tabs)', function() {
    runTest('indentation/WrongIndentationTabs.feature', {}, wrongIndenatationErrors);
  });

  it('detects errors for features, backgrounds, scenarios, scenario outlines and steps in other languages', function() {
    runTest('indentation/WrongIndentationDifferentLanguage.feature', {}, [{
      messageElements: {element: 'Feature', expected: 0, actual: 4},
      line: 2
    },{
      messageElements: {element: 'Background', expected: 0, actual: 4},
      line: 4
    },{
      messageElements: {element: 'Step', expected: 2, actual: 0},
      line: 5
    },{
      messageElements: {element: 'Scenario', expected: 0, actual: 4},
      line: 7
    },{
      messageElements: {element: 'Step', expected: 2, actual: 12},
      line: 8
    },{
      messageElements: {element: 'Scenario', expected: 0, actual: 12},
      line: 10
    },{
      messageElements: {element: 'Step', expected: 2, actual: 11},
      line: 11
    }]);
  });

  // TODO: add tests for partial configurations and fallbacks (eg rule for Step is used for Given, Then etc is rule for Given, Then, etc has not been specified)
});
