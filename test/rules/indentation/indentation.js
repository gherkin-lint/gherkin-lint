const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/indentation.js');
const runTest = ruleTestBase.createRuleTest(rule,
  'Wrong indentation for "<%= element %>", expected indentation level of <%= expected %>, but got <%= actual %>');

const wrongIndenatationErrors = [{
  messageElements: {element: 'Feature', expected: 0, actual: 1},
  line: 2,
}, {
  messageElements: {element: 'feature tag', expected: 0, actual: 1},
  line: 1,
}, {
  messageElements: {element: 'Background', expected: 0, actual: 4},
  line: 4,
}, {
  messageElements: {element: 'Step', expected: 2, actual: 0},
  line: 5,
}, {
  messageElements: {element: 'Scenario', expected: 0, actual: 1},
  line: 9,
}, {
  messageElements: {element: 'scenario tag', expected: 0, actual: 1},
  line: 7,
}, {
  messageElements: {element: 'scenario tag', expected: 0, actual: 1},
  line: 8,
}, {
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 10,
}, {
  messageElements: {element: 'Scenario', expected: 0, actual: 3},
  line: 14,
}, {
  messageElements: {element: 'Examples', expected: 0, actual: 2},
  line: 16,
}, {
  messageElements: {element: 'example', expected: 2, actual: 4},
  line: 17,
}, {
  messageElements: {element: 'example', expected: 2, actual: 4},
  line: 18,
}, {
  messageElements: {element: 'scenario tag', expected: 0, actual: 3},
  line: 12,
}, {
  messageElements: {element: 'scenario tag', expected: 0, actual: 4},
  line: 13,
}, {
  messageElements: {element: 'Step', expected: 2, actual: 3},
  line: 15,
}];

describe('Indentation rule', () => {
  it('doesn\'t raise errors when the default conifguration is used and there are no indentation violations (spaces)', function() {
    runTest('indentation/CorrectIndentationSpaces.feature', {}, []);
  });

  it('doesn\'t raise errors when the file is empty', function() {
    runTest('Empty.feature', {}, []);
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
      line: 3,
    }, {
      messageElements: {element: 'feature tag', expected: 0, actual: 4},
      line: 2,
    }, {
      messageElements: {element: 'Background', expected: 0, actual: 4},
      line: 5,
    }, {
      messageElements: {element: 'Step', expected: 2, actual: 0},
      line: 6,
    }, {
      messageElements: {element: 'Scenario', expected: 0, actual: 4},
      line: 10,
    }, {
      messageElements: {element: 'scenario tag', expected: 0, actual: 4},
      line: 8,
    }, {
      messageElements: {element: 'scenario tag', expected: 0, actual: 1},
      line: 9,
    }, {
      messageElements: {element: 'Step', expected: 2, actual: 12},
      line: 11,
    }, {
      messageElements: {element: 'Scenario', expected: 0, actual: 12},
      line: 15,
    }, {
      messageElements: {element: 'Examples', expected: 0, actual: 7},
      line: 17,
    }, {
      messageElements: {element: 'example', expected: 2, actual: 15},
      line: 18,
    }, {
      messageElements: {element: 'example', expected: 2, actual: 15},
      line: 19,
    }, {
      messageElements: {element: 'scenario tag', expected: 0, actual: 4},
      line: 13,
    }, {
      messageElements: {element: 'scenario tag', expected: 0, actual: 1},
      line: 14,
    }, {
      messageElements: {element: 'Step', expected: 2, actual: 11},
      line: 16,
    }]);
  });

  it('defaults the tag indentation settings when they are not set', function() {
    runTest('indentation/CorrectIndentationWithFeatureAndScenarioOverrides.feature', {
      'Feature': 1,
      'Scenario': 3,
    }, []);
  });

  it('observe tag indentation settings when they are overriden', function() {
    runTest('indentation/CorrectIndentationWithScenarioTagOverrides.feature', {
      'scenario tag': 3,
    }, []);
  });

  /* TODO: add tests for partial configurations and fallbacks
   * (eg rule for Step is used for Given, Then etc is rule for Given, Then, etc
   * has not been specified)
   */
});
