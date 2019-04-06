const rule = 'no-partially-commented-tag-lines';
const {compose, intoArray} = require('../utils/generic');
const {filter, flatMap, map} = require('../utils/transducers');
const {getFeatureNodes} = require('../utils/selectors');
const {filterScenarios} = require('../utils/gherkin');

const createError = (tag) => ({
  type: 'rule',
  message: 'Partially commented tag lines not allowed ',
  rule: rule,
  line: tag.location.line,
});

const noPartiallyCommentedTagLines = (feature) => {
  return intoArray(compose(
    filterScenarios,
    flatMap(({tags}) => tags),
    filter((tag) => tag.name.indexOf('#') > 0),
    map(createError)
  ))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: noPartiallyCommentedTagLines,
  isValidConfig: () => [],
};
