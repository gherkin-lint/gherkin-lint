var _ = require('lodash');
var rule = 'max-scenarios-per-file';

var defaultConfig = {
  'maxScenarios': 10
};

function maxScenariosPerFile(feature, unused, config) {
  var errors = [];
  var count = 0;
  var mergedConfiguration = _.merge({}, defaultConfig, config);
  var maxScenarios = mergedConfiguration.maxScenarios;

  if (feature.children) {
    count = count + feature.children.length;

    feature.children.forEach(function (scenario) {
      if (scenario.type === 'Background') {
        count = count - 1;
      }

      if (scenario.examples) {
        count = count - 1;
        scenario.examples.forEach(function (example) {
          if (example.tableBody) {
            count = count + example.tableBody.length;
          }
        });
      }
    });
  }

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
  run: maxScenariosPerFile,
  availableConfigs: defaultConfig
};
