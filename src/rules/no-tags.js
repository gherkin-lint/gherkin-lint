var rule = 'no-tags';

function noTags(feature) {
  var errors = [];

  if (hasWatchTag(feature)) {
    errors.push(createError(feature, '@watch tag on Feature'));
  }

  feature.children.forEach(function(scenario) {
    if (hasWatchTag(scenario)) {
      errors.push(createError(scenario, '@watch tag on Scenario'));
    }
  });

  return errors;
}

function hasWatchTag(node) {
  return (node.tags || []).some(function(tag) {
    return tag.name === '@watch';
  });
}

function createError(node, message) {
  return {message: message,
          rule   : rule,
          line   : node.location && node.location.line || 0};
}

module.exports = {
  name: rule,
  run: noTags
};
