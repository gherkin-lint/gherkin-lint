import * as rules from "../utils/rules";
import { ConfigType } from "../types/config";

export function verifyConfigurationFile(config: Partial<ConfigType>, additionalRulesDirs?: string[]): string[] {
    let errors: string[] = [];
    for (let rule in config) {
        if (!rules.doesRuleExist(rule, additionalRulesDirs)) {
            errors.push(`Rule "${rule}" does not exist`);
        } else {
            verifyRuleConfiguration(rule, config[rule], additionalRulesDirs, errors);
        }
    }
    return errors;
}

function verifyRuleConfiguration(rule: string, ruleConfig, additionalRulesDirs?: string[], errors: string[] = []) {
    const enablingSettings = ["on", "off"];
    const genericErrorMsg = `Invalid rule configuration for "${rule}" -`;
    if (Array.isArray(ruleConfig)) {
        if (!enablingSettings.includes(ruleConfig[0])) {
            errors.push(`${genericErrorMsg} The first part of the config should be "on" or "off"`);
        }
        if (ruleConfig.length !== 2) {
            errors.push(`${genericErrorMsg} The config should only have 2 parts.`);
        }
        const ruleObj = rules.getRule(rule, additionalRulesDirs);
        let isValidSubConfig;
        if (typeof (ruleConfig[1]) === "string") {
            isValidSubConfig = (availableConfigs, subConfig) => ruleObj.availableConfigs.includes(subConfig);
            testSubconfig(genericErrorMsg, rule, ruleConfig[1], isValidSubConfig, additionalRulesDirs, errors);
        } else {
            isValidSubConfig = (availableConfigs, subConfig) => ruleObj.availableConfigs[subConfig] !== undefined;
            // TODO: fix
            for (let subConfig in ruleConfig[1]) {
                testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors);
            }
        }
    } else {
        if (!enablingSettings.includes(ruleConfig)) {
            errors.push(`${genericErrorMsg} The the config should be "on" or "off"`);
        }
    }
}

function testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors) {
    const ruleObj = rules.getRule(rule, additionalRulesDirs);
    if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
        errors.push(`${genericErrorMsg} The rule does not have the specified configuration option "${subConfig}"`);
    }
}
