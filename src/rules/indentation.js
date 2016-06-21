var _ = require('lodash');
var languageMapping = require('gherkin/lib/gherkin/gherkin-languages.json');
var rule = 'indentation';

var availableConfigs = {
  'Feature': 0,
  'Background': 0,
  'Scenario': 0,
  'Step': 2,
  'given': 2,
  'when': 2,
  'then': 2,
  'and': 2,
  'but': 2
};

var errors = [];

function test(parsedLocation, config, type) {
    // location.column is 1 index based so, when we compare with the expected indentation we need to subtract 1
  if (--parsedLocation.column !== config[type]) {
    errors.push({message: 'Wrong indentation for "' + type + '", expected indentation level of ' + config[type] + ', but got ' + parsedLocation.column,
                 rule   : rule,
                 line   : parsedLocation.line});
  }
}

function indentation(parsedFile, unused, configuration) {
  var language = languageMapping[parsedFile.language];
  var mergedConfiguration = _.merge(availableConfigs, configuration);
  errors = [];

  // Check Feature indentation
  test(parsedFile.location, mergedConfiguration, 'Feature');

  if (parsedFile.background) {
    // Check Background indentation
    test(parsedFile.background.location, mergedConfiguration, 'Background');

    // Check Background steps
    parsedFile.background.steps.forEach(function(step) {
      test(step.location, mergedConfiguration, 'Step');
    });
  }

  parsedFile.scenarioDefinitions.forEach(function(scenario) {
    // Check Scenario indentation
    test(scenario.location, mergedConfiguration, 'Scenario');
    scenario.steps.forEach(function(step) {
      // Check Step indentation
      var keyword = step.keyword;
      var stepType = _.findKey(language, function(values) { return values instanceof Array && values.indexOf(keyword) !== -1; });
      stepType = stepType in configuration ? stepType : 'Step';
      test(step.location, mergedConfiguration, stepType);
    });
  });

  return errors;
}

module.exports = {
  name: rule,
  run: indentation,
  availableConfigs: availableConfigs
};
