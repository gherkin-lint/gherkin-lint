const {
  isScenario,
  getType,
  getExamples,
  getFeatureNodes,
  getSteps,
} = require('./selectors');
const {
  applyOver,
  applyWith,
  compose,
  flatMap,
} = require('./generic');
const {filter} = require('./transducers');

const applyToFeatureNode = applyWith(getType);

const flatMapFeatureNodes = (fn) => compose(flatMap(fn), getFeatureNodes);

const applyToScenario = (check) => applyToFeatureNode({
  Scenario: check,
  ScenarioOutline: check,
});

const flatMapScenarios = compose(flatMapFeatureNodes, applyToScenario);

const flatMapNodeTags = (fn) => applyOver([
  fn,
  flatMapScenarios(applyOver([
    fn,
    compose(flatMap(fn), getExamples),
  ])),
]);

const filterScenarios = filter(isScenario);

const flatMapSteps = (fn) => compose(flatMap(fn), getSteps);

module.exports = {
  applyToFeatureNode,
  flatMapFeatureNodes,
  flatMapScenarios,
  flatMapNodeTags,
  flatMapSteps,
  filterScenarios,
};
