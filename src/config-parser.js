var fs = require('fs');
var rules = require('./rules.js');

var defaultConfigFileName = '.gherkin-lintrc';
var errors = [];

function getConfiguration(configPath) {
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      throw new Error('Could not find specified config file "' + configPath + '"');
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      errors.push('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory. To use a custom name/location provide the config file using the "-c" arg');
    }
    configPath = defaultConfigFileName;
  }
  var config = JSON.parse(fs.readFileSync(configPath));

  verifyConfigurationFile(config);

  if (errors.length > 0) {
    console.error('\x1b[31m\x1b[1mError(s) in configuration file:\x1b[0m');
    errors.forEach(function(error){
      console.error('\x1b[31m- ' + error + '\x1b[0m');
    });
    throw new Error('Configuration error(s)');
  }

  return config;
}

function verifyConfigurationFile(config) {
  for (var rule in config) {
    if (!rules.doesRuleExist(rule)) {
      errors.push('Rule "' + rule + '" does not exist');
    }
    verifyRuleConfiguration(rule, config[rule]);
  }
}

function verifyRuleConfiguration(rule, ruleConfig) {
  var enablingSettings = ['on', 'off'];
  var genericErrorMsg = 'Invalid rule configuration for "' + rule + '" - ';

  if (Array.isArray(ruleConfig)) {
    if (enablingSettings.indexOf(ruleConfig[0]) == -1) {
      errors.push(genericErrorMsg + 'The first part of the config should be "on" or "off"');
    }

    if (ruleConfig.length != 2 ) {
      errors.push(genericErrorMsg + ' The config should only have 2 parts.');
    }

    var ruleObj = rules.getRule(rule);
    if (typeof(ruleConfig[1]) === 'string') {
      var comparisonFunc = function(availableConfigs, subconfig) {
        return ruleObj.availableConfigs.indexOf(subConfig) > -1;
      }
      testSubconfig(genericErrorMsg, rule, ruleConfig[1], comparisonFunc);
    } else {
      var comparisonFunc = function(availableConfigs, subconfig) {
        return ruleObj.availableConfigs[subConfig] === undefined;
      }
      for (var subConfig in ruleConfig[1]) {
        testSubconfig(genericErrorMsg, rule, subConfig, comparisonFunc);
      }
    }
  } else {
    if (enablingSettings.indexOf(ruleConfig) == -1) {
      errors.push(genericErrorMsg + 'The the config should be "on" or "off"');
    }
  }
}

function testSubconfig(genericErrorMsg, rule, subConfig, comparisonFunc) {
  var ruleObj = rules.getRule(rule);
  if (comparisonFunc(ruleObj.availableConfigs, subConfig)) {
    errors.push(genericErrorMsg + ' The rule does not have the specified configuration option "' + subConfig + '"');
  }
}

module.exports = {
  getConfiguration: getConfiguration,
  defaultConfigFileName: defaultConfigFileName
}
