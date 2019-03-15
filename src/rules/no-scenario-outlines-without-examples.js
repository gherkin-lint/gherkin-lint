const _ = require('lodash');
const rule = 'no-scenario-outlines-without-examples';

function noScenarioOutlinesWithoutExamples(feature) {
  if (feature.children) {
    const errors = [];
    feature.children.forEach(function(scenario) {
      if (scenario.type === 'ScenarioOutline' && !scenario.examples.length) {
        errors.push({message: 'Scenario Outline does not have any Examples',
          rule: rule,
          line: scenario.location.line});
      }
    });
    return errors;
  }
}

module.exports = {
  name: rule,
  run: noScenarioOutlinesWithoutExamples,
  isValidConfig: _.stubTrue,
};
