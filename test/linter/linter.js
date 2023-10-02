var assert = require('chai').assert;
var linter = require('../../dist/linter.js');


function linterTest(feature, expected) {
  return linter.lint([feature], {})
    .then((actual) => {
      assert.lengthOf(actual, 1);
      assert.deepEqual(actual[0].errors, expected);
    });
}

describe('Linter', function() {
  it('detects up-to-one-background-per-file violations', function() {
    let feature = 'test/linter/MultipleBackgrounds.feature';
    let expected = [{
      'line': '9',
      'message': 'Multiple "Background" definitions in the same file are disallowed',
      'rule': 'up-to-one-background-per-file'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-tags-on-backgrounds violations', function() {
    let feature = 'test/linter/TagOnBackground.feature';
    let expected = [{
      'line': '4',
      'message': 'Tags on Backgrounds are dissallowed',
      'rule': 'no-tags-on-backgrounds'
    }];
    
    return linterTest(feature, expected);
  });

  it('detects one-feature-per-file violations', function() {
    let feature = 'test/linter/MultipleFeatures.feature';
    let expected = [{
      'line': '7',
      'message': 'Multiple "Feature" definitions in the same file are disallowed',
      'rule': 'one-feature-per-file'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations', function() {
    let feature = 'test/linter/MultilineStep.feature';
    let expected = [{
      'line': '9',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations in backgrounds', function() {
    let feature = 'test/linter/MultilineBackgroundStep.feature';
    let expected = [{
      'line': '5',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations in scenario outlines', function() {
    let feature = 'test/linter/MultilineScenarioOutlineStep.feature';
    let expected = [{
      'line': '9',
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('correctly parses files that have the correct Gherkin format', function() {
    let feature = 'test/linter/NoViolations.feature';
    let expected = [];
    return linterTest(feature, expected);   
  });
});
