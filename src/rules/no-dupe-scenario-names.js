import * as _ from 'lodash';
const rule = 'no-dupe-scenario-names';
const availableConfigs = [
  'anywhere',
  'in-feature',
  'anywhere-compile',
  'in-feature-compile'
];

let scenarios = {};

function run({feature, pickles, file}, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];

  const compile = _.isString(configuration) && configuration && configuration.endsWith('-compile');
  if(_.isString(configuration) && configuration.startsWith('in-feature')) {
    scenarios = {};
  }

  const items = compile ? pickles : feature.children.filter(child => child.scenario).map(child => child.scenario);

  items.forEach(scenario => {
    const scenarioName = scenario.name;
    const scenarioLine = compile ? guessPickleLine(feature, scenario) : scenario.location.line;
    if (Object.prototype.hasOwnProperty.call(scenarios, scenarioName)) {
      const dupes = getFileLinePairsAsStr(scenarios[scenarioName].locations);

      scenarios[scenarioName].locations.push({
        file: file.relativePath,
        line: scenarioLine
      });

      errors.push({
        message: 'Scenario name is already used in: ' + dupes,
        rule   : rule,
        line   : scenarioLine
      });
    } else {
      scenarios[scenarioName] = {
        locations: [
          {
            file: file.relativePath,
            line: scenarioLine
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

function guessPickleLine(feature, pickle) {
  let item = feature.children.filter(child => child.scenario).find(child => child.scenario.id === pickle.astNodeIds[0]).scenario;

  if (pickle.astNodeIds.length === 2) // Scenario Outline
    item = item.examples.flatMap(e => e.tableBody).find(t => t.id === pickle.astNodeIds[1]);

  return item.location.line;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
