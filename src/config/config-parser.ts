import * as logger from "../utils/logger";
import { verifyConfigurationFile } from "./config-verifier";
import * as fs from "fs";

const stripJsonComments = require("strip-json-comments");

export const defaultConfigFileName = ".gherkin-lintrc.json";

export function getConfiguration(configPath: string, additionalRulesDirs: string[]) {
    if (configPath) {
        if (!fs.existsSync(configPath)) {
            logger.boldError(`Could not find specified config file "${configPath}"`);
            return process.exit(1);
        }
    } else {
        if (!fs.existsSync(defaultConfigFileName)) {
            logger.boldError(`Could not find default config file "${defaultConfigFileName}" in the working directory.
To use a custom name/path provide the config file using the "-c" arg.`);
            return process.exit(1);
        }
        configPath = defaultConfigFileName;
    }
    const config = JSON.parse(stripJsonComments(fs.readFileSync(configPath, { encoding: "utf-8" })));
    const errors = verifyConfigurationFile(config, additionalRulesDirs);
    if (errors.length > 0) {
        logger.boldError("Error(s) in configuration file:");
        errors.forEach(error => {
            logger.error(`- ${error}`);
        });
        process.exit(1);
    }
    return config;
}
