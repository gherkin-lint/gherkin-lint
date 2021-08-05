import * as logger from "./utils/logger";
import { getArgumentsParsed } from "./utils/argsParser";
import { getFeatureFiles } from "./utils/feature-finder";
import { getConfiguration } from "./config/config-parser";
import { isErrorInResults, lint } from "./linter";
import { printResults } from "./formatters/printer";

async function run() {
    const _a = getArgumentsParsed();
    const [ args, ignore, dirs, config] = [_a._, _a.ignore, _a.dirs, _a.config];
    const files =  getFeatureFiles(args, ignore);
    const lintConfig =  getConfiguration(config, dirs);
    const results = await  lint(files, lintConfig, dirs);
    printResults(results);
    process.exit( isErrorInResults(results) ? 1 : 0);
}

run().catch(e => {
    logger.boldError(e);
    process.exit(1);
});
