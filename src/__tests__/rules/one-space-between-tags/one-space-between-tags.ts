import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/one-space-between-tags";

const runTest = createRuleTest(rule,
    "There is more than one space between the tags <%= left %> and <%= right %>");

describe("One Space Between Tags Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("one-space-between-tags/NoViolations.feature", {}, []);
    });
    it("detects errors for tags on features, scenarios, and scenario outlines", function () {
        return runTest("one-space-between-tags/Violations.feature", {}, [
            {
                line: 1,
                messageElements: { left: "@featuretag1", right: "@featuretag2" },
            },
            {
                line: 9,
                messageElements: { left: "@scenariotag3", right: "@scenariotag4" },
            },
            {
                line: 9,
                messageElements: { left: "@scenariotag4", right: "@scenariotag5" },
            },
            {
                line: 13,
                messageElements: { left: "@scenariotag5", right: "@scenariotag6" },
            },
            {
                line: 16,
                messageElements: { left: "@examplestag1", right: "@examplestag2" },
            },
        ]);
    });
});
