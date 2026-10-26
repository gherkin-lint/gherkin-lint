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
  it('detects up-to-one-background-per-scope violations', function() {
    let feature = 'test/linter/MultipleBackgrounds.feature';
    let expected = [{
      'line': 9,
      'message': 'Multiple "Background" definitions in the same Feature or Rule are disallowed',
      'rule': 'up-to-one-background-per-scope'
    }];
    return linterTest(feature, expected);
  });

  it('allows a Background in the Feature and in each Rule', function() {
    let feature = 'test/linter/MultipleScopedBackgrounds.feature';
    return linterTest(feature, []);
  });

  it('detects no-tags-on-backgrounds violations', function() {
    let feature = 'test/linter/TagOnBackground.feature';
    let expected = [{
      'line': 4,
      'message': 'Tags on Backgrounds are disallowed',
      'rule': 'no-tags-on-backgrounds'
    }];
    
    return linterTest(feature, expected);
  });

  it('detects one-feature-per-file violations', function() {
    let feature = 'test/linter/MultipleFeatures.feature';
    let expected = [{
      'line': 7,
      'message': 'Multiple "Feature" definitions in the same file are disallowed',
      'rule': 'one-feature-per-file'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations', function() {
    let feature = 'test/linter/MultilineStep.feature';
    let expected = [{
      'line': 9,
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations in backgrounds', function() {
    let feature = 'test/linter/MultilineBackgroundStep.feature';
    let expected = [{
      'line': 5,
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('detects no-multiline-steps violations in scenario outlines', function() {
    let feature = 'test/linter/MultilineScenarioOutlineStep.feature';
    let expected = [{
      'line': 9,
      'message': 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
      'rule': 'no-multiline-steps'
    }];
    return linterTest(feature, expected);
  });

  it('detects additional violations that happen after the \'no-tags-on-backgrounds\' rule', function() {
    let feature = 'test/linter/MultipleViolations.feature';
    let expected = [
      {
        message: 'Tags on Backgrounds are disallowed',
        rule: 'no-tags-on-backgrounds',
        line: 4
      }
    ];

    linter.lint([feature])
      .then((actual) => {
        assert.deepEqual(actual[0].errors, expected);
      });    
  });

  it('correctly parses files that have the correct Gherkin format', function() {
    let feature = 'test/linter/NoViolations.feature';
    let expected = [];
    return linterTest(feature, expected);   
  });
});
