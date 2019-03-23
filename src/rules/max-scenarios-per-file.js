const rule = 'max-scenarios-per-file';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {
  compose,
  filter,
  map,
  reduce,
} = require('../utils/main');
const defaultConfig = {
  'maxScenarios': 10,
};

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const countExamples = (examples) => reduce((count, {tableBody}) => {
  return count + tableBody.length;
}, 0)(examples);

const sum = (a, b) => a + b;

function maxScenariosPerFile(feature, unused, config) {
  const mergedConfiguration = Object.assign({}, defaultConfig, config);
  const maxScenarios = mergedConfiguration.maxScenarios;

  const count = reduce(compose(
    filter(isScenario),
    map(({examples}) => examples ? countExamples(examples) : 1)
  )(sum), 0)(feature.children || []);

  return count > maxScenarios ? [{
    message: `Number of scenarios exceeds maximum: ${count}/${ maxScenarios}`,
    rule,
    line: 0,
  }] : [];
}

module.exports = {
  name: rule,
  run: maxScenariosPerFile,
  isValidConfig: objectRuleValidation(defaultConfig),
};
