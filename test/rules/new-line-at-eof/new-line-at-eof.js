var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/new-line-at-eof.js');
var expect = require('chai').expect;
var runTestRequireNewLine = ruleTestBase.createRuleTest(rule, 'New line at EOF(end of file) is required');
var runTestDissallowNewLine = ruleTestBase.createRuleTest(rule, 'New line at EOF(end of file) is not allowed');

describe('New Line at EOF Rule', function() {

  describe('configuration', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(function() {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });

    it('raises an error if invalid configuration is used', function() {
      var featureStub = undefined; // not used by the rule
      var fileStub = {name: 'foo.feature', lines: []};
      var invalidConfiguration = ['on', 'k'];
      
      rule.run(featureStub, fileStub, invalidConfiguration);
      
      var consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });

      var errorMsg = 'new-line-at-eof requires an extra configuration value.\nAvailable configurations: yes, no\nFor syntax please look at the documentation.';
      expect(consoleErrorArgs[0]).to.include(errorMsg);
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });

  it('doesn\'t raise errors when the rule is configured to "yes" and there is a new line at EOF', function() {
    runTestRequireNewLine('new-line-at-eof/NewLineAtEOF.feature', 'yes', []);
  });

  it('doesn\'t raise errors when the rule is configured to "no" and there is no new line at EOF', function() {
    runTestDissallowNewLine('new-line-at-eof/NoNewLineAtEOF.feature', 'no', []);
  });

  it('raises an error when the rule is configured to "yes" and there is no new line at EOF', function() {
    runTestRequireNewLine('new-line-at-eof/NoNewLineAtEOF.feature', 'yes', [{
      messageElements: {},
      line: 5
    }]);
  });

  it('doesn\'t raise errors when the rule is configured to "no" and there is a new line at EOF', function() {
    runTestDissallowNewLine('new-line-at-eof/NewLineAtEOF.feature', 'no', [{
      messageElements: {},
      line: 6
    }]);
  });
});
