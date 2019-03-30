const rule = 'name-length';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70,
};

const {
  applyAfter,
  applyOver,
} = require('../utils/generic');

const {
  applyToFeatureNode,
  flatMapFeatureNodes,
  flatMapSteps,
} = require('../utils/gherkin');

const test = (configuration) => (name, location, type) => {
  const expectedLength = configuration[type];
  const length = name && name.length;
  return length > expectedLength ? [{
    type: 'rule',
    message: `${type} name is too long. Length of ${length} ` +
      `is longer than the maximum allowed: ${expectedLength}`,
    rule: rule,
    line: location.line,
  }] : [];
};

const testStepFactory = (testLength) => (step) => {
  return testLength(step.text, step.location, 'Step');
};

const testNodeFactory = (testLength, type) => (scenario) => {
  return testLength(scenario.name, scenario.location, type);
};

function nameLength(feature, unused, configuration) {
  if (Object.keys(feature).length === 0) {
    return [];
  }
  const testLength = test(Object.assign({}, availableConfigs, configuration));
  const testStep = testStepFactory(testLength);
  const testSteps = flatMapSteps(testStep);
  const checkStepsAfter = applyAfter(testSteps);
  const testScenario = checkStepsAfter(testNodeFactory(testLength, 'Scenario'));
  const checkNameLength = applyToFeatureNode({
    Scenario: testScenario,
    ScenarioOutline: testScenario,
    Background: testSteps,
  });

  return applyOver([
    testNodeFactory(testLength, 'Feature'),
    flatMapFeatureNodes(checkNameLength),
  ])(feature);
}

module.exports = {
  name: rule,
  run: nameLength,
  isValidConfig: objectRuleValidation(availableConfigs),
};
