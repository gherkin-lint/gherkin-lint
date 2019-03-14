var rule = 'another-custom-list';
var objectRuleValidation = require('../../../src/config-validation/object-rule-validation');
var availableConfigs = {
  'element': []
};

function custom() {
  return [
    {
      message: 'Another custom-list error',
      rule   : rule,
      line   : 109
    }
  ];
}

module.exports = {
  name: rule,
  run: custom,
  isValidConfig: objectRuleValidation(availableConfigs)
};
