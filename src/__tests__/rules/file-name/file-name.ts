import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/file-name";

const runTest = createRuleTest(rule,
    'File names should be written in <%= style %> e.g. "<%= corrected %>"');

describe("File Name Rule", function () {
    describe("when set up for kebab-case", () => {
        it("doesn't raise errors when there are no violations", function () {
            return runTest("file-name/kebab-case.feature", {
                "style": "kebab-case",
            }, []);
        });
        it("raises errors for a pascal cased file name", function () {
            return runTest("file-name/PascalCaseWithFiveWords.feature", {
                "style": "kebab-case",
            }, [{
                messageElements: { style: "kebab-case", corrected: "pascal-case-with-five-words.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a title cased file name", function () {
            return runTest("file-name/Title Case.feature", {
                "style": "kebab-case",
            }, [{
                messageElements: { style: "kebab-case", corrected: "title-case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a camel cased file name", function () {
            return runTest("file-name/camelCase.feature", {
                "style": "kebab-case",
            }, [{
                messageElements: { style: "kebab-case", corrected: "camel-case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a snake cased file name", function () {
            return runTest("file-name/snake_case.feature", {
                "style": "kebab-case",
            }, [{
                messageElements: { style: "kebab-case", corrected: "snake-case.feature" },
                line: 0,
            }]);
        });
    });
    describe("when set up for camelCase", () => {
        it("doesn't raise errors when there are no violations", function () {
            return runTest("file-name/camelCase.feature", {
                "style": "camelCase",
            }, []);
        });
        it("raises errors for a pascal cased file name", function () {
            return runTest("file-name/PascalCaseWithFiveWords.feature", {
                "style": "camelCase",
            }, [{
                messageElements: { style: "camelCase", corrected: "pascalCaseWithFiveWords.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a title cased file name", function () {
            return runTest("file-name/Title Case.feature", {
                "style": "camelCase",
            }, [{
                messageElements: { style: "camelCase", corrected: "titleCase.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a kebab cased file name", function () {
            return runTest("file-name/kebab-case.feature", {
                "style": "camelCase",
            }, [{
                messageElements: { style: "camelCase", corrected: "kebabCase.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a snake cased file name", function () {
            return runTest("file-name/snake_case.feature", {
                "style": "camelCase",
            }, [{
                messageElements: { style: "camelCase", corrected: "snakeCase.feature" },
                line: 0,
            }]);
        });
    });
    describe("when set up for PascalCase", () => {
        it("doesn't raise errors when there are no violations", function () {
            return runTest("file-name/PascalCaseWithFiveWords.feature", {
                "style": "PascalCase",
            }, []);
        });
        it("raises errors for a kebab cased file name", function () {
            return runTest("file-name/kebab-case.feature", {
                "style": "PascalCase",
            }, [{
                messageElements: { style: "PascalCase", corrected: "KebabCase.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a title cased file name", function () {
            return runTest("file-name/Title Case.feature", {
                "style": "PascalCase",
            }, [{
                messageElements: { style: "PascalCase", corrected: "TitleCase.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a camel cased file name", function () {
            return runTest("file-name/camelCase.feature", {
                "style": "PascalCase",
            }, [{
                messageElements: { style: "PascalCase", corrected: "CamelCase.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a snake cased file name", function () {
            return runTest("file-name/snake_case.feature", {
                "style": "PascalCase",
            }, [{
                messageElements: { style: "PascalCase", corrected: "SnakeCase.feature" },
                line: 0,
            }]);
        });
    });
    describe("when set up for Title Case", () => {
        it("doesn't raise errors when there are no violations", function () {
            return runTest("file-name/Title Case.feature", {
                "style": "Title Case",
            }, []);
        });
        it("raises errors for a kebab cased file name", function () {
            return runTest("file-name/kebab-case.feature", {
                "style": "Title Case",
            }, [{
                messageElements: { style: "Title Case", corrected: "Kebab Case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a pascal cased file name", function () {
            return runTest("file-name/PascalCaseWithFiveWords.feature", {
                "style": "Title Case",
            }, [{
                messageElements: { style: "Title Case", corrected: "Pascal Case With Five Words.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a camel cased file name", function () {
            return runTest("file-name/camelCase.feature", {
                "style": "Title Case",
            }, [{
                messageElements: { style: "Title Case", corrected: "Camel Case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a snake cased file name", function () {
            return runTest("file-name/snake_case.feature", {
                "style": "Title Case",
            }, [{
                messageElements: { style: "Title Case", corrected: "Snake Case.feature" },
                line: 0,
            }]);
        });
    });
    describe("when set up for snake_case", () => {
        it("doesn't raise errors when there are no violations", function () {
            return runTest("file-name/snake_case.feature", {
                "style": "snake_case",
            }, []);
        });
        it("raises errors for a pascal cased file name", function () {
            return runTest("file-name/PascalCaseWithFiveWords.feature", {
                "style": "snake_case",
            }, [{
                messageElements: { style: "snake_case", corrected: "pascal_case_with_five_words.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a title cased file name", function () {
            return runTest("file-name/Title Case.feature", {
                "style": "snake_case",
            }, [{
                messageElements: { style: "snake_case", corrected: "title_case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a camel cased file name", function () {
            return runTest("file-name/camelCase.feature", {
                "style": "snake_case",
            }, [{
                messageElements: { style: "snake_case", corrected: "camel_case.feature" },
                line: 0,
            }]);
        });
        it("raises errors for a kebab cased file name", function () {
            return runTest("file-name/kebab-case.feature", {
                "style": "snake_case",
            }, [{
                messageElements: { style: "snake_case", corrected: "kebab_case.feature" },
                line: 0,
            }]);
        });
    });
});
