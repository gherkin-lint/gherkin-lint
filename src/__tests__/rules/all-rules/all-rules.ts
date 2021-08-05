import * as path from "path";
import * as linter from "../../../linter";
import * as rules from "../../../utils/rules";

// Test cases for incomplete feature files that have broken over time across multiple rules
describe("Malformed features do not break the linter", function () {
    function testRule(fileName: string, rule: string) {
        const configuration = {};
        if (rule === "new-line-at-eof") {
            configuration[rule] = ["on", "yes"];
        } else if (rule === "required-tags") {
            configuration[rule] = ["on", { "tags": [] }];
        } else {
            configuration[rule] = "on";
        }
        return linter.readAndParseFile(path.join(__dirname, fileName)/* ,"utf8"*/)
            .then(({ feature, file }) => {
                return rules.runAllEnabledRules(feature, file, configuration);
            });
    }

    const allRules = rules.getAllRules();
    Object.keys(allRules).forEach((rule) => {
        it(`${rule} does not throw exceptions when processing an empty feature`, function () {
            return testRule("EmptyFeature.feature", rule);
        });
        it(`${rule} does not throw exceptions when processing a feature with no children`, function () {
            return testRule("ChildlessFeature.feature", rule);
        });
        it(`${rule} does not throw exceptions when processing a feature with no steps`, function () {
            return testRule("SteplessFeature.feature", rule);
        });
        it(`${rule} does not throw exceptions when processing a scenario outline with an empty examples table`,
            function () {
                return testRule("EmptyExamples.feature", rule);
            });
    });
});
