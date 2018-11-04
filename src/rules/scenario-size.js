var rule = 'scenario-size';
var availableConfigs = {
  'steps-length': {
    'Background': 75,
    'Scenario': 75
  }
};

function scenarioSize(feature, fileName, configuration = availableConfigs) {
  const errors = [];
  if (feature.children) {
    feature.children.forEach((child) => {
      if (child.type ==='Background') {
        if (configuration['steps-length']['Background'] && child.steps.length > configuration['steps-length']['Background']) {
          errors.push(createError(child, configuration['steps-length']['Background']));
        }
      } else {
        if (configuration['steps-length']['Scenario'] && child.steps.length > configuration['steps-length']['Scenario']) {
          errors.push(createError(child, configuration['steps-length']['Scenario']));
        }               
      }
    });
  }
  return errors;
}

function createError(child, maxSize) {
  return {message: `Element ${child.type} too long: actual ${child.steps.length}, expected ${maxSize}`,
    rule   : 'scenario-size',
    line   : child.location.line};
}

module.exports = {
  name: rule,
  run: scenarioSize,
  availableConfigs: availableConfigs
};
