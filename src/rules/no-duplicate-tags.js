const rule = 'no-duplicate-tags';
const {
  applyOver,
  compose,
  intoArray,
} = require('../utils/generic');
const {filter, map} = require('../utils/transducers');
const {
  flatMapFeatureNodes,
  applyToScenario,
} = require('../utils/gherkin');

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
      type: 'rule',
      message: `Duplicate tags are not allowed: ${tag.name}`,
      rule: rule,
      line: tag.location.line,
    }))
  ))(tagsInfo);
};

const noDuplicateTags = applyOver([
  verifyTags,
  flatMapFeatureNodes(applyToScenario(verifyTags)),
]);

module.exports = {
  name: rule,
  run: noDuplicateTags,
  isValidConfig: () => true,
};
