const path = require('path');
const expect = require('chai').expect;
const Linter = require('../../src/linter');
const ConfigProvider = require('../../src/config-provider.js');
const RulesManager = require('../../src/rules-manager.js');
const getRules = require('../../src/get-rules.js');
const RulesParser = require('../../src/rules-parser.js');

describe('rulesdir CLI option', function() {
  it('loads additional rules from specified directories', function() {
    const additionalRulesDirs = [
      path.join(__dirname, 'rules'), // absolute path
      path.join('test', 'rulesdir', 'other_rules'), // relative path from root
    ];
    const configPath = path.join(__dirname, '.gherkin-lintrc');
    const config = new ConfigProvider(configPath).provide();
    const rulesParser = new RulesParser(getRules(additionalRulesDirs), config);
    const rulesManager = new RulesManager(rulesParser.parse());
    const linter = new Linter(rulesManager);
    const featureFile = path.join(__dirname, 'simple.features');
    const results = linter.lint([featureFile]);

    expect(results).to.deep.equal([
      {
        errors: [
          /*
           * This one is to make sure we don't accidentally
           * regress and always load the default rules
           */
          {
            line: 1,
            message: 'Wrong indentation for "Feature", expected indentation level of 0, but got 4',
            rule: 'indentation',
          },
          {
            line: 109,
            message: 'Another custom-list error',
            rule: 'another-custom-list',
          },
          {
            line: 123,
            message: 'Custom error',
            rule: 'custom',
          },
          {
            line: 456,
            message: 'Another custom error',
            rule: 'another-custom',
          },
        ],
        filePath: featureFile,
      },
    ]);
  });
});
