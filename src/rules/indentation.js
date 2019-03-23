const languageMapping = require('gherkin').DIALECTS;
const rule = 'indentation';
const objectRuleValidation = require('../config-validation/object-rule-validation');

const {
  compose,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');

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

const has = ({}).hasOwnProperty;

const mergeConfiguration = (configuration) => {
  const mergedConfiguration = Object.assign({}, defaultConfig, configuration);
  if (!has.call(mergedConfiguration, 'feature tag')) {
    mergedConfiguration['feature tag'] = mergedConfiguration['Feature'];
  }
  if (!has.call(mergedConfiguration, 'scenario tag')) {
    mergedConfiguration['scenario tag'] = mergedConfiguration['Scenario'];
  }
  return mergedConfiguration;
};

const testByConfig = (mergedConfiguration) => (type) => (node) => {
  const parsedLocation = node.location;
  // location.column is 1 index based so, when we compare with the expected
  // indentation we need to subtract 1
  return parsedLocation.column - 1 !== mergedConfiguration[type] ? [{
    message: `Wrong indentation for "${type}", expected indentation level of ` +
      `${mergedConfiguration[type]}, but got ${parsedLocation.column - 1}`,
    rule: rule,
    line: parsedLocation.line,
  }] : [];
};

const updateTag = (tagsPerLine, tag) => {
  const {line} = tag.location;
  const currentTag = tagsPerLine.get(line);
  if (!currentTag || tag.location.line < currentTag.location.line) {
    tagsPerLine.set(line, tag);
  }
  return tagsPerLine;
};

const testTags = (testNode) => (node) => {
  const firstTagPerLine = [...node.tags.reduce(updateTag, new Map())];
  return intoArray(compose(
    map(([, tag])=> tag),
    flatMap(testNode)
  ))(firstTagPerLine);
};

const testsOverNode = (tests) => (node) => {
  return intoArray(flatMap((test) => test(node)))(tests);
};

const testOverChild = (childName, test) => (node) => {
  return test(node[childName]);
};

const testOverChildren = (childrenName, test) => (node) => {
  return intoArray(flatMap(test))(node[childrenName]);
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

const testFeature = (feature, testStep, test) => {
  const testScenario = testsOverNode([
    test('Scenario'),
    testTags(test('scenario tag')),
  ]);
  const testTableHeader = testOverChild('tableHeader', test('example'));
  const testTableBody = testOverChildren('tableBody', test('example'));
  const testExamplesPerTable = testsOverNode([
    test('Examples'),
    testTableHeader,
    testTableBody,
  ]);
  const testExamples = testOverChildren('examples', testExamplesPerTable);
  const testScenarioOutline = testsOverNode([
    test('Scenario'),
    testExamples,
    testTags(test('scenario tag')),
  ]);

  const featureNodesMap = {
    Background: test('Background'),
    Scenario: testScenario,
    ScenarioOutline: testScenarioOutline,
  };

  const testFeatureNode = (node) => {
    return testsOverNode([
      featureNodesMap[node.type],
      testOverChildren('steps', testStep),
    ])(node);
  };

  const testFeatureNodes = testOverChildren('children', testFeatureNode);

  return testsOverNode([
    test('Feature'),
    testTags(test('feature tag')),
    testFeatureNodes,
  ])(feature);
};

function run(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return [];
  }
  const test = testByConfig(mergeConfiguration(configuration));

  return testFeature(
    feature,
    testStep(feature, configuration, test),
    test
  );
}

module.exports = {
  name: rule,
  run: run,
  isValidConfig: objectRuleValidation(availableConfigs),
};
