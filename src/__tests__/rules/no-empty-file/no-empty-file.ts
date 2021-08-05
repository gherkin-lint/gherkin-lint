import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-empty-file";

const runTest = createRuleTest(rule, "Empty feature files are disallowed");

describe("No Empty Files Rule", function () {
    it("doesn't raise errors when a feature file isn't empty", function () {
        return runTest("no-empty-file/NoViolations.feature", {}, []);
    });
    it("raises an error an error for feature files that are empty", function () {
        return runTest("no-empty-file/EmptyFeature.feature", {}, [
            { messageElements: {}, line: 1 },
        ]);
    });
    it("raises an error an error for feature files that only contain whitespace", function () {
        return runTest("no-empty-file/OnlyWhitespace.feature", {}, [
            { messageElements: {}, line: 1 },
        ]);
    });
});
