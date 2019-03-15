const _ = require('lodash');
const rule = 'no-unused-variables';

function noUnusedVariables(feature) {
  if (!feature || !feature.children) {
    return [];
  }

  const errors = [];
  const stepVariableRegex = /<([^>]*)>/gu;

  feature.children.forEach(function(child) {
    if (child.type != 'ScenarioOutline') {
      // Variables are a feature of Scenario Outlines only
      return;
    }

    // Maps of variableName -> lineNo
    const examplesVariables = {};
    const scenarioVariables = {};
    let match;

    // Collect all the entries of the examples table
    if (child.examples) {
      child.examples.forEach(function(example) {
        if (example.tableHeader && example.tableHeader.cells) {
          example.tableHeader.cells.forEach(function(cell) {
            if (cell.value) {
              examplesVariables[cell.value] = cell.location.line;
            }
          });
        }
      });
    }


    // Collect the variables used in the scenario outline

    // Scenario names can include variables
    while ((match = stepVariableRegex.exec(child.name)) != null) {
      scenarioVariables[match[1]] = child.location.line;
    }

    if (child.steps) {
      child.steps.forEach(function(step) {
        // Steps can take arguments and their argument can include variables.
        // The arguments can be of type:
        // - DocString
        // - DataTable
        // For more details, see
        // https://docs.cucumber.io/gherkin/reference/#step-arguments

        // Collect variables from step arguments
        if (step.argument) {
          if (step.argument.type == 'DataTable') {
            step.argument.rows.forEach(function(row) {
              row.cells.forEach(function(cell) {
                if (cell.value) {
                  while ((match = stepVariableRegex.exec(cell.value)) != null) {
                    scenarioVariables[match[1]] = cell.location.line;
                  }
                }
              });
            });
          } else if (step.argument.type == 'DocString') {
            while ((match = stepVariableRegex.exec(step.argument.content)) != null) {
              scenarioVariables[match[1]] = step.location.line;
            }
          }
        }

        // Collect variables from the steps themselves
        while ((match = stepVariableRegex.exec(step.text)) != null) {
          scenarioVariables[match[1]] = step.location.line;
        }
      });
    }

    for (const variable in examplesVariables) {
      if (!scenarioVariables[variable]) {
        errors.push({
          message: `Examples table variable "${variable}" is not used in any step`,
          rule: rule,
          line: examplesVariables[variable],
        });
      }
    }

    for (const variable in scenarioVariables) {
      if (!examplesVariables[variable]) {
        errors.push({
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
  isValidConfig: _.stubTrue,
};
