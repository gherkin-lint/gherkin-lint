module.exports = function(availableConfigs) {
  return function(config) {
    const rule = this;
    const ruleConfig = config[this.name];
    const value = ruleConfig[1];
    return Object.keys(value).reduce(function(errors, name) {
      if (availableConfigs[name] == undefined) {
        errors.push({
          type: 'config-rule-error',
          rule: rule.name,
          message: `The rule does not have the specified configuration option "${name}"`,
        });
      }
      return errors;
    }, []);
  };
};
