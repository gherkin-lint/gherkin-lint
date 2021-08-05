import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

export const name = "no-unused-variables";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    const stepVariableRegex = /<([^>]*)>/gu;
    feature.children?.forEach(child => {
        if (!child.scenario) {
            // Variables are a feature of Scenarios (as of Gherkin 9?) and Scenario Outlines only
            return;
        }
        const examples = child.scenario.examples;
        if (!examples?.length) {
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
                        examplesVariables[cell.value] = cell.location?.line;
                    }
                });
            }
        });
        // Collect the variables used in the scenario outline
        // Scenario names can include variables
        while ((match = stepVariableRegex.exec(child.scenario.name || "")) != null) {
            scenarioVariables[match[1]] = child.scenario.location?.line;
        }
        child.scenario.steps?.forEach(step => {
            // Steps can take arguments and their argument can include variables.
            // The arguments can be of type:
            // - DocString
            // - DataTable
            // For more details, see https://docs.cucumber.io/gherkin/reference/#step-arguments
            // Collect variables from step arguments
            if (step.dataTable) {
                step.dataTable.rows?.forEach(row => {
                    row.cells?.forEach(cell => {
                        if (cell.value) {
                            while ((match = stepVariableRegex.exec(cell.value)) != null) {
                                scenarioVariables[match[1]] = cell.location?.line;
                            }
                        }
                    });
                });
            } else if (step.docString) {
                while ((match = stepVariableRegex.exec(step.docString.content || "")) != null) {
                    scenarioVariables[match[1]] = step.location?.line;
                }
            }
            // Collect variables from the steps themselves
            while ((match = stepVariableRegex.exec(step.text || "")) != null) {
                scenarioVariables[match[1]] = step.location?.line;
            }
        });
        for (const exampleVariable in examplesVariables) {
            if (!scenarioVariables[exampleVariable]) {
                errors.push({
                    message: `Examples table variable "${exampleVariable}" is not used in any step`,
                    rule: name,
                    line: examplesVariables[exampleVariable],
                });
            }
        }
        for (const scenarioVariable in scenarioVariables) {
            if (!examplesVariables[scenarioVariable]) {
                errors.push({
                    message: `Step variable "${scenarioVariable}" does not exist in the examples table`,
                    rule: name,
                    line: scenarioVariables[scenarioVariable],
                });
            }
        }
    });
    return errors;
}
