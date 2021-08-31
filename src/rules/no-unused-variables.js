const rule = 'no-unused-variables';

function run(feature) {
  if(!feature) {
    return [];
  }

  let errors = [];
  const stepVariableRegex = /<([^>]*)>/gu;

  feature.children.forEach(child => {
    if (!child.scenario) {
      // Variables are a feature of Scenarios (as of Gherkin 9?) and Scenario Outlines only
      return;
    }

    const examples = child.scenario.examples;

    if (!examples.length) {
      // If there is no examples table, the rule doesn't apply
      return;
    }

    // Maps of variableName -> lineNo
    const examplesVariables = {};
    const scenarioVariables = {};
    let match;

    // Collect all the entries of the examples table
    examples.forEach(example => {
      if (example.tableHeader && example.tableHeader.cells) {
        example.tableHeader.cells.forEach(cell => {
          if (cell.value) {
            examplesVariables[cell.value] = cell.location;
          }
        });
      }
    });


    // Collect the variables used in the scenario outline

    // Scenario names can include variables
    while ((match = stepVariableRegex.exec(child.scenario.name)) != null) {
      scenarioVariables[match[1]] = {
        line: child.scenario.location.line,
        column: child.scenario.keyword.length + 2 + child.scenario.location.column + match.index // If multiple spaces (or any) are separating the keyword, the column is wrong
      };
    }


    child.scenario.steps.forEach(step => {

      // Steps can take arguments and their argument can include variables.
      // The arguments can be of type:
      // - DocString
      // - DataTable
      // For more details, see https://docs.cucumber.io/gherkin/reference/#step-arguments

      // Collect variables from step arguments
      if (step.dataTable) {
        step.dataTable.rows.forEach(row => {
          row.cells.forEach(cell => {
            if (cell.value) {
              while ((match = stepVariableRegex.exec(cell.value)) != null) {
                scenarioVariables[match[1]] = {
                  line: cell.location.line,
                  column: cell.location.column + match.index
                };
              }
            }
          });
        });
      } else if (step.docString) {
        while ((match = stepVariableRegex.exec(step.docString.content)) != null) {
          scenarioVariables[match[1]] = {
            line: step.docString.location.line,
            column: 0 // With multiple lines needs a complex way to find the column
          };
        }
      }

      // Collect variables from the steps themselves
      while ((match = stepVariableRegex.exec(step.text)) != null) {
        scenarioVariables[match[1]] = {
          line: step.location.line, // Matches the docstring line, not the matching line
          column: step.keyword.length + step.location.column + match.index // If multiple spaces (or any) are separating the keyword, the column is wrong
        };
      }
    });


    for (const exampleVariable in examplesVariables) {
      if (!scenarioVariables[exampleVariable]) {
        errors.push({
          message: 'Examples table variable "' + exampleVariable + '" is not used in any step',
          rule   : rule,
          line   : examplesVariables[exampleVariable].line,
          column : examplesVariables[exampleVariable].column,
        });
      }
    }

    for (const scenarioVariable in scenarioVariables) {
      if (!examplesVariables[scenarioVariable]) {
        errors.push({
          message: 'Step variable "' + scenarioVariable + '" does not exist in the examples table',
          rule   : rule,
          line   : scenarioVariables[scenarioVariable].line,
          column : scenarioVariables[scenarioVariable].column,
        });
      }
    }
  });

  return errors;
}

module.exports = {
  name: rule,
  run: run
};
