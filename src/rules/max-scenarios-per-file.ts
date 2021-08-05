import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

const _ = require("lodash");

export const name = "max-scenarios-per-file";
const defaultConfig = {
    "maxScenarios": 10,
    "countOutlineExamples": true,
};

export function run(feature: Feature, unused, config) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    const mergedConfiguration = _.merge({}, defaultConfig, config);
    const maxScenarios = mergedConfiguration.maxScenarios;
    let count = feature.children?.length || 0;
    feature.children?.forEach(child => {
        if (child.background) {
            count = count - 1;
        } else if (child.scenario?.examples?.length && mergedConfiguration.countOutlineExamples) {
            count = count - 1;
            child.scenario.examples.forEach(example => {
                if (example.tableBody) {
                    count = count + example.tableBody.length;
                }
            });
        }
    });
    if (count > maxScenarios) {
        errors.push({
            message: `Number of scenarios exceeds maximum: ${count}/${maxScenarios}`,
            rule: name,
            line: 0,
        });
    }
    return errors;
}
