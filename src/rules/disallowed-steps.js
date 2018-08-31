var _ = require('lodash');
var rule = 'disallowed-steps';
var availableConfigs ={
  'steps': []
};

function allowedSteps(feature, fileName, configuration) {
  var allowedSteps = (configuration.steps || []).map(function(pattern) {
    return new RegExp(pattern, 'i');
  });

  var childrenErrors = _(feature.children).map(function(child) {
    return checkSteps(child, allowedSteps);
  }).flatten().value();

  return childrenErrors;
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
  return {message: 'Disallowed step "' + step.text + '" on ' + node.type,
          rule   : rule,
          line   : step.location.line};
}

module.exports = {
  name: rule,
  run: allowedSteps,
  availableConfigs: availableConfigs
};
