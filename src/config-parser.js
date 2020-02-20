var fs = require('fs');
var stripJsonComments = require('strip-json-comments');
var verifyConfig = require('./config-verifier.js');
var logger = require('./logger.js');
var defaultConfigFileName = '.gherkin-lintrc';

function getConfiguration(configPath, additionalRulesDirs) {
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      logger.boldError('Could not find specified config file "' + configPath + '"');
      return process.exit(1);
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      logger.boldError('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory.\nTo use a custom name/path provide the config file using the "-c" arg.');
      return process.exit(1);
    }
    configPath = defaultConfigFileName;
  }
  var config = JSON.parse(stripJsonComments(fs.readFileSync(configPath, {encoding: 'UTF-8'})));
  var errors = verifyConfig(config, additionalRulesDirs);

  if (errors.length > 0) {
    logger.boldError('Error(s) in configuration file:');
    errors.forEach(function(error) {
      logger.error(`- ${error}`);
    });
    process.exit(1);
  }

  return config;
}

module.exports = {
  getConfiguration: getConfiguration,
  defaultConfigFileName: defaultConfigFileName
};
