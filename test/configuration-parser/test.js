var assert = require('chai').assert;
var expect = require('chai').expect;
var configParser = require('../../src/config-parser.js');
var expectedResults = require('./test-results/results.js');

require('mocha-sinon');

describe('Configuration file', function() {
  describe('parsing/verification is successful when', function() {
    it('rules are set to "on" or "off"', function() {
      var actual = configParser.getConfiguration('./test/configuration-parser/test-data/config1');
      var expected = expectedResults.config1;
      assert.deepEqual(actual, expected);
    });

    it('a rule config is an array of size 2, with an "on/off" state and another config value', function() {
      var actual = configParser.getConfiguration('./test/configuration-parser/test-data/config2');
      var expected  = expectedResults.config2;
      assert.deepEqual(actual, expected);
    });

    it('a rule config is an array of size 2, with an "on/off" state and a keyworded array', function() {
      var actual = configParser.getConfiguration('./test/configuration-parser/test-data/config3');
      var expected  = expectedResults.config3;
      assert.deepEqual(actual, expected);
    });
  });

  describe('parsing/verification throws an error when the config contails', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
    });

    it('a non existing rule', function() {
      var actualAssertion;
      try {
        configParser.getConfiguration('./test/configuration-parser/test-data/config4');
      } catch (e) {
        actualAssertion = e.message;
      }

      var expected = expectedResults.config4;

      // verify the assertion message
      var expectedAssertion  = expected.assertionMessage;
      assert.equal(actualAssertion, expectedAssertion);

      // verify the console logs
      expected.consoleErrors.forEach(function(msg) {
        expect(console.error.calledWith(msg)).to.be.true; // eslint-disable-line no-console
      });
    });

    it('a non existing rule sub-config', function() {
      var actualAssertion;
      try {
        configParser.getConfiguration('./test/configuration-parser/test-data/config5');
      } catch (e) {
        actualAssertion = e.message;
      }

      var expected  = expectedResults.config5;

      // verify the assertion message
      var expectedAssertion  = expected.assertionMessage;
      assert.equal(actualAssertion, expectedAssertion);

      // verify the console logs
      expected.consoleErrors.forEach(function(msg) {
        expect(console.error.calledWith(msg)).to.be.true; // eslint-disable-line no-console
      });

    });

  });
});
