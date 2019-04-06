const assert = require('chai').assert;
const formatterFactory = require('../../src/formatters/formatter-factory');

describe('Formatter factory', function() {
  it('Stilish formatter', function() {
    const formatter = formatterFactory('stylish');
    const actual = formatter.format([{
      type: 'lint-failures',
      message: 'path/to/file',
    }]);
    assert.deepEqual(actual, [
      '\u001b[0;4mpath/to/file\u001b[24m',
      '\n',
    ]);
  });

  it('JSON formatter', function() {
    const formatter = formatterFactory('json');
    const actual = formatter.format([{
      type: 'config-errors',
      message: 'error title',
    }]);
    assert.deepEqual(actual, ['[{"type":"config-errors","message":"error title"}]']);
  });

  it('no existing formatter', function() {
    const formatter = formatterFactory('wrong');
    const actual = formatter.format([{
      type: 'config-errors',
      message: 'error title',
    }]);
    assert.deepEqual(actual, ['\u001b[31m\u001b[1mUnsupported format. The supported formats are json and stylish.\u001b[0m']);
  });
});
