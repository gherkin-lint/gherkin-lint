import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-restricted-tags";

const runTest = createRuleTest(rule, "Forbidden tag <%= tag %> on <%= nodeType %>");

describe("No Restricted Tags Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-restricted-tags/NoViolations.feature", {
            "tags": ["@badTag"],
            "patterns": ["^@anotherBadTag$"],
        }, []);
    });
    it("detects errors for features, scenarios, and scenario outlines", function () {
        return runTest("no-restricted-tags/Violations.feature", {
            "tags": ["@badTag"],
            "patterns": ["^@anotherBadTag$"],
        }, [{
            messageElements: { tag: "@badTag", nodeType: "Feature" },
            line: 1,
        },
        {
            messageElements: { tag: "@anotherBadTag", nodeType: "Feature" },
            line: 1,
        },
        {
            messageElements: { tag: "@badTag", nodeType: "Scenario" },
            line: 7,
        },
        {
            messageElements: { tag: "@anotherBadTag", nodeType: "Scenario" },
            line: 7,
        },
        {
            messageElements: { tag: "@badTag", nodeType: "Scenario Outline" },
            line: 11,
        },
        {
            messageElements: { tag: "@anotherBadTag", nodeType: "Scenario Outline" },
            line: 11,
        },
        {
            messageElements: { tag: "@badTag", nodeType: "Examples" },
            line: 14,
        },
        {
            messageElements: { tag: "@anotherBadTag", nodeType: "Examples" },
            line: 14,
        },
        {
            messageElements: { tag: "@badTag", nodeType: "Examples" },
            line: 19,
        },
        {
            messageElements: { tag: "@anotherBadTag", nodeType: "Examples" },
            line: 19,
        }]);
    });
});
