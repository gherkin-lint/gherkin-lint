import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-multiple-empty-lines";

const runTest = createRuleTest(rule, "Multiple empty lines are not allowed");

describe("No Multiple Empty Lines Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-multiple-empty-lines/NoViolations.feature", {}, []);
    });
    it("detects errors for features, scenarios, and scenario outlines", function () {
        return runTest("no-multiple-empty-lines/Violations.feature", {}, [
            { messageElements: {}, line: 2 },
            { messageElements: {}, line: 6 },
            { messageElements: {}, line: 7 },
            { messageElements: {}, line: 8 },
            { messageElements: {}, line: 12 },
            { messageElements: {}, line: 17 },
            { messageElements: {}, line: 25 },
        ]);
    });
});
