var _ = require('lodash');
var rule = 'name-length';

var availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70
};

var errors = [];

function test(name, location, configuration, type) {
  if (name && (name.length > configuration[type])) {
    errors.push({message: type + ' name is too long. Length of ' + name.length + ' is longer than the maximum allowed: ' + configuration[type],
                 rule   : rule,
                 line   : location.line});
  }
}

function nameLength(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return;
  }
  var mergedConfiguration = _.merge(availableConfigs, configuration);
  errors = [];

  // Check Feature name length
  test(feature.name, feature.location, mergedConfiguration, 'Feature');

  feature.children.forEach(function(child) {
    switch(child.type) {
    case 'Scenario':
    case 'ScenarioOutline':
      // Check Scenario name length
      test(child.name, child.location, mergedConfiguration, 'Scenario');
      break;
    case 'Background':
      break;
    default:
      errors.push({message: 'Unknown gherkin node type ' + child.type,
                   rule   : rule,
                   line   : child.location.line});
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
  availableConfigs: availableConfigs
};
