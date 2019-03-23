const rule = 'name-length';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {
  flatMap,
  intoArray,
} = require('../utils/main');

const availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70,
};

const test = (configuration) => (name, location, type) => {
  const expectedLength = configuration[type];
  const length = name && name.length;
  return length > expectedLength ? [{
    message: `${type} name is too long. Length of ${length} ` +
      `is longer than the maximum allowed: ${expectedLength}`,
    rule: rule,
    line: location.line,
  }] : [];
};

const testOverChildren = (childrenName, test) => (node) => {
  return intoArray(flatMap(test))(node[childrenName]);
};

const testsOverNode = (tests) => (node) => {
  return intoArray(flatMap((test) => test(node)))(tests);
};

const testStepFactory = (testLength) => (step) => {
  return testLength(step.text, step.location, 'Step');
};

const testNodeFactory = (testLength, type) => (scenario) => {
  return testLength(scenario.name, scenario.location, type);
};

function nameLength(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return;
  }
  const testLength = test(Object.assign({}, availableConfigs, configuration));
  const testStep = testStepFactory(testLength);
  const testSteps = testOverChildren('steps', testStep);
  const testScenario = testsOverNode([
    testNodeFactory(testLength, 'Scenario'),
    testSteps,
  ]);
  const tests = {
    Scenario: testScenario,
    ScenarioOutline: testScenario,
    Background: testSteps,
  };
  const testFeatureNodes = testOverChildren('children', (child) => {
    return tests[child.type](child);
  });

  return testsOverNode([
    testNodeFactory(testLength, 'Feature'),
    testFeatureNodes,
  ])(feature);
}

module.exports = {
  name: rule,
  run: nameLength,
  isValidConfig: objectRuleValidation(availableConfigs),
};
