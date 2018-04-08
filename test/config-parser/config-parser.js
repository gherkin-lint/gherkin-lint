var expect = require('chai').expect;
var configParser = require('../../src/config-parser.js');

require('mocha-sinon');

describe('Configuration parser', function() {
  describe('early exits with a non 0 exit code when', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(function() {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });

    it('the specified config file doesn\'t exit', function() {
      var configFilePath = './non/existing/path';
      configParser.getConfiguration(configFilePath);

      var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });
      expect(consoleErrorArgs[0]).to.include('Could not find specified config file "' + configFilePath + '"');
      expect(process.exit.args[0][0]).to.equal(1);
    });

    it('no config file has been specified and default config file doesn\'t exist', function() {
      var configFilePath = './non/existing/path';
      configParser.defaultConfigFileName = configFilePath;
      configParser.getConfiguration();

      var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Could not find default config file');
      expect(process.exit.args[0][0]).to.equal(1);
    });

    it('a bad configuration file is used', function() {
      var configFilePath = 'test/config-parser/bad_config.gherkinrc';
      configParser.getConfiguration(configFilePath);

      var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Error(s) in configuration file:');
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });
});
