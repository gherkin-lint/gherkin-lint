var expect = require('chai').expect;
var _ = require('lodash');
var RulesManager = require('../src/rules-manager.js');

var errorRule = function(name, error) {
  return {
    name: name,
    run: _.constant(error)
  };
};

var priorityErrorRule = function(name, error) {
  var rule = errorRule(name, error);
  rule.suppressOtherRules = true;
  return rule;
};

var successRule = function(name) {
  return {
    name: name,
    run: _.noop
  };
};

var RULE_NAME = 'rule-name';
var ANOTHER_RULE_NAME = 'another-rule-name';
var RULE_THAT_FAILS_NAME = 'rule-that-fails-name';
var ANOTHER_RULE_THAT_FAILS_NAME = 'another-rule-that-fails-name';
var PRIORITY_RULE_THAT_FAILS_NAME = 'rule-that-suppress-others-name';
var NON_EXISTENT_RULE_NAME = 'non-existent-rule-name';
var ERROR_ONE = 'error one';
var ERROR_TWO = 'error two';
var ERROR_THREE = 'error three';
var RULE = successRule(RULE_NAME);
var ANOTHER_RULE = successRule(ANOTHER_RULE_NAME);
var RULE_THAT_FAILS = errorRule(RULE_THAT_FAILS_NAME, ERROR_ONE);
var ANOTHER_RULE_THAT_FAILS = errorRule(ANOTHER_RULE_THAT_FAILS_NAME, [ERROR_TWO]);
var PRIORITY_RULE_THAT_FAILS = priorityErrorRule(PRIORITY_RULE_THAT_FAILS_NAME, ERROR_THREE);

var createRulesManager = function() {
  var rules = [
    RULE,
    RULE_THAT_FAILS,
    ANOTHER_RULE,
    PRIORITY_RULE_THAT_FAILS,
    ANOTHER_RULE_THAT_FAILS
  ];
  return new RulesManager(_.zipObject(_.map(rules, 'name'), rules));
};

describe('RulesManager', function() {
  describe('getRule', function() {
    it('returns the rule when it exists', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.getRule(RULE_NAME)).to.be.deep.equal(RULE);
    });

    it('returns undefined when rule does not exist', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.getRule(NON_EXISTENT_RULE_NAME)).to.be.equal(undefined);
    });
  });

  describe('doesRuleExist', function() {
    it('returns true when it exists', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.doesRuleExist(RULE_NAME)).to.be.deep.equal(true);
    });

    it('returns false when rule does not exist', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.doesRuleExist(NON_EXISTENT_RULE_NAME)).to.be.equal(false);
    });
  });

  describe('isRuleEnabled', function() {
    it('returns true when rule is the string "on"', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.isRuleEnabled('on')).to.be.deep.equal(true);
    });

    it('returns true when is array with first element "on"', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.isRuleEnabled(['on'])).to.be.equal(true);
    });

    it('otherwise it returns false', function() {
      var rulesManager = createRulesManager();

      expect(rulesManager.isRuleEnabled(['off'])).to.be.equal(false);
    });
  });

  describe('runAllEnabledRules', function() {
    it('returns the error with more priority rule when all rules are enabled', function() {
      var rulesManager = createRulesManager();
      var config = {};
      config[RULE_NAME] = ['on'];
      config[ANOTHER_RULE_NAME] = ['on'];
      config[RULE_THAT_FAILS_NAME] = ['on'];
      config[ANOTHER_RULE_THAT_FAILS_NAME] = ['on'];
      config[PRIORITY_RULE_THAT_FAILS_NAME] = ['on'];

      expect(rulesManager.runAllEnabledRules({}, {}, config)).to.be.deep.equal([
        ERROR_THREE
      ]);
    });

    it('returns the concatenation of errors with low priority when the high priotity rule is disabled', function() {
      var rulesManager = createRulesManager();
      var config = {};
      config[RULE_NAME] = ['on'];
      config[ANOTHER_RULE_NAME] = ['on'];
      config[RULE_THAT_FAILS_NAME] = ['on'];
      config[ANOTHER_RULE_THAT_FAILS_NAME] = ['on'];
      config[PRIORITY_RULE_THAT_FAILS_NAME] = ['off'];

      expect(rulesManager.runAllEnabledRules({}, {}, config)).to.be.deep.equal([
        ERROR_ONE,
        ERROR_TWO
      ]);
    });

    it('returns no errors when all rules are disabled', function() {
      var rulesManager = createRulesManager();
      var config = {};
      config[RULE_NAME] = ['off'];
      config[ANOTHER_RULE_NAME] = ['off'];
      config[RULE_THAT_FAILS_NAME] = ['off'];
      config[ANOTHER_RULE_THAT_FAILS_NAME] = ['off'];
      config[PRIORITY_RULE_THAT_FAILS_NAME] = ['off'];

      expect(rulesManager.runAllEnabledRules({}, {}, config)).to.be.deep.equal([]);
    });
  });
});