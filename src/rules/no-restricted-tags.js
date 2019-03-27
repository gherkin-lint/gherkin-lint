const rule = 'no-restricted-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const availableConfigs = {
  'tags': [],
};
const {filter, map} = require('../utils/transducers');
const {
  applyOver,
  compose,
  flatMap,
  intoArray,
} = require('../utils/generic');
const {getFeatureNodes} = require('../utils/selectors');

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

const noRestrictedTags = (feature, unused, configuration) => {
  const forbiddenTags = configuration.tags;
  const checkForbiddenTags = checkTags(isForbidden(forbiddenTags));

  return applyOver([
    checkForbiddenTags,
    compose(flatMap(checkForbiddenTags), getFeatureNodes),
  ])(feature);
};

module.exports = {
  name: rule,
  run: noRestrictedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
