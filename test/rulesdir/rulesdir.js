var path = require('path');
var expect = require('chai').expect;
var linter = require('../../dist/linter');
var configParser = require('../../dist/config-parser');

describe('rulesdir CLI option', function() {
  it('loads additional rules from specified directories', function() {
    var additionalRulesDirs = [
      path.join(__dirname, 'rules'), // absolute path
      path.join('test', 'rulesdir', 'other_rules') // relative path from root
    ];
    var config = configParser.getConfiguration(path.join(__dirname, '.gherkin-lintrc'), additionalRulesDirs);
    var featureFile = path.join(__dirname, 'simple.features');
    return linter.lint([ featureFile ], config, additionalRulesDirs)
      .then((results) => {
        expect(results).to.deep.equal([
          {
            errors: [
              { // This one is to make sure we don't accidentally regress and always load the default rules
                line: 1,
                column: 5,
                message: 'Wrong indentation for "Feature", expected indentation level of 0, but got 4',
                rule: 'indentation'
              },
              {
                line: 109,
                column: 27,
                message: 'Another custom-list error',
                rule: 'another-custom-list'
              },
              {
                line: 123,
                column: 21,
                message: 'Custom error',
                rule: 'custom'
              },
              {
                line: 456,
                column: 23,
                message: 'Another custom error',
                rule: 'another-custom'
              }
            ],
            filePath: featureFile
          }
        ]);
      });
  });
});
