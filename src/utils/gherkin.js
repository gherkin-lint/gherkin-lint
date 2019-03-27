const {
  getType,
  getFeatureNodes,
  getSteps,
} = require('./selectors');
const {
  applyWith,
  compose,
  flatMap,
} = require('./generic');

const applyToFeatureNode = applyWith(getType);

const flatMapFeatureNodes = (fn) => compose(flatMap(fn), getFeatureNodes);

const applyToScenario = (check) => applyToFeatureNode({
  Scenario: check,
  ScenarioOutline: check,
});

const flatMapSteps = (fn) => compose(flatMap(fn), getSteps);

module.exports = {
  applyToScenario,
  applyToFeatureNode,
  flatMapFeatureNodes,
  flatMapSteps,
};
