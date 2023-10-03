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

  feature.children.forEach(child => {
    if (child.scenario) {
      if (child.scenario.name in scenarios) {
        const dupes = getFileLinePairsAsStr(scenarios[child.scenario.name].locations);

        scenarios[child.scenario.name].locations.push({
          file: file.relativePath,
          line: child.scenario.location.line,
          column: child.scenario.location.column,
        });

        errors.push({
          message: 'Scenario name is already used in: ' + dupes,
          rule   : rule,
          line   : child.scenario.location.line,
          column : child.scenario.location.column,
        });
      } else {
        scenarios[child.scenario.name] = {
          locations: [
            {
              file: file.relativePath,
              line: child.scenario.location.line,
              column: child.scenario.location.column,
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
