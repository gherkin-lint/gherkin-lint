const assert = require('chai').assert;
const {format} = require('../../src/formatters/stylish');

describe('Stylish formatter', function() {
  it('formats lint failures', function() {
    const actual = format([{
      type: 'lint-failures',
      message: 'path/to/file',
      errors: [{
        message: 'weird error message',
        line: 2,
        rule: 'rule-name',
      }, {
        message: 'extra large message error extra large message error',
        rule: 'another-rule',
      }, {
        message: 'a',
        line: 8,
        rule: 'weird-rule',
      }],
    }]);
    assert.deepEqual(actual, [
      '\u001b[0;4mpath/to/file\u001b[24m',
      '  \u001b[38;5;243m2\u001b[0m    weird error message                                    \u001b[38;5;243mrule-name\u001b[0m',
      '  \u001b[38;5;243m \u001b[0m    extra large message error extra large message error    \u001b[38;5;243manother-rule\u001b[0m',
      '  \u001b[38;5;243m8\u001b[0m    a                                                      \u001b[38;5;243mweird-rule\u001b[0m',
      '\n',
    ]);
  });

  it('formats config rule errors', function() {
    const actual = format([{
      type: 'config-errors',
      message: 'error title',
      errors: [{
        type: 'config-rule-error',
        message: 'field not needed',
        rule: 'rule-name',
      }, {
        type: 'undefined-rule',
        message: 'rule does not exist',
        rule: 'another-rule',
      }],
    }]);
    assert.deepEqual(actual, [
      '\u001b[31m\u001b[1merror title\u001b[0m',
      '\u001b[31m- Invalid rule configuration for "rule-name" - field not needed\u001b[0m',
      '\u001b[31m- rule does not exist\u001b[0m',
    ]);
  });
});
