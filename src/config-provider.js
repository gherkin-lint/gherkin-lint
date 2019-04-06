const fs = require('fs');
const defaultConfigFileName = '.gherkin-lintrc';
const {Successes, Failures} = require('./successes-failures');

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
  const message = this.custom
    ? `Could not find specified config file "${configPath}"`
    : `Could not find default config file "${configPath}" in the working directory.
        To use a custom name/path provide the config file using the "-c" arg.`;
  if (!fs.existsSync(configPath)) {
    return Failures.of([{
      type: 'config-error',
      message,
    }]);
  }

  try {
    return Successes.of(JSON.parse(fs.readFileSync(configPath)));
  } catch (e) {
    return Failures.of([{
      type: 'config-error',
      message: e.toString(),
    }]);
  }
};

module.exports = ConfigParser;
