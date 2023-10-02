// Operations on rules
const glob = require('glob');
const path = require('path');

function getAllRules(additionalRulesDirs) {
  let rules = {};

  const rulesDirs = [
    path.join(__dirname, 'rules')
  ].concat(additionalRulesDirs || []);

  rulesDirs.forEach(rulesDir => {
    rulesDir = path.resolve(rulesDir);
    glob.sync(`${rulesDir}/*.js`).forEach(file => {
      const rule = require(file);
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
  let errors = [];
  const rules = getAllRules(additionalRulesDirs);
  Object.keys(rules).forEach(ruleName => {
    let rule = rules[ruleName];
    if (isRuleEnabled(configuration.rules[rule.name])) {
      const ruleConfig = Array.isArray(configuration.rules[rule.name]) ? configuration.rules[rule.name][1] : {};
      const error = rule.run(feature, file, ruleConfig);
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
  getRule: getRule,
  getAllRules: getAllRules
};
