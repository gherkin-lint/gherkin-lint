const rule = 'no-restricted-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const availableConfigs = {
  'tags': [],
};
const {filter, map} = require('../utils/transducers');
const {
  compose,
  intoArray,
} = require('../utils/generic');
const {flatMapNodeTags} = require('../utils/gherkin');

const isForbidden = (forbiddenTags) => (tag) => forbiddenTags.indexOf(tag.name) !== -1;

const createError = (node) => (tag) => ({
  type: 'rule',
  message: `Forbidden tag ${tag.name} on ${node.type}`,
  rule: rule,
  line: tag.location.line,
});

const checkTags = (predicate) => (node) => {
  return intoArray(compose(
    filter(predicate),
    map(createError(node))
  ))(node.tags);
};

const noRestrictedTags = (feature, unused, configuration) => {
  const forbiddenTags = configuration.tags;
  const checkForbiddenTags = checkTags(isForbidden(forbiddenTags));

  return flatMapNodeTags(checkForbiddenTags)(feature);
};

module.exports = {
  name: rule,
  run: noRestrictedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
