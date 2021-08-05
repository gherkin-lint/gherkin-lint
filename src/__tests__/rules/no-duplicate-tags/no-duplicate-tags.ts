import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-duplicate-tags";

const runTest = createRuleTest(rule, "Duplicate tags are not allowed: <%= tags %>");

describe("No Duplicate Tags Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-duplicate-tags/NoViolations.feature", {}, []);
    });
    it("detects errors for features, scenarios, and scenario outlines", function () {
        return runTest("no-duplicate-tags/Violations.feature", {}, [{
            messageElements: { tags: "@featuretag" },
            line: 1,
        },
        {
            messageElements: { tags: "@scenariotag" },
            line: 7,
        },
        {
            messageElements: { tags: "@scenariooutlinetag" },
            line: 11,
        },
        {
            messageElements: { tags: "@examplestag" },
            line: 14,
        }]);
    });
});
