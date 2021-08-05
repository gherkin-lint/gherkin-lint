import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

const _ = require("lodash");

export const name = "allowed-tags";
export const availableConfigs = {
    "tags": [],
    "patterns": [],
};

export function run(feature: Feature, unused, configuration) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    const allowedTags = configuration.tags;
    const allowedPatterns = getAllowedPatterns(configuration);
    checkTags(feature, allowedTags, allowedPatterns, errors);
    feature.children?.forEach(child => {
        if (child.scenario) {
            checkTags(child.scenario, allowedTags, allowedPatterns, errors);
            if (child.scenario.examples) {
                child.scenario.examples.forEach(example => {
                    checkTags(example, allowedTags, allowedPatterns, errors);
                });
            }
        }
    });
    return errors;
}

function getAllowedPatterns(configuration) {
    return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}

function checkTags(node, allowedTags, allowedPatterns, errors) {
    return (node.tags || [])
        .filter(tag => !isAllowed(tag, allowedTags, allowedPatterns))
        .forEach(tag => {
            errors.push(createError(node, tag));
        });
}

function isAllowed(tag, allowedTags, allowedPatterns) {
    return _.includes(allowedTags, tag.name)
        || allowedPatterns.some((pattern) => pattern.test(tag.name));
}

function createError(node, tag) {
    return {
        message: `Not allowed tag ${tag.name} on ${node.keyword}`,
        rule: name,
        line: tag.location.line,
    };
}
