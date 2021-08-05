import { expect } from "chai";
import chalk from "chalk";
import sinon from "sinon";
import * as rule from "../../../rules/new-line-at-eof";
import { createRuleTest } from "../rule-test-base";

const runTestRequireNewLine = createRuleTest(rule, "New line at EOF(end of file) is required");
const runTestDisallowNewLine = createRuleTest(rule, "New line at EOF(end of file) is not allowed");

describe("New Line at EOF Rule", function () {
    describe("configuration", function () {
        beforeEach(function () {
            sinon.stub(console, "error");
            sinon.stub(process, "exit");
        });
        afterEach(function () {
            // @ts-ignore
            console.error.restore(); // eslint-disable-line no-console
            // @ts-ignore
            process.exit.restore();
        });
        it("raises an error if invalid configuration is used", function () {
            const featureStub = undefined; // not used by the rule
            const fileStub = { name: "foo.feature", lines: [] };
            const invalidConfiguration = ["on", "k"];
            rule.run(featureStub, fileStub, invalidConfiguration);
            // @ts-ignore
            const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
                return args[0];
            });
            const errorMsg = chalk.bold(
                "new-line-at-eof requires an extra configuration value.\nAvailable configurations: yes, no\nFor syntax please look at the documentation.");
            expect(consoleErrorArgs[0]).to.include(errorMsg);
            // @ts-ignore
            expect(process.exit.args[0][0]).to.equal(1);
        });
    });
    it('doesn\'t raise errors when the rule is configured to "yes" and there is a new line at EOF', function () {
        runTestRequireNewLine("new-line-at-eof/NewLineAtEOF.feature", "yes", []);
    });
    it('doesn\'t raise errors when the rule is configured to "no" and there is no new line at EOF', function () {
        runTestDisallowNewLine("new-line-at-eof/NoNewLineAtEOF.feature", "no", []);
    });
    it('raises an error when the rule is configured to "yes" and there is no new line at EOF', function () {
        runTestRequireNewLine("new-line-at-eof/NoNewLineAtEOF.feature", "yes", [{
            messageElements: {},
            line: 5,
        }]);
    });
    it('doesn\'t raise errors when the rule is configured to "no" and there is a new line at EOF', function () {
        runTestDisallowNewLine("new-line-at-eof/NewLineAtEOF.feature", "no", [{
            messageElements: {},
            line: 6,
        }]);
    });
});
