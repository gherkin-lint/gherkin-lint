var rule = 'max-scenarios-per-file';

function maxScenariosPerFile(feature, _, config) {
  var errors = [];
  var count = 0;
  var maxScenarios = config.maxScenarios;

  if (feature.children) {
    count = count + feature.children.length;

    feature.children.forEach(function (scenario) {
      if (scenario.type === 'Background') {
        count = count - 1;
      }

      if (scenario.examples) {
        count = count - 1;
        scenario.examples.forEach(function (example) {
          count = count + example.tableBody.length;
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
  availableConfigs: {
    'maxScenarios': 10
  }
};
