const rule = 'no-files-without-scenarios';

function filterScenarios(child) {
  return child.scenario != undefined;
}

function run(feature) {
  if (!feature) {
    return [];
  }
  let errors = [];
  if (!feature.children.some(filterScenarios)) {
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
  run: run
};
