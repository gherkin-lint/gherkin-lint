var path = require('path');
var expect = require('chai').expect;
var Linter = require('../../dist/linter');
var ConfigParser = require('../../dist/config-parser');
var ConfigVerifier = require('../../src/config-verifier.js');
var RulesManager = require('../../src/rules-manager.js');
var getRules = require('../../src/get-rules.js');

describe('rulesdir CLI option', function() {
  it('loads additional rules from specified directories', function() {
    var additionalRulesDirs = [
      path.join(__dirname, 'rules'), // absolute path
      path.join('test', 'rulesdir', 'other_rules') // relative path from root
    ];
    var rulesManager = new RulesManager(getRules(additionalRulesDirs));
    var linter = new Linter(rulesManager);
    var configVerifier = new ConfigVerifier(rulesManager);
    var configParser = new ConfigParser(configVerifier);
    var config = configParser.getConfiguration(path.join(__dirname, '.gherkin-lintrc'));
    var featureFile = path.join(__dirname, 'simple.features');
    var results = linter.lint([ featureFile ], config);

    expect(results).to.deep.equal([
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
