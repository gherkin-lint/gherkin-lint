import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-empty-background";

const runTest = createRuleTest(rule, "Empty backgrounds are not allowed.");

describe("No empty Backgrounds Rule", function () {
    it("doesn't raise errors when there are no background", function () {
        return runTest("no-empty-background/NoBackground.feature", {}, []);
    });
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-empty-background/NoViolations.feature", {}, []);
    });
    it("detects errors for scenarios, and scenario outlines", function () {
        return runTest("no-empty-background/Violations.feature", {}, [{
            line: 4,
            messageElements: {},
        }]);
    });
});
