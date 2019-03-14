var assert = require('chai').assert;
var getRules = require('../src/get-rules.js');
var RulesParser = require('../src/rules-parser.js');

var hasRules = function(rulesOrErrors, expectedRules) {
  if (rulesOrErrors.errors.length > 0) {
    assert.fail('Expected no errors. Found: ' + rulesOrErrors.errors);
  }
  var rules = rulesOrErrors.rules.map(function(rule) {
    return {
      name: rule.name,
      config: rule.config
    };
  });
  assert.deepEqual(rules, expectedRules);
};

var hasErrors = function(rulesOrErrors, expectedErrors) {
  if (rulesOrErrors.errors.length <= 0) {
    assert.fail('Expected errors but not found');
  }
  assert.deepEqual(rulesOrErrors.errors, expectedErrors);
};

describe('Rule Parser', function() {
  context('When there are rules enabled and disabled', function() {
    it('return the list of enabled rules', function() {
      var rulesOrErrors = new RulesParser(getRules(), {
        'no-files-without-scenarios' : 'on',
        'no-multiple-empty-lines': 'off',
        'no-trailing-spaces': 'on'
      }).parse();
      hasRules(rulesOrErrors, [{
        name: 'no-files-without-scenarios',
        config: {}
      }, {
        name: 'no-trailing-spaces',
        config: {}
      }]);
    });
  });

  context('when the rule has enabled array configuration', function() {
    it('the rule has the configuration defined in second array item', function() {
      var rulesOrErrors = new RulesParser(getRules(), {
        'new-line-at-eof': ['on', 'yes']
      }).parse();
      hasRules(rulesOrErrors, [{
        name: 'new-line-at-eof',
        config: 'yes'
      }]);
    });
  });

  context('when the rule has disabled array configuration', function() {
    it('the rule is not returned', function() {
      var rulesOrErrors = new RulesParser(getRules(), {
        'indentation': ['off', {
          'Feature': 1,
          'Background': 1,
          'Scenario': 1,
          'Step': 1,
          'given': 1,
          'and': 1
        }]
      }).parse();
      hasRules(rulesOrErrors, []);
    });
  });

  describe('Verification fails when', function() {
    it('a non existing rule', function() {
      var rulesOrErrors = new RulesParser(getRules(), {'fake-rule': 'on'}).parse();
      hasErrors(rulesOrErrors, ['Rule "fake-rule" does not exist']);
    });

    it('a non existing rule sub-config', function() {
      var rulesOrErrors = new RulesParser(getRules(), {
        'indentation': ['on', { 'featur': 0}],
        'new-line-at-eof': ['on', 'y']
      }).parse();
      hasErrors(rulesOrErrors, [
        'Invalid rule configuration for "indentation" -  The rule does not have the specified configuration option "featur"',
        'Invalid rule configuration for "new-line-at-eof" -  The rule does not have the specified configuration option "y"'
      ]);
    });
  });
});

