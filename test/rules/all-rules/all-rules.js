var rules = require('../../../dist/rules.js');
var linter = require('../../../dist/linter.js');

// Test cases for incomplete feature files that have broken over time accross multiple rules
describe('All rules', function() {

  function runAllEnabledRulesAgainstFile(featureFile) {
    var allRules = rules.getAllRules();
    var configuration = {};
    Object.keys(allRules).forEach(function(rule) {
      if (rule == 'new-line-at-eof') {
        configuration[rule] = ['on', 'yes']; 
      } else if (rule == 'required-tags') {
        configuration[rule] = ['on', {'tags': [] }];
      } else {
        configuration[rule] = 'on'; 
      }
    });

    return linter.readAndParseFile('test/rules/all-rules/' + featureFile, 'utf8')
      .then(({feature, fileName}) => {
        return rules.runAllEnabledRules(feature, fileName, configuration);
      });
  }

  it('do not throw exceptions when processing an empty feature', function() {
    return runAllEnabledRulesAgainstFile('EmptyFeature.feature');
  });

  it('do not throw exceptions when processing a feature with no children', function() {
    return runAllEnabledRulesAgainstFile('ChildlessFeature.feature');
  });

  it('do not throw exceptions when processing a feature with no steps', function() {
    return runAllEnabledRulesAgainstFile('SteplessFeature.feature');
  });

  it('do not throw exceptions when processing a scenario outline with an empty examples table', function() {
    return runAllEnabledRulesAgainstFile('EmptyExamples.feature');
  });
});