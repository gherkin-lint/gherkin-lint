const rule = 'no-restricted-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const availableConfigs = {
  'tags': [],
};
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');

const isForbidden = (forbiddenTags) => (tag) => forbiddenTags.indexOf(tag.name) !== -1;

const createError = (node) => (tag) => ({
  message: `Forbidden tag ${tag.name} on ${node.type}`,
  rule: rule,
  line: tag.location.line,
});

const checkTags = (predicate) => (node) => {
  return intoArray(compose(
    filter(predicate),
    map(createError(node))
  ))(node.tags || []);
};

const noRestrictedTags = (feature, fileName, configuration) => {
  const forbiddenTags = configuration.tags;
  const checkForbiddenTags = checkTags(isForbidden(forbiddenTags));
  const featureErrors = checkForbiddenTags(feature);
  const childrenErrors = intoArray(flatMap(checkForbiddenTags))(feature.children || []);

  return featureErrors.concat(childrenErrors);
};

module.exports = {
  name: rule,
  run: noRestrictedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
