/* eslint-disable */
var _ = require('lodash');
var rule = 'no-restricted-tags';
var availableConfigs = {
  'tags': []
};

function noRestrictedTags(feature, fileName, configuration) {
  var forbiddenTags = configuration.tags;
  var errors = [];

  checkTags(feature, forbiddenTags, errors);
  if (feature.children) {
    feature.children.forEach(function(child) {
      checkTags(child, forbiddenTags, errors);

      if (child.examples) {
        child.examples.forEach(function(example) {
          checkTags(example, forbiddenTags, errors);
        });
      }
    });
  }
  return errors;
}

function checkTags(node, forbiddenTags, errors) {
  var nodeTags = node.tags || [];

  nodeTags.forEach(function(tag) {
    if (_.includes(forbiddenTags, tag.name)) {
      errors.push({
        message: 'Forbidden tag ' + tag.name + ' on ' + node.type,
        rule   : rule,
        line   : tag.location.line
      });
    }
  });
}

module.exports = {
  name: rule,
  run: noRestrictedTags,
  availableConfigs: availableConfigs
};
