var assert = require('chai').assert;
var configParser = require('../../src/config-parser.js');

describe('Configuration file', function() {
  describe('parsing/verification is successful when', function() {
    it('rules are set to "on" or "off"', function() {
      var actual = configParser.getConfiguration("./test/configuration-parser/test-data/config1");
      var expected = require('./test-results/results.json').config1;
      assert.deepEqual(actual, expected);
    });

    it('a rule config is an array of size 2, an "on/off" state and another config value', function() {
      var actual = configParser.getConfiguration("./test/configuration-parser/test-data/config2");
      var expected  = require('./test-results/results.json').config2;
      assert.deepEqual(actual, expected);
    });

    it('a rule config is an array of size 2, an "on/off" state and a keyworded array', function() {
      var actual = configParser.getConfiguration("./test/configuration-parser/test-data/config3");
      var expected  = require('./test-results/results.json').config3;
      assert.deepEqual(actual, expected);
    });
  });

  describe('parsing/verification throws an error when', function() {
    it('a non existing rule is in the config file', function() {
      var actual;
      try {
        actual = configParser.getConfiguration("./test/configuration-parser/test-data/config4");
      } catch (e) {
        actual = e.message;
        // this is the intended case
      }

      var expected  = require('./test-results/results.json').config4;
      assert.deepEqual(actual, expected);
    });

  });
});
