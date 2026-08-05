const rule = 'no-unnamed-scenarios';
const gherkinUtils = require('./utils/gherkin.js');

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  gherkinUtils.getScenarios(feature).forEach(scenario => {
    if (!scenario.name) {
      errors.push({
        message: 'Missing Scenario name',
        rule   : rule,
        line   : scenario.location.line});
    }
  });
  return errors;
}

module.exports = {
  name: rule,
  run: run
};
