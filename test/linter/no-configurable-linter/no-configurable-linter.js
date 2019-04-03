const assert = require('chai').assert;
const fs = require('fs');
const NoConfigurableLinter = require('../../../src/linter/no-configurable-linter.js');
const Gherkin = require('gherkin');
const parser = new Gherkin.Parser();
const linter = new NoConfigurableLinter(parser);
const createFile = (fileName) => ({
  content: fs.readFileSync(
    `test/linter/no-configurable-linter/${fileName}`,
    'utf-8'
  ),
});

describe('Linter', function() {
  it('detects up-to-one-background-per-file violations', function() {
    const actual = linter.lint(createFile('MultipleBackgrounds.feature'));
    const expected = [{
      'line': '9',
      'message': 'Multiple "Background" definitions in the same file are disallowed',
      'rule': 'up-to-one-background-per-file',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects no-tags-on-backgrounds violations', function() {
    const actual = linter.lint(createFile('TagOnBackground.feature'));
    const expected = [{
      'line': '4',
      'message': 'Tags on Backgrounds are dissallowed',
      'rule': 'no-tags-on-backgrounds',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects one-feature-per-file violations', function() {
    const actual = linter.lint(createFile('MultipleFeatures.feature'));
    const expected = [{
      'line': '7',
      'message': 'Multiple "Feature" definitions in the same file are disallowed',
      'rule': 'one-feature-per-file',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects no-multiline-steps violations', function() {
    const actual = linter.lint(createFile('MultilineStep.feature'));
    const expected = [{
      'line': '9',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects no-multiline-steps violations in backgrounds', function() {
    const actual = linter.lint(createFile('MultilineBackgroundStep.feature'));
    const expected = [{
      'line': '5',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects no-multiline-steps violations in scenario outlines', function() {
    const actual = linter.lint(createFile('MultilineScenarioOutlineStep.feature'));
    const expected = [{
      'line': '9',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('detects no-examples-in-scenarios violations', function() {
    const actual = linter.lint(createFile('ExampleInScenario.feature'));
    const expected = [{
      'line': '6',
      'message': 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead',
      'rule': 'no-examples-in-scenarios',
    }];
    assert.deepEqual(actual.getFailures(), expected);
  });

  it('parser throws an error with unexpected error message', () => {
    const error = {
      message: 'unexpected error',
    };
    const e = {
      errors: [error],
    };
    const wrongParser = {
      parse() {
        throw e;
      },
    };
    const wrongLinter = new NoConfigurableLinter(wrongParser);
    const actual = wrongLinter.lint(createFile('ExampleInScenario.feature'));
    assert.deepEqual(actual.getFailures(), [{
      rule: 'unexpected-error',
      message: error.message,
      line: undefined,
    }]);
  });

  it('parser throws an error without errors property', () => {
    const error = 'error';
    const wrongParser = {
      parse() {
        throw error;
      },
    };
    const wrongLinter = new NoConfigurableLinter(wrongParser);
    const test = () => wrongLinter.lint(createFile('ExampleInScenario.feature'));
    assert.throws(test, error);
  });
});
