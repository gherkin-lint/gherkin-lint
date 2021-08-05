import { ResultError } from "../types/result";
import { Examples, Feature, Scenario } from "../types/cucumber";

const _ = require("lodash");

export const name = "no-duplicate-tags";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    verifyTags(feature, errors);
    feature.children?.forEach(child => {
        if (child.scenario) {
            verifyTags(child.scenario, errors);
            child.scenario.examples?.forEach(example => {
                verifyTags(example, errors);
            });
        }
    });
    return errors;
}

function verifyTags(node: Feature | Scenario | Examples, errors: ResultError[]) {
    const failedTagNames: string[] = [];
    const uniqueTagNames: string[] = [];
    node?.tags?.forEach(tag => {
        if (tag.name) {
            if (!_.includes(failedTagNames, tag.name)) {
                if (_.includes(uniqueTagNames, tag.name)) {
                    errors.push({
                        message: `Duplicate tags are not allowed: ${tag.name}`,
                        rule: name,
                        line: tag.location?.line,
                    });
                    failedTagNames.push(tag.name);
                } else {
                    uniqueTagNames.push(tag.name);
                }
            }
        }
    });
}
