var assert = require('chai').assert;
var linter = require('../../dist/linter.js');


function linterTest(feature, expected, language = 'en') {
  return linter.lint([feature], {}, '', language)
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

  it('detects additional violations that happen after the \'no-tags-on-backgrounds\' rule', function() {
    let feature = 'test/linter/MultipleViolations.feature';
    let expected = [ 
      { 
        message: 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are dissallowed',
        rule: 'no-multiline-steps',
        line: '13' },
      { 
        message: 'Tags on Backgrounds are dissallowed',
        rule: 'no-tags-on-backgrounds',
        line: '4'
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

  it('correctly parses files that have the correct Gherkin format in French', function() {
    let feature = 'test/linter/FeatureInFrenchNoViolations.feature';
    let expected = [];
    return linterTest(feature, expected, 'fr');   
  });

  it('detect when language is not in French', function() {
    let feature = 'test/linter/NoViolations.feature';
    let expected = [
      {
        'line': '1',
        'message': 'Multiple "Feature" definitions in the same file are disallowed',
        'rule': 'one-feature-per-file'
      },
      {
        'line': '3',
        'message': 'Multiple "Background" definitions in the same file are disallowed',
        'rule': 'up-to-one-background-per-file'
      },
      {
        'line': '4',
        // eslint-disable-next-line
        'message': "(4:3): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Given I have a Feature file'",
        'rule': 'unexpected-error'
      },
      {
        'line': '6',
        // eslint-disable-next-line
        'message': "(6:1): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Scenario: This is a Scenario'",
        'rule': 'unexpected-error'
      },
      {
        'line': '7',
        // eslint-disable-next-line
        'message': "(7:3): expected: #EOF, #Language, #TagLine, #FeatureLine, #Comment, #Empty, got 'Then this is a step'",
        'rule': 'unexpected-error'
      }
    ];
    return linterTest(feature, expected, 'fr');   
  });
});
