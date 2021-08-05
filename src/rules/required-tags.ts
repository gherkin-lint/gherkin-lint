import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";
import * as gherkinUtils from "./utils/gherkin";

const _ = require("lodash");

export const name = "required-tags";
export const availableConfigs = {
    tags: [],
    ignoreUntagged: true,
};

function checkTagExists(requiredTag, ignoreUntagged, scenarioTags, scenarioType, scenarioLine) {
    const result = (ignoreUntagged && scenarioTags.length === 0)
        || scenarioTags.some((tagObj) => RegExp(requiredTag).test(tagObj.name));
    if (!result) {
        return {
            message: `No tag found matching ${requiredTag} for ${scenarioType}`,
            rule: name,
            line: scenarioLine,
        };
    }
    return result;
}

export function run(feature: Feature, unused, config) {
    if (!feature) {
        return [];
    }
    const mergedConfig = _.merge({}, availableConfigs, config);
    let errors: ResultError[] = [];
    feature.children?.forEach((child) => {
        if (child.scenario) {
            const type = gherkinUtils.getNodeType(child.scenario, feature.language);
            const line = child.scenario.location?.line;
            // Check each Scenario for the required tags
            const requiredTagErrors = mergedConfig.tags
                .map((requiredTag) => checkTagExists(requiredTag,
                    mergedConfig.ignoreUntagged,
                    child.scenario?.tags || [],
                    type,
                    line))
                .filter((item) =>
                    typeof item === "object" && item.message
                );
            // Update errors
            errors = errors.concat(requiredTagErrors);
        }
    });
    return errors;
}
