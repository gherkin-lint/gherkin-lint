import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";
import * as gherkinUtils from "./utils/gherkin";

const _ = require("lodash");

export const name = "no-scenario-outlines-without-examples";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    feature.children?.forEach(child => {
        if (child.scenario) {
            const scenario = child.scenario;
            const nodeType = gherkinUtils.getNodeType(scenario, feature.language);
            if (nodeType === "Scenario Outline" && (!_.find(scenario.examples,
                "tableBody") || !_.find(scenario.examples, "tableBody")["tableBody"].length)) {
                errors.push({
                    message: "Scenario Outline does not have any Examples",
                    rule: name,
                    line: scenario.location?.line,
                });
            }
        }
    });
    return errors;
}
