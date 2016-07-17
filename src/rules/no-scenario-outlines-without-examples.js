var rule = 'no-scenario-outlines-without-examples';

function noScenarioOutlinesWithoutExamples(parsedFile) {
  if (parsedFile.children) {
    var errors = [];
    parsedFile.children.forEach(function(scenario) {
      if (scenario.type === 'ScenarioOutline' && !scenario.examples.length) {
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
