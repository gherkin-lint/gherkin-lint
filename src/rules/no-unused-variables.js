var rule = 'no-unused-variables';

function noUnusedVariables(feature) {
  if(!feature || !feature.children) {
    return [];
  }

  var errors = [];
  var stepVariableRegex = /<([^>]*)>/gu;

  feature.children.forEach(function(child) {
    var examplesVariables = [];
    var stepVariables = [];

    // Collect all the entries of the examples table
    if (child.examples) {
      child.examples.forEach(function(example) {
        if (example.tableHeader && example.tableHeader.cells) {
          example.tableHeader.cells.forEach(function(cell) {
            if (cell.value) {
              examplesVariables.push(cell.value);
            }
          });
        }
      });
    }

    // Collect all the steps that use variables
    if (child.steps) {
      child.steps.forEach(function(step) {
        var match;
        while ((match = stepVariableRegex.exec(step.text)) != null) {
          stepVariables.push(match[1]);
        }
      });
    }

    // Verify that all the variables defined in examples are used
    if (child.examples) {
      child.examples.forEach(function(example) {
        if (example.tableHeader && example.tableHeader.cells) {
          example.tableHeader.cells.forEach(function(cell) {
            if (cell.value) {
              if (stepVariables.indexOf(cell.value) == -1) {
                errors.push({
                  message: 'Examples table variable "' + cell.value + '" is not used in any step',
                  rule   : rule,
                  line   : cell.location.line
                });
              }
            }
          });
        }
      });
    }

    // Verify that all the variables used in steps are defined in the examples table
    if (child.steps) {
      child.steps.forEach(function(step) {
        var match;
        while ((match = stepVariableRegex.exec(step.text)) != null) {
          if (examplesVariables.indexOf(match[1]) == -1) {
            errors.push({
              message: 'Step variable "' + match[1] + '" does not exist the in examples table',
              rule   : rule,
              line   : step.location.line
            });
          }
        }
      });
    }
  });

  return errors;
}

module.exports = {
  name: rule,
  run: noUnusedVariables
};
