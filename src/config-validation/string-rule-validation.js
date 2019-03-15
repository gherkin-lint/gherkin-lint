const genericErrorMsg = require('./generic-error-msg');
const wrongOption = (value) =>
  `The rule does not have the specified configuration option "${value}"`;

module.exports = function(availableConfigs) {
  return function(config) {
    const ruleConfig = config[this.name];
    const value = ruleConfig[1];
    if (availableConfigs.indexOf(value) === -1) {
      return [
        `${genericErrorMsg(this)} ${wrongOption(value)}`,
      ];
    }
    return [];
  };
};
