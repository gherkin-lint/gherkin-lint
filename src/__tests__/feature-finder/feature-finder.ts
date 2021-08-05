import { assert, expect } from "chai";
import sinon from "sinon";
import * as featureFinder from "../../utils/feature-finder";

const mockFs = require("mock-fs");

describe("Feature finder", function () {
    beforeEach(function () {
        sinon.stub(console, "error");
        sinon.stub(process, "exit");
        mockFs({
            "folder/with/found/features": {
                "a.feature": "",
                "folder": { "b.feature": "" },
                "c.txt": "",
            },
            "../folder/with/unfound/features": {
                "d.feature": "",
                "e.txt": "",
            },
            "feature": {
                "f.txt": "",
            },
            "directory.feature": {},
        });
    });
    afterEach(function () {
        mockFs.restore();
        // @ts-ignore
        console.error.restore(); // eslint-disable-line no-console
        // @ts-ignore
        process.exit.restore();
    });
    it("returns all feature files found recursively in the current directory when no path is passed to the command line",
        function () {
            const actual = featureFinder.getFeatureFiles([]);
            assert.deepEqual(actual, [
                "folder/with/found/features/a.feature",
                "folder/with/found/features/folder/b.feature",
            ]);
        });
    it('returns all feature files in a directory and its subfolders when a "path/to/dir/**" pattern is used',
        function () {
            const actual = featureFinder.getFeatureFiles(["folder/with/found/features/**"]);
            assert.deepEqual(actual, [
                "folder/with/found/features/a.feature",
                "folder/with/found/features/folder/b.feature",
            ]);
        });
    it('returns all feature files in a directory when a "path/to/dir/*.feature" pattern is used', function () {
        const actual = featureFinder.getFeatureFiles(["folder/with/found/features/*.feature"]);
        assert.deepEqual(actual, [
            "folder/with/found/features/a.feature",
        ]);
    });
    it("returns all feature files in a directory and its subfolders when a path to a directory is used", function () {
        const actual = featureFinder.getFeatureFiles(["folder/with/found/features/"]);
        assert.deepEqual(actual, [
            "folder/with/found/features/a.feature",
            "folder/with/found/features/folder/b.feature",
        ]);
    });
    it("does not return duplicates", function () {
        const actual = featureFinder.getFeatureFiles([
            "folder/with/found/features/**",
            "path/to/fake/**",
        ]);
        assert.deepEqual(actual, [
            "folder/with/found/features/a.feature",
            "folder/with/found/features/folder/b.feature",
        ]);
    });
    it("ignores files when the --ignore argument is provided", function () {
        const actual = featureFinder.getFeatureFiles(["folder/with/found/features/**"],
            ["folder/with/found/features/**"]);
        assert.deepEqual(actual, []);
    });
    it("ignores files in the .gherkin-lintignore when specified as glob patterns", function () {
        mockFs({
            ".gherkin-lintignore":
                "folder/with/found/features/a.feature\n\n..folder/with/found/features/**",
        });
        const actual = featureFinder.getFeatureFiles(["folder/with/found/features/**"]);
        assert.deepEqual(actual, []);
    });
    it("prints an error message and exits with code 1 when a bad file pattern is used", function () {
        featureFinder.getFeatureFiles(["badpattern**"]);
        // @ts-ignore
        const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
            return args[0];
        });
        expect(consoleErrorArgs[0]).to.include("Invalid format of the feature file path/pattern:");
        // @ts-ignore
        expect(process.exit.args[0][0]).to.equal(1);
    });
});
