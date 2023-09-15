var expect = require('chai').expect;
var { handleResults } = require('../../dist/results-handler');


describe('Results handler', function() {

  describe('configuration', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(function() {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });
  });

  const results = [
    {
      errors: [
        { // This one is to make sure we don't accidentally regress and always load the default rules
          line: 1,
          message: 'Wrong indentation for "Feature", expected indentation level of 0, but got 4',
          rule: 'indentation'
        },
        {
          line: 109,
          message: 'Another custom-list error',
          rule: 'another-custom-list'
        },
      ],
      filePath: 'first-feature-file-name'
    }, {
      errors: [
        {
          line: 32,
          message: 'Custom error',
          rule: 'custom'
        }
      ],
      filePath: 'second-feature-file-name'
    }
  ];

  it('raises an error when number of errors is more than maxErrors', function() {
    handleResults(results, { format: 'json', maxErrors: 2 });

    const numberOfErrorsMessage = '3 errors';

    var consoleLogArgs = console.log.args.map(function (args) { // eslint-disable-line no-console
      return args[0];
    });
    expect(consoleLogArgs[0]).to.include(numberOfErrorsMessage);
    expect(process.exit.args[0][0]).to.equal(1);
  });

  it('doesn\'t raise errors when the error count is equal to maxErrors', function() {
    handleResults(results, { format: 'json', maxErrors: 3 });

    var numberOfErrorsMessage = '3 errors';

    var consoleLogArgs = console.log.args.map(function (args) { // eslint-disable-line no-console
      return args[0];
    });
    expect(consoleLogArgs[0]).to.include(numberOfErrorsMessage);
    expect(process.exit.args[0][0]).to.equal(0);
  });

  it('doesn\'t raise errors when the error count is less than maxErrors', function() {
    handleResults(results, { format: 'json', maxErrors: 4 });

    var numberOfErrorsMessage = '3 errors';

    var consoleLogArgs = console.log.args.map(function (args) { // eslint-disable-line no-console
      return args[0];
    });
    expect(consoleLogArgs[0]).to.include(numberOfErrorsMessage);
    expect(process.exit.args[0][0]).to.equal(0);
  });

  it('doesn\'t raise errors when the error count is 0', function() {
    handleResults([], { format: 'json', maxErrors: 4 });

    var numberOfErrorsMessage = '0 errors';

    var consoleLogArgs = console.log.args.map(function (args) { // eslint-disable-line no-console
      return args[0];
    });
    expect(consoleLogArgs[0]).to.include(numberOfErrorsMessage);
    expect(process.exit.args[0][0]).to.equal(0);
  });
});
