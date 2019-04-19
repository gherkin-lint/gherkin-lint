const rule = 'no-unnamed-scenarios';
const {flatMapScenarios} = require('../utils/gherkin');

const createError = ({name, location}) => name ? [] : [{
  type: 'rule',
  message: 'Missing Scenario name',
  rule: rule,
  line: location.line,
}];

const noUnNamedScenarios = flatMapScenarios(createError);

module.exports = {
  name: rule,
  run: noUnNamedScenarios,
  isValidConfig: () => [],
};
