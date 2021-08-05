import * as featureFinder from "./feature-finder";
import * as configParser from "../config/config-parser";

const yargs = require("yargs");

export function getArgumentsParsed() {
    return yargs.options({
        config: {
            type: "string",
            demandOption: true,
            alias: "c",
            default: configParser.defaultConfigFileName,
            description: `Configuration file, defaults to ${configParser.defaultConfigFileName}`,
        },
        ignore: {
            alias: "i",
            type: "array",
            default: [],
            description: `List of files/glob patterns that the linter should ignore, overrides ${featureFinder.defaultIgnoreFileName} file`,
        },
        dirs: {
            type: "array",
            alias: "d",
            default: [],
            description: "List of additional rule directories",
        },
    }).argv;
}
