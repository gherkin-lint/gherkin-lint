const expect = require('chai').expect;
const ConfigProvider = require('../../src/config-provider.js');

require('mocha-sinon');

describe('Configuration parser', () => {
  describe('early exits with a non 0 exit code when', () => {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(() => {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });

    it('the specified config file doesn\'t exist', () => {
      const configFilePath = './non/existing/path';
      new ConfigProvider(configFilePath).provide();

      // eslint-disable-next-line no-console
      const consoleErrorArgs = console.error.args.map(function(args) {
        return args[0];
      });
      expect(consoleErrorArgs[0])
        .to.include(`Could not find specified config file "${configFilePath}"`);
      expect(process.exit.args[0][0]).to.equal(1);
    });

    it('no config file has been specified and default config file doesn\'t exist', () => {
      new ConfigProvider().provide();

      // eslint-disable-next-line no-console
      const consoleErrorArgs = console.error.args.map(function(args) {
        return args[0];
      });

      expect(consoleErrorArgs[0])
        .to.include('Could not find default config file');
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });
});
