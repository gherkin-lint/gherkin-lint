var rule = 'no-unnamed-scenarios';

function noUnNamedScenarios(feature) {
  var errors = [];
  if (feature.children) {
    feature.children.forEach(function(child) {
      if (!child.name && ['Scenario', 'ScenarioOutline'].includes(child.type)) {
        errors.push({
          message: 'Missing Scenario name',
          rule   : rule,
          line   : child.location.line});
      }
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noUnNamedScenarios
};
