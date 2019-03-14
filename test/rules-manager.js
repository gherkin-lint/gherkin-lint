var _ = require('lodash');
var expect = require('chai').expect;
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
var ERROR_ONE = 'error one';
var ERROR_TWO = 'error two';
var ERROR_THREE = 'error three';
var RULE = successRule(RULE_NAME);
var ANOTHER_RULE = successRule(ANOTHER_RULE_NAME);
var RULE_THAT_FAILS = errorRule(RULE_THAT_FAILS_NAME, ERROR_ONE);
var ANOTHER_RULE_THAT_FAILS = errorRule(ANOTHER_RULE_THAT_FAILS_NAME, [ERROR_TWO]);
var PRIORITY_RULE_THAT_FAILS = priorityErrorRule(PRIORITY_RULE_THAT_FAILS_NAME, ERROR_THREE);

var createRulesManager = function(rules) {
  return new RulesManager({
    rules: rules,
    errors: []
  });
};

describe('RulesManager', function() {
  describe('runAllEnabledRules', function() {
    it('returns the error with more priority rule when all rules are enabled', function() {
      var rulesManager = createRulesManager([
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        PRIORITY_RULE_THAT_FAILS,
        ANOTHER_RULE_THAT_FAILS
      ]);

      expect(rulesManager.runAllEnabledRules({}, {})).to.be.deep.equal([
        ERROR_THREE
      ]);
    });

    it('returns the concatenation of errors with low priority when the high priotity rule is disabled', function() {
      var rulesManager = createRulesManager([
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        ANOTHER_RULE_THAT_FAILS
      ]);

      expect(rulesManager.runAllEnabledRules({}, {})).to.be.deep.equal([
        ERROR_ONE,
        ERROR_TWO
      ]);
    });

    it('returns no errors when all rules are disabled', function() {
      var rulesManager = createRulesManager([]);

      expect(rulesManager.runAllEnabledRules({}, {})).to.be.deep.equal([]);
    });
  });

  describe('Rules manager receives a set of configurtion errors', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(function() {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });

    it('the errors are printed in the screen', function() {
      var errorMessage = 'error message';
      var errors = [errorMessage];
      new RulesManager({
        rules: [],
        errors: errors
      });

      var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Error(s) in configuration file:');
      expect(consoleErrorArgs[1]).to.include(errorMessage);
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });
});