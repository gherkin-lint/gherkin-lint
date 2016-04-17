var rule = "no-unamed-scenarios";

function noUnamedScenarios(parsedFile) {
  if(parsedFile.scenarioDefinitions) {
    var errors = [];
    parsedFile.scenarioDefinitions.forEach(function(scenario) {
      if (!scenario.name) {
        errors.push({message: "Missing Scenario name",
                rule   : rule,
                line   : scenario.location.line});
      }
    });
    return errors;
  }
}

module.exports = {
  name: rule,
  run: noUnamedScenarios
};
