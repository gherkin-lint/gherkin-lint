const _ = require('lodash');
const rule = 'name-length';

const availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70
};

let errors = [];

function test(name, location, configuration, type) {
  if (name && (name.length > configuration[type])) {
    errors.push({message: type + ' name is too long. Length of ' + name.length + ' is longer than the maximum allowed: ' + configuration[type],
      rule   : rule,
      line   : location.line});
  }
}

function testSteps(node, mergedConfiguration) {
  node.steps.forEach(function(step) {
    // Check Step name length
    test(step.text, step.location, mergedConfiguration, 'Step');
  });
}

function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  errors = [];
  const mergedConfiguration = _.merge(availableConfigs, configuration);
  
  // Check Feature name length
  test(feature.name, feature.location, mergedConfiguration, 'Feature');

  feature.children.forEach(function(child) { 
    if (child.background) {
      testSteps(child.background, mergedConfiguration);
    } else {
      test(child.scenario.name, child.scenario.location, mergedConfiguration, 'Scenario');
      testSteps(child.scenario, mergedConfiguration);
    }
  });

  return errors;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
