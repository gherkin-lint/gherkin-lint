const rule = 'no-files-without-scenarios';
const {getFeatureNodes} = require('../utils/selectors');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

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
