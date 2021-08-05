import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-unnamed-scenarios";

const runTest = createRuleTest(rule, "Missing Scenario name");

describe("No Unnamed Scenarios Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-unnamed-scenarios/NoViolations.feature", {}, []);
    });
    it("doesn't raise errors for a feature with no scenarios", function () {
        return runTest("no-unnamed-scenarios/FeatureWithNoScenarios.feature", {}, []);
    });
    it("detects errors for scenarios with no names", function () {
        return runTest("no-unnamed-scenarios/Violations.feature", {}, [
            {
                messageElements: {},
                line: 3,
            },
            {
                messageElements: {},
                line: 6,
            },
        ]);
    });
});
