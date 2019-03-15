const _ = require('lodash');
const rule = 'allowed-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');

const availableConfigs = {
  'tags': [],
};

function allowedTags(feature, fileName, configuration) {
  const allowedTags = configuration.tags;

  const featureErrors = checkTags(feature, allowedTags);

  const childrenErrors = _(feature.children).map(function(child) {
    return checkTags(child, allowedTags);
  }).flatten().value();

  return featureErrors.concat(childrenErrors);
}

function checkTags(node, allowedTags) {
  return (node.tags || [])
    .filter((tag) => !isAllowed(tag, allowedTags))
    .map((tag) => createError(node, tag));
}

function isAllowed(tag, allowedTags) {
  return _.includes(allowedTags, tag.name);
}

function createError(node, tag) {
  return {message: `Not allowed tag ${ tag.name } on ${ node.type}`,
    rule: rule,
    line: tag.location.line};
}

module.exports = {
  name: rule,
  run: allowedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
