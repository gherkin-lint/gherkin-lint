var rule = 'no-dupe-scenario-names';
var scenarios = [];
var availableConfigs = [
  'anywhere',
  'in-feature'
];

function run(feature, fileName, configuration) {
  if (!feature) {
    return [];
  }
  var errors = [];
  if(configuration === 'in-feature') {
    scenarios = [];
  }
  feature.children.forEach(function(child) {
    if (child.scenario) {
      if (child.scenario.name in scenarios) {
        var dupes = getFileLinePairsAsStr(scenarios[child.scenario.name].locations);
        
        scenarios[child.scenario.name].locations.push({
          file: fileName, 
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
              file: fileName, 
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
  var strings = [];
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
