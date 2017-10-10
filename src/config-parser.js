var fs = require('fs');
var verifyConfig = require('./config-verifier.js');

var defaultConfigFileName = '.gherkin-lintrc';

function getConfiguration(configPath, additionalRulesDirs) {
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      throw new Error('Could not find specified config file "' + configPath + '"');
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      throw new Error('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory. To use a custom name/location provide the config file using the "-c" arg');
    }
    configPath = defaultConfigFileName;
  }
  var config = JSON.parse(fs.readFileSync(configPath));

  var errors = verifyConfig(config, additionalRulesDirs);

  if (errors.length > 0) {
    console.error('\x1b[31m\x1b[1mError(s) in configuration file:\x1b[0m');  // eslint-disable-line no-console
    errors.forEach(function(error) {
      console.error('\x1b[31m- ' + error + '\x1b[0m');  // eslint-disable-line no-console
    });
    throw new Error('Configuration error(s)');
  }

  return config;
}

module.exports = {
  getConfiguration: getConfiguration,
  defaultConfigFileName: defaultConfigFileName
};
