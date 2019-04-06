const fs = require('fs');
const path = require('path');

function getAllRules(additionalRulesDirs) {
  const rules = {};
  const rulesDirs = [
    path.join(__dirname, 'rules'),
  ].concat(additionalRulesDirs || []);
  rulesDirs.forEach(function(rulesDir) {
    rulesDir = path.resolve(rulesDir);
    fs.readdirSync(rulesDir).forEach(function(file) {
      const rule = require(path.join(rulesDir, file));
      rules[rule.name] = rule;
    });
  });
  return rules;
}

module.exports = getAllRules;
