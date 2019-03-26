const rule = 'no-scenario-outlines-without-examples';
const {
  compose,
  filter,
  intoArray,
  map,
} = require('../utils/main');
const {getFeatureNodes} = require('../utils/selectors');

const isScenarioOutline = ({type}) => type === 'ScenarioOutline';
const hasNoExamples = ({examples}) => !examples.length;

const createError = (scenario) => ({
  message: 'Scenario Outline does not have any Examples',
  rule: rule,
  line: scenario.location.line,
});

const noScenarioOutlinesWithoutExamples = (feature) => {
  return intoArray(compose(
    filter(isScenarioOutline),
    filter(hasNoExamples),
    map(createError)
  ))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: noScenarioOutlinesWithoutExamples,
  isValidConfig: () => true,
};
