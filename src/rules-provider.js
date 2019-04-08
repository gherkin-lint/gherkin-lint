const fs = require('fs');
const path = require('path');

class RulesProvider {
  constructor(rulesDirs) {
    this.rulesDirs = rulesDirs;
  }

  provide() {
    const rules = {};
    this.rulesDirs.forEach((rulesDir) => {
      rulesDir = path.resolve(rulesDir);
      fs.readdirSync(rulesDir).forEach(function(file) {
        const rule = require(path.join(rulesDir, file));
        rules[rule.name] = rule;
      });
    });
    return rules;
  }
}

module.exports = RulesProvider;
