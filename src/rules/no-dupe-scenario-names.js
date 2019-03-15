const _ = require('lodash');
const rule = 'no-dupe-scenario-names';
const scenarios = [];

function noDuplicateScenarioNames(feature, file) {
  if (feature.children) {
    const errors = [];
    feature.children.forEach(function(scenario) {
      if (scenario.name) {
        if (scenario.name in scenarios) {
          const dupes = getFileLinePairsAsStr(scenarios[scenario.name].locations);
          scenarios[scenario.name].locations.push({
            file: file.name,
            line: scenario.location.line,
          });
          errors.push({
            message: `Scenario name is already used in: ${ dupes}`,
            rule: rule,
            line: scenario.location.line});
        } else {
          scenarios[scenario.name] = {
            locations: [{
              file: file.name,
              line: scenario.location.line,
            }],
          };
        }
      }
    });
    return errors;
  }
}

function getFileLinePairsAsStr(objects) {
  const strings = [];
  objects.forEach(function(object) {
    strings.push(`${object.file }:${ object.line}`);
  });
  return strings.join(', ');
}

module.exports = {
  name: rule,
  run: noDuplicateScenarioNames,
  isValidConfig: _.stubTrue,
};
