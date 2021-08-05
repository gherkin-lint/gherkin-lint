import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";
import * as gherkinUtils from "./utils/gherkin";

const _ = require("lodash");

export const name = "scenario-size";
export const availableConfigs = {
    "steps-length": {
        "Rule": 15,
        "Background": 15,
        "Scenario": 15,
    },
};

export function run(feature: Feature, unused, configuration) {
    if (!feature) {
        return;
    }
    if (_.isEmpty(configuration)) {
        configuration = availableConfigs;
    }
    let errors: ResultError[] = [];
    feature.children?.forEach((child) => {
        const node = child.rule || child.background || child.scenario;
        if (node) {
            const nodeType = gherkinUtils.getNodeType(node, feature.language);
            const configKey = child.rule ? "Rule" : child.background ? "Background" : "Scenario";
            const maxSize = configuration["steps-length"][configKey];
            // @ts-ignore
            if (maxSize && node.steps.length > maxSize) {
                errors.push({
                    // @ts-ignore
                    message: `Element ${nodeType} too long: actual ${node.steps.length}, expected ${maxSize}`,
                    rule: name,
                    line: node?.location?.line,
                });
            }
        }
    });
    return errors;
}
