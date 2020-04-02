const _ = require('lodash');
const rule = 'max-scenarios-per-file';

const defaultConfig = {
  'maxScenarios': 10,
  'countOutlineExamples': true
};

function run(feature, unused, config) {
  if (!feature) {
    return [];
  }
  let errors = [];
  const mergedConfiguration = _.merge({}, defaultConfig, config);
  const maxScenarios = mergedConfiguration.maxScenarios;
  let count = feature.children.length;

  feature.children.forEach(child => {
    if (child.background) {
      count = count - 1;
    } else if (child.scenario.examples.length  && mergedConfiguration.countOutlineExamples) {
      count = count - 1;
      child.scenario.examples.forEach(example => {
        if (example.tableBody) {
          count = count + example.tableBody.length;
        }
      });
    }
  });

  if (count > maxScenarios) {
    errors.push({
      message: 'Number of scenarios exceeds maximum: ' + count + '/' + maxScenarios,
      rule,
      line: 0
    });
  }

  return errors;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: defaultConfig
};
