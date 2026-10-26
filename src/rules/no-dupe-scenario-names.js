const rule = 'no-dupe-scenario-names';
const gherkinUtils = require('./utils/gherkin.js');
const availableConfigs = [
  'anywhere',
  'in-feature'
];

let scenarios = [];

function scenarioKey(scenario, ruleNode) {
  const ruleName = ruleNode ? ruleNode.name : '';
  return `${ruleName}\0${scenario.name}`;
}

function run(feature, file, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  if (configuration === 'in-feature') {
    scenarios = [];
  }

  gherkinUtils.getScenariosWithRule(feature).forEach(({scenario, rule: ruleNode}) => {
    const key = scenarioKey(scenario, ruleNode);

    if (key in scenarios) {
      const dupes = getFileLinePairsAsStr(scenarios[key].locations);

      scenarios[key].locations.push({
        file: file.relativePath,
        line: scenario.location.line
      });

      errors.push({
        message: 'Scenario name is already used in: ' + dupes,
        rule   : rule,
        line   : scenario.location.line});
    } else {
      scenarios[key] = {
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
