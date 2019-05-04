// Operations on rules

var fs = require('fs');
var path = require('path');

function getAllRules(additionalRulesDirs) {
  var rules = {};
  var rulesDirs = [
    path.join(__dirname, 'rules')
  ].concat(additionalRulesDirs || []);
  rulesDirs.forEach(function(rulesDir) {
    rulesDir = path.resolve(rulesDir);
    fs.readdirSync(rulesDir).forEach(function(file) {
      var rule = require(path.join(rulesDir, file));
      rules[rule.name] = rule;
    });
  });
  return rules;
}

function getRule(rule, additionalRulesDirs) {
  return getAllRules(additionalRulesDirs)[rule];
}

function doesRuleExist(rule, additionalRulesDirs) {
  return getRule(rule, additionalRulesDirs) !== undefined;
}

function isRuleEnabled(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig[0] === 'on';
  }
  return ruleConfig === 'on';
}

function runAllEnabledRules(feature, file, configuration, additionalRulesDirs) {
  var errors = [];
  var ignoreFutureErrors = false;
  var rules = getAllRules(additionalRulesDirs);
  Object.keys(rules).forEach(function(ruleName) {
    var rule = rules[ruleName];
    if (isRuleEnabled(configuration[rule.name]) && !ignoreFutureErrors) {
      var ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
      var error = rule.run(feature, file, ruleConfig);

      if (error) {
        errors = errors.concat(error);
      }
    }
  });
  return errors;
}


module.exports = {
  doesRuleExist: doesRuleExist,
  isRuleEnabled: isRuleEnabled,
  runAllEnabledRules: runAllEnabledRules,
  getRule: getRule
};
