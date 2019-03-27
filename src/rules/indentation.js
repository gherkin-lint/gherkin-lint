const languageMapping = require('gherkin').DIALECTS;
const rule = 'indentation';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {
  getExamples,
  getTableBody,
  getTableHeader,
} = require('../utils/selectors');

const {
  applyToFeatureNode,
  flatMapFeatureNodes,
  flatMapSteps,
} = require('../utils/gherkin');

const {
  applyAfter,
  applyOver,
  compose,
  flatMap,
} = require('../utils/generic');

const groupTagsPerLine = require('../utils/group-tags-per-line');

const defaultConfig = {
  'Feature': 0,
  'Background': 0,
  'Scenario': 0,
  'Step': 2,
  'Examples': 0,
  'example': 2,
  'given': 2,
  'when': 2,
  'then': 2,
  'and': 2,
  'but': 2,
};

const availableConfigs = Object.assign({}, defaultConfig, {
  // The values here are unused by the config parsing logic.
  'feature tag': -1,
  'scenario tag': -1,
});

const mergeConfiguration = (configuration) => {
  const mergedConfiguration = Object.assign({}, defaultConfig, configuration);
  return Object.assign({
    'feature tag': mergedConfiguration['Feature'],
    'scenario tag': mergedConfiguration['Scenario'],
  }, mergedConfiguration);
};

const checkNodeIndentation = (mergedConfiguration) => (type) => (node) => {
  const {location} = node;
  const expectedIndentation = mergedConfiguration[type];
  const indentation = location.column - 1;

  return indentation !== expectedIndentation ? [{
    message: `Wrong indentation for "${type}", expected indentation level of ` +
      `${expectedIndentation}, but got ${indentation}`,
    rule: rule,
    line: location.line,
  }] : [];
};

const checkTags = (testNode) => (node) => {
  const tagsPerLine = groupTagsPerLine(node.tags);
  const getFirstTag = ([tag])=> tag;
  return flatMap(compose(testNode, getFirstTag))(tagsPerLine);
};

const findKey = (obj, predicate) => {
  return Object.keys(obj).find((key) => predicate(obj[key]));
};

const testStep = (feature, configuration, testNode) => (step) => {
  const keyword = step.keyword;
  let stepType = findKey(languageMapping[feature.language], (values) => {
    return values instanceof Array && values.indexOf(keyword) !== -1;
  });
  stepType = stepType in configuration ? stepType : 'Step';
  return testNode(stepType)(step);
};

const testFeature = (testStep, test) => {
  const testScenario = applyOver([
    test('Scenario'),
    checkTags(test('scenario tag')),
  ]);
  const testTableHeader = compose(test('example'), getTableHeader);
  const testTableBody = compose(flatMap(test('example')), getTableBody);
  const testExamplesPerTable = applyOver([
    test('Examples'),
    testTableHeader,
    testTableBody,
  ]);
  const testExamples = compose(flatMap(testExamplesPerTable), getExamples);
  const testScenarioOutline = applyOver([
    test('Scenario'),
    testExamples,
    checkTags(test('scenario tag')),
  ]);

  const checkStepsAfter = applyAfter(flatMapSteps(testStep));

  const checkIndentationOnFeatureNode = applyToFeatureNode({
    Background: checkStepsAfter(test('Background')),
    Scenario: checkStepsAfter(testScenario),
    ScenarioOutline: checkStepsAfter(testScenarioOutline),
  });

  return applyOver([
    test('Feature'),
    checkTags(test('feature tag')),
    flatMapFeatureNodes(checkIndentationOnFeatureNode),
  ]);
};

const run = (feature, unused, configuration) => {
  if (Object.keys(feature).length === 0) {
    return [];
  }
  const test = checkNodeIndentation(mergeConfiguration(configuration));

  return testFeature(
    testStep(feature, configuration, test),
    test
  )(feature);
};

module.exports = {
  name: rule,
  run,
  isValidConfig: objectRuleValidation(availableConfigs),
};
