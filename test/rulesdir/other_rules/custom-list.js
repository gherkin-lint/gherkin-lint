const rule = 'another-custom-list';
const objectRuleValidation = require('../../../src/config-validation/object-rule-validation');
const availableConfigs = {
  'element': [],
};

function custom() {
  return [
    {
      type: 'rule',
      message: 'Another custom-list error',
      rule: rule,
      line: 109,
    },
  ];
}

module.exports = {
  name: rule,
  run: custom,
  isValidConfig: objectRuleValidation(availableConfigs),
};
