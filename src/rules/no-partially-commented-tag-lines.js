const rule = 'no-partially-commented-tag-lines';
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');
const {getFeatureNodes} = require('../utils/selectors');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const createError = (tag) => ({
  message: 'Partially commented tag lines not allowed ',
  rule: rule,
  line: tag.location.line,
});

const noPartiallyCommentedTagLines = (feature) => {
  return intoArray(compose(
    filter(isScenario),
    flatMap(({tags}) => tags),
    filter((tag) => tag.name.indexOf('#') > 0),
    map(createError)
  ))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: noPartiallyCommentedTagLines,
  isValidConfig: () => true,
};
