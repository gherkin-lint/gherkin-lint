var _ = require('lodash');
var rule = 'no-scenario-outlines-without-examples';

function noScenarioOutlinesWithoutExamples(feature) {
  if (feature.children) {
    var errors = [];

    feature.children.forEach(function(scenario) {
      if (scenario.type === 'ScenarioOutline' && (!_.find(scenario.examples, 'tableBody') || !_.find(scenario.examples, 'tableBody')['tableBody'].length)) {
        errors.push({message: 'Scenario Outline does not have any Examples',
          rule   : rule,
          line   : scenario.location.line});
      }
    });
    return errors;
  }
}

module.exports = {
  name: rule,
  run: noScenarioOutlinesWithoutExamples
};
