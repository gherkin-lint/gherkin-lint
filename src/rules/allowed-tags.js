const rule = 'allowed-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const {
  compose,
  filter,
  flatMap,
  intoArray,
  map,
} = require('../utils/main');

const availableConfigs = {
  'tags': [],
};

const isScenario = ({type}) => ['Scenario', 'ScenarioOutline'].indexOf(type) !== -1;

const isNotAllowed = (allowedTags) => (tag) => allowedTags.indexOf(tag.name) === -1;

const createError = (node) => (tag) => ({
  message: `Not allowed tag ${tag.name} on ${node.type}`,
  rule: rule,
  line: tag.location.line,
});

const checkTags = (predicate) => (node) => {
  return intoArray(compose(
    filter(predicate),
    map(createError(node))
  ))(node.tags);
};

function allowedTags(feature, fileName, configuration) {
  const allowedTags = configuration.tags;
  const checkAllowedTags = checkTags(isNotAllowed(allowedTags));
  const featureErrors = checkAllowedTags(feature);
  const childrenErrors = intoArray(compose(
    filter(isScenario),
    flatMap(checkAllowedTags)
  ))(feature.children || []);

  return featureErrors.concat(childrenErrors);
}

module.exports = {
  name: rule,
  run: allowedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
