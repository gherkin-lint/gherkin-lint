var rule = 'no-unnamed-scenarios';

function noUnNamedScenarios(feature) {
  if (feature.children) {
    var errors = [];
    feature.children.forEach(function(scenario) {
      if (!scenario.name && scenario.type === 'Scenario') {
        errors.push({message: 'Missing Scenario name',
          rule   : rule,
          line   : scenario.location.line});
      }
    });
    return errors;
  }
}

module.exports = {
  name: rule,
  run: noUnNamedScenarios
};
