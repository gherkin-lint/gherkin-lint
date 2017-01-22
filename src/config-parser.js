var fs = require('fs');
var rules = require('./rules.js');
var logger = require('./logger.js');

var defaultConfigFileName = '.gherkin-lintrc';
var errors;

function getConfiguration(configPath) {
  errors = [];
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      logger.boldError('Could not find specified config file "' + configPath + '"');
      process.exit(1);
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      logger.boldError('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory.\nTo use a custom name/path provide the config file using the "-c" arg.');
      process.exit(1);
    }
    configPath = defaultConfigFileName;
  }
  var config = JSON.parse(fs.readFileSync(configPath));

  verifyConfigurationFile(config);

  if (errors.length > 0) {
    logger.boldError('Error(s) in configuration file:');
    errors.forEach(function(error){
      logger.error(error);
    });
    process.exit(1);
  }

  return config;
}

function verifyConfigurationFile(config) {
  for (var rule in config) {
    if (!rules.doesRuleExist(rule)) {
      errors.push('Rule "' + rule + '" does not exist');
    } else {
      verifyRuleConfiguration(rule, config[rule]);
    }
  }
}

function verifyRuleConfiguration(rule, ruleConfig) {
  var enablingSettings = ['on', 'off'];
  var genericErrorMsg = 'Invalid rule configuration for "' + rule + '" - ';

  if (Array.isArray(ruleConfig)) {
    if (enablingSettings.indexOf(ruleConfig[0]) !== 0) {
      errors.push(genericErrorMsg + 'The first part of the config should be "on" or "off"');
    }

    if (ruleConfig.length != 2 ) {
      errors.push(genericErrorMsg + ' The config should only have 2 parts.');
    }

    var ruleObj = rules.getRule(rule);
    var isValidSubConfig;

    if (typeof(ruleConfig[1]) === 'string') {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs.indexOf(subConfig) > -1;
      };
      testSubconfig(genericErrorMsg, rule, ruleConfig[1], isValidSubConfig);
    } else {
      isValidSubConfig = function(availableConfigs, subConfig) {
        return ruleObj.availableConfigs[subConfig] !== undefined;
      };
      for (var subConfig in ruleConfig[1]) {
        testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig);
      }
    }
  } else {
    if (enablingSettings.indexOf(ruleConfig) == -1) {
      errors.push(genericErrorMsg + 'The the config should be "on" or "off"');
    }
  }
}

function testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig) {
  var ruleObj = rules.getRule(rule);
  if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
    errors.push(genericErrorMsg + ' The rule does not have the specified configuration option "' + subConfig + '"');
  }
}

module.exports = {
  getConfiguration: getConfiguration,
  defaultConfigFileName: defaultConfigFileName
};
