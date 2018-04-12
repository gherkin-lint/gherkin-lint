var rules = require('./rules.js');

function verifyConfigurationFile(config, additionalRulesDirs) {
  var errors = [];
  for (var rule in config) {
    if (!rules.doesRuleExist(rule, additionalRulesDirs)) {
      errors.push('Rule "' + rule + '" does not exist');
    } else {
      verifyRuleConfiguration(rule, config[rule], additionalRulesDirs, errors);
    }
  }
  return errors;
}

function verifyRuleConfiguration(rule, ruleConfig, additionalRulesDirs, errors) {
  var enablingSettings = ['on', 'off'];
  var genericErrorMsg = 'Invalid rule configuration for "' + rule + '" - ';

  if (Array.isArray(ruleConfig)) {
    if (enablingSettings.indexOf(ruleConfig[0]) === -1) {
      errors.push(genericErrorMsg + 'The first part of the config should be "on" or "off"');
    }

    if (ruleConfig.length != 2 ) {
      errors.push(genericErrorMsg + ' The config should only have 2 parts.');
    }

    var ruleObj = rules.getRule(rule, additionalRulesDirs);
    var isValidSubConfig;

    if (typeof(ruleConfig[1]) === 'string') {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs.indexOf(subConfig) > -1;
      };
      testSubconfig(genericErrorMsg, rule, ruleConfig[1], isValidSubConfig, additionalRulesDirs, errors);
    } else {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs[subConfig] !== undefined;
      };
      for (var subConfig in ruleConfig[1]) {
        testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors);
      }
    }
  } else {
    if (enablingSettings.indexOf(ruleConfig) == -1) {
      errors.push(genericErrorMsg + 'The the config should be "on" or "off"');
    }
  }
}

function testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors) {
  var ruleObj = rules.getRule(rule, additionalRulesDirs);
  if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
    errors.push(genericErrorMsg + ' The rule does not have the specified configuration option "' + subConfig + '"');
  }
}

module.exports = verifyConfigurationFile;
