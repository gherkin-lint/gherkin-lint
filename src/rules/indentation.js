var _ = require('lodash');
var languageMapping = require('gherkin').DIALECTS;
var rule = 'indentation';

var availableConfigs = {
  'Feature': 0,
  'Background': 0,
  'Scenario': 0,
  'Step': 2,
  'Examples': 0,
  'example': 2,
  'given': 2,
  'when': 2,
  'then': 2,
  'and': 2,
  'but': 2
};

var errors = [];

function test(parsedLocation, configuration, type) {
    // location.column is 1 index based so, when we compare with the expected indentation we need to subtract 1
  if (--parsedLocation.column !== configuration[type]) {
    errors.push({message: 'Wrong indentation for "' + type +
                          '", expected indentation level of ' + configuration[type] +
                          ', but got ' + parsedLocation.column,
                 rule   : rule,
                 line   : parsedLocation.line});
  }
}

function testStep(step, language, configuration, mergedConfiguration) {
  var keyword = step.keyword;
  var stepType = _.findKey(language, function(values) {
    return values instanceof Array && values.indexOf(keyword) !== -1;
  });
  stepType = stepType in configuration ? stepType : 'Step';
  test(step.location, mergedConfiguration, stepType);
}

function testScenarioOutline(scenarioOutline, mergedConfiguration) {
  test(scenarioOutline.location, mergedConfiguration, 'Scenario');
  _.forEach(scenarioOutline.examples, function(examples){
    test(examples.location, mergedConfiguration, 'Examples');
    test(examples.tableHeader.location, mergedConfiguration, 'example');
    _.forEach(examples.tableBody, function(row) {
      test(row.location, mergedConfiguration, 'example');
    });
  });
}

function indentation(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return;
  }
  var language = languageMapping[feature.language];
  var mergedConfiguration = _.merge(availableConfigs, configuration);
  errors = [];

  // Check Feature indentation
  test(feature.location, mergedConfiguration, 'Feature');

  feature.children.forEach(function(child) {
    switch(child.type) {
    case 'Background':
      test(child.location, mergedConfiguration, 'Background');
      break;
    case 'Scenario':
      test(child.location, mergedConfiguration, 'Scenario');
      break;
    case 'ScenarioOutline':
      testScenarioOutline(child, mergedConfiguration);
      break;
    default:
      errors.push({message: 'Unknown gherkin node type ' + child.type,
                   rule   : rule,
                   line   : child.location.line});
      break;
    }

    child.steps.forEach(function(step) {
      // Check Step indentation
      testStep(step, language, configuration, mergedConfiguration);
    });
  });

  return errors;
}

module.exports = {
  name: rule,
  run: indentation,
  availableConfigs: availableConfigs
};
