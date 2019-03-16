const _ = require('lodash');
const rule = 'no-restricted-tags';
const objectRuleValidation = require('../config-validation/object-rule-validation');
const availableConfigs = {
  'tags': [],
};

function noRestrictedTags(feature, fileName, configuration) {
  const forbiddenTags = configuration.tags;

  const featureErrors = checkTags(feature, forbiddenTags);

  const childrenErrors = _(feature.children).map(function(child) {
    return checkTags(child, forbiddenTags);
  }).flatten().value();

  return featureErrors.concat(childrenErrors);
}

function checkTags(node, forbiddenTags) {
  return (node.tags || []).filter(function(tag) {
    return isForbidden(tag, forbiddenTags);
  }).map(function(tag) {
    return createError(node, tag);
  });
}

function isForbidden(tag, forbiddenTags) {
  return _.includes(forbiddenTags, tag.name);
}

function createError(node, tag) {
  return {
    message: `Forbidden tag ${ tag.name } on ${ node.type}`,
    rule: rule,
    line: tag.location.line,
  };
}

module.exports = {
  name: rule,
  run: noRestrictedTags,
  isValidConfig: objectRuleValidation(availableConfigs),
};
