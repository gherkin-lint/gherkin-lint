import { ResultError } from "../types/result";
import { Feature } from "../types/cucumber";

const _ = require("lodash");

export const name = "no-empty-file";

export function run(feature: Feature) {
    let errors: ResultError[] = [];
    if (_.isEmpty(feature)) {
        errors.push({
            message: "Empty feature files are disallowed",
            rule: name,
            line: 1,
        });
    }
    return errors;
}
