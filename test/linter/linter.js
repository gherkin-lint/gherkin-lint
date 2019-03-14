var assert = require('chai').assert;
var getRules = require('../../src/get-rules');
var RulesParser = require('../../src/rules-parser');
var RulesManager = require('../../src/rules-manager');
var Linter = require('../../src/linter.js');
var rulesParser = new RulesParser(getRules(), {});
var rulesManager = new RulesManager(rulesParser.parse());
var linter = new Linter(rulesManager);

describe('Linter', function() {
  it('detects up-to-one-background-per-file violations', function() {
    var actual = linter.lint(['test/linter/MultipleBackgrounds.feature']);
    var expected = [{
      'line': '9',
      'message': 'Multiple \"Background\" definitions in the same file are disallowed',
      'rule': 'up-to-one-background-per-file'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects no-tags-on-backgrounds violations', function() {
    var actual = linter.lint(['test/linter/TagOnBackground.feature']);
    var expected = [{
      'line': '4',
      'message': 'Tags on Backgrounds are dissallowed',
      'rule': 'no-tags-on-backgrounds'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects one-feature-per-file violations', function() {
    var actual = linter.lint(['test/linter/MultipleFeatures.feature']);
    var expected = [{
      'line': '7',
      'message': 'Multiple \"Feature\" definitions in the same file are disallowed',
      'rule': 'one-feature-per-file'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects no-multiline-steps violations', function() {
    var actual = linter.lint(['test/linter/MultilineStep.feature']);
    //console.log(actual)
    var expected = [{
      'line': '9',
      'message': 'Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects no-multiline-steps violations in backgrounds', function() {
    var actual = linter.lint(['test/linter/MultilineBackgroundStep.feature']);
    //console.log(actual)
    var expected = [{
      'line': '5',
      'message': 'Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects no-multiline-steps violations in scenario outlines', function() {
    var actual = linter.lint(['test/linter/MultilineScenarioOutlineStep.feature']);
    //console.log(actual)
    var expected = [{
      'line': '9',
      'message': 'Steps should begin with \"Given\", \"When\", \"Then\", \"And\" or \"But\". Multiline steps are dissallowed',
      'rule': 'no-multiline-steps'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });

  it('detects no-examples-in-scenarios violations', function() {
    var actual = linter.lint(['test/linter/ExampleInScenario.feature']);
    //console.log(actual)
    var expected = [{
      'line': '6',
      'message': 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead',
      'rule': 'no-examples-in-scenarios'
    }];
    assert.lengthOf(actual, 1);
    assert.deepEqual(actual[0].errors, expected);
  });
});
