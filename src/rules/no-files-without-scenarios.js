var rule = 'no-files-without-scenarios';

function filterScenarios(child) {
  return child.type === 'Scenario' || child.type === 'ScenarioOutline';
}

function noFilesWithoutScenarios(feature) {
  if (!feature.children || !feature.children.some(filterScenarios)) {
    return {message: 'Feature file does not have any Scenarios',
            rule   : rule,
            line   : 1};
  }
}

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios
};
