import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

export const name = "no-unnamed-features";

export function run(feature: Feature) {
    let errors: ResultError[] = [];
    if (!feature || !feature.name) {
        const location = feature ? feature.location?.line : 0;
        errors.push({
            message: "Missing Feature name",
            rule: name,
            line: location,
        });
    }
    return errors;
}
