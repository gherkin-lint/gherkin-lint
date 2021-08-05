import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

export const name = "no-dupe-feature-names";
const features = [];

export function run(feature: Feature, file) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    if (feature.name) {
        if (feature.name in features) {
            const dupes = features[feature.name].files.join(", ");
            features[feature.name].files.push(file.relativePath);
            errors.push({
                message: `Feature name is already used in: ${dupes}`,
                rule: name,
                line: feature.location?.line,
            });
        } else {
            features[feature.name] = { files: [file.relativePath] };
        }
    }
    return errors;
}
