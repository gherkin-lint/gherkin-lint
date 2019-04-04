const assert = require('chai').assert;
const {format} = require('../../src/formatters/stylish');

describe('Stylish formatter', function() {
  it('format the received errors', function() {
    const actual = format([{
      filePath: 'path/to/file',
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
});
