const expect = require('chai').expect;
const ConfigProvider = require('../../src/config-provider.js');
const CONFIG_PATH = './test/config-provider';

describe('Configuration parser', () => {
  describe('early exits with a non 0 exit code when', () => {
    it('the specified config file doesn\'t exist', () => {
      const configFilePath = './non/existing/path';
      const result = new ConfigProvider(configFilePath).provide();

      expect(result.isSuccess()).to.be.equal(false);
      expect(result.getFailures()).to.be.deep.equal([{
        type: 'config-error',
        message: `Could not find specified config file "${configFilePath}"`,
      }]);
    });

    it('the specified config file exists', () => {
      const result = new ConfigProvider(`${CONFIG_PATH}/config.gherkinrc`).provide();

      expect(result.isSuccess()).to.be.equal(true);
      expect(result.getSuccesses()).to.be.deep.equal({
        'fake-rule': 'on',
      });
    });

    it('the specified config file exists but it is a badly formed JSON', () => {
      const result = new ConfigProvider(`${CONFIG_PATH}/wrong-config.json`).provide();

      expect(result.isSuccess()).to.be.equal(false);
      expect(result.getFailures()).to.be.deep.equal([{
        message: 'SyntaxError: Unexpected string in JSON at position 19',
        type: 'config-error',
      }]);
    });

    it('no config file has been specified and default config file doesn\'t exist', () => {
      const result = new ConfigProvider().provide();

      expect(result.isSuccess()).to.be.equal(false);
      expect(result.getFailures()).to.be.deep.equal([{
        type: 'config-error',
        message: 'Could not find default config file ".gherkin-lintrc" in the working directory.\nTo use a custom name/path provide the config file using the "-c" arg.',
      }]);
    });
  });
});
