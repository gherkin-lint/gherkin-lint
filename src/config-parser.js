var fs = require('fs');
var rules = require('./rules.js');

var defaultConfigFileName = '.gherkin-lintrc';

function getConfiguration(configPath) {
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      throw new Error('Could not find specified config file "' + configPath + '"');
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      throw new Error('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory. To use a custom name/location provide the config file using the "-c" arg.');
    }
    configPath = defaultConfigFileName;
  }
  var config = JSON.parse(fs.readFileSync(configPath));
  verifyConfigurationFile(config);
  return config;
}

function verifyConfigurationFile(config) {
  for (var rule in config) {
    if (!rules.doesRuleExist(rule)) {
      throw new Error('Rule "' + rule + '" does not exist');
    }
    rules.verifyRuleConfiguration(rule, config[rule]);
  }
}

module.exports = {
  getConfiguration: getConfiguration,
  defaultConfigFileName: defaultConfigFileName
}
