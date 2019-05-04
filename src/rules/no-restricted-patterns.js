var _ = require('lodash');
var rule = 'no-restricted-patterns';
var availableConfigs = {
  'Global': [],
  'Scenario': [],
  'ScenarioOutline': [],
  'Background': [],
  'Feature': []
};


function noRestrictedPatterns(feature, fileName, configuration) {
  var errors = [];

  // Patterns applied to everything; feature, scenarios, etc.
  var globalPatterns = (configuration.Global || []).map(function(pattern) {
    return new RegExp(pattern, 'i');
  });

  var restrictedPatterns = {};
  Object.keys(availableConfigs).forEach(function(type) {
    restrictedPatterns[type] = (configuration[type] || []).map(function(pattern) {
      return new RegExp(pattern, 'i');
    });
    restrictedPatterns[type] = restrictedPatterns[type].concat(globalPatterns);
  });

  checkFeatureNode(feature, restrictedPatterns, errors);
  return errors;
}


function checkFeatureNode(node, restrictedPatterns, errors) {
  if (_.isEmpty(node)) {
    return;
  }
  checkNameAndDescription(node, restrictedPatterns, errors);
  node.children.forEach(function(child) {
    checkFeatureChildNode(child, restrictedPatterns, errors);
  });  
}


function checkNameAndDescription(node, restrictedPatterns, errors) {
  restrictedPatterns[node.type]
    .forEach(function(pattern) {
      check(node, 'name', pattern, errors);
      check(node, 'description', pattern, errors, true);
    });
}


// Background, Scenarios and Scenario Outlines are children of a feature
function checkFeatureChildNode(node, restrictedPatterns, errors) {
  checkNameAndDescription(node, restrictedPatterns, errors);
  node.steps.forEach(function(step) {
    // Use the node type of the parent to determine which rule configuration to use
    checkStepNode(step, restrictedPatterns[node.type], errors);
  });
}


function checkStepNode(node, restrictedPatterns, errors) {
  restrictedPatterns
    .forEach(function(pattern) {
      check(node, 'text', pattern, errors);
    });
}


function check(node, property, pattern, errors) {
  if (!node[property]) {
    return;
  }

  var strings = [node[property]];

  if (property == 'description') {
    // Descriptions can be multiline, in which case the description will contain escapted 
    // newline characters "\n". If a multiline description matches one of the restricted patterns
    // when the error message gets printed in the console, it will break the message into multiple lines.
    // So let's split the description on newline chars and test each line separately.

    // To make sure we don't accidentally pick up a doubly escaped new line "\\n" which would appear 
    // if a user wrote the string "\n" in a description, let's replace all escaped new lines 
    // with a sentinel, split lines and then restore the doubly escaped new line 
    var escapedNewLineSentinel = '<!gherkin-lint new line sentinel!>';
    var escapedNewLine = '\\n';
    strings = node[property]
      .replace(escapedNewLine, escapedNewLineSentinel)
      .split('\n')
      .map(function(string) {
        return string.replace(escapedNewLineSentinel, escapedNewLine);
      });
  }
  
  for (var i = 0; i < strings.length; i++) {
    // We use trim() on the examined string because names and descriptions can contain 
    // white space before and after, unlike steps
    if (strings[i].trim().match(pattern)) {
      errors.push({
        message: `${node.type} ${property}: "${strings[i].trim()}" matches restricted pattern "${pattern}"`,
        rule: rule,
        line: node.location.line
      });
    }
  } 
}


module.exports = {
  name: rule,
  run: noRestrictedPatterns,
  availableConfigs: availableConfigs
};
