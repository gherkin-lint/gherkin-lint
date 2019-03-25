const _ = require('lodash');
const expect = require('chai').expect;
const RulesManager = require('../src/rules-manager.js');

const errorRule = function(name, error) {
  return {
    name: name,
    run: _.constant([error]),
  };
};

const priorityErrorRule = function(name, error) {
  const rule = errorRule(name, error);
  rule.suppressOtherRules = true;
  return rule;
};

const successRule = function(name) {
  return {
    name: name,
    run: _.constant([]),
  };
};

const RULE_NAME = 'rule-name';
const ANOTHER_RULE_NAME = 'another-rule-name';
const RULE_THAT_FAILS_NAME = 'rule-that-fails-name';
const ANOTHER_RULE_THAT_FAILS_NAME = 'another-rule-that-fails-name';
const PRIORITY_RULE_THAT_FAILS_NAME = 'rule-that-suppress-others-name';
const ERROR_ONE = 'error one';
const ERROR_TWO = 'error two';
const ERROR_THREE = 'error three';
const RULE = successRule(RULE_NAME);
const ANOTHER_RULE = successRule(ANOTHER_RULE_NAME);
const RULE_THAT_FAILS = errorRule(
  RULE_THAT_FAILS_NAME,
  ERROR_ONE);
const ANOTHER_RULE_THAT_FAILS = errorRule(
  ANOTHER_RULE_THAT_FAILS_NAME,
  [ERROR_TWO]);
const PRIORITY_RULE_THAT_FAILS = priorityErrorRule(
  PRIORITY_RULE_THAT_FAILS_NAME,
  ERROR_THREE);

const createRulesManager = function(rules) {
  return new RulesManager({
    rules: rules,
    errors: [],
  });
};

describe('RulesManager', function() {
  describe('runAllEnabledRules', function() {
    it('returns the error with more priority rule when all rules are enabled', function() {
      const rulesManager = createRulesManager([
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        PRIORITY_RULE_THAT_FAILS,
        ANOTHER_RULE_THAT_FAILS,
      ]);

      expect(rulesManager.runAllEnabledRules({}, {})).to.be.deep.equal([
        ERROR_THREE,
      ]);
    });

    it('returns the concatenation of errors with low priority when the high priotity rule is disabled', function() {
      const rulesManager = createRulesManager([
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        ANOTHER_RULE_THAT_FAILS,
      ]);

      expect(rulesManager.runAllEnabledRules({}, {})).to.be.deep.equal([
        ERROR_ONE,
        ERROR_TWO,
      ]);
    });

    it('returns no errors when all rules are disabled', function() {
      const rulesManager = createRulesManager([]);

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
      const errorMessage = 'error message';
      const errors = [errorMessage];
      new RulesManager({
        rules: [],
        errors: errors,
      });

      // eslint-disable-next-line no-console
      const consoleErrorArgs = console.error.args.map(function(args) {
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Error(s) in configuration file:');
      expect(consoleErrorArgs[1]).to.include(errorMessage);
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });
});
