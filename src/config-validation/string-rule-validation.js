var genericErrorMsg = require('./generic-error-msg');

module.exports = function (availableConfigs) {
  return function(config) {
    var ruleConfig = config[this.name];
    var value = ruleConfig[1];
    if (availableConfigs.indexOf(value) === -1) {
      return [
        genericErrorMsg(this) + ' The rule does not have the specified configuration option "' + value + '"'
      ];
    }
    return [];
  };
};
