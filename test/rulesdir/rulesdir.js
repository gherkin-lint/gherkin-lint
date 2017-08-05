var path = require('path');
var expect = require('chai').expect;
var linter = require('../../src/linter');
var configParser = require('../../src/config-parser');

describe('rulesdir CLI option', function() {
  it('loads additional rules from specified directories', function() {
    var additionalRulesDirs = [
      path.join(__dirname, 'rules'),
      path.join(__dirname, 'other_rules')
    ];
    var config = configParser.getConfiguration(path.join(__dirname, '.gherkin-lintrc'), additionalRulesDirs);
    var featureFile = path.join(__dirname, 'empty.features');
    var results = linter.lint([ featureFile ], config, additionalRulesDirs);

    expect(results).to.deep.equal([
      {
        errors: [
          {
            line: 123,
            message: 'Custom error',
            rule: 'custom'
          },
          {
            line: 456,
            message: 'Another custom error',
            rule: 'another-custom'
          }
        ],
        filePath: featureFile
      }
    ]);
  });
});
