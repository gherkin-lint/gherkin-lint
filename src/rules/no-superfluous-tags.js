const rule = 'no-superfluous-tags';
const {compose, intoArray} = require('../utils/generic');
const {filter, map} = require('../utils/transducers');
const {getFeatureNodes} = require('../utils/selectors');
const {filterScenarios} = require('../utils/gherkin');

const SUPERFLUOUS_TAGS_MESSAGE =
  'Tag(s) duplicated on a Feature and a Scenario in that Feature';

const getTagName = ({name}) => name;

const createError = (tags) => {
  const superfluousTagsReport = tags.map(getTagName).join(', ');
  return {
    type: 'rule',
    message: `${SUPERFLUOUS_TAGS_MESSAGE}: ${superfluousTagsReport}`,
    rule: rule,
    line: tags[0].location.line,
  };
};

const noSuperfluousTags = (feature) => {
  const featureTags = new Set((feature.tags || []).map(getTagName));
  return intoArray(compose(
    filterScenarios,
    map(({tags}) => tags.filter(({name}) => featureTags.has(name))),
    filter((tags) => tags.length > 0),
    map(createError)
  ))(getFeatureNodes(feature));
};

module.exports = {
  name: rule,
  run: noSuperfluousTags,
  isValidConfig: () => [],
};
