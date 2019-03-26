const {
  getType,
  getFeatureNodes,
  getSteps,
} = require('./selectors');

const {
  checkBasedOn,
  checkOverChildren,
} = require('../utils/check-base');

const checkFeatureNode = checkBasedOn(getType);

const checkFeatureNodes = checkOverChildren(getFeatureNodes);

const checkScenarios = (check) => checkBasedOn(getType)({
  Scenario: check,
  ScenarioOutline: check,
});

const checkSteps = checkOverChildren(getSteps);

module.exports = {
  checkScenarios,
  checkFeatureNode,
  checkFeatureNodes,
  checkSteps,
};
