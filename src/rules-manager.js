const logger = require('./logger');

function RulesManager(result) {
  if (!result.isSuccess()) {
    logger.boldError('Error(s) in configuration file:');
    result.getFailures().forEach(({rule, message}) => {
      const errorMessage = `Invalid rule configuration for "${rule}" - ${message}`;
      logger.error(`- ${errorMessage}`);
    });
    process.exit(1);
  }
  this.rules = result.getSuccesses();
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
