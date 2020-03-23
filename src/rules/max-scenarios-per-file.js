var _ = require('lodash');
var rule = 'max-scenarios-per-file';

var defaultConfig = {
  'maxScenarios': 10
};

function run(feature, unused, config) {
  if (!feature) {
    return [];
  }
  var errors = [];
  var mergedConfiguration = _.merge({}, defaultConfig, config);
  var maxScenarios = mergedConfiguration.maxScenarios;
  var count = feature.children.length;

  feature.children.forEach(function (child) {
    if (child.background) {
      count = count - 1;
    } else if (child.scenario.examples.length) {
      count = count - 1;
      child.scenario.examples.forEach(function (example) {
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
