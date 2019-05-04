var _ = require('lodash');
var rule = 'no-restricted-patterns';
var availableConfigs ={
  'Global': [],
  'Scenario': [],
  'ScenarioOutline': [],
  'Background': [],
  'Feature': []
};

function allowedPatterns(feature, fileName, configuration) {
  // Patterns applied to all features, backgrounds, etc.
  var globalPatterns = (configuration.Global || []).map(function(pattern) {
    return new RegExp(pattern, 'i');
  });
  var featurePatterns = (configuration.Feature || []).map(function(pattern) {
    return new RegExp(pattern, 'i');
  });

  var featureErrors = checkFeature(feature, globalPatterns.concat(featurePatterns));

  var childrenErrors = _(feature.children).map(function(child) {
    // Combine global patterns with the child type (Background, Scenario, etc).
    var allowedPatterns = globalPatterns.concat(configuration[child.type] || []);
    return checkSteps(child || [], allowedPatterns);
  }).flatten().value();

  return featureErrors.concat(childrenErrors);
}

function checkFeature(feature, allowedPatterns) {
  // Check title and description of the feature.
  var name = feature.name || '';
  var description = feature.description || '';
  var errors = [];
  allowedPatterns.forEach(function (pattern) {
    if (name.match(pattern)) {
      errors.push({message: 'Restricted pattern "' + name.trim() + '" on Feature',
        rule: rule,
        line: feature.location.line});
    }
    if (description.match(pattern)) {
      errors.push({message: 'Restricted pattern "' + description.trim() + '" on Feature',
        rule: rule,
        line: feature.location.line});
    }
  });
  return errors;
}

function checkSteps(node, allowedSteps) {
  return (node.steps || []).filter(function(step) {
    return isDisallowed(step, allowedSteps);
  }).map(function(step) {
    return createError(node, step);
  });
}

function isDisallowed(step, allowedSteps) {
  var disallowed = false;
  allowedSteps.forEach(function (pattern) {
    if (step.text.match(pattern)) {
      disallowed = true;
    }
  });
  return disallowed;
}

function createError(node, step) {
  return {message: 'Restricted pattern "' + step.text + '" on ' + node.type,
    rule: rule,
    line: step.location.line};
}

module.exports = {
  name: rule,
  run: allowedPatterns,
  availableConfigs: availableConfigs
};
