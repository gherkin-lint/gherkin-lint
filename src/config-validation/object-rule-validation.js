var genericErrorMsg = require('./generic-error-msg');

module.exports = function (availableConfigs) {
  return function(config) {
    var rule = this;
    var ruleConfig = config[this.name];
    var value = ruleConfig[1];
    return Object.keys(value).reduce(function(errors, name) {
      if (availableConfigs[name] == undefined) {
        errors.push(genericErrorMsg(rule)
          + ' The rule does not have the specified configuration option "' + name + '"');
      }
      return errors;
    }, []);
  };
};
