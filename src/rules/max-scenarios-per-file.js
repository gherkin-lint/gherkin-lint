const rule = 'max-scenarios-per-file';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {compose, reduce} = require('../utils/generic');
const {map} = require('../utils/transducers');
const {getFeatureNodes} = require('../utils/selectors');
const {filterScenarios} = require('../utils/gherkin');

const defaultConfig = {
  'maxScenarios': 10,
};

const countExamples = (examples) => reduce((count, {tableBody}) => {
  return count + tableBody.length;
}, 0)(examples);

const sum = (a, b) => a + b;

function maxScenariosPerFile(feature, unused, config) {
  const mergedConfiguration = Object.assign({}, defaultConfig, config);
  const maxScenarios = mergedConfiguration.maxScenarios;

  const count = reduce(compose(
    filterScenarios,
    map(({examples}) => examples ? countExamples(examples) : 1)
  )(sum), 0)(getFeatureNodes(feature));

  return count > maxScenarios ? [{
    type: 'rule',
    message: `Number of scenarios exceeds maximum: ${count}/${maxScenarios}`,
    rule,
    line: 0,
  }] : [];
}

module.exports = {
  name: rule,
  run: maxScenariosPerFile,
  isValidConfig: objectRuleValidation(defaultConfig),
};
