var _ = require('lodash');
var rule = 'no-restricted-tags';
var availableConfigs = {
  'tags': []
};

function noRestrictedTags(feature, fileName, configuration) {
  var forbiddenTags = configuration.tags;

  var featureErrors = checkTags(feature, forbiddenTags);

  var childrenErrors = _(feature.children).map(function(child) {
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
  return _.includes(forbiddenTags, tag.name.replace(/@/, ''));
}

function createError(node, tag) {
  return {message: 'Forbidden tag ' + tag.name + ' on ' + node.type,
          rule   : rule,
          line   : node.location && node.location.line || 0};
}

module.exports = {
  name: rule,
  run: noRestrictedTags,
  availableConfigs: availableConfigs
};
