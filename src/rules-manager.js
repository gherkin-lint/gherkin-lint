const logger = require('./logger');

function RulesManager(rulesOrErrors) {
  if (rulesOrErrors.errors.length > 0) {
    logger.boldError('Error(s) in configuration file:');
    rulesOrErrors.errors.forEach(function(error) {
      logger.error(`- ${error}`);
    });
    process.exit(1);
  }
  this.rules = rulesOrErrors.rules;
}

RulesManager.prototype.runAllEnabledRules = function(feature, file) {
  let errors = [];
  let ignoreFutureErrors = false;

  this.rules.forEach(function(rule) {
    if (!ignoreFutureErrors) {
      const ruleErrors = rule.execute({feature, file});

      if (rule.hasPriority()) {
        errors = ruleErrors;
        ignoreFutureErrors = true;
      } else {
        errors = errors.concat(...ruleErrors);
      }
    }
  });
  return errors;
};

module.exports = RulesManager;
