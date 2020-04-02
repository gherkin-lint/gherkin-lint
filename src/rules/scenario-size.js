const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const rule = 'scenario-size';
const availableConfigs = {
  'steps-length': {
    'Background': 15,
    'Scenario': 15
  }
};

function run(feature, unused, configuration) {
  if (!feature || !feature.children) {
    return;
  }

  if (_.isEmpty(configuration)) {
    configuration = availableConfigs;
  }

  let errors = [];
  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    const nodeType = gherkinUtils.getNodeType(node, feature.language);
    const configKey = child.background ? 'Background' : 'Scenario';
    const maxSize = configuration['steps-length'][configKey];

    if (maxSize && node.steps.length > maxSize) {
      errors.push({
        message: `Element ${nodeType} too long: actual ${node.steps.length}, expected ${maxSize}`,
        rule   : 'scenario-size',
        line   : node.location.line
      });
    }
  });

  return errors;
}


module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
