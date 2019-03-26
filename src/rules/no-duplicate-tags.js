const rule = 'no-duplicate-tags';
const {
  compose,
  filter,
  intoArray,
  map,
} = require('../utils/main');
const {
  checkFeatureNodes,
  checkScenarios,
} = require('../utils/check-utils');
const {checksOverNode} = require('../utils/check-base');

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

const noDuplicateTags = checksOverNode([
  verifyTags,
  checkFeatureNodes(checkScenarios(verifyTags)),
]);

module.exports = {
  name: rule,
  run: noDuplicateTags,
  isValidConfig: () => true,
};
