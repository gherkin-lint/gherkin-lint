const rule = 'no-files-without-scenarios';
const {isScenario, getFeatureNodes} = require('../utils/selectors');

const noFilesWithoutScenarios = (feature) => {
  return getFeatureNodes(feature).some(isScenario) ? [] : [{
    message: 'Feature file does not have any Scenarios',
    rule: rule,
    line: 1,
  }];
};

module.exports = {
  name: rule,
  run: noFilesWithoutScenarios,
  isValidConfig: () => true,
};
