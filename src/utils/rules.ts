// Operations on rules
import { ResultError } from "../types/result";
import { Rules } from "../types/config";
import { Feature } from "../types/cucumber";
import { File } from "../types/linter";

const glob = require("glob");
const path = require("path");
// Needed to transpile TS files if in JS
// eslint-disable-next-line import/no-unassigned-import
require("ts-node/register/transpile-only");

export function getAllRules(additionalRulesDirs?: string[]): Rules {
    let rules = {};
    const rulesDirs = [
        path.join(__dirname, "..", "rules"),
    ].concat(additionalRulesDirs || []);
    rulesDirs.forEach(rulesDir => {
        rulesDir = path.resolve(rulesDir);
        glob.sync(`${rulesDir}/*.{js,ts}`).forEach(file => {
            if (!file.includes(".d.ts")) {
                const rule = require(file);
                rules[rule.name] = rule;
            }
        });
    });
    return rules;
}

export function getRule(rule: string, additionalRulesDirs?: string[]) {
    return getAllRules(additionalRulesDirs)[rule];
}

export function doesRuleExist(rule: string, additionalRulesDirs?: string[]): boolean {
    return getRule(rule, additionalRulesDirs) !== undefined;
}

export function isRuleEnabled(ruleConfig): boolean {
    if (Array.isArray(ruleConfig)) {
        return ruleConfig[0] === "on";
    }
    return ruleConfig === "on";
}

export function runAllEnabledRules(feature: Feature,
    file: File,
    configuration: any,
    additionalRulesDirs?: string[]): ResultError[] {
    let errors: ResultError[] = [];
    const rules = getAllRules(additionalRulesDirs);
    Object.keys(rules).forEach(ruleName => {
        let rule = rules[ruleName];
        if (isRuleEnabled(configuration[rule.name])) {
            const ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
            const error = rule.run(feature, file, ruleConfig);
            if (error) {
                errors = errors.concat(error);
            }
        }
    });
    return errors;
}
