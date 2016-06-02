var _ = require('lodash');
var rule = 'indentation';

var availableConfigs = {
  'feature': 0,
  'background': 0,
  'scenario': 0,
  'step': 2
};

function indentation(parsedFile, unused,configuration) {
  var errors = [];
  configuration = _.merge(availableConfigs, configuration);

  // location.column is 1 index based, so when we compare with the expected indentation we need to subtract 1 from location.column

  // Check Feature indentation
  if (--parsedFile.location.column !== configuration.feature) {
    errors.push({message: 'Wrong indentation - Expected ' + configuration.feature + ' spaces, got ' + parsedFile.location.column,
                 rule   : rule,
                 line   : parsedFile.location.line});
  }

  if (parsedFile.background) {
    // Check Background indentation
    if (--parsedFile.background.location.column !== configuration.background) {
      errors.push({message: 'Wrong indentation - Expected ' + configuration.background + ' spaces, got ' + parsedFile.background.location.column ,
                   rule   : rule,
                   line   : parsedFile.background.location.line});
    }

    // Check Background steps
    parsedFile.background.steps.forEach(function(step) {
      if (--step.location.column !== configuration.step) {
        errors.push({message: 'Wrong indentation - Expected ' + configuration.step + ' spaces, got ' + step.location.column ,
                     rule   : rule,
                     line   : step.location.line});
      }
    });
  }

  parsedFile.scenarioDefinitions.forEach(function(scenario) {
    // Check Scenario indentation
    if (--scenario.location.column !== configuration.scenario) {
      errors.push({message: 'Wrong indentation - Expected ' + configuration.scenario + ' spaces, got ' + scenario.location.column ,
                   rule   : rule,
                   line   : scenario.location.line});
    }

    scenario.steps.forEach(function(step) {
      // Check Step indentation
      if (--step.location.column !== configuration.step) {
        errors.push({message: 'Wrong indentation - Expected ' + configuration.step + ' spaces, got ' + step.location.column ,
                     rule   : rule,
                     line   : step.location.line});
      }
    });
  });

  return errors;
}

module.exports = {
  name: rule,
  run: indentation,
  availableConfigs: availableConfigs
};
