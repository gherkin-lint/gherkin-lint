import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/scenario-size";

const runTest = createRuleTest(rule,
    "Element <%= type %> too long: actual <%= actual %>, expected <%= expected %>");

describe("Scenario size Rule", function () {
    it("No violations for scenario-size", function () {
        return runTest("scenario-size/ExampleFeature.feature", undefined, []);
    });
    it("Violations for scenario-size", function () {
        return runTest("scenario-size/ExampleFeature.feature", {
            "steps-length": {
                "Background": 2,
                "Scenario": 3,
            },
        }, [{
            line: 3,
            messageElements: {
                type: "Background",
                actual: 5,
                expected: 2,
            },
        },
        {
            line: 10,
            messageElements: {
                type: "Scenario",
                actual: 5,
                expected: 3,
            },
        },
        {
            line: 17,
            messageElements: {
                type: "Scenario Outline",
                actual: 5,
                expected: 3,
            },
        }]);
    });
});
