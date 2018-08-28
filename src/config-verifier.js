function ConfigVerifier(rulesManager) {
  this.rulesManager = rulesManager;
}

ConfigVerifier.prototype.verify = function(config) {
  var errors = [];
  for (var rule in config) {
    if (!this.rulesManager.doesRuleExist(rule)) {
      errors.push('Rule "' + rule + '" does not exist');
    } else {
      verifyRuleConfiguration.call(this, rule, config[rule], errors);
    }
  }
  return errors;
};

function verifyRuleConfiguration(rule, ruleConfig, errors) {
  var enablingSettings = ['on', 'off'];
  var genericErrorMsg = 'Invalid rule configuration for "' + rule + '" - ';

  if (Array.isArray(ruleConfig)) {
    if (enablingSettings.indexOf(ruleConfig[0]) === -1) {
      errors.push(genericErrorMsg + 'The first part of the config should be "on" or "off"');
    }

    if (ruleConfig.length != 2 ) {
      errors.push(genericErrorMsg + ' The config should only have 2 parts.');
    }

    var ruleObj = this.rulesManager.getRule(rule);
    var isValidSubConfig;

    if (typeof(ruleConfig[1]) === 'string') {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs.indexOf(subConfig) > -1;
      };
      testSubconfig.call(this, genericErrorMsg, rule, ruleConfig[1], isValidSubConfig, errors);
    } else {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs[subConfig] !== undefined;
      };
      for (var subConfig in ruleConfig[1]) {
        testSubconfig.call(this, genericErrorMsg, rule, subConfig, isValidSubConfig, errors);
      }
    }
  } else {
    if (enablingSettings.indexOf(ruleConfig) == -1) {
      errors.push(genericErrorMsg + 'The the config should be "on" or "off"');
    }
  }
}

function testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, errors) {
  var ruleObj = this.rulesManager.getRule(rule);
  if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
    errors.push(genericErrorMsg + ' The rule does not have the specified configuration option "' + subConfig + '"');
  }
}

module.exports = ConfigVerifier;
