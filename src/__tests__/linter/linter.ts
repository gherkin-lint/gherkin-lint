import { assert } from "chai";
import * as linter from "../../linter";
import * as path from "path";

function linterTest(feature, expected) {
    return linter.lint([feature], {})
        .then((actual) => {
            assert.lengthOf(actual, 1);
            assert.deepEqual(actual[0].errors, expected);
        });
}

describe("Linter", function () {
    it("detects up-to-one-background-per-file violations", function () {
        const feature = path.join(__dirname, "MultipleBackgrounds.feature");
        const expected = [{
            "message": 'Multiple "Background" definitions in the same file are disallowed',
            "rule": "up-to-one-background-per-file",
            "line": "9",
        }];
        return linterTest(feature, expected);
    });
    it("detects no-tags-on-backgrounds violations", function () {
        const feature = path.join(__dirname, "TagOnBackground.feature");
        const expected = [{
            "message": "Tags on Backgrounds are disallowed",
            "rule": "no-tags-on-backgrounds",
            "line": "4",
        }];
        return linterTest(feature, expected);
    });
    it("detects one-feature-per-file violations", function () {
        const feature = path.join(__dirname, "MultipleFeatures.feature");
        const expected = [{
            "message": 'Multiple "Feature" definitions in the same file are disallowed',
            "rule": "one-feature-per-file",
            "line": "7",
        }];
        return linterTest(feature, expected);
    });
    it("detects no-multiline-steps violations", function () {
        const feature = path.join(__dirname, "MultilineStep.feature");
        const expected = [{
            "message": 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
            "rule": "no-multiline-steps",
            "line": "9",
        }];
        return linterTest(feature, expected);
    });
    it("detects no-multiline-steps violations in backgrounds", function () {
        const feature = path.join(__dirname, "MultilineBackgroundStep.feature");
        const expected = [{
            "message": 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
            "rule": "no-multiline-steps",
            "line": "5",
        }];
        return linterTest(feature, expected);
    });
    it("detects no-multiline-steps violations in scenario outlines", function () {
        const feature = path.join(__dirname, "MultilineScenarioOutlineStep.feature");
        const expected = [{
            "message": 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
            "rule": "no-multiline-steps",
            "line": "9",
        }];
        return linterTest(feature, expected);
    });
    it("detects additional violations that happen after the 'no-tags-on-backgrounds' rule", function () {
        const feature = path.join(__dirname, "MultipleViolations.feature");
        const expected = [
            {
                message: 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed',
                rule: "no-multiline-steps",
                line: "13",
            },
            {
                message: "Tags on Backgrounds are disallowed",
                rule: "no-tags-on-backgrounds",
                line: "4",
            },
        ];
        linter.lint([feature])
            .then((actual) => {
                assert.deepEqual(actual[0].errors, expected);
            });
    });
    it("correctly parses files that have the correct Gherkin format", function () {
        const feature = path.join(__dirname, "NoViolations.feature");
        const expected = [];
        return linterTest(feature, expected);
    });
});
