module.exports = function(availableConfigs) {
  return function(config) {
    const ruleConfig = config[this.name];
    const value = ruleConfig[1];
    if (availableConfigs.indexOf(value) === -1) {
      return [{
        type: 'config-rule-error',
        rule: this.name,
        message: `The rule does not have the specified configuration option "${value}"`,
      }];
    }
    return [];
  };
};
