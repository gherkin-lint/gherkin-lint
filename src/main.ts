/**
 * @deprecated This file comes from the original gherkin-lint and should not be used
 */

import * as linter from "./linter";
import * as featureFinder from "./utils/feature-finder";
import * as configParser from "./config/config-parser";
import * as logger from "./utils/logger";

const program = require("commander");

function list(val) {
    return val.split(",");
}

function collect(val, memo) {
    memo.push(val);
    return memo;
}

program
    .usage("[options] <feature-files>")
    .option("-f, --format [format]", "output format. Possible values: json, stylish, xunit. Defaults to stylish")
    .option("-i, --ignore <...>",
        `comma seperated list of files/glob patterns that the linter should ignore, overrides ${featureFinder.defaultIgnoreFileName} file`,
        list)
    .option("-c, --config [config]", `configuration file, defaults to ${configParser.defaultConfigFileName}`)
    .option("-r, --rulesdir <...>", "additional rule directories", collect, [])
    .parse(process.argv);
const additionalRulesDirs = program.rulesdir;
const files = featureFinder.getFeatureFiles(program.args, program.ignore);
const config = configParser.getConfiguration(program.config, additionalRulesDirs);
linter.lint(files, config, additionalRulesDirs)
    .then((results) => {
        printResults(results, program.format);
        process.exit(getExitCode(results));
    });

function getExitCode(results) {
    let exitCode = 0;
    results.forEach(result => {
        if (result.errors.length > 0) {
            exitCode = 1;
        }
    });
    return exitCode;
}

function printResults(results, format) {
    let formatter;
    if (format === "json") {
        formatter = require("./formatters/json.ts");
    } else if (format === "xunit") {
        formatter = require("./formatters/xunit.ts");
    } else if (format === "stylish") {
        formatter = require("./formatters/stylish.ts");
    } else if (!format || format === "printer") {
        formatter = require("./formatters/printer.ts");
    } else {
        logger.boldError("Unsupported format. The supported formats are json, xunit and stylish.");
        process.exit(1);
    }
    formatter.printResults(results);
}
