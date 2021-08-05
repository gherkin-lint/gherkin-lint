import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

export const name = "no-background-only-scenario";

export function run(feature: Feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    feature.children?.forEach(child => {
        if (child.background) {
            // @ts-ignore
            if (feature.children.length <= 2) {
                // as just one background is allowed, if there is a background in the feature,
                // there must be at least, three elements in the feature to have, more than
                // one scenario
                errors.push(createError(child.background));
            }
        }
    });
    return errors;
}

function createError(background) {
    return {
        message: "Backgrounds are not allowed when there is just one scenario.",
        rule: name,
        line: background.location.line,
    };
}
