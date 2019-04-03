const expect = require('chai').expect;
const {Successes, Failures} = require('../../../src/successes-failures');
const ConfigurableLinter = require('../../../src/linter/configurable-linter');

const errorRule = function(name, error) {
  return {
    name: name,
    execute: () => [error],
    hasPriority: () => false,
  };
};

const priorityErrorRule = function(name, error) {
  const rule = errorRule(name, error);
  rule.hasPriority = () => true;
  return rule;
};

const successRule = function(name) {
  return {
    name: name,
    execute: () => [],
    hasPriority: () => false,
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

const successfulNoConfigurableLinter = {
  lint() {
    return Successes.of([{}]);
  },
};
const file = {};

describe('ConfigurableLinter', function() {
  describe('lint', function() {
    it('returns the error with more priority rule when all rules are enabled', function() {
      const linter = new ConfigurableLinter(successfulNoConfigurableLinter, [
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        PRIORITY_RULE_THAT_FAILS,
        ANOTHER_RULE_THAT_FAILS,
      ]);

      expect(linter.lint(file)).to.be.deep.equal([
        ERROR_THREE,
      ]);
    });

    it('returns the concatenation of errors with low priority when the high priotity rule is disabled', function() {
      const linter = new ConfigurableLinter(successfulNoConfigurableLinter, [
        RULE,
        RULE_THAT_FAILS,
        ANOTHER_RULE,
        ANOTHER_RULE_THAT_FAILS,
      ]);

      expect(linter.lint(file)).to.be.deep.equal([
        ERROR_ONE,
        ERROR_TWO,
      ]);
    });

    it('returns no errors when all rules are disabled', function() {
      const linter = new ConfigurableLinter(successfulNoConfigurableLinter, []);

      expect(linter.lint({})).to.be.deep.equal([]);
    });
  });

  describe('configurable linter has a no configurable that fails', function() {
    it('no configurable linter failures are returned', function() {
      const rule = 'my-rule';
      const error = {
        rule,
        message: 'error message',
      };
      const failedNoConfigurableLinter = {
        lint() {
          return Failures.of([error]);
        },
      };
      const linter = new ConfigurableLinter(failedNoConfigurableLinter, [
        RULE,
        ANOTHER_RULE,
        PRIORITY_RULE_THAT_FAILS,
      ]);

      expect(linter.lint(file)).to.be.deep.equal([error]);
    });
  });
});
