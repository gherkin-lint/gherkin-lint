const _ = require('lodash');
const rule = 'max-scenarios-per-file';
const objectRuleValidation = require('../config-validation/object-rule-validation');

const defaultConfig = {
  'maxScenarios': 10,
};

function maxScenariosPerFile(feature, unused, config) {
  const errors = [];
  let count = 0;
  const mergedConfiguration = _.merge({}, defaultConfig, config);
  const maxScenarios = mergedConfiguration.maxScenarios;

  if (feature.children) {
    count = count + feature.children.length;

    feature.children.forEach(function(scenario) {
      if (scenario.type === 'Background') {
        count = count - 1;
      }

      if (scenario.examples) {
        count = count - 1;
        scenario.examples.forEach(function(example) {
          count = count + example.tableBody.length;
        });
      }
    });
  }

  if (count > maxScenarios) {
    errors.push({
      message: `Number of scenarios exceeds maximum: ${ count }/${ maxScenarios}`,
      rule,
      line: 0,
    });
  }

  return errors;
}

module.exports = {
  name: rule,
  run: maxScenariosPerFile,
  isValidConfig: objectRuleValidation(defaultConfig),
};
