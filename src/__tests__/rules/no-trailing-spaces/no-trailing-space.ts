import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-trailing-spaces";

const runTest = createRuleTest(rule, "Trailing spaces are not allowed");

describe("No Trailing Spaces Rule", function () {
    it("doesn't raise errors when there are no violations", function () {
        return runTest("no-trailing-spaces/NoViolations.feature", {}, []);
    });
    it("raises an error for trailing spaces", function () {
        return runTest("no-trailing-spaces/TrailingSpaces.feature", {}, [
            {
                messageElements: {},
                line: 1,
            },
            {
                messageElements: {},
                line: 3,
            },
            {
                messageElements: {},
                line: 4,
            },
        ]);
    });
    it("raises an error for trailing tabs", function () {
        return runTest("no-trailing-spaces/TrailingTabs.feature", {}, [
            {
                messageElements: {},
                line: 4,
            },
        ]);
    });
});
