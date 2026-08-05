const rule = 'no-dupe-scenario-names';
const gherkinUtils = require('./utils/gherkin.js');
const availableConfigs = [
  'anywhere',
  'in-feature'
];

let scenarios = [];

function run(feature, file, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  if(configuration === 'in-feature') {
    scenarios = [];
  }

  gherkinUtils.getScenarios(feature).forEach(scenario => {
    if (scenario.name in scenarios) {
      const dupes = getFileLinePairsAsStr(scenarios[scenario.name].locations);
        
      scenarios[scenario.name].locations.push({
        file: file.relativePath,
        line: scenario.location.line
      });

      errors.push({
        message: 'Scenario name is already used in: ' + dupes,
        rule   : rule,
        line   : scenario.location.line});
    } else {
      scenarios[scenario.name] = {
        locations: [
          {
            file: file.relativePath,
            line: scenario.location.line
          }
        ]
      };
    }
  });
  
  return errors;
}

function getFileLinePairsAsStr(objects) {
  let strings = [];
  objects.forEach(object => {
    strings.push(object.file + ':' + object.line);
  });
  return strings.join(', ');
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
