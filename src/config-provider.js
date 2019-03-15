const fs = require('fs');
const defaultConfigFileName = '.gherkin-lintrc';
const logger = require('./logger.js');

function ConfigParser(configPath) {
  if (configPath) {
    this.configPath = configPath;
    this.custom = true;
  } else {
    this.configPath = defaultConfigFileName;
  }
}

ConfigParser.defaultConfigFileName = defaultConfigFileName;

ConfigParser.prototype.provide = function() {
  const configPath = this.configPath;
  if (this.custom) {
    if (!fs.existsSync(configPath)) {
      logger.boldError(`Could not find specified config file "${configPath}"`);
      return process.exit(1);
    }
  } else {
    if (!fs.existsSync(configPath)) {
      logger.boldError(
        `Could not find default config file "${configPath}" in the working directory.
        To use a custom name/path provide the config file using the "-c" arg.`);
      return process.exit(1);
    }
  }

  return JSON.parse(fs.readFileSync(configPath));
};

module.exports = ConfigParser;
