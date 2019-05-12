var _ = require('lodash');
var rule = 'allowed-tags';
var availableConfigs = {
  'tags': []
};

function allowedTags(feature, fileName, configuration) {
  var allowedTags = configuration.tags;
  var errors = [];

  checkTags(feature, allowedTags, errors);
  
  if (feature.children) {
    feature.children.forEach(function(child) {
      checkTags(child, allowedTags, errors);

      if (child.examples) {
        child.examples.forEach(function(example) {
          checkTags(example, allowedTags, errors);
        });
      }
    });
  }

  return errors;
}

function checkTags(node, allowedTags, errors) {
  return (node.tags || [])
    .filter(function(tag) {
      return !isAllowed(tag, allowedTags);
    })
    .forEach(function(tag) {
      errors.push(createError(node, tag));
    });
}

function isAllowed(tag, allowedTags) {
  return _.includes(allowedTags, tag.name);
}

function createError(node, tag) {
  return {
    message: 'Not allowed tag ' + tag.name + ' on ' + node.type,
    rule   : rule,
    line   : tag.location.line
  };
}

module.exports = {
  name: rule,
  run: allowedTags,
  availableConfigs: availableConfigs
};
