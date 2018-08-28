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

module.exports = getAllRules;
