var rule = 'no-files-without-scenarios';

function filterScenarios(child) {
  return child.type === 'Scenario' || child.type === 'ScenarioOutline';
}

function noFilesWithoutScenarios(feature) {
  var errors = [];
  if (!feature.children || !feature.children.some(filterScenarios)) {
    errors.push({
      message: 'Feature file does not have any Scenarios',
      rule   : rule,
      line   : 1
    });
  }
  return errors;
}

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios
};
