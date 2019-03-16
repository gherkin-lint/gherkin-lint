const _ = require('lodash');
const rule = 'name-length';
const objectRuleValidation = require('../config-validation/object-rule-validation');

const availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70,
};

let errors = [];

function test(name, location, configuration, type) {
  const expectedLength = configuration[type];
  const length = name && name.length;
  if (length > expectedLength) {
    errors.push({
      message: `${type} name is too long. Length of ${length} ` +
        `is longer than the maximum allowed: ${expectedLength}`,
      rule: rule,
      line: location.line,
    });
  }
}

function nameLength(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return;
  }
  const mergedConfiguration = _.merge(availableConfigs, configuration);
  errors = [];

  // Check Feature name length
  test(feature.name, feature.location, mergedConfiguration, 'Feature');

  feature.children.forEach(function(child) {
    switch (child.type) {
    case 'Scenario':
    case 'ScenarioOutline':
      // Check Scenario name length
      test(child.name, child.location, mergedConfiguration, 'Scenario');
      break;
    case 'Background':
      break;
    default:
      errors.push({
        message: `Unknown gherkin node type ${child.type}`,
        rule: rule,
        line: child.location.line,
      });
      break;
    }

    child.steps.forEach(function(step) {
      // Check Step name length
      test(step.text, step.location, mergedConfiguration, 'Step');
    });
  });

  return errors;
}

module.exports = {
  name: rule,
  run: nameLength,
  isValidConfig: objectRuleValidation(availableConfigs),
};
