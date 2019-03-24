const rule = 'no-unnamed-scenarios';

const createError = (scenario) => ({
  message: 'Missing Scenario name',
  rule: rule,
  line: scenario.location.line,
});

const noUnNamedScenarios = (feature) => {
  return (feature.children || [])
    .filter(({name, type}) => !name && type === 'Scenario')
    .map(createError);
};

module.exports = {
  name: rule,
  run: noUnNamedScenarios,
  isValidConfig: () => true,
};
