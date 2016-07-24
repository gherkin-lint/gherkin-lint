// Operations on rules

var fs = require('fs');
var path = require('path');
var rules; // Cashing list of rules, so that we only load them once

function getAllRules() {
  if (!rules) {
    rules = [];
    fs.readdirSync(path.join(__dirname, 'rules')).forEach(function(file) {
      rules.push(require(path.join(__dirname, 'rules', file)));
    });
  }
  return rules;
}

function getRule(rule) {
  var rules = getAllRules();
  for (var i = 0; i < rules.length; i ++) {
    if (rules[i].name === rule) {
      return rules[i];
    }
  }
}

function doesRuleExist(rule) {
  return getRule(rule) != undefined;
}

function isRuleEnabled(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig[0] === 'on';
  }
  return ruleConfig === 'on';
}

function runAllEnabledRules(parsedFile, fileName, configuration) {
  var errors = [];
  var ignoreFutureErrors = false;
  getAllRules().forEach(function(rule) {
    if (isRuleEnabled(configuration[rule.name]) && !ignoreFutureErrors) {
      var ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
      var error = rule.run(parsedFile, fileName, ruleConfig);

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
