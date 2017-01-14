// Operations on rules

var fs = require('fs');
var path = require('path');
var rules; // Cashing list of rules, so that we only load them once

function getAllRules() {
  if (!rules) {
    rules = {};
    fs.readdirSync(path.join(__dirname, 'rules')).forEach(function(file) {
      var ruleName = file.replace(/\.js$/, '');
      rules[ruleName] = require(path.join(__dirname, 'rules', file));
    });
  }
  return rules;
}

function getRule(rule) {
  return getAllRules()[rule];
}

function doesRuleExist(rule) {
  return getRule(rule) !== undefined;
}

function isRuleEnabled(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig[0] === 'on';
  }
  return ruleConfig === 'on';
}

function runAllEnabledRules(parsedFile, file, configuration) {
  var errors = [];
  var ignoreFutureErrors = false;
  var rules = getAllRules();
  Object.keys(rules).forEach(function(ruleName) {
    var rule = rules[ruleName];
    if (isRuleEnabled(configuration[rule.name]) && !ignoreFutureErrors) {
      var ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
      var error = rule.run(parsedFile, file, ruleConfig);

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
}


module.exports = {
  doesRuleExist: doesRuleExist,
  isRuleEnabled: isRuleEnabled,
  runAllEnabledRules: runAllEnabledRules,
  getRule: getRule
};
