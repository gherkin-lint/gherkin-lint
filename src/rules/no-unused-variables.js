const rule = 'no-unused-variables';
const {
  compose,
  reduce,
} = require('../utils/generic');
const {filter, map} = require('../utils/transducers');
const {getFeatureNodes} = require('../utils/selectors');
const stepVariableRegex = /<([^>]*)>/gu;

const collectVariables = (selector) => (variables, node) => {
  let match;
  while ((match = stepVariableRegex.exec(selector(node))) != null) {
    variables[match[1]] = node.location.line;
  }
  return variables;
};

const collectNameVariables = collectVariables(({name}) => name);

const collectCellVariables = collectVariables(({value}) => value);

const collectTableVariables = (variables, step) => {
  return step.argument.rows.reduce((variables, row) => {
    return row.cells.reduce(collectCellVariables, variables);
  }, variables);
};

const collectDocStringVariables = collectVariables(({argument}) => {
  return argument.content;
});

const collectStepArgumentVariables = (variables, step) => {
  if (!step.argument) {
    return variables;
  } else if (step.argument.type == 'DataTable') {
    return collectTableVariables(variables, step);
  } else if (step.argument.type == 'DocString') {
    return collectDocStringVariables(variables, step);
  }
  return variables;
};

const collectStepVariables = collectVariables((step) => step.text);

const collectScenarioVariables = (scenario) => {
  const variables = collectNameVariables({}, scenario);
  return scenario.steps.reduce(function(variables, step) {
    variables = collectStepArgumentVariables(variables, step);
    return collectStepVariables(variables, step);
  }, variables);
};

const appendExampleVariable = (variables, cell) => {
  variables[cell.value] = cell.location.line;
  return variables;
};

const collectTableExampleVariables = (variables, cells) => reduce(
  filter(({value}) => value)(appendExampleVariable),
  variables
)(cells);


const collectExampleVariables = reduce(compose(
  filter(({tableHeader}) => tableHeader),
  map(({tableHeader}) => tableHeader.cells)
)(collectTableExampleVariables), {});

function noUnusedVariables(feature) {
  const children = getFeatureNodes(feature);
  const errors = [];

  children.forEach(function(child) {
    if (child.type != 'ScenarioOutline') {
      // Variables are a feature of Scenario Outlines only
      return;
    }

    const examplesVariables = collectExampleVariables(child.examples);
    const scenarioVariables = collectScenarioVariables(child);

    for (const variable in examplesVariables) {
      if (!scenarioVariables[variable]) {
        errors.push({
          type: 'rule',
          message: `Examples table variable "${variable}" is not used in any step`,
          rule: rule,
          line: examplesVariables[variable],
        });
      }
    }

    for (const variable in scenarioVariables) {
      if (!examplesVariables[variable]) {
        errors.push({
          type: 'rule',
          message: `Step variable "${variable}" does not exist the in examples table`,
          rule: rule,
          line: scenarioVariables[variable],
        });
      }
    }
  });

  return errors;
}

module.exports = {
  name: rule,
  run: noUnusedVariables,
  isValidConfig: () => [],
};
