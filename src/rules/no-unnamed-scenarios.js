var rule = 'no-unnamed-scenarios';

function noUnNamedScenarios(feature) {
  var errors = [];
  if (feature && feature.children) {
    feature.children.forEach(function(scenario) {
      if (!scenario.name && scenario.type === 'Scenario') {
        errors.push({message: 'Missing Scenario name',
          rule   : rule,
          line   : scenario.location.line});
      }
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noUnNamedScenarios
};
