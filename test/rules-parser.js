const assert = require('chai').assert;
const getRules = require('../src/get-rules.js');
const RulesParser = require('../src/rules-parser.js');

const hasRules = function(rulesOrErrors, expectedRules) {
  if (!rulesOrErrors.isSuccess()) {
    assert.fail(`Expected no errors. Found: ${ rulesOrErrors.errors}`);
  }
  const rules = rulesOrErrors.getSuccesses().map(function(rule) {
    return {
      name: rule.name,
      config: rule.config,
    };
  });
  assert.deepEqual(rules, expectedRules);
};

const hasErrors = function(rulesOrErrors, expectedErrors) {
  if (rulesOrErrors.isSuccess()) {
    assert.fail('Expected errors but not found');
  }
  assert.deepEqual(rulesOrErrors.getFailures(), [{
    type: 'config-error',
    message: 'Error(s) in configuration file:',
    errors: expectedErrors,
  }]);
};

describe('Rule Parser', function() {
  context('When there are rules enabled and disabled', function() {
    it('return the list of enabled rules', function() {
      const rulesOrErrors = new RulesParser(getRules(), {
        'no-files-without-scenarios': 'on',
        'no-multiple-empty-lines': 'off',
        'no-trailing-spaces': 'on',
      }).parse();
      hasRules(rulesOrErrors, [{
        name: 'no-files-without-scenarios',
        config: {},
      }, {
        name: 'no-trailing-spaces',
        config: {},
      }]);
    });
  });

  context('when the rule has enabled array configuration', function() {
    it('the rule has the configuration defined in second array item', function() {
      const rulesOrErrors = new RulesParser(getRules(), {
        'new-line-at-eof': ['on', 'yes'],
      }).parse();
      hasRules(rulesOrErrors, [{
        name: 'new-line-at-eof',
        config: 'yes',
      }]);
    });
  });

  context('when the rule has disabled array configuration', function() {
    it('the rule is not returned', function() {
      const rulesOrErrors = new RulesParser(getRules(), {
        'indentation': ['off', {
          'Feature': 1,
          'Background': 1,
          'Scenario': 1,
          'Step': 1,
          'given': 1,
          'and': 1,
        }],
      }).parse();
      hasRules(rulesOrErrors, []);
    });
  });

  describe('Verification fails when', function() {
    it('a non existing rule', function() {
      const rulesOrErrors = new RulesParser(getRules(), {'fake-rule': 'on'}).parse();
      hasErrors(rulesOrErrors, [{
        type: 'undefined-rule',
        message: 'Rule "fake-rule" does not exist',
      }]);
    });

    it('first item is not "on" or "off"', function() {
      const rulesOrErrors = new RulesParser(getRules(), {'indentation': ['yes', {}]})
        .parse();
      hasErrors(rulesOrErrors, [{
        type: 'config-rule-error',
        message: 'The first part of config should be "on" or "off"',
      }]);
    });

    it('array config does not have 2 items', function() {
      const rulesOrErrors = new RulesParser(getRules(), {'indentation': ['on', {}, 2]})
        .parse();
      hasErrors(rulesOrErrors, [{
        type: 'config-rule-error',
        message: 'The config should only have 2 parts.',
      }]);
    });

    it('a non existing rule sub-config', function() {
      const rulesOrErrors = new RulesParser(getRules(), {
        'indentation': ['on', {'featur': 0}],
        'new-line-at-eof': ['on', 'y'],
      }).parse();
      hasErrors(rulesOrErrors, [{
        type: 'config-rule-error',
        rule: 'indentation',
        message: 'The rule does not have the specified configuration option "featur"',
      }, {
        type: 'config-rule-error',
        rule: 'new-line-at-eof',
        message: 'The rule does not have the specified configuration option "y"',
      }]);
    });

    it('string config is not "on" or "off"', function() {
      const rulesOrErrors = new RulesParser(getRules(), {'indentation': 'no'})
        .parse();
      hasErrors(rulesOrErrors, [{
        type: 'config-rule-error',
        message: 'config should be "on" or "off"',
      }]);
    });
  });
});

