var assert = require('chai').assert;
var verifyConfig = require('../src/config-verifier.js');

describe('Config Verifier', function() {
  describe('Verification is successful when', function() {
    it('rules are set to "on" or "off"', function() {
      assert.deepEqual(verifyConfig({
        'no-files-without-scenarios' : 'on',
        'no-unnamed-features': 'on',
        'no-unnamed-scenarios': 'on',
        'no-dupe-scenario-names': 'on',
        'no-dupe-feature-names': 'on',
        'no-partially-commented-tag-lines': 'on',
        'indentation': 'on',
        'no-trailing-spaces': 'on',
        'no-multiple-empty-lines': 'off'
      }), []);
    });

    it('a rule config is an array of size 2, with an "on/off" state and another config value', function() {
      assert.deepEqual(verifyConfig({'new-line-at-eof': ['on', 'yes']}), []);
    });

    it('a rule config is an array of size 2, with an "on/off" state and a keyworded array', function() {
      assert.deepEqual(verifyConfig({
        'indentation': ['on', { 'Feature': 1, 'Background': 1, 'Scenario': 1, 'Step': 1, 'given': 1, 'and': 1}]
      }), []);
    });
  });

  describe('Verification fails when', function() {
    it('a non existing rule', function() {
      assert.deepEqual(verifyConfig({'fake-rule': 'on'}), ['Rule "fake-rule" does not exist']);
    });

    it('a non existing rule sub-config', function() {
      assert.deepEqual(verifyConfig({
        'indentation': ['on', { 'featur': 0}],
        'new-line-at-eof': ['on', 'y']
      }), [
        'Invalid rule configuration for "indentation" -  The rule does not have the specified configuration option "featur"',
        'Invalid rule configuration for "new-line-at-eof" -  The rule does not have the specified configuration option "y"'
      ]);
    });
  });
});

