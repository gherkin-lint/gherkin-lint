const rule = 'max-scenarios-per-file';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {compose, reduce} = require('../utils/generic');
const {filter, map} = require('../utils/transducers');
const {getFeatureNodes} = require('../utils/selectors');

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
  )(sum), 0)(getFeatureNodes(feature));

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
