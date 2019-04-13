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

const flatMapNodeTags = (fn) => applyOver([
  fn,
  flatMapFeatureNodes(applyToScenario(applyOver([
    fn,
    compose(flatMap(fn), getExamples),
  ]))),
]);

const applyToScenario = (check) => applyToFeatureNode({
  Scenario: check,
  ScenarioOutline: check,
});

const filterScenarios = filter(isScenario);

const flatMapSteps = (fn) => compose(flatMap(fn), getSteps);

module.exports = {
  applyToScenario,
  applyToFeatureNode,
  flatMapFeatureNodes,
  flatMapNodeTags,
  flatMapSteps,
  filterScenarios,
};
