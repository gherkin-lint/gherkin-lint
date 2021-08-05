import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-partially-commented-tag-lines";

const runTest = createRuleTest(rule, "Partially commented tag lines not allowed");

describe("No Partially Commented Tag Lines Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-partially-commented-tag-lines/NoViolations.feature", {}, []);
    });
    it("detects errors for features, scenarios, and scenario outlines", function () {
        return runTest("no-partially-commented-tag-lines/Violations.feature", {}, [
            { messageElements: {}, line: 1 },
            { messageElements: {}, line: 7 },
            { messageElements: {}, line: 12 },
            { messageElements: {}, line: 15 },
        ]);
    });
});
