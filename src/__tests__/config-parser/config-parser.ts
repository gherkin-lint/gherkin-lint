import { expect } from "chai";
import * as path from "path";
import sinon from "sinon";

let configParser;

describe("Configuration parser", function () {
    beforeEach(function () {
        configParser = require("../../config/config-parser");
        sinon.stub(console, "error");
        sinon.stub(process, "exit");
    });
    afterEach(function () {
        configParser = undefined;
        // @ts-ignore
        console.error.restore();
        // @ts-ignore
        process.exit.restore();
    });
    describe("early exits with a non 0 exit code when", function () {
        it("the specified config file doesn't exit", function () {
            const configFilePath = "./non/existing/path";
            configParser.getConfiguration(configFilePath);
            // @ts-ignore
            const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
                return args[0];
            });
            expect(consoleErrorArgs[0]).to.include(`Could not find specified config file "${configFilePath}"`);
            // @ts-ignore
            expect(process.exit.args[0][0]).to.equal(1);
        });
        it("no config file has been specified and default config file doesn't exist", function () {
            const configFilePath = "./non/existing/path";
            configParser.defaultConfigFileName = configFilePath;
            configParser.getConfiguration();
            // @ts-ignore
            const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
                return args[0];
            });
            expect(consoleErrorArgs[0]).to.include("Could not find default config file");
            // @ts-ignore
            expect(process.exit.args[0][0]).to.equal(1);
        });
        it("a bad configuration file is used", function () {
            const configFilePath = path.join(__dirname, "bad_config.gherkinrc");
            configParser.getConfiguration(configFilePath);
            // @ts-ignore
            const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
                return args[0];
            });
            expect(consoleErrorArgs[0]).to.include("Error(s) in configuration file:");
            // @ts-ignore
            expect(process.exit.args[0][0]).to.equal(1);
        });
    });
    describe("doesn't exit with exit code 1 when", function () {
        it("a good configuration file is used", function () {
            const configFilePath = path.join(__dirname, "good_config.gherkinrc");
            const parsedConfig = configParser.getConfiguration(configFilePath);
            // @ts-ignore
            expect(process.exit.neverCalledWith(1));
            expect(parsedConfig).to.deep.eq({ "no-files-without-scenarios": "off" });
        });
        it("a good configuration file is used that includes comments", function () {
            const configFilePath = path.join(__dirname, "good_config_with_comments.gherkinrc");
            const parsedConfig = configParser.getConfiguration(configFilePath);
            // @ts-ignore
            expect(process.exit.neverCalledWith(1));
            expect(parsedConfig).to.deep.eq({ "no-files-without-scenarios": "off" });
        });
        it("the default configuration file is found", function () {
            const defaultConfigFilePath = path.join(__dirname, "stub_default.gherkinrc");
            configParser.defaultConfigFileName = defaultConfigFilePath;
            configParser.getConfiguration();
            // @ts-ignore
            expect(process.exit.neverCalledWith(1));
        });
    });
});
