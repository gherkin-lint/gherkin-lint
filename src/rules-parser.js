const enablingSettings = ['on', 'off'];
const {Successes, Failures} = require('./successes-failures');
const RuleCommand = require('./rule-command');

function isValidEnablingSetting(enablingSetting) {
  return enablingSettings.indexOf(enablingSetting) !== -1;
}

function normalizeRule(rules, config, ruleName) {
  const rule = rules[ruleName];
  const ruleConfig = config[ruleName];
  if (!rule) {
    return Failures.of([{
      type: 'undefined-rule',
      message: `Rule "${ ruleName }" does not exist`,
    }]);
  } else if (Array.isArray(ruleConfig)) {
    if (!isValidEnablingSetting(ruleConfig[0])) {
      return Failures.of([{
        type: 'config',
        message: 'The first part of the config should be "on" or "off"',
      }]);
    }

    if (ruleConfig.length != 2 ) {
      return Failures.of([{
        type: 'config',
        message: 'The config should only have 2 parts.',
      }]);
    }
    const errorList = rule.isValidConfig(config);
    if (errorList.length > 0) {
      return Failures.of(errorList);
    } else if (ruleConfig[0] === 'off') {
      return Successes.of([]);
    }
    return Successes.of([new RuleCommand({
      name: rule.name,
      run: rule.run,
      init: rule.init,
      config: ruleConfig[1],
      suppressOtherRules: rule.suppressOtherRules,
    })]);
  } else {
    if (!isValidEnablingSetting(ruleConfig)) {
      return Failures.of([{
        type: 'config',
        message: 'The first part of the config should be "on" or "off"',
      }]);
    } else if (ruleConfig === 'off') {
      return Successes.of([]);
    }
    return Successes.of([new RuleCommand({
      name: rule.name,
      run: rule.run,
      init: rule.init,
      suppressOtherRules: rule.suppressOtherRules,
    })]);
  }
}

function RuleParser(rules, config) {
  this.config = config;
  this.rules = rules;
}

RuleParser.prototype.parse = function() {
  const {config, rules} = this;
  return Object.keys(config).reduce(function(result, ruleName) {
    return result.append(normalizeRule(rules, config, ruleName));
  }, Successes.of([]));
};

module.exports = RuleParser;
