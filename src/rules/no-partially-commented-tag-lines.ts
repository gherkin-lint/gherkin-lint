import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

export const name = "no-partially-commented-tag-lines";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    checkTags(feature, errors);
    feature.children?.forEach(child => {
        if (child.scenario) {
            checkTags(child.scenario, errors);
            child.scenario.examples?.forEach(example => {
                checkTags(example, errors);
            });
        }
    });
    return errors;
}

function checkTags(node, errors) {
    node.tags.forEach(tag => {
        if (tag.name.indexOf("#") > 0) {
            errors.push({
                message: "Partially commented tag lines not allowed",
                rule: name,
                line: tag.location.line,
            });
        }
    });
}
