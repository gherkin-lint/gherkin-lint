const rule = 'no-superfluous-tags';
const {
  compose,
  filter,
  intoArray,
  map,
} = require('../utils/main');
const {getFeatureNodes} = require('../utils/selectors');

const SUPERFLUOUS_TAGS_MESSAGE =
  'Tag(s) duplicated on a Feature and a Scenario in that Feature';

const getTagName = ({name}) => name;
const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const createError = (tags) => {
  const superfluousTagsReport = tags.map(getTagName).join(', ');
  return {
    message: `${SUPERFLUOUS_TAGS_MESSAGE}: ${superfluousTagsReport}`,
    rule: rule,
    line: tags[0].location.line,
  };
};

const noSuperfluousTags = (feature) => {
  const featureTags = new Set((feature.tags || []).map(getTagName));
  return intoArray(compose(
    filter(isScenario),
    map(({tags}) => tags.filter(({name}) => featureTags.has(name))),
    filter((tags) => tags.length > 0),
    map(createError)
  ))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: noSuperfluousTags,
  isValidConfig: () => true,
};
