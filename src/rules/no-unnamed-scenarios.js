const rule = 'no-unnamed-scenarios';
const {getFeatureNodes} = require('../utils/selectors');

const createError = (scenario) => ({
  type: 'rule',
  message: 'Missing Scenario name',
  rule: rule,
  line: scenario.location.line,
});

const noUnNamedScenarios = (feature) => {
  return getFeatureNodes(feature)
    .filter(({name, type}) => !name && type === 'Scenario')
    .map(createError);
};

module.exports = {
  name: rule,
  run: noUnNamedScenarios,
  isValidConfig: () => [],
};
