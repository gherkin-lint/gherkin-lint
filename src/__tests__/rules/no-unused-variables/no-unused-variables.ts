import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-unused-variables";

describe("No Unused Variables Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        const runTest = createRuleTest(rule, "");
        return runTest("no-unused-variables/NoViolations.feature", {}, []);
    });
    it("detects unused scenario variables", function () {
        const runTest = createRuleTest(rule,
            'Step variable "<%= variable %>" does not exist in the examples table');
        return runTest("no-unused-variables/UnusedStepVariables.feature", {}, [
            {
                line: 5,
                messageElements: { variable: "b" },
            },
            {
                line: 12,
                messageElements: { variable: "b" },
            },
            {
                line: 18,
                messageElements: { variable: "b" },
            },
            {
                line: 30,
                messageElements: { variable: "b" },
            },
            {
                line: 41,
                messageElements: { variable: "b" },
            },
        ]);
    });
    it("detects unused variables in the examples table", function () {
        const runTest = createRuleTest(rule,
            'Examples table variable "<%= variable %>" is not used in any step');
        return runTest("no-unused-variables/UnusedExampleVariables.feature", {}, [
            {
                line: 7,
                messageElements: { variable: "b" },
            },
            {
                line: 14,
                messageElements: { variable: "b" },
            },
            {
                line: 26,
                messageElements: { variable: "b" },
            },
            {
                line: 35,
                messageElements: { variable: "b" },
            },
            {
                line: 49,
                messageElements: { variable: "b" },
            },
            {
                line: 61,
                messageElements: { variable: "b" },
            },
        ]);
    });
});
