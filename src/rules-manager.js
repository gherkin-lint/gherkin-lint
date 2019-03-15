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
      const error = rule.run(feature, file, rule.config);

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
