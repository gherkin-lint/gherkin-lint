var rules = require('../../../dist/rules.js');
var linter = require('../../../dist/linter.js');

// Test cases for incomplete feature files that have broken over time accross multiple rules
describe('Malformated features do not break the linter', function() {
  function testRule(file, rule) {
    var configuration = {};
    if (rule == 'new-line-at-eof') {
      configuration[rule] = ['on', 'yes']; 
    } else if (rule == 'required-tags') {
      configuration[rule] = ['on', {'tags': [] }];
    } else {
      configuration[rule] = 'on'; 
    }
    return linter.readAndParseFile('test/rules/all-rules/' + file, 'utf8')
      .then(({feature, file}) => {
        return rules.runAllEnabledRules(feature, file, configuration);
      });
  }

  const allRules = rules.getAllRules();
  
  Object.keys(allRules).forEach((rule) => {
    it(`${rule} does not throw exceptions when processing an empty feature`, function() {
      return testRule('EmptyFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a feature with no children`, function() {
      return testRule('ChildlessFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a feature with no steps`, function() {
      return testRule('SteplessFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a scenario outline with an empty examples table`, function() {
      return testRule('EmptyExamples.feature', rule);
    });
  });
});