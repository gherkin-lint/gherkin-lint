// Operations on rules

function RulesManager(rules) {
  this.rules = rules;
}

RulesManager.prototype.getRule = function(rule) {
  return this.rules[rule];
};

RulesManager.prototype.doesRuleExist = function(rule) {
  return this.getRule(rule) !== undefined;
};

RulesManager.prototype.isRuleEnabled = function(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig[0] === 'on';
  }
  return ruleConfig === 'on';
};

RulesManager.prototype.runAllEnabledRules = function(feature, file, configuration) {
  var errors = [];
  var ignoreFutureErrors = false;
  var rules = this.rules;
  var isRuleEnabled = this.isRuleEnabled;
  Object.keys(rules).forEach(function(ruleName) {
    var rule = rules[ruleName];
    if (isRuleEnabled(configuration[rule.name]) && !ignoreFutureErrors) {
      var ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
      var error = rule.run(feature, file, ruleConfig);

      if (error) {
        if (rule.suppressOtherRules) {
          errors = [error];
          ignoreFutureErrors = true;
        } else {
          errors = errors.concat(error);
        }
      }
    }
  });
  return errors;
};

module.exports = RulesManager;
