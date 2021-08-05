import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";
import * as gherkinUtils from "./utils/gherkin";

export const name = "no-examples-in-scenarios";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    feature.children?.forEach((child) => {
        if (child.scenario) {
            const nodeType = gherkinUtils.getNodeType(child.scenario, feature.language);
            if (nodeType === "Scenario" && child.scenario.examples?.length) {
                errors.push({
                    message: 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead',
                    rule: name,
                    line: child.scenario.location?.line,
                });
            }
        }
    });
    return errors;
}
