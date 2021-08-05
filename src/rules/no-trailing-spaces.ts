import { ResultError } from "../types/result";

export const name = "no-trailing-spaces";

export function run(unused, file) {
    let errors: ResultError[] = [];
    let lineNo = 1;
    file.lines.forEach(line => {
        if (/[\t ]+$/.test(line)) {
            errors.push({
                message: "Trailing spaces are not allowed",
                rule: name,
                line: lineNo,
            });
        }
        lineNo++;
    });
    return errors;
}
