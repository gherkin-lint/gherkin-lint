import { createRuleTest } from "../rule-test-base";
import * as rule from "../../../rules/no-dupe-feature-names";

const runTest = createRuleTest(rule, "Feature name is already used in: <%= location %>");

describe("No Duplicate Feature Names Rule", function () {
    it("doesn't raise errors when there are no duplicate feature names", function () {
        return runTest("no-dupe-feature-names/NoViolations.feature", {}, []);
    });
    it("raises errors for every duplicate feature name", function () {
        return runTest("no-dupe-feature-names/DuplicateNameFeature1.feature", {}, [])
            .then(() => {
                return runTest("no-dupe-feature-names/DuplicateNameFeature2.feature", {}, [
                    {
                        line: 3,
                        messageElements: {
                            location: "src/__tests__/rules/no-dupe-feature-names/DuplicateNameFeature1.feature",
                        },
                    },
                ]);
            })
            .then(() => {
                return runTest("no-dupe-feature-names/DuplicateNameFeature3.feature", {}, [
                    {
                        line: 1,
                        messageElements: {
                            location: "src/__tests__/rules/no-dupe-feature-names/DuplicateNameFeature1.feature, src/__tests__/rules/no-dupe-feature-names/DuplicateNameFeature2.feature",
                        },
                    },
                ]);
            });
    });
});
