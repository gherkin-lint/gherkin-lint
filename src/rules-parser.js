var enablingSettings = ['on', 'off'];
var genericErrorMsg = require('./config-validation/generic-error-msg');

function errors(errorList) {
  return {
    rules: [],
    errors: errorList
  };
}

function error(message) {
  return errors([message]);
}

function success(rule) {
  return {
    rules: [rule],
    errors: []
  };
}

function isValidEnablingSetting(enablingSetting) {
  return enablingSettings.indexOf(enablingSetting) !== -1;
}

function normalizeRule(rules, config, ruleName) {
  var rule = rules[ruleName];
  var ruleConfig = config[ruleName];
  if (!rule) {
    return error('Rule "' + ruleName + '" does not exist');
  } else if (Array.isArray(ruleConfig)) {
    if (!isValidEnablingSetting(ruleConfig[0])) {
      return error(genericErrorMsg(rule) + 'The first part of the config should be "on" or "off"');
    }

    if (ruleConfig.length != 2 ) {
      return error(genericErrorMsg(rule) + ' The config should only have 2 parts.');
    }
    var errorList = rule.isValidConfig(config);
    if (errorList.length > 0) {
      return errors(errorList);
    } else if (ruleConfig[0] === 'off') {
      return errors([]);
    }
    return success({
      name: rule.name,
      run: rule.run,
      config: ruleConfig[1],
      suppressOtherRules: rule.suppressOtherRules
    });
  } else {
    if (!isValidEnablingSetting(ruleConfig)) {
      return error(genericErrorMsg(rule) + 'The first part of the config should be "on" or "off"');
    } else if (ruleConfig === 'off') {
      return errors([]);
    }
    return success({
      name: rule.name,
      run: rule.run,
      config: {},
      suppressOtherRules: rule.suppressOtherRules
    });
  }
}

function append(summary, results) {
  [].push.apply(summary.rules, results.rules);
  [].push.apply(summary.errors, results.errors);
  return summary;
}

function RuleParser(rules, config) {
  this.config = config;
  this.rules = rules;
}

RuleParser.prototype.parse = function() {
  var rules = this.rules;
  var config = this.config;
  return Object.keys(config).reduce(function(result, ruleName) {
    return append(result, normalizeRule(rules, config, ruleName));
  }, errors([]));
};

module.exports = RuleParser;
