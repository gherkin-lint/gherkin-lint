const fs = require('fs');
const defaults = require('./defaults');
const {Successes, Failures} = require('./successes-failures');

function ConfigParser(configPath) {
  if (configPath) {
    this.configPath = configPath;
    this.message = `Could not find specified config file "${configPath}"`;
  } else {
    this.configPath = defaults.config;
    this.message = `Could not find default config file "${defaults.config}" ` +
      'in the working directory.\nTo use a custom name/path provide the config ' +
      'file using the "-c" arg.';
  }
}

ConfigParser.prototype.provide = function() {
  const {configPath, message} = this;
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
