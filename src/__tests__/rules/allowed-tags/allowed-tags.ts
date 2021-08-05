import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/allowed-tags";

const runTest = createRuleTest(rule, "Not allowed tag <%= tags %> on <%= nodeType %>");

describe("Allowed Tags Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("allowed-tags/NoViolations.feature", {
            "tags": ["@featuretag", "@scenariotag"],
            "patterns": ["^@examplestag$"],
        }, []);
    });
    it("detects errors for features, scenarios, and scenario outlines", function () {
        return runTest("allowed-tags/Violations.feature", {
            "tags": ["@featuretag", "@scenariotag"],
            "patterns": ["^@examplestag$"],
        }, [{
            messageElements: { tags: "@featuretag1", nodeType: "Feature" },
            line: 1,
        },
        {
            messageElements: { tags: "@anothertag", nodeType: "Feature" },
            line: 1,
        },
        {
            messageElements: { tags: "@scenariotag1", nodeType: "Scenario" },
            line: 7,
        },
        {
            messageElements: { tags: "@scenariotag2", nodeType: "Scenario" },
            line: 7,
        },
        {
            messageElements: { tags: "@anothertag", nodeType: "Scenario" },
            line: 7,
        },
        {
            messageElements: { tags: "@scenariotag1", nodeType: "Scenario Outline" },
            line: 11,
        },
        {
            messageElements: { tags: "@examplestag1", nodeType: "Examples" },
            line: 14,
        }]);
    });
});
