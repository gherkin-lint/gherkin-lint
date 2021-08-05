import { assert } from "chai";
import { readAndParseFile } from "../../linter";

const _ = require("lodash");

export function createRuleTest(rule, messageTemplate) {
    return function runTest(featureFile, configuration, expected) {
        const expectedErrors = _.map(expected, function (error) {
            return {
                rule: rule.name,
                message: _.template(messageTemplate)(error.messageElements),
                line: error.line,
            };
        });
        return readAndParseFile(`src/__tests__/rules/${featureFile}`/*, "utf8"*/)
            .then(({ feature, file }) => {
                assert.sameDeepMembers(rule.run(feature, file, configuration), expectedErrors);
            });
    };
}

