const rule = 'no-files-without-scenarios';

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const noFilesWithoutScenarios = (feature) => {
  return (feature.children || []).some(isScenario) ? [] : [{
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
