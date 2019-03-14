var _ = require('lodash');
var rule = 'allowed-tags';
var objectRuleValidation = require('../config-validation/object-rule-validation');

var availableConfigs = {
  'tags': []
};

function allowedTags(feature, fileName, configuration) {
  var allowedTags = configuration.tags;

  var featureErrors = checkTags(feature, allowedTags);

  var childrenErrors = _(feature.children).map(function(child) {
    return checkTags(child, allowedTags);
  }).flatten().value();

  return featureErrors.concat(childrenErrors);
}

function checkTags(node, allowedTags) {
  return (node.tags || []).filter(function(tag) {
    return !isAllowed(tag, allowedTags);
  }).map(function(tag) {
    return createError(node, tag);
  });
}

function isAllowed(tag, allowedTags) {
  return _.includes(allowedTags, tag.name);
}

function createError(node, tag) {
  return {message: 'Not allowed tag ' + tag.name + ' on ' + node.type,
          rule   : rule,
          line   : tag.location.line};
}

module.exports = {
  name: rule,
  run: allowedTags,
  isValidConfig: objectRuleValidation(availableConfigs)
};
