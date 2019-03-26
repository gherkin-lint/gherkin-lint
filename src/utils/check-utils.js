const {
  getType,
  getFeatureNodes,
} = require('./selectors');

const {
  checkBasedOn,
  checkOverChildren,
} = require('../utils/check-base');

const checkScenarios = (check) => checkBasedOn(getType)({
  Scenario: check,
  ScenarioOutline: check,
});

const checkFeatureNode = checkBasedOn(getType);

const checkFeatureNodes = checkOverChildren(getFeatureNodes);

module.exports = {
  checkScenarios,
  checkFeatureNode,
  checkFeatureNodes,
};
