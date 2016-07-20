var rule = 'no-unamed-scenarios';

function noUnamedScenarios(parsedFile) {
  if (parsedFile.children) {
    var errors = [];
    parsedFile.children.forEach(function(scenario) {
      if (!scenario.name && scenario.type === 'Scenario') {
        errors.push({message: 'Missing Scenario name',
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
