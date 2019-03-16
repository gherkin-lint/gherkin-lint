const _ = require('lodash');
const rule = 'no-unnamed-scenarios';

function noUnNamedScenarios(feature) {
  if (feature.children) {
    const errors = [];
    feature.children.forEach(function(scenario) {
      if (!scenario.name && scenario.type === 'Scenario') {
        errors.push({
          message: 'Missing Scenario name',
          rule: rule,
          line: scenario.location.line,
        });
      }
    });
    return errors;
  }
}

module.exports = {
  name: rule,
  run: noUnNamedScenarios,
  isValidConfig: _.stubTrue,
};
