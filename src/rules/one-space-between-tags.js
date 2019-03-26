const rule = 'one-space-between-tags';
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');
const {getFeatureNodes} = require('../utils/selectors');

const groupTagsPerLine = require('../utils/group-tags-per-line');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const distance = (tag1, tag2) => {
  if (!tag2) {
    return 1;
  }
  return tag2.location.column - tag1.location.column - tag1.name.length;
};

const createError = ([dist, tag, nextTag]) => {
  return {
    line: tag.location.line,
    rule: rule,
    message: 'There is more than one space between the tags ' +
      tag.name + ' and ' + nextTag.name,
  };
};

const collectErrorsPerLine = (tags) => {
  return tags.map((tag, index, tags) => {
    const nextTag = tags[index + 1];
    return [distance(tag, nextTag), tag, nextTag];
  })
    .filter(([dist]) => dist > 1)
    .map(createError);
};

const testTags = (allTags) => {
  const tagsPerLine = groupTagsPerLine(allTags);
  return intoArray(flatMap(collectErrorsPerLine))(tagsPerLine);
};

function run(feature) {
  const featureTagErrors = testTags(feature.tags);
  const scenarioTagErrors = intoArray(compose(
    filter(isScenario),
    map(({tags}) => tags),
    flatMap(testTags)
  ))(getFeatureNodes(feature));

  return featureTagErrors.concat(scenarioTagErrors);
}

module.exports = {
  run: run,
  name: rule,
  isValidConfig: () => true,
};
