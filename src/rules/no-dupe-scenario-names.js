const rule = 'no-dupe-scenario-names';
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

  feature.children.forEach(function(child) {
    if (child.scenario) {
      if (child.scenario.name in scenarios) {
        const dupes = getFileLinePairsAsStr(scenarios[child.scenario.name].locations);
        
        scenarios[child.scenario.name].locations.push({
          file: file.relativePath, 
          line: child.scenario.location.line
        });

        errors.push({
          message: 'Scenario name is already used in: ' + dupes,
          rule   : rule,
          line   : child.scenario.location.line});
      } else {
        scenarios[child.scenario.name] = {
          locations: [
            {
              file: file.relativePath, 
              line: child.scenario.location.line
            }
          ]
        };
      }
    }
  });
  
  return errors;
}

function getFileLinePairsAsStr(objects) {
  let strings = [];
  objects.forEach(function(object) {
    strings.push(object.file + ':' + object.line);
  });
  return strings.join(', ');
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
