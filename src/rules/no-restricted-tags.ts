import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";
import * as gherkinUtils from "./utils/gherkin";

const _ = require("lodash");

export const name = "no-restricted-tags";
export const availableConfigs = {
    "tags": [],
    "patterns": [],
};

export function run(feature: Feature, unused, configuration) {
    if (!feature) {
        return [];
    }
    const forbiddenTags = configuration.tags;
    const forbiddenPatterns = getForbiddenPatterns(configuration);
    const language = feature.language;
    let errors: ResultError[] = [];
    checkTags(feature, language, forbiddenTags, forbiddenPatterns, errors);
    feature.children?.forEach(child => {
    // backgrounds don't have tags
        if (child.scenario) {
            checkTags(child.scenario, language, forbiddenTags, forbiddenPatterns, errors);
            child.scenario.examples?.forEach(example => {
                checkTags(example, language, forbiddenTags, forbiddenPatterns, errors);
            });
        }
    });
    return errors;
}

function getForbiddenPatterns(configuration) {
    return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}

function checkTags(node, language, forbiddenTags, forbiddenPatterns, errors) {
    const nodeType = gherkinUtils.getNodeType(node, language);
    node.tags.forEach(tag => {
        if (isForbidden(tag, forbiddenTags, forbiddenPatterns)) {
            errors.push({
                message: `Forbidden tag ${tag.name} on ${nodeType}`,
                rule: name,
                line: tag.location.line,
            });
        }
    });
}

function isForbidden(tag, forbiddenTags, forbiddenPatterns) {
    return _.includes(forbiddenTags, tag.name)
        || forbiddenPatterns.some((pattern) => pattern.test(tag.name));
}
