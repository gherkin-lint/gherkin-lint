const rule = 'no-duplicate-tags';
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const collectTagsInfo = (tags, {name, location}) => {
  const info = tags[name];
  if (info) {
    info.count++;
  } else {
    tags[name] = {
      count: 1,
      location,
      name,
    };
  }
  return tags;
};

const verifyTags = ({tags, location}) => {
  const tagsInfo = tags.reduce(collectTagsInfo, {});
  return intoArray(compose(
    filter(({count}) => count > 1),
    map((tag) => ({
      message: `Duplicate tags are not allowed: ${tag.name}`,
      rule: rule,
      line: tag.location.line,
    }))
  ))(tagsInfo);
};

const noDuplicateTags = (feature) => {
  const featureErrors = verifyTags(feature);
  const scenarioErrors = intoArray(compose(
    filter(isScenario),
    flatMap(verifyTags)
  ))(feature.children || []);
  return featureErrors.concat(scenarioErrors);
};

module.exports = {
  name: rule,
  run: noDuplicateTags,
  isValidConfig: () => true,
};
