import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-scenario-outlines-without-examples";

const runTest = createRuleTest(rule,
    "Scenario Outline does not have any Examples");

describe("No scenario outlines without examples rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-scenario-outlines-without-examples/NoViolations.feature", {}, []);
    });
    it('detects errors for scenario outlines that are missing the "Examples" keyword completely', function () {
        return runTest("no-scenario-outlines-without-examples/ViolationsNoExamples.feature", {}, [
            { line: 3 },
        ]);
    });
    it('detects errors for scenario outlines that have empty "Examples"', function () {
        return runTest("no-scenario-outlines-without-examples/ViolationsEmptyExamples.feature", {}, [
            { line: 3 },
        ]);
    });
    it("detects errors for scenario outlines that define variable names but don't have any values to iterate over",
        function () {
            return runTest("no-scenario-outlines-without-examples/ViolationsNoExamplesBody.feature", {}, [
                { line: 3 },
            ]);
        });
});
