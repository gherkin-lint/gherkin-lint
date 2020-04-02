const rule = 'no-unnamed-scenarios';

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  feature.children.forEach(function(child) {
    if (child.scenario && !child.scenario.name) {
      errors.push({
        message: 'Missing Scenario name',
        rule   : rule,
        line   : child.scenario.location.line});
    }
  });
  return errors;
}

module.exports = {
  name: rule,
  run: run
};
