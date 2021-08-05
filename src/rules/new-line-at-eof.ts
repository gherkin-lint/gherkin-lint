import { ResultError } from "../types/result";
import * as logger from "../utils/logger";

const _ = require("lodash");

export const name = "new-line-at-eof";
export const availableConfigs = [
    "yes",
    "no",
];

export function run(unused, file, configuration) {
    let errors: ResultError[] = [];
    if (_.indexOf(availableConfigs, configuration) === -1) {
        logger.boldError(`${name} requires an extra configuration value.\nAvailable configurations: ${availableConfigs.join(
            ", ")}\nFor syntax please look at the documentation.`);
        process.exit(1);
    }
    const hasNewLineAtEOF = _.last(file.lines) === "";
    let errormsg = "";
    if (hasNewLineAtEOF && configuration === "no") {
        errormsg = "New line at EOF(end of file) is not allowed";
    } else if (!hasNewLineAtEOF && configuration === "yes") {
        errormsg = "New line at EOF(end of file) is required";
    }
    if (errormsg !== "") {
        errors.push({
            message: errormsg,
            rule: name,
            line: file.lines.length,
        });
    }
    return errors;
}
